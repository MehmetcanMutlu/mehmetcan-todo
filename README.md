# TaskFlow — Todo Uygulaması

Modern, minimal ve güçlü bir görev yönetim uygulaması.

## 🚀 Teknolojiler

- **ReactJS** (Vite)
- **Tailwind CSS**
- **LocalStorage** ile kalıcı veri saklama

## ✨ Özellikler

- ✅ Görev **Ekle** (başlık, açıklama, öncelik, kategori)
- 📋 Görevleri **Listele** (filtre + sıralama)
- ✏️ Görev **Güncelle** (inline düzenleme)
- 🗑️ Görev **Sil** (onaylı silme)
- 📊 Tamamlanma istatistikleri
- 💾 LocalStorage ile otomatik kayıt

## 🛠️ Kurulum

```bash
npm install
npm run dev
```

## 🌐 Deploy (Netlify)

```bash
npm run build
# dist/ klasörünü Netlify'e yükle veya GitHub'a bağla
```

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── Header.jsx
│   ├── TaskForm.jsx
│   ├── TaskCard.jsx
│   └── FilterBar.jsx
├── pages/
│   └── TaskListPage.jsx
├── interfaces/
│   ├── Task.js
│   └── useLocalStorage.js
├── App.jsx
├── main.jsx
└── index.css
```

---
Mehmetcan Mutlu — Web Geliştirme JS Projesi
