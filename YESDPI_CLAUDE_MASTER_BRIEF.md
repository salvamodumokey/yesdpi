# YesDPI — Claude Code Master Product & Build Brief

> Bu dosya, YesDPI web sitesini tasarlamak ve geliştirmek için Claude Code'a verilecek ana bağlam dosyasıdır. Proje boyunca ürün kapsamı, tasarım dili, UX, teknik mimari, SEO ve kalite kuralları için bağlayıcı kabul edilmelidir.

---

## 1. Claude için ana görev

Mevcut DPI aracını, **YesDPI** markası altında profesyonel, hızlı ve SEO odaklı bir baskı görseli araç merkezine dönüştür.

YesDPI:

- İngilizce ve global hedef kitleye yönelik olmalı.
- iLovePDF kadar anlaşılır bir araç mimarisine sahip olmalı.
- Safe Zone Checker kadar hızlı şekilde işlem başlatmalı.
- Adobe Spectrum ve Creative Cloud araçları kadar düzenli, hassas ve profesyonel hissettirmeli.
- Adobe arayüzünü, ikonlarını veya marka varlıklarını kopyalamamalı.
- Görselleri mümkün olduğunca tamamen tarayıcı içinde işlemeli.
- Üyelik, ödeme, veritabanı ve ücretli API gerektirmemeli.
- Organik trafik ve gelecekteki AdSense geliri için hazırlanmalı.

Bu dokümanı okumadan tasarım veya kod değişikliğine başlama.

---

## 2. Kesin marka kararı

### Marka adı

**YesDPI**

Yazım her yerde tam olarak `YesDPI` olmalıdır.

Yanlış kullanımlar:

- Yes Dpi
- YES DPI
- yesdpi
- DPI Ready
- PixelToPrint

URL, değişken veya paket adlarında küçük harfli `yesdpi` kullanılabilir.

### Marka konumlandırması

> Free DPI & print image tools.

### Ana marka vaadi

> Check, convert, and prepare images for print — privately in your browser.

### Hero başlığı

> Every image, ready to print.

### Hero açıklaması

> Check DPI, convert images to 300 DPI, calculate print size, and prepare files for better printing. Free, private, and processed on your device.

### Birincil CTA

> Check Image DPI

### İkincil CTA

> Convert to 300 DPI

### Kısa slogan seçenekleri

- Make every image print-ready.
- Check. Convert. Print.
- Perfect pixels for print.

Ana arayüzde aynı anda birden fazla slogan kullanma.

---

## 3. Ürün hedefi

YesDPI, genel amaçlı bir görsel editörü değildir. Ürün yalnızca şu alanlarda uzmanlaşmalıdır:

- DPI kontrolü
- DPI metadata değiştirme
- 300 DPI dönüşümü
- Baskı ölçüsü hesaplama
- Piksel, inç ve santimetre dönüşümü
- Baskı için görsel boyutlandırma
- Görsel sıkıştırma
- JPG, PNG ve WebP format işlemleri
- EXIF ve görsel metadata işlemleri
- Aspect ratio
- Bleed, trim ve güvenli alan hesapları

Başlangıçta ekleme:

- Yapay zekâ upscaling
- Arka plan silme
- Kullanıcı hesabı
- Abonelik
- Bulut dosya depolama
- Ağır sunucu tarafı işleme
- Profesyonel PDF preflight
- Gelişmiş CMYK dönüşümü

Trafik ve gelir doğrulanana kadar ürün ücretsiz ve istemci taraflı kalmalıdır.

---

## 4. Doğrulanmış talep

Google Keyword Planner araştırmasında öne çıkan sorgular:

| Anahtar kelime | Ortalama aylık arama | Rekabet endeksi |
|---|---:|---:|
| dpi converter | 50.000 | 2 |
| image dpi converter | 50.000 | 11 |
| change dpi of image | 50.000 | 11 |
| increase dpi of image | 50.000 | 11 |
| dpi checker | 50.000 | 0 |
| convert image to 300 dpi | 5.000 | 17 |
| check image dpi | 5.000 | 1 |

Bu hacimleri doğrudan toplama; yakın sorgular aynı talep grubunu temsil edebilir.

Üç ana kullanıcı niyeti:

1. Görselin DPI değerini kontrol etmek
2. DPI metadata değerini değiştirmek
3. Görseli 300 DPI baskıya hazırlamak

MVP ve navigasyon önceliği bu sıraya dayanmalıdır.

---

## 5. Hedef kullanıcılar

