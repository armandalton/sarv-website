
const state={lang:localStorage.getItem('sarv-lang')||'fa'};
const applyLang=()=>{
  document.documentElement.lang=state.lang;
  document.documentElement.dir=state.lang==='fa'?'rtl':'ltr';
  document.querySelectorAll('[data-fa]').forEach(el=>{
    el.innerHTML=state.lang==='fa'?el.dataset.fa:el.dataset.en;
  });
  const b=document.getElementById('langBtn'); if(b)b.textContent=state.lang==='fa'?'EN':'FA';
};
document.addEventListener('click',e=>{
  if(e.target.id==='langBtn'){state.lang=state.lang==='fa'?'en':'fa';localStorage.setItem('sarv-lang',state.lang);applyLang();}
  const f=e.target.closest('.filter');
  if(f){document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));f.classList.add('active');const val=f.dataset.filter;document.querySelectorAll('.product-card[data-category]').forEach(c=>c.classList.toggle('hidden',val!=='all'&&c.dataset.category!==val));}
});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
applyLang();
