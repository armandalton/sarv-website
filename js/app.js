const seed = window.SARV_SEED_PRODUCTS || [];
const STORE_URL='https://sarvco.mydigify.app';
const TELEGRAM_URL=''; // شماره/لینک تلگرام در نسخه فعلی فایل منبع مشخص نشده است؛ بعداً این مقدار را پر کنید.
const faNumber=n=>n==null||n===''?'':new Intl.NumberFormat('fa-IR').format(n);
const money=n=>n==null||n===''?'قیمت در فروشگاه':`${faNumber(n)} تومان`;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const catName=c=>c==='legumes'?'حبوبات':'ادویه';
const all=()=>seed.filter(p=>p.active!==false).sort((a,b)=>(a.sortOrder??999)-(b.sortOrder??999));
const firstSingle=p=>(p.variants||[]).find(v=>v.type==='single')||p.variants?.[0];
const packVariants=p=>(p.variants||[]).filter(v=>v.type==='pack');
function imageFor(p,v){return v?.image||p.image||'assets/brand/brand-mark.webp'}
function productCard(p,index=0){
 const v=firstSingle(p); const image=imageFor(p,v);
 return `<article class="product-card reveal" style="--delay:${Math.min(index,8)*45}ms">
 <a class="product-image" href="#product/${encodeURIComponent(p.slug)}"><img src="${esc(image)}" alt="${esc(p.name)}" loading="lazy" decoding="async"><span class="product-pill">${p.category==='legumes'?'حبوبات':'ادویه'}</span></a>
 <div class="product-info"><div class="product-meta"><span>${esc(v?.label||p.weight||'')}</span><span>تک</span></div><h3>${esc(p.name)}</h3><p>${esc(p.description||'').slice(0,110)}${(p.description||'').length>110?'…':''}</p><div class="product-foot"><strong>${money(v?.price)}</strong><a href="#product/${encodeURIComponent(p.slug)}">انتخاب مدل ←</a></div></div></article>`
}
function shelfCard(p){
 const v=firstSingle(p); const packs=packVariants(p);
 return `<article class="shelf-card"><a href="#product/${encodeURIComponent(p.slug)}"><div class="shelf-img"><img src="${esc(imageFor(p,v))}" alt="${esc(p.name)}" loading="lazy"></div><div><b>${esc(p.name)}</b><small>${esc(v?.label||p.weight||'')}</small><strong>${money(v?.price)}</strong>${packs.length?'<em>+ پک ۱۵ عددی · ۲۰٪ تخفیف</em>':''}</div></a></article>`
}
function renderShelves(){
 const products=all();
 const best=products.filter(p=>p.featured).slice(0,6);
 const packs=products.filter(p=>packVariants(p).length).slice(0,8);
 const boxes=products.filter(p=>p.category==='spice-sachet').slice(0,8);
 const legumes=products.filter(p=>p.category==='legumes').slice(0,8);
 const sachets=products.filter(p=>p.category==='spice-sachet').slice(0,8);
 for(const [id,list] of [['shelf-bestsellers',best],['shelf-packs',packs],['shelf-boxes',boxes],['shelf-legumes',legumes],['shelf-sachets',sachets]]){const el=document.getElementById(id);if(el)el.innerHTML=list.map(shelfCard).join('')}
}
function renderProducts(filter='all'){
 const products=all();
 let list=products;
 if(filter==='legumes') list=products.filter(p=>p.category==='legumes');
 if(filter==='spice-box') list=products.filter(p=>p.category==='spice-sachet');
 if(filter==='spice-sachet') list=products.filter(p=>p.category==='spice-sachet');
 if(filter==='packs') list=products.filter(p=>packVariants(p).length);
 const grid=document.querySelector('#product-grid'); if(grid) grid.innerHTML=list.map(productCard).join('')||'<div class="empty-state">محصولی در این ویترین ثبت نشده است.</div>';
 const fg=document.querySelector('#featured-grid'); if(fg) fg.innerHTML=products.filter(p=>p.featured).slice(0,4).map(productCard).join('');
 renderShelves(); observeReveals();
}
function renderDetail(slug){
 const p=all().find(x=>x.slug===slug); if(!p){location.hash='products';return}
 const main=document.querySelector('main');
 const variants=p.variants||[]; const initial=variants[0];
 main.innerHTML=`<section class="detail-page section"><a class="back-link" href="#products">← بازگشت به محصولات</a>
 <div class="detail-grid"><div class="detail-media"><img id="detail-image" src="${esc(imageFor(p,initial))}" alt="${esc(p.name)}" fetchpriority="high"></div>
 <div class="detail-copy"><div class="section-kicker">${catName(p.category)} · SARV</div><h1>${esc(p.name)}</h1>
 <p class="detail-lead">${esc(p.description||'')}</p>
 <div class="purchase-panel"><div class="panel-title">انتخاب مدل</div><div class="variant-grid">${variants.map((v,i)=>`<button class="variant ${i===0?'selected':''} ${v.type==='pack'?'pack-variant':''}" data-variant="${i}"><span><b>${esc(v.label)}</b><small>${esc(v.weight||'')}</small></span><strong>${money(v.price)}</strong>${v.type==='pack'?'<em>۲۰٪ تخفیف</em>':''}</button>`).join('')}</div>
 <div id="bulk-message" class="${initial?.type==='pack'?'visible':''}">ویژه فروشگاه‌ها و مصارف عمده.<br><span>پخش‌کنندگان محصولات غذایی، مارکت‌ها و مصرف‌کنندگان عمده می‌توانند این پک ۱۵ عددی را با ۲۰٪ تخفیف بیشتر تهیه کنند.</span></div>
 <a class="button primary wide" data-store-link href="${esc(STORE_URL)}" target="_blank" rel="noopener">ثبت سفارش و خرید ↗</a></div>
 ${p.features?.length?`<div class="feature-list">${p.features.map((f,i)=>`<span><b>0${i+1}</b>${esc(f)}</span>`).join('')}</div>`:''}
 <div class="detail-note"><b>بسته‌بندی:</b> مدل قوطی ۸۰ گرمی در ظرف P.E.T و مدل سلفونی ۴۵ گرمی در بسته‌بندی سلفونی استاندارد عرضه می‌شود. برای حبوبات، تصاویر متناسب با وزن ۴۵۰ و ۸۰۰ گرم هنگام انتخاب مدل نمایش داده می‌شود.</div>
 </div></div></section>`;
 document.querySelectorAll('[data-variant]').forEach(btn=>btn.addEventListener('click',()=>{
   document.querySelectorAll('.variant').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');
   const v=variants[Number(btn.dataset.variant)]; document.getElementById('detail-image').src=imageFor(p,v);
   document.getElementById('bulk-message').classList.toggle('visible',v.type==='pack');
 }));
 wireStoreLinks();window.scrollTo({top:0,behavior:'instant'});observeReveals();
}
function wireStoreLinks(){document.querySelectorAll('[data-store-link]').forEach(a=>{a.href=a.dataset.storeLink||STORE_URL})}
function observeReveals(){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'))}
function route(){
 const raw=location.hash.slice(1)||'home'; const [path,q]=raw.split('?'); const params=new URLSearchParams(q||'');
 if(path.startsWith('product/')) return renderDetail(decodeURIComponent(path.slice(8)));
 const productsSection=document.querySelector('#products'); if(productsSection) productsSection.style.display='block';
 renderProducts(params.get('category')||'all'); wireStoreLinks();
 if(path==='products'){setTimeout(()=>document.querySelector('#products')?.scrollIntoView({behavior:'smooth'}),20)}
}
document.addEventListener('DOMContentLoaded',()=>{route();document.querySelectorAll('.menu-toggle').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.nav')?.classList.toggle('open')}));});
window.addEventListener('hashchange',route);