- Fotoğraf bastırmak isteyen genel kullanıcılar
- Grafik tasarımcılar ve fotoğrafçılar
- Etsy, Redbubble ve print-on-demand satıcıları
- Poster ve sanat baskısı hazırlayan kişiler
- Matbaa ve yayıncılarla çalışan kullanıcılar
- Öğrenciler
- Yarışma veya başvuru için dosya hazırlayanlar
- Pasaport ve kimlik fotoğrafı ölçüsü hazırlayanlar

Teknik terimleri bilen kullanıcıları yavaşlatma; bilmeyen kullanıcıları da kısa açıklamalarla yönlendir.

---

## 6. Bilgi mimarisi

```text
YesDPI
├── Home / All Tools
├── DPI Tools
│   ├── DPI Checker
│   ├── DPI Converter
│   └── Convert Image to 300 DPI
├── Print Calculators
│   ├── Print Size Calculator
│   ├── Pixels to Inches
│   ├── Pixels to Centimeters
│   ├── Inches to Pixels
│   ├── Centimeters to Pixels
│   └── Aspect Ratio Calculator
├── Image Preparation
│   ├── Image Resizer for Print
│   ├── Image Compressor
│   ├── JPG / PNG / WebP Converter
│   └── EXIF Metadata Viewer & Remover
├── Guides
│   ├── What Is DPI?
│   ├── 72 DPI vs 300 DPI
│   ├── Best DPI for Printing
│   ├── Image Size for Common Print Formats
│   └── Does Changing DPI Improve Quality?
└── Company
    ├── About
    ├── Privacy
    ├── Terms
    └── Contact
```

### Temel URL'ler

| Sayfa | URL | Ana sorgu |
|---|---|---|
| Home | `/` | image tools for print |
| DPI Checker | `/dpi-checker` | dpi checker |
| DPI Converter | `/dpi-converter` | dpi converter |
| 300 DPI Converter | `/convert-image-to-300-dpi` | convert image to 300 dpi |
| Print Size Calculator | `/print-size-calculator` | image print size calculator |
| Pixels to Inches | `/pixels-to-inches` | pixels to inches |
| Pixels to CM | `/pixels-to-cm` | pixels to cm |
| Inches to Pixels | `/inches-to-pixels` | inches to pixels |
| CM to Pixels | `/cm-to-pixels` | cm to pixels |
| Aspect Ratio | `/aspect-ratio-calculator` | aspect ratio calculator |
| Print Image Resizer | `/image-resizer-for-print` | resize image for printing |
| Image Compressor | `/image-compressor` | compress image online |
| Metadata Viewer | `/image-metadata-viewer` | image metadata viewer |

Her işlev için yalnızca bir canonical URL oluştur. Aynı işlevin farklı anahtar kelimeleri için ince ve tekrar eden sayfalar üretme.

---

## 7. MVP geliştirme sırası

### P0 — Lansman çekirdeği

1. Home / All Tools
2. DPI Checker
3. DPI Converter
4. Convert Image to 300 DPI
5. Print Size Calculator
6. Pixels to Inches
7. Pixels to Centimeters
8. Inches to Pixels
9. Centimeters to Pixels
10. Aspect Ratio Calculator
11. Privacy, Terms, About ve Contact

### P1 — İlk büyüme

1. Image Resizer for Print
2. Image Compressor
3. Image Format Converter
4. EXIF Metadata Viewer
5. EXIF Metadata Remover
6. Ortak baskı boyutu presetleri

### P2 — Baskı uzmanlığı

1. Bleed and Trim Calculator
2. Poster Size Calculator
3. Passport Photo Size Calculator
4. Frame and Mat Calculator
5. Social ve marketplace print size templates

P0 tamamlanmadan P1 veya P2'ye geçme.

---

## 8. Ana sayfa UX yapısı

Sıralama:

1. Global header
2. Kompakt hero
3. Hero içinde veya hemen altında ana araç girişi
4. Popular Tools
5. DPI Tools
6. Print Calculators
7. Image Preparation
8. Privacy and trust strip
9. Kısa eğitici içerik
10. Guides
11. Açıkça ayrılmış reklam alanı
12. Footer

### Header

- YesDPI wordmark
- All Tools
- DPI Tools
- Calculators
- Image Tools
- Guides
- Sağda sakin bir privacy işareti veya menü

### Popular Tools ilk sırası

- DPI Checker
- DPI Converter
- 300 DPI Converter
- Print Size Calculator
- Pixels to Inches
- Image Resizer for Print

