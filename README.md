# SARV / سرو — سایت رسمی استاتیک

این نسخه عمداً **بدون پنل Admin، بدون Supabase و بدون Backend** ساخته شده است تا بتوانی پروژه را خیلی ساده روی GitHub Pages قرار بدهی.

## مهم‌ترین نکته: برای اضافه/ویرایش محصول فقط این فایل را تغییر بده

```text
data/products.js
```

تمام اطلاعات محصولات در همین فایل قرار دارد و سایت از همین فایل می‌خواند. لازم نیست فایل HTML یا JavaScript اصلی سایت را برای اضافه کردن محصول دستکاری کنی.

---

## ساختار ساده پروژه

```text
SARV/
├── index.html                 # صفحه اصلی
├── data/
│   └── products.js            # ⭐ تنها فایل اطلاعات محصولات
├── assets/
│   ├── products/              # تصاویر واقعی محصولات
│   └── brand/                 # تصاویر برند و Lifestyle
├── css/
│   └── style.css              # ظاهر سایت
├── js/
│   └── app.js                 # منطق سایت؛ معمولاً نیازی به تغییر ندارد
├── scripts/
│   └── check-site.mjs         # بررسی فایل‌ها و Assetها
├── .github/workflows/deploy.yml
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── README.md
```

---

# 1. اجرای سایت روی کامپیوتر

### روش خیلی ساده با Python

داخل پوشه اصلی پروژه Terminal را باز کن و اجرا کن:

```bash
python3 -m http.server 8080
```

در ویندوز اگر `python3` کار نکرد:

```bash
python -m http.server 8080
```

بعد مرورگر را باز کن:

```text
http://localhost:8080
```

برای توقف سرور:

```text
Ctrl + C
```

> لازم نیست `npm install` انجام بدهی. پروژه Static است.

---

# 2. اضافه کردن محصول جدید

فقط این فایل را باز کن:

```text
data/products.js
```

داخل آرایه `window.SARV_SEED_PRODUCTS` یک آبجکت جدید اضافه کن.

نمونه:

```js
{
  id:'spice-example',
  name:'نام محصول',
  slug:'example',
  category:'spices',
  weight:'۸۰ گرم',
  image:'assets/products/example.webp',
  description:'توضیح کوتاه محصول.',
  features:['ویژگی اول','ویژگی دوم','ویژگی سوم'],
  variants:[
    {
      label:'قوطی تک ۸۰ گرمی',
      weight:'۸۰ گرم',
      price:90000
    }
  ],
  featured:true,
  active:true,
  sortOrder:20
}
```

### معنی فیلدها

| فیلد | کاربرد |
|---|---|
| `id` | شناسه یکتا؛ انگلیسی و بدون فاصله |
| `name` | نام فارسی محصول |
| `slug` | آدرس داخلی محصول؛ انگلیسی و یکتا |
| `category` | `spices` یا `legumes` یا `other` |
| `weight` | وزن نمایشی |
| `image` | مسیر تصویر محصول |
| `description` | توضیح محصول |
| `features` | لیست ویژگی‌ها |
| `variants` | مدل‌ها و قیمت‌ها |
| `featured` | نمایش در محصولات شاخص |
| `active` | اگر `false` باشد محصول نمایش داده نمی‌شود |
| `sortOrder` | ترتیب نمایش؛ عدد کمتر = بالاتر |
| `purchaseUrl` | اختیاری؛ لینک خرید اختصاصی محصول |

---

# 3. اضافه کردن تصویر محصول

تصویر بهینه‌شده محصول را در این پوشه قرار بده:

```text
assets/products/
```

مثلاً:

```text
assets/products/example.webp
```

بعد در `products.js` بنویس:

```js
image:'assets/products/example.webp'
```

### نکته بسیار مهم

تصویر محصول را بازطراحی یا با AI تولید نکن. همان تصویر واقعی بسته‌بندی را استفاده کن. برای سرعت فقط می‌توانی فرمت/فشرده‌سازی را تغییر بدهی.

---

# 4. حذف محصول

در `data/products.js` آبجکت مربوط به محصول را حذف کن.

یا اگر می‌خواهی بعداً دوباره برگردد، بهتر است فقط این را تغییر بدهی:

```js
active:false
```

---

# 5. ویرایش محصول

همان فایل:

```text
data/products.js
```

مثلاً نام:

```js
name:'فلفل قرمز'
```

توضیح:

```js
description:'توضیح جدید محصول'
```

قیمت:

```js
price:49800
```

ترتیب:

```js
sortOrder:3
```

---

# 6. تغییر لینک خرید

به صورت پیش‌فرض تمام دکمه‌های خرید به فروشگاه رسمی می‌روند:

```text
https://sarvco.mydigify.app
```

اگر برای یک محصول لینک اختصاصی داشتی، داخل همان محصول اضافه کن:

```js
purchaseUrl:'https://example.com/product/example'
```

اگر `purchaseUrl` نگذاری، لینک اصلی فروشگاه استفاده می‌شود.

---

# 7. مدل‌ها و قیمت‌های مختلف

هر محصول می‌تواند چند مدل داشته باشد:

```js
variants:[
  {
    label:'قوطی تک ۸۰ گرمی',
    weight:'۸۰ گرم',
    price:90000
  },
  {
    label:'سلفون تک ۴۵ گرمی',
    weight:'۴۵ گرم',
    price:60000
  },
  {
    label:'پک ۱۵ عددی',
    weight:'۱۵ × ۴۵ گرم',
    price:720000,
    discount:180000
  }
]
```

اگر قیمت نامشخص است، می‌توانی `variants:[]` بگذاری؛ سایت پیام مناسب نمایش می‌دهد.

