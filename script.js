document.addEventListener('DOMContentLoaded',()=>{
  const screens=[...document.querySelectorAll('[data-screen]')];
  const tabs=[...document.querySelectorAll('.tab')];
  const show=(id)=>{screens.forEach(s=>s.classList.toggle('active',s.id===id));tabs.forEach(t=>t.classList.toggle('active',t.dataset.go===id));window.scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'','#'+id)};
  document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>show(el.dataset.go)));
  const eventData={hatha:['Хатха-йога','01 СЕН · 10:00','Йога · 900 ₽'],sound:['Звуковая медитация','31 АВГ · 20:00','Звук · 1 500 ₽'],pravilo:['ПравИло · индивидуально','02 СЕН · 12:00','Тело · 2 000 ₽'],kundalini:['Кундалини-йога','03 СЕН · 19:30','Йога · 1 000 ₽']};
  const modal=document.getElementById('bookingModal'),title=document.getElementById('modalTitle'),meta=document.getElementById('modalMeta'),form=document.getElementById('bookingForm'),success=document.getElementById('success');
  const openBooking=(id)=>{const d=eventData[id]||['Событие 39 Чувство','Уточняется',''];title.textContent=d[0];meta.textContent=d[1]+' · '+d[2];modal.classList.add('open');modal.setAttribute('aria-hidden','false');form.classList.remove('hidden');success.classList.remove('show');form.reset()};
  document.querySelectorAll('[data-event]').forEach(el=>el.addEventListener('click',e=>{if(e.target.closest('button')&&el.classList.contains('event-feature'))openBooking(el.dataset.event);else if(e.target.closest('.mini-btn')){e.preventDefault();openBooking(el.dataset.event)}}));
  document.getElementById('modalClose').addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')});
  modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
  form.addEventListener('submit',e=>{e.preventDefault();form.classList.add('hidden');success.classList.add('show')});
  const applyFilter=(value)=>{show('events');document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===value));document.querySelectorAll('.event-card').forEach(card=>card.style.display=value==='all'||card.dataset.type===value?'grid':'none')};
  document.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener('click',()=>applyFilter(el.dataset.filter)));
  document.getElementById('profileBtn').addEventListener('click',()=>show('more'));
  const hash=location.hash.replace('#','');if(['home','events','team','more'].includes(hash))show(hash);else show('home');
  if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{})}
});