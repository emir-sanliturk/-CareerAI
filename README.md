# 🧠 CareerAI — Yapay Zeka Destekli Mülakat Simülatörü

CareerAI, iş arayanların mülakatlara hazırlanmasını sağlayan yapay zeka (Gemini 2.5 Flash) destekli bir mülakat simülasyon platformudur.

## ✨ Özellikler

- 🎙️ **İnteraktif Mülakat Simülatörü** — Gemini AI ile gerçek zamanlı, STAR metodolojisine uygun mülakat pratiği
- 📊 **Performans Karnesi** — İletişim, kültürel uyum ve STAR metodu skorlaması
- 📄 **PDF Rapor** — Profesyonel tasarımda indirilebilir performans raporu
- 🎯 **Akıllı Değerlendirme** — Güçlü yönler, gelişim alanları ve taktiksel aksiyon planı

## 🛠️ Teknoloji Stack

### Frontend
- **Vue.js 3** (Composition API)
- **Vite** — Hızlı geliştirme sunucusu
- **Tailwind CSS** — Executive Precision tasarım sistemi
- **html2pdf.js** — İstemci tarafı PDF oluşturma

### Backend
- **Node.js & Express.js** — RESTful API
- **Google Gemini 2.5 Flash** — Yapay zeka motoru
- **MongoDB & Mongoose** — Veri saklama (opsiyonel)

## 📁 Proje Yapısı

```
careerai/
├── client/                 # Vue.js Frontend
│   ├── src/
│   │   ├── views/          # Sayfa bileşenleri
│   │   ├── router/         # Vue Router
│   │   ├── services/       # API servisleri
│   │   └── assets/         # CSS ve statik dosyalar
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                 # Express.js Backend
│   ├── routes/             # API rotaları
│   ├── models/             # MongoDB modelleri
│   ├── server.js
│   └── .env.example
├── design/                 # Tasarım prototipleri
└── README.md
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm 9+
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))
- MongoDB (opsiyonel)

### Adımlar

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadiniz/careerai.git
   cd careerai
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm run install:all
   ```

3. **Ortam değişkenlerini ayarlayın:**
   ```bash
   cp server/.env.example server/.env
   ```
   `server/.env` dosyasını açıp `GEMINI_API_KEY` değerini girin.

4. **Backend'i başlatın:**
   ```bash
   npm run dev:server
   ```

5. **Frontend'i başlatın (yeni terminal):**
   ```bash
   npm run dev:client
   ```

6. **Tarayıcıda açın:** `http://localhost:5173`

## 📸 Ekran Görüntüleri

> Tasarım prototipleri `design/` klasöründe bulunmaktadır.

## 🔑 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/interview/start` | Mülakat sorularını oluşturur |
| POST | `/api/interview/evaluate` | Mülakat performansını değerlendirir |

## 📜 Lisans

MIT License — Detaylar için [LICENSE](LICENSE) dosyasına bakın.