---

# 8. اضافه کردن دسته جدید

دسته‌های فعلی:

```text
spices  → ادویه‌ها
legumes → حبوبات
other   → سایر
```

برای محصول جدید از یکی از این مقدارها استفاده کن.

اگر در آینده دسته کاملاً جدیدی لازم داشتی، فقط باید فیلتر آن دسته را در `index.html` اضافه کنی و در `app.js` برچسب فارسی آن را تعریف کنی.

---

# 9. GitHub Pages

## مرحله اول: ساخت Repository

در GitHub یک Repository جدید بساز، مثلاً:

```text
sarv-website
```

Repository را می‌توانی Public انتخاب کنی.

## مرحله دوم: آپلود فایل‌ها

تمام محتویات همین پروژه را داخل Repository قرار بده.

باید `index.html` در ریشه Repository باشد:

```text
repository/
├── index.html
├── assets/
├── css/
├── js/
├── data/
└── ...
```

نباید این‌طور باشد:

```text
repository/
└── SARV-website/
    └── index.html
```

مگر اینکه عمداً ساختار Deploy را تغییر بدهی.

## مرحله سوم: فعال کردن Pages

در GitHub برو به:

```text
Settings → Pages
```

در قسمت Build and deployment گزینه:

```text
Source: GitHub Actions
```

را انتخاب کن.

Workflow موجود در:

```text
.github/workflows/deploy.yml
```

به صورت خودکار سایت را Deploy می‌کند.

بعد از تمام شدن Workflow، GitHub آدرس سایت را در همان بخش Pages نشان می‌دهد.

معمولاً آدرس چیزی شبیه این است:

```text
https://USERNAME.github.io/sarv-website/
```

اگر Repository نام `USERNAME.github.io` داشته باشد، آدرس کوتاه‌تر خواهد بود.

---

# 10. بعد از هر تغییر چه کار کنم؟

مثلاً محصول جدید اضافه کردی:

1. `data/products.js` را ویرایش کن.
2. تصویر را داخل `assets/products/` بگذار.
3. فایل‌ها را روی GitHub Commit کن.
4. GitHub Actions خودش سایت را دوباره Deploy می‌کند.

یعنی هیچ پنل، Database یا Backend لازم نیست.

---

# 11. تست قبل از Upload

داخل پروژه اجرا کن:

```bash
npm run check
```

این دستور وجود فایل‌های اصلی و Assetها را بررسی می‌کند.

اگر Python داری، سایت را هم اجرا کن:

```bash
python3 -m http.server 8080
```

و سپس:

```text
http://localhost:8080
```

---

# 12. اگر تصویر نمایش داده نشد

اول مسیر تصویر را بررسی کن.

مثلاً اگر فایل این است:

```text
assets/products/my-product.webp
```

باید در محصول دقیقاً این باشد:

```js
image:'assets/products/my-product.webp'
```

به حروف بزرگ و کوچک حساس باش. این موضوع روی GitHub Pages مهم است.

---

# 13. اگر سایت بعد از Deploy سفید شد

موارد زیر را بررسی کن:

1. `index.html` در ریشه Repository باشد.
2. نام فایل‌ها دقیقاً درست باشد.
3. GitHub Actions موفق شده باشد.
4. Console مرورگر را بررسی کن.
5. مسیر Assetها با `/` و حروف صحیح نوشته شده باشد.

---

# 14. امنیت

چون این نسخه Backend و Admin ندارد:

- هیچ Passwordی داخل پروژه وجود ندارد.
- هیچ API Key وجود ندارد.
- هیچ Secret وجود ندارد.
- هیچ Database خارجی لازم نیست.

این پروژه مناسب یک Product Showcase عمومی روی GitHub Pages است.

**توجه:** هر اطلاعاتی که در `products.js` قرار بدهی عمومی است؛ اطلاعات محرمانه، رمز عبور یا API Secret را داخل آن قرار نده.

---

# 15. Performance

برای تصاویر محصولات نسخه WebP استفاده شده است. تصاویر به صورت Lazy Load دریافت می‌شوند و انیمیشن‌ها با `transform` و `opacity` طراحی شده‌اند. همچنین `prefers-reduced-motion` رعایت شده است.

برای اضافه کردن تصویر جدید بهتر است:

- WebP استفاده شود.
- تصویر بیش از اندازه بزرگ نباشد.
- نسبت تصویر محصول تغییر نکند.
- خود محصول با AI بازسازی نشود.

---

# 16. فایل‌هایی که معمولاً نباید تغییر بدهی

اگر فقط می‌خواهی محصول اضافه/حذف/ویرایش کنی، به این‌ها دست نزن:

```text
js/app.js
css/style.css
index.html
.github/workflows/deploy.yml
```

فقط:

```text
data/products.js
```

و در صورت نیاز:

```text
assets/products/
```

را تغییر بده.

---

# 17. خلاصه خیلی ساده

### اضافه کردن محصول

```text
1. تصویر → assets/products/
2. اطلاعات → data/products.js
3. Commit در GitHub
4. سایت خودکار Deploy می‌شود
```

### حذف محصول

```text
data/products.js
→ حذف آبجکت محصول
```

یا:

```js
active:false
```

### تغییر قیمت

```text
data/products.js
→ variants
→ price
```

### تغییر عکس

```text
assets/products/
→ عکس جدید

بعد:
data/products.js
→ image:'assets/products/NEW.webp'
```

---

## فروشگاه رسمی

```text
https://sarvco.mydigify.app
```

سایت رسمی SARV / سرو برای معرفی محصولات طراحی شده و خرید از طریق فروشگاه انجام می‌شود.