### Güven mesajları

- Your files stay on your device
- No signup required
- No watermark
- Free browser-based tools

Hero, aracın kendisini aşağı iten büyük bir pazarlama afişine dönüşmemelidir.

---

## 9. Standart araç sayfası

Her araç sayfasında:

1. Breadcrumb
2. Anahtar kelime odaklı tek H1
3. Tek cümlelik açıklama
4. No-upload güven satırı
5. Ana çalışma alanı
6. Sonuç ve bir sonraki eylem
7. Açıkça ayrılmış reklam alanı
8. How it works
9. Teknik açıklama ve gerçek örnek
10. Related tools
11. FAQ
12. Footer

Araç masaüstünde mümkün olduğunca ilk ekran içinde başlamalıdır.

---

## 10. Araç durum akışı

```text
Idle
  → Reading
  → Ready
  → Processing
  → Complete

Reading / Processing
  → Error
  → Retry or choose another file
```

### Idle

- Dropzone
- Choose image primary button
- Format ve boyut limiti
- Dosyanın cihazdan çıkmadığı bilgisi

### Ready

- Image preview
- Dosya türü ve boyutu
- Piksel ölçüleri
- Mevcut DPI ve metadata kaynağı
- Hedef DPI
- Canlı baskı ölçüsü
- Tek primary action

### Complete

- Yeni DPI
- Piksel ölçüleri
- Baskı ölçüsü
- Çıktı formatı
- Download primary action
- Start over quiet action

Kullanıcı hiçbir anda sistemin ne yaptığını tahmin etmek zorunda kalmamalıdır.

---

## 11. Dürüst ürün mesajları

Kullan:

> Changing DPI updates print metadata. It does not create new pixels.

> Your image is processed locally and never uploaded.

> For a sharper print, the image also needs enough pixel dimensions.

Kullanma:

> Instantly turn any low-resolution image into professional quality.

> Increase image quality by changing DPI.

YesDPI kalite yaratıyormuş gibi davranmamalı; metadata, piksel ve baskı boyutu ilişkisini doğru açıklamalıdır.

---

## 12. Tasarım yönü

Hedef:

> Adobe Spectrum ve profesyonel Creative Cloud araçlarından ilham alan; Adobe markasını kopyalamayan, hassas, sakin, üretkenlik odaklı ve güvenilir bir ürün.

Tasarım:

- Light theme odaklı
- Nötr yüzeyler
- Kontrollü mavi vurgu
- Net grid ve güçlü spacing
- Kompakt profesyonel kontroller
- İnce border kullanımı
- Düşük ve işlevsel shadow
- Anlamlı mikro etkileşimler
- Yüksek okunabilirlik

Kaçın:

- Aşırı gradient
- Glassmorphism
- Neon renkler
- Dev dekoratif blob şekilleri
- Her kartta büyük radius
- Sürekli hareket
- Oyuncak SaaS görünümü
- Adobe kırmızısı ve Adobe varlıkları

---

## 13. Tasarım tokenları

### Renk

```css
:root {
  --bg-canvas: #F7F7F8;
  --bg-surface: #FFFFFF;
  --bg-subtle: #F0F1F2;
  --bg-hover: #E9EAEC;
  --bg-pressed: #DFE1E4;

  --text-primary: #1E1E1E;
  --text-secondary: #5C5C5C;
  --text-tertiary: #767676;
  --text-disabled: #A6A6A6;
  --text-on-accent: #FFFFFF;

  --border-subtle: #E1E1E1;
  --border-default: #C9C9C9;
  --border-strong: #8A8A8A;
  --border-focus: #1473E6;

  --accent: #1473E6;
  --accent-hover: #0D66D0;
  --accent-pressed: #095ABA;
  --accent-subtle: #E8F2FF;

  --success: #268E6C;
  --success-subtle: #E7F5EF;
  --warning: #D97706;
  --warning-subtle: #FFF4E5;
  --negative: #D7373F;
  --negative-subtle: #FDEBEC;
}
```

Accent yalnızca primary action, focus ve seçili durumlarda baskın olmalıdır.

### Font

```css
font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
```

Adobe Clean lisanslı olarak sağlanmadığı sürece indirme veya taklit etme.

Monospace font yalnızca piksel, DPI ve metadata değerlerinde kullanılabilir.

### Tipografi

