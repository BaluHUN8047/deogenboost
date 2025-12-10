document.addEventListener('DOMContentLoaded', () => {

  // ===== DINAMIKUS ÁRAK =====
  const packagePrices = {
    boost1: 3,
    boost2: 6,
    boost3: 15,
    boost4: 1.50,
    apocalypse: 7
  };

  // Árak megjelenítése index.html-en
  for(const key in packagePrices){
    const priceElem = document.getElementById(`price-${key}`);
    if(priceElem) priceElem.textContent = `€${packagePrices[key]}`;
  }

  // Buy gombok href automatikus beállítása
  document.querySelectorAll('.card').forEach(card => {
    const id = card.dataset.id;
    const btn = card.querySelector('.buy-btn');
    if(btn && packagePrices[id] !== undefined){
      btn.href = `buy.html?price=${packagePrices[id]}`;
    }
  });

  // ===== TIMER =====
  function updateTimer() {
    const endDate = new Date('2025-12-31T23:59:59');
    const now = new Date();
    const diff = endDate - now;
    const timerElem = document.getElementById('timer');
    if(!timerElem) return;
    if(diff <= 0){ timerElem.innerText = 'Sale ended!'; return; }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    timerElem.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  setInterval(updateTimer, 1000);
  updateTimer();

  // ===== HOVER ANIMÁCIÓK =====
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
  });

  // Discord pulzálás
  const discordImg = document.querySelector('.discord-section img');
  if(discordImg){
    setInterval(() => {
      discordImg.style.transform = 'scale(1.05)';
      setTimeout(() => discordImg.style.transform = 'scale(1)', 500);
    }, 3000);
  }

  // ===== DINAMIKUS ÁR BUY.HTML-EN =====
  const urlParams = new URLSearchParams(window.location.search);
  const price = urlParams.get('price');
  const priceElem = document.getElementById('selected-price');
  if(price && priceElem){
    priceElem.textContent = `$${price}`;
  }

});
