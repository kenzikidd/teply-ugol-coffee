// Меняйте названия, описания, цены и состав здесь. Цена указана в тенге.
const menu = {
 coffee: [
 {id:'cappuccino',name:'Капучино',description:'Эспрессо, тёплое молоко и бархатная пенка',price:1300,portion:'250 мл',ingredients:'Эспрессо, молоко',allergens:'Молоко',image:'coffee.jpg'},
 {id:'flat',name:'Флэт уайт',description:'Двойной эспрессо и тонкий слой молочной пены',price:1500,portion:'200 мл',ingredients:'Двойной эспрессо, молоко',allergens:'Молоко'},
 {id:'raf',name:'Ванильный раф',description:'Мягкий сливочный кофе с натуральной ванилью',price:1800,portion:'300 мл',ingredients:'Эспрессо, сливки, ванильный сахар',allergens:'Молоко'},
 {id:'filter',name:'Фильтр-кофе',description:'Чистый вкус с лёгкими шоколадными нотами',price:1100,portion:'250 мл',ingredients:'Молотый кофе, вода',allergens:'Основные аллергены отсутствуют'}],
 cold: [
 {id:'iced',name:'Айс-латте',description:'Молоко, эспрессо и много освежающего льда',price:1600,portion:'350 мл',ingredients:'Эспрессо, молоко, лёд',allergens:'Молоко'},
 {id:'tonic',name:'Эспрессо-тоник',description:'Кофе и тоник с цитрусовым послевкусием',price:1700,portion:'300 мл',ingredients:'Эспрессо, тоник, апельсин, лёд',allergens:'Цитрусовые'},
 {id:'lemon',name:'Лимонад с розмарином',description:'Лимонная свежесть и лёгкий травяной аромат',price:1400,portion:'350 мл',ingredients:'Вода, лимон, сахарный сироп, розмарин',allergens:'Цитрусовые'},
 {id:'matcha',name:'Айс-матча',description:'Зелёный чай матча на овсяном молоке',price:1900,portion:'350 мл',ingredients:'Матча, овсяное молоко, лёд',allergens:'Возможен глютен в овсяном молоке'}],
 dessert: [
 {id:'croissant',name:'Круассан с маслом',description:'Золотистая корочка и сотни нежных слоёв',price:1200,portion:'80 г',ingredients:'Пшеничная мука, сливочное масло, молоко, дрожжи, яйцо, сахар',allergens:'Глютен, молоко, яйцо',image:'bakery.jpg'},
 {id:'cheese',name:'Ванильный чизкейк',description:'Сливочная начинка на рассыпчатой основе',price:2100,portion:'140 г',ingredients:'Сливочный сыр, сливки, яйцо, пшеничное печенье, ваниль',allergens:'Молоко, яйцо, глютен'},
 {id:'brownie',name:'Шоколадный брауни',description:'Насыщенный шоколад и мягкая серединка',price:1600,portion:'100 г',ingredients:'Тёмный шоколад, сливочное масло, яйцо, мука, сахар',allergens:'Молоко, яйцо, глютен, возможна соя'},
 {id:'cookie',name:'Печенье с шоколадом',description:'Большое печенье с кусочками тёмного шоколада',price:900,portion:'70 г',ingredients:'Мука, масло, яйцо, сахар, шоколад',allergens:'Глютен, молоко, яйцо, возможна соя'}],
 breakfast: [
 {id:'toast',name:'Тост с авокадо и яйцом',description:'Хлеб на закваске, нежное авокадо и яйцо',price:2800,portion:'220 г',ingredients:'Пшеничный хлеб, авокадо, яйцо, лимон, перец',allergens:'Глютен, яйцо, цитрусовые',image:'toast.jpg'},
 {id:'porridge',name:'Овсянка с ягодами',description:'Нежная каша с сезонными ягодами и мёдом',price:1800,portion:'280 г',ingredients:'Овсяные хлопья, молоко, ягоды, мёд',allergens:'Молоко, возможен глютен'},
 {id:'syrniki',name:'Сырники со сметаной',description:'Творожные сырники с ягодным соусом',price:2500,portion:'200 г',ingredients:'Творог, яйцо, мука, сахар, сметана, ягоды',allergens:'Молоко, яйцо, глютен'},
 {id:'omelette',name:'Омлет с томатами',description:'Воздушный омлет, томаты и хрустящий тост',price:2300,portion:'250 г',ingredients:'Яйцо, молоко, томаты, пшеничный хлеб, масло',allergens:'Яйцо, молоко, глютен'}]
};
const allItems=Object.values(menu).flat();
const money=value=>new Intl.NumberFormat('ru-RU').format(value)+' ₸';
const grid=document.querySelector('#menu-grid');
function renderMenu(category){grid.replaceChildren(...menu[category].map((item,index)=>{const button=document.createElement('button');button.className='menu-card';button.style.setProperty('--i',index);button.dataset.item=item.id;button.setAttribute('aria-haspopup','dialog');button.innerHTML=`<h3>${item.name}</h3><span class="price">${money(item.price)}</span><p>${item.description}</p><span class="card-arrow" aria-hidden="true">↗</span>`;return button;}));}
renderMenu('coffee');
let filterTimer;
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{if(button.getAttribute('aria-pressed')==='true')return;document.querySelectorAll('[data-category]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));clearTimeout(filterTimer);grid.style.opacity='0';filterTimer=setTimeout(()=>{renderMenu(button.dataset.category);grid.style.opacity='1';},matchMedia('(prefers-reduced-motion: reduce)').matches?0:160);}));
document.querySelector('#popular-grid').innerHTML=['cappuccino','croissant','toast'].map(id=>{const item=allItems.find(x=>x.id===id);return `<button class="popular-card reveal" data-item="${id}" aria-haspopup="dialog"><div class="image-frame"><img src="assets/${item.image}" alt="${item.name}" loading="lazy" width="600" height="650"><span aria-hidden="true">↗</span></div><div class="popular-meta"><h3>${item.name}</h3><span class="price">${money(item.price)}</span></div><p>${item.description}</p></button>`;}).join('');
const dialog=document.querySelector('dialog');let closeTimer;
document.addEventListener('click',event=>{const card=event.target.closest('[data-item]');if(!card)return;const item=allItems.find(x=>x.id===card.dataset.item);clearTimeout(closeTimer);dialog.classList.remove('closing');document.querySelector('#dialog-title').textContent=item.name;document.querySelector('#dialog-description').textContent=item.description;document.querySelector('#dialog-details').innerHTML=`<dt>Порция</dt><dd>${item.portion}</dd><dt>Состав</dt><dd>${item.ingredients}</dd><dt>Аллергены</dt><dd>${item.allergens}</dd>`;document.querySelector('#dialog-price').textContent=money(item.price);dialog.showModal();document.body.classList.add('modal-open');});
function closeDialog(){if(!dialog.open||dialog.classList.contains('closing'))return;dialog.classList.add('closing');closeTimer=setTimeout(()=>{dialog.close();dialog.classList.remove('closing');document.body.classList.remove('modal-open');},matchMedia('(prefers-reduced-motion: reduce)').matches?0:220);}
document.querySelector('.close-dialog').addEventListener('click',closeDialog);dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
function closeNav(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});nav.addEventListener('click',event=>{if(event.target.closest('a'))closeNav();});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeNav();toggle.focus();}});matchMedia('(min-width:701px)').addEventListener('change',closeNav);
// Содержимое всегда видно: наблюдатель добавляет только краткую анимацию.
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}