| Stil | Desktop | Mobile | Weight |
|---|---:|---:|---:|
| Display | 56px | 40px | 600 |
| H1 | 44px | 34px | 600 |
| H2 | 32px | 26px | 600 |
| H3 | 22px | 20px | 600 |
| Body L | 18px | 17px | 400 |
| Body | 16px | 16px | 400 |
| Body S | 14px | 14px | 400 |
| Label | 13px | 13px | 600 |

### Spacing

Yalnızca:

```text
2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
```

### Radius

| Bileşen | Radius |
|---|---:|
| Small control | 6px |
| Button / input | 8px |
| Card / panel | 10px |
| Tool workspace / modal | 12px |
| Badge | 999px |

### Shadow

```css
--shadow-1: 0 1px 2px rgba(0,0,0,.08);
--shadow-2: 0 4px 12px rgba(0,0,0,.10);
--shadow-3: 0 12px 32px rgba(0,0,0,.14);
```

Kartlarda öncelikle border kullan; shadow yalnızca katman ilişkisini anlatmak için kullanılmalıdır.

---

## 14. Grid ve responsive

- Desktop: 12 kolon, 24px gutter
- Tablet: 8 kolon, 20px gutter
- Mobile: 4 kolon, 16px gutter
- Global max width: 1280px
- Tool max width: 1040px
- Long-form text max width: 760px

Sayfa padding:

- ≥1440px: 48px
- 1024–1439px: 32px
- 768–1023px: 24px
- <768px: 16px

Mobilde:

- Minimum touch target 44px
- Formlar tek kolona düşmeli
- Primary action rahat erişilebilir olmalı
- Yatay overflow olmamalı
- Araç işlem sırası korunmalı

---

## 15. Bileşen kuralları

### Tool cards

- Minimum 168px yükseklik
- Tek renkli, tutarlı ikon
- Kısa başlık
- En fazla iki satır açıklama
- Kartın tamamı tıklanabilir
- Hover hareketi en fazla `translateY(-2px)`

### Dropzone

- Sakin kesikli veya belirgin border
- Upload ikonu
- Desteklenen formatlar ve limit
- Choose image primary button
- Drag-over sırasında accent border ve subtle background
- Reklam dropzone'a yakın yerleştirilmemeli

### Inspector

Desktop:

```text
┌──────────────────────┬───────────────────────────┐
│ Image preview        │ File information          │
│                      │ Current DPI                │
│ Fit / zoom controls  │ Target settings           │
│                      │ Estimated print size       │
│                      │ Primary action             │
└──────────────────────┴───────────────────────────┘
```

Mobilde preview üstte, ayarlar altta olmalıdır.

### DPI presets

```text
[72] [96] [150] [300] [600] [Custom]
```

- Segmented control
- Klavye kullanılabilirliği
- Seçili durum net
- Custom alanı layout sıçratmamalı

### States

Her interaktif bileşen:

- Default
- Hover
- Focus
- Pressed
- Loading
- Disabled
- Success
- Error

durumlarına sahip olmalıdır.

---

## 16. Motion sistemi

Motion yalnızca durum, ilişki ve geri bildirim anlatmalıdır.

```css
--motion-instant: 80ms;
--motion-fast: 120ms;
--motion-standard: 180ms;
--motion-emphasis: 240ms;
--motion-large: 320ms;

--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-enter: cubic-bezier(0, 0, 0, 1);
--ease-exit: cubic-bezier(0.3, 0, 1, 1);
--ease-emphasis: cubic-bezier(0.2, 0.8, 0.2, 1);
```

Hareket mesafeleri:

- Micro: 1–2px
- Tooltip/popover: 4px
- Panel enter: 8–12px
- Modal: `scale(.98) → scale(1)`

Kurallar:

- 500ms üzeri UI animasyonu kullanma.
- Büyük zoom, bounce veya scroll-jacking yapma.
- `prefers-reduced-motion` desteği ekle.
- İlk yüklemede bütün kartları anlamsız sırayla uçurma.

---

## 17. Teknik mimari

Tercih edilen teknoloji:

- Next.js App Router
- React
- TypeScript
- CSS Modules veya mevcut projedeki tutarlı styling çözümü
- İstemci taraflı görsel işleme
- Sunucu veritabanı yok
- Kullanıcı hesabı yok
- Harici ücretli API yok

Temel tarayıcı API'leri:

- `File`
- `ArrayBuffer`
- `DataView`
- `Canvas`
- `createImageBitmap`
- `Blob`
- `URL.createObjectURL`

Formatlar:

- JPEG: JFIF/EXIF DPI metadata okuma ve yazma
- PNG: `pHYs` chunk okuma ve yazma
- WebP: görüntüleme; gerektiğinde PNG çıktısı

