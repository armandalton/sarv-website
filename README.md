# SARV Website — GitHub Pages

سایت استاتیک چندصفحه‌ای SARV / سرو، آماده انتشار روی GitHub Pages.

## امکانات
- فارسی + انگلیسی با دکمه تغییر زبان
- صفحات Home / Products / About / Contact
- طراحی Premium / Cinematic / Glass-inspired
- کاملاً Responsive برای موبایل و دسکتاپ
- تصاویر اصلی محصولات بدون ویرایش در پروژه قرار گرفته‌اند
- دکمه‌های خرید به https://sarvco.mydigify.app
- شماره تماس فعلی: 09339412312
- بدون نیاز به دیتابیس، سرور یا بک‌اند
- بدون نیاز به npm برای اجرای نسخه فعلی

## اجرای سریع روی کامپیوتر
ساده‌ترین روش:
1. پوشه پروژه را Extract کن.
2. فایل `index.html` را باز کن.

روش بهتر برای تست:
- Python 3 نصب باشد.
- Terminal را داخل پوشه پروژه باز کن.
- اجرا کن:
  `python3 -m http.server 8080`
- سپس برو به:
  `http://localhost:8080`

## انتشار روی GitHub Pages — ساده‌ترین روش
1. وارد GitHub شو.
2. یک Repository جدید بساز؛ مثلاً:
   `sarv-website`
3. فایل‌ها و پوشه‌های این پروژه را Upload کن:
   - `index.html`
   - `products.html`
   - `about.html`
   - `contact.html`
   - `styles.css`
   - `script.js`
   - پوشه `assets`
4. Commit changes بزن.
5. در Repository برو به:
   `Settings → Pages`
6. در قسمت `Build and deployment`:
   - Source = `Deploy from a branch`
   - Branch = `main`
   - Folder = `/ (root)`
7. Save را بزن.
8. چند لحظه بعد GitHub یک آدرس شبیه این می‌دهد:
   `https://YOUR-USERNAME.github.io/sarv-website/`

## اگر می‌خواهی آدرس بدون /sarv-website باشد
Repository را با نام دقیق:
`YOUR-USERNAME.github.io`
بساز.
در این حالت آدرس:
`https://YOUR-USERNAME.github.io/`

## نکته مهم درباره تصاویر
فایل‌های موجود در `assets/products` و `assets/hero` از فایل‌های ارسالی پروژه گرفته شده‌اند و خود تصویر محصول بازطراحی نشده است.

## تغییر لینک فروشگاه
فعلاً همه دکمه‌های خرید به:
https://sarvco.mydigify.app
می‌روند.
وقتی لینک اختصاصی هر محصول را داشتی، فقط لینک همان کارت‌ها را در HTML تغییر بده.

## تغییر شماره تماس
شماره فعلی در `contact.html` و `footer` قرار داده شده است:
09339412312
