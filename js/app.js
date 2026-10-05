const seed = window.SARV_SEED_PRODUCTS || [];
const STORE_URL = 'https://sarvco.mydigify.app';
const defaultMain = document.querySelector('main').innerHTML;
const faNumber = n => n == null ? '' : new Intl.NumberFormat('fa-IR').format(n);
const money = n => n ? `${faNumber(n)} تومان` : 'قیمت در فروشگاه';
const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const slugFromHash = () => decodeURIComponent(location.hash.split('?')[0].replace(/^#\/?/,''));

async function getProducts(){
  return seed
    .filter(p => p.active !== false)
    .sort((a,b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

function productCard(p, index=0){
  const v=p.variants?.[0];
  const image=p.image || 'assets/brand/brand-mark.webp';
  return `<article class="product-card reveal" style="--delay:${Math.min(index,8)*45}ms">
    <a class="product-image" href="#product/${encodeURIComponent(p.slug)}" aria-label="مشاهده ${esc(p.name)}">
      ${p.featured ? '<span class="featured-badge">منتخب</span>' : ''}
      <img src="${esc(image)}" alt="${esc(p.name)}" loading="lazy" decoding="async" onerror="this.closest('.product-image').classList.add('image-failed');this.style.display='none'">
      ${!p.image ? '<span class="no-image">تصویر در فایل منبع موجود نیست</span>' : ''}
    </a>
    <div class="product-info"><div class="product-meta"><span>${p.category==='spices'?'ادویه':p.category==='legumes'?'حبوبات':'سایر'}</span><span>${esc(p.weight||'')}</span></div><h3>${esc(p.name)}</h3>${p.description?`<p>${esc(p.description).slice(0,115)}${p.description.length>115?'…':''}</p>`:''}<div class="product-foot"><strong>${money(v?.price)}</strong><a href="#product/${encodeURIComponent(p.slug)}">مشاهده <span>←</span></a></div></div>
  </article>`;
}

async function renderProducts(filter='all'){
  const all=await getProducts();
  const list=filter==='all'?all:all.filter(p=>p.category===filter);
  const grid=document.querySelector('#product-grid'); if(grid) grid.innerHTML=list.map(productCard).join('') || '<div class="empty-state">محصولی در این دسته ثبت نشده است.</div>';
  const fg=document.querySelector('#featured-grid'); if(fg){ const featured=all.filter(p=>p.featured).slice(0,4); fg.innerHTML=(featured.length?featured:all.slice(0,4)).map(productCard).join(''); }
  observeReveals();
}

async function renderDetail(slug){
  const all=await getProducts(); const p=all.find(x=>x.slug===slug); if(!p){ location.hash='products'; return; }
  const main=document.querySelector('main');
  main.innerHTML=`<section class="detail-page section"><a class="back-link" href="#products">← بازگشت به محصولات</a><div class="detail-grid"><div class="detail-media"><img src="${esc(p.image||'assets/brand/brand-mark.webp')}" alt="${esc(p.name)}" fetchpriority="high"></div><div class="detail-copy"><div class="section-kicker">${p.category==='spices'?'ادویه':p.category==='legumes'?'حبوبات':'سایر'} · SARV</div><h1>${esc(p.name)}</h1><p class="detail-lead">${esc(p.description||'اطلاعات تکمیلی این محصول در فایل منبع ارائه نشده است.')}</p><div class="variant-list">${(p.variants||[]).map((v,i)=>{const isPack=/پک/i.test(v.label)||/۱۵/.test(v.label);return `<div class="variant ${i===0?'selected':''}"><div><b>${esc(v.label)}</b><small>${esc(v.weight||'')}</small></div><strong>${money(v.price)}</strong>${isPack?`<span class="discount">۲۰٪ تخفیف</span>`:''}</div>`}).join('')} || '<div class="empty-state">مدل و قیمت در منبع فعلی ثبت نشده است.</div>'}</div>${p.features?.length?`<div class="feature-list">${p.features.map((f,i)=>`<span><b>0${i+1}</b>${esc(f)}</span>`).join('')}</div>`:''}<a class="button primary wide" data-store-link href="${esc(p.purchaseUrl||STORE_URL)}" target="_blank" rel="noopener">خرید محصول ↗</a><p class="wholesale-note">ویژه فروشگاه‌ها و مصارف عمده · مدل‌های پک ۱۵ عددی با ۲۰٪ تخفیف بیشتر.</p></div></div></section>`;
  wireStoreLinks(); window.scrollTo({top:0,behavior:'instant'}); observeReveals();
}

function wireStoreLinks(){ document.querySelectorAll('[data-store-link]').forEach(a=>{a.href=STORE_URL;}); }
function observeReveals(){ const els=document.querySelectorAll('.reveal:not(.seen)'); if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('seen'));return;} const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target)}}),{threshold:.08}); els.forEach(e=>io.observe(e)); }
function initNav(){
  const btn=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav'); btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open)}); nav?.addEventListener('click',()=>nav.classList.remove('open'));
  document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter)}));
}
async function route(){ const s=slugFromHash(); if(s.startsWith('product/')) return renderDetail(s.slice(8)); if(!document.querySelector('#products')){document.querySelector('main').innerHTML=defaultMain; initNav(); wireStoreLinks();} if(s.startsWith('products')){const q=location.hash.split('?')[1]||'';const c=new URLSearchParams(q).get('category');if(c){document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===c));} await renderProducts(c||'all'); document.querySelector('#products')?.scrollIntoView({behavior:'smooth'}); return;} await renderProducts(); }

document.querySelector('#year').textContent=new Date().getFullYear(); wireStoreLinks(); initNav(); route(); window.addEventListener('hashchange',route); observeReveals();