Önerilen yapı:

```text
app/
├── page.tsx
├── dpi-checker/page.tsx
├── dpi-converter/page.tsx
├── convert-image-to-300-dpi/page.tsx
├── print-size-calculator/page.tsx
├── pixels-to-inches/page.tsx
├── pixels-to-cm/page.tsx
├── inches-to-pixels/page.tsx
├── cm-to-pixels/page.tsx
├── aspect-ratio-calculator/page.tsx
├── privacy/page.tsx
├── terms/page.tsx
├── about/page.tsx
└── contact/page.tsx

components/
├── SiteHeader.tsx
├── SiteFooter.tsx
├── ToolPageLayout.tsx
├── ToolCard.tsx
├── ToolGrid.tsx
├── ImageDropzone.tsx
├── ImageInspector.tsx
├── DpiSelector.tsx
├── PrintSizeResult.tsx
├── RelatedTools.tsx
├── AdSlot.tsx
└── FaqSection.tsx

lib/
├── image/
│   ├── inspect-image.ts
│   ├── jpeg-dpi.ts
│   ├── png-dpi.ts
│   ├── convert-image.ts
│   └── types.ts
├── calculators/
│   ├── print-size.ts
│   ├── pixels-units.ts
│   └── aspect-ratio.ts
└── seo/
    ├── tool-metadata.ts
    └── structured-data.ts
```

Görsel işleme fonksiyonlarını UI bileşenlerinin içine gömme.

---

## 18. Hesaplama doğruluğu

```text
print width in inches = pixel width / DPI
print height in inches = pixel height / DPI
centimeters = inches × 2.54
```

Örnek:

```text
3000 × 2400 px at 300 DPI
= 10 × 8 inches
= 25.4 × 20.32 cm
```

Kontrol et:

- Boş değer
- Sıfır
- Negatif değer
- Decimal değer
- Çok büyük sayı
- NaN ve Infinity
- En-boy oranı kilidi
- Uygun yuvarlama

---

## 19. SEO gereksinimleri

Her indexlenebilir araç sayfası:

- Benzersiz `<title>`
- Benzersiz meta description
- Tek H1
- Canonical URL
- Open Graph metadata
- SoftwareApplication veya WebApplication structured data
- Gerekli olduğunda FAQ içeriği
- İlgili araçlara iç bağlantılar
- Sitemap kaydı
- Gerçek, özgün ve araçla ilişkili açıklama

Örnek:

```text
Title:
DPI Checker — Check Image DPI Online Free | YesDPI

Description:
Check the DPI of JPG, PNG, and WebP images online. View pixel dimensions and print size instantly. Free, private, and no upload required.
```

Kurallar:

- Keyword stuffing yapma.
- Aynı metni bütün araç sayfalarına kopyalama.
- Aynı işlev için yakın kopya sayfalar oluşturma.
- Kullanıcıya fayda sağlamayan programmatic SEO sayfaları üretme.
- Schema'yı sayfada gerçekten görünmeyen içerikle doldurma.
- Domain belli olana kadar canonical base URL'yi tek config değişkeninden yönet.

---

## 20. Reklam kuralları

AdSense entegrasyonu henüz hazır değil. Şimdilik yalnızca `AdSlot` placeholder bileşenleri oluştur.

Uygun alanlar:

- Araç ve güven mesajından sonra
- Uzun açıklayıcı içerik içinde
- Desktop'ta içerikten yeterince ayrılmış yan alan

Yasak:

- Header ile ana araç arasına reklam
- Dropzone çevresine reklam
- Convert veya Download düğmesine yakın reklam
- Reklamı sonuç veya sistem mesajı gibi göstermek
- Reklamı download düğmesine benzetmek
- Sahte publisher veya ad unit ID eklemek

Etiket yalnızca:

- Advertisement
- Sponsored Links

---

## 21. Gizlilik, erişilebilirlik ve performans

### Gizlilik

- Kullanıcı görsellerini sunucuya gönderme.
- No-upload iddiasını gerçek network davranışıyla doğrula.
- Object URL'leri kullanım sonunda temizle.
- Third-party script eklenirse Privacy sayfasına yansıt.
- Analytics ve AdSense öncesinde consent gereksinimini ayrıca değerlendir.

### Erişilebilirlik

- Klavye navigasyonu
- Görünür focus
- Uygun label
- İkon-only button için accessible name ve tooltip
- Hatalarda `role="alert"`
- Renk dışında ikon ve metinle durum anlatımı
- WCAG AA kontrast
- Reduced motion

