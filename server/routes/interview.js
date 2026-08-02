import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';

const router = express.Router();

// Initialize Gemini
const initGemini = () => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

// POST /start
router.post('/start', async (req, res, next) => {
    try {
        const { position, experienceLevel, cvText, jobPosting } = req.body;
        
        if (!position || !experienceLevel) {
            return res.status(400).json({ success: false, message: 'Position and experienceLevel are required' });
        }

        const model = initGemini();

        const prompt = `
Bir İnsan Kaynakları uzmanı olarak davran. Aşağıdaki aday profiline ve iş detaylarına dayanarak STAR (Situation, Task, Action, Result) metodolojisine uygun 5 adet mülakat sorusu hazırla.
Soruları Türkçe olarak üret ve doğrudan sadece JSON formatında bir dizi olarak döndür.

Aday Profili ve İş Detayları:
- Pozisyon: ${position}
- Deneyim Seviyesi: ${experienceLevel}
${cvText ? `- CV İçeriği: ${cvText}` : ''}
${jobPosting ? `- İş İlanı Detayları: ${jobPosting}` : ''}

Çıktı formatı: ["Soru 1", "Soru 2", "Soru 3", "Soru 4", "Soru 5"]
`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: 'application/json'
            }
        });

        const text = result.response.text();
        const questions = JSON.parse(text);
        const sessionId = crypto.randomUUID();

        res.json({
            success: true,
            data: {
                questions,
                sessionId
            }
        });

    } catch (error) {
        console.error('Error in /start:', error);
        res.status(500).json({ success: false, message: 'Failed to generate interview questions' });
    }
});

// POST /evaluate
router.post('/evaluate', async (req, res, next) => {
    try {
        const { position, questions, answers, experienceLevel } = req.body;
        
        if (!questions || !answers || questions.length !== answers.length) {
            return res.status(400).json({ success: false, message: 'Questions and matching answers are required' });
        }

        const model = initGemini();

        const interviewData = questions.map((q, i) => `Soru: ${q}\nCevap: ${answers[i]}`).join('\n\n');

        const prompt = `
Bir İnsan Kaynakları uzmanı olarak davran. Aşağıdaki mülakat soru ve cevaplarına dayanarak adayın performansını değerlendir. Değerlendirmeyi Türkçe olarak yap.

Aday Profili:
- Pozisyon: ${position}
- Deneyim Seviyesi: ${experienceLevel}

Mülakat Verisi:
${interviewData}

Lütfen değerlendirmeyi aşağıdaki JSON yapısında döndür:
{
  "overallScore": (0-100 arası genel puan),
  "metrics": {
    "starMethod": (0-100 arası STAR metodolojisine uygunluk puanı),
    "communication": (0-100 arası iletişim becerisi puanı),
    "cultureFit": (0-100 arası kültür uyumu / profesyonellik puanı)
  },
  "summary": "Profesyonel bir özet paragrafı",
  "strengths": ["Güçlü yön 1", "Güçlü yön 2", ...],
  "improvements": ["Gelişim alanı 1", "Gelişim alanı 2", ...],
  "actionPlan": ["Eylem planı 1", "Eylem planı 2", ...]
}
`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: 'application/json'
            }
        });

        const text = result.response.text();
        const evaluation = JSON.parse(text);

        res.json({
            success: true,
            data: evaluation
        });

    } catch (error) {
        console.error('Error in /evaluate:', error);
        res.status(500).json({ success: false, message: 'Failed to evaluate interview performance' });
    }
});

export default router;
