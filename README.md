# TaskFlow

TaskFlow, React + Vite ile gelistirilmis modern bir gorev yonetim uygulamasidir.
Kullanici tek ekrandan gorev olusturabilir, filtreleyebilir, duzenleyebilir ve tamamladigi isleri takip edebilir.
Tum veriler tarayicidaki `localStorage` icinde tutuldugu icin sayfa yenilense bile gorevler korunur.

## Proje Ne Yapiyor?

- Kisisel veya is odakli gorevleri tek yerde yonetir.
- Oncelik, kategori ve teslim tarihi ile planlama yapmayi kolaylastirir.
- Tamamlanma orani, geciken gorev sayisi ve bugune ait gorev sayisi gibi metriklerle ilerlemeyi gosterir.

## Temel Ozellikler

- Gorev ekleme: baslik, aciklama, kategori, oncelik, teslim tarihi
- Gorev duzenleme: satir ici duzenleme modunda anlik guncelleme
- Gorev tamamlama / geri alma
- Tekrar tikla ile guvenli silme
- Arama: baslik, aciklama, kategori metni icinde
- Coklu filtre: durum, kategori, oncelik
- Coklu siralama: en yeni, en eski, oncelik, son tarih, alfabetik
- Toplu aksiyon: tamamlananlari temizleme
- Ornek veri yukleme (bos listeye hizli baslangic)
- Cross-tab localStorage senkronizasyonu

## Uygulama Akisi

1. `TaskForm` ile yeni gorev eklenir.
2. Gorev `App.jsx` icindeki merkez state'e yazilir.
3. `useLocalStorage` hook'u state'i kalici olarak saklar.
4. `FilterBar` secimlerine gore gorevler filtrelenir/siralanir.
5. `TaskListPage` ve `TaskCard` gorevleri render eder.
6. `Header` bolumu metrikleri (toplam, aktif, bugun, geciken, ilerleme) gunceller.

## Teknoloji Yigini

- React 18
- Vite 5
- Tailwind CSS
- Vanilla localStorage

## Kurulum

```bash
npm install
npm run dev
```

Yerel calisan adres (varsayilan): `http://localhost:5173`

## Build ve Preview

```bash
npm run build
npm run preview
```

## Proje Yapisi

```text
src/
  components/
    FilterBar.jsx
    Header.jsx
    TaskCard.jsx
    TaskForm.jsx
  interfaces/
    Task.js
    useLocalStorage.js
  pages/
    TaskListPage.jsx
  App.jsx
  index.css
  main.jsx
```

## Nasil Gelistirildi?

- Veri modeli `normalizeTask` ile geriye donuk uyumluluklu hale getirildi.
- Durum ve tamamlanma alani birbiriyle tutarli olacak sekilde guncelleniyor.
- Bilesenler daha okunabilir, sorumluluklari daha net hale getirildi.
- Arayuz mobil/masaustu dengesinde yeniden duzenlendi.

## Lisans

Bu proje egitim amacli hazirlanmistir.