### Performans

- Gereksiz client component kullanma.
- Ağır işleme kodunu yalnızca ilgili sayfada yükle.
- Büyük dependency eklemeden önce gerekçelendir.
- Layout shift oluşturma.
- Görselleri ve fontları optimize et.
- Lighthouse hedefi: Performance, Accessibility, Best Practices ve SEO için mümkün olduğunca 90+.

---

## 22. Test planı

### Image metadata

- DPI içeren JPEG
- DPI içermeyen JPEG
- `pHYs` içeren PNG
- `pHYs` içermeyen PNG
- WebP
- Şeffaf PNG
- Büyük dosya
- Bozuk dosya
- Yanlış uzantı

### Conversion

- 72, 96, 150, 300 ve 600 DPI
- Custom DPI
- Existing metadata update
- Missing metadata insert
- Download edilen dosyayı tekrar yükleyerek doğrulama
- Piksel ölçülerinin değişmediğini doğrulama
- Dosyanın açıldığını doğrulama

### UI

- Desktop
- Tablet
- Mobile
- Chrome
- Safari
- Firefox
- Keyboard only
- Reduced motion
- Çok uzun filename
- Slow device simulation

---

## 23. Claude çalışma yöntemi

1. Önce mevcut repository yapısını ve çalışan özellikleri incele.
2. Mevcut davranışı ve kullanıcı değişikliklerini koru.
3. Kullanılan framework ve package manager'ı doğrula.
4. Kısa bir uygulama planı çıkar.
5. P0 kapsamını geliştir.
6. Görsel işleme mantığını yeniden kullanılabilir `lib` fonksiyonlarına ayır.
7. Ortak tool layout ve bileşen sistemini kur.
8. YesDPI markasını bütün metadata, UI ve legal metinlere uygula.
9. Responsive, state ve error durumlarını tamamla.
10. Lint, typecheck, test ve production build çalıştır.
11. Oluşan hataları gider.
12. Son teslimde değişen dosyaları, tamamlanan özellikleri, test sonuçlarını ve kalan açık kararları raporla.

Eksik bilgi varsa:

- Uygulamayı durdurmayan küçük kararlarda bu dokümandaki yönü kullan.
- Domain, iletişim bilgisi, analytics ID veya AdSense ID gibi gerçek veri gerektiren yerlerde placeholder config oluştur; sahte veri uydurma.
- Kapsamı P0 dışına genişletme.

---

## 24. Kesin tamamlanma kriterleri

İlk YesDPI sürümü ancak aşağıdakilerin tümü sağlanınca tamamlanmış sayılır:

- YesDPI markası eski adın yerini tamamen almış
- Ana sayfa profesyonel bir araç merkezi olmuş
- En az 6 araç gerçekten çalışıyor
- En az 8 araç ana sayfada doğru durumla listeleniyor
- DPI Checker, DPI Converter ve 300 DPI Converter ayrı URL'lerde çalışıyor
- Hesaplayıcılar doğru sonuç veriyor
- Her aracın benzersiz metadata'sı var
- Sitemap ve robots güncel
- Tüm P0 sayfaları mobilde kullanılabilir
- Dosyalar sunucuya yüklenmiyor
- DPI çıktısı yeniden yükleme testiyle doğrulanmış
- Empty, loading, success ve error durumları tamamlanmış
- Privacy, Terms, About ve Contact mevcut
- Reklam alanları ana işlemlerden açıkça ayrılmış
- Sahte AdSense veya analytics kimliği kullanılmamış
- Lint, typecheck ve production build başarılı
- Kritik console error yok

---

## 25. Son tasarım emri

YesDPI ilk bakışta hazır bir tema veya tipik bir AI üretimi landing page gibi görünmemelidir.

Ürün:

- Adobe seviyesinde düzenli,
- iLovePDF seviyesinde anlaşılır,
- Safe Zone Checker seviyesinde hızlı,
- bağımsız ve akılda kalıcı bir marka,
- teknik açıdan dürüst,
- sakin ama karakterli

olmalıdır.

Öncelik sırası:

```text
Doğruluk → Kullanılabilirlik → Güven → Hız → Görsel kalite → Motion
```

Her ekran ve bileşen için şu soruyu sor:

> Bu çözüm, baskı için görsel hazırlayan bir kullanıcının işini daha hızlı ve daha güvenilir hale getiriyor mu?

Yanıt hayırsa o öğeyi ekleme.

