# CareerAI: Yapay Zeka Destekli Kariyer Koçu ve Mülakat Simülatörü

CareerAI, iş arayanların mülakatlara hazırlanmasını, CV'lerini analiz etmesini ve kendilerini geliştirmelerini sağlayan yeni nesil, yapay zeka (Gemini 2.5 Flash) destekli bir platformdur.

## 🌟 Öne Çıkan Özellikler

*   **🧠 Akıllı CV Analizi:** Adayın deneyim seviyesi (Junior/Senior), çalışma modeli (Remote/Hybrid) ve sektörel bazda (Fintech, Healthtech vb.) CV-İş İlanı eşleşmesini puanlar.
*   **🎙️ İnteraktif Mülakat Simülatörü:** Gemini yapay zekası ile STAR metodolojisine uygun, gerçek zamanlı, sohbet tabanlı mülakat pratiği.
*   **📊 Mülakat Performans Karnesi:** Simülasyon bitiminde iletişim, kültürel uyum ve STAR metodu kullanımına göre detaylı skorlama ve gelişim alanları raporu.
*   **📄 PDF Dışa Aktarma:** Mülakat karnesini profesyonel bir tasarımla PDF olarak indirebilme.
*   **🎯 Stratejik Hazırlık (Cheat Sheet):** Şirket değerlerine özel, mülakat öncesi adaya taktiksel hazırlık rehberi sunma.

## 🛠️ Teknolojik Altyapı (Tech Stack)

### Frontend (İstemci Tarafı)
*   **Vue.js 3 (Composition API):** Reaktif ve modüler kullanıcı arayüzü.
*   **Tailwind CSS:** "Executive Precision" tasarım diline uygun, modern ve duyarlı UI.
*   **html2pdf.js:** İstemci tarafında yüksek kaliteli PDF oluşturma.

### Backend (Sunucu Tarafı)
*   **Node.js & Express.js:** Hızlı ve ölçeklenebilir API yönetimi.
*   **Google Gemini 2.5 Flash API:** Doğal dil işleme ve kompleks veri analizi.
*   **MongoDB & Mongoose:** Analiz geçmişini ve kullanıcı başvurularını saklama.

## 📁 Proje Yapısı

```bash
career-ai/
│
├── client/                     # Vue.js Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── MockInterviewSimulator.vue    # İnteraktif Chat
│   │   │   ├── InterviewEvaluationReport.vue # Performans Raporu
│   │   │   ├── CompanyKeywordsInput.vue      # Tag Giriş Bileşeni
│   │   │   └── CompanyCultureSelector.vue    # Kültür Seçim Kartları
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                     # Node.js/Express Backend
│   ├── routes/
│   │   └── api.js              # Gemini API Rotaları
│   ├── models/
│   │   └── Application.js      # MongoDB Şeması
│   ├── server.js               # Express Sunucu
│   ├── package.json
│   └── .env                    # GEMINI_API_KEY
│
└── README.md
```

## 🚀 Kurulum ve Çalıştırma

1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadiniz/career-ai.git
   cd career-ai
   ```

2. **Backend'i Başlatın:**
   ```bash
   cd server
   npm install
   # .env dosyasını oluşturun: GEMINI_API_KEY ve MONGODB_URI ekleyin.
   npm run dev
   ```

3. **Frontend'i Başlatın:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 📜 Lisans
Bu proje MIT lisansı altında lisanslanmıştır.
