/* =====================================================
   QuickBite Express — Interactive JS
   ===================================================== */

/* ─── Navbar scroll effect ───────────────────────────── */
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  const backTop = document.getElementById('back-top');
  if (window.scrollY > 400) backTop.classList.add('visible');
  else backTop.classList.remove('visible');
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

/* ─── Back to top ────────────────────────────────────── */
document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Intersection observer for reveal ──────────────── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ─── Animated counter ───────────────────────────────── */
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString('en-IN') + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(c => {
        const target = +c.dataset.count;
        const suffix = c.dataset.suffix || '';
        animateCounter(c, target, suffix);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.has-counters').forEach(el => counterObserver.observe(el));

/* ─── Toast notification ─────────────────────────────── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ─── Mood Menu ──────────────────────────────────────── */
const moodData = {
  happy: {
    label: 'Happy',
    emoji: '😊',
    desc: 'Sunny vibes call for colourful food!',
    foods: [
      { emoji: '🍕', name: 'Margherita Pizza', price: '₹249' },
      { emoji: '🍦', name: 'Mango Kulfi', price: '₹89' },
      { emoji: '🥗', name: 'Rainbow Bowl', price: '₹199' },
      { emoji: '🥤', name: 'Strawberry Shake', price: '₹129' },
      { emoji: '🧁', name: 'Velvet Cupcake', price: '₹79' },
      { emoji: '🌮', name: 'Party Tacos', price: '₹179' }
    ]
  },
  sad: {
    label: 'Sad',
    emoji: '😢',
    desc: 'Comfort food to lift your spirits instantly.',
    foods: [
      { emoji: '🍫', name: 'Dark Choco Brownie', price: '₹99' },
      { emoji: '🍜', name: 'Hot Noodle Soup', price: '₹159' },
      { emoji: '🍦', name: 'Ice Cream Tub', price: '₹149' },
      { emoji: '🥞', name: 'Fluffy Pancakes', price: '₹139' },
      { emoji: '🧇', name: 'Waffle Delight', price: '₹169' },
      { emoji: '☕', name: 'Masala Chai', price: '₹59' }
    ]
  },
  romantic: {
    label: 'Romantic',
    emoji: '💕',
    desc: 'Set the mood with an elegant spread for two.',
    foods: [
      { emoji: '🍷', name: 'Grape Sangria', price: '₹189' },
      { emoji: '🍓', name: 'Strawberry Fondue', price: '₹299' },
      { emoji: '🥩', name: 'Sizzler for Two', price: '₹449' },
      { emoji: '🫐', name: 'Berry Cheesecake', price: '₹219' },
      { emoji: '🌹', name: 'Rose Kheer', price: '₹119' },
      { emoji: '🍝', name: 'Pasta Arrabbiata', price: '₹249' }
    ]
  },
  party: {
    label: 'Party',
    emoji: '🎉',
    desc: 'Turn up the flavours for the whole squad!',
    foods: [
      { emoji: '🍗', name: 'Party Platter (12pc)', price: '₹549' },
      { emoji: '🥩', name: 'BBQ Nachos', price: '₹229' },
      { emoji: '🍕', name: 'XL Pizza Box', price: '₹699' },
      { emoji: '🥤', name: 'Mocktail Jug', price: '₹199' },
      { emoji: '🎂', name: 'Celebration Cake', price: '₹499' },
      { emoji: '🌭', name: 'Loaded Hot Dogs', price: '₹149' }
    ]
  },
  lazy: {
    label: 'Lazy',
    emoji: '😴',
    desc: 'Zero effort, maximum satisfaction.',
    foods: [
      { emoji: '🍕', name: 'Pepperoni Pizza', price: '₹329' },
      { emoji: '🍟', name: 'Cheese Fries', price: '₹119' },
      { emoji: '🫕', name: 'Comfort Dal Rice', price: '₹99' },
      { emoji: '☕', name: 'Café Latte', price: '₹89' },
      { emoji: '🥪', name: 'Club Sandwich', price: '₹149' },
      { emoji: '🍜', name: 'Instant Ramen', price: '₹139' }
    ]
  },
  stressed: {
    label: 'Stressed',
    emoji: '😤',
    desc: 'Spicy, bold flavours to unleash the tension.',
    foods: [
      { emoji: '🌶️', name: 'Ghost Pepper Wings', price: '₹289' },
      { emoji: '🍛', name: 'Extra Spicy Biryani', price: '₹249' },
      { emoji: '☕', name: 'Double Shot Espresso', price: '₹99' },
      { emoji: '🫙', name: 'Pickle & Paratha', price: '₹89' },
      { emoji: '🌮', name: 'Schezwan Tacos', price: '₹179' },
      { emoji: '🍜', name: 'Ramen in Rage', price: '₹199' }
    ]
  },
  hungry: {
    label: 'Hungry',
    emoji: '🤤',
    desc: 'XL portions, instant delivery. No waiting!',
    foods: [
      { emoji: '🍖', name: 'Mega Chicken Thali', price: '₹349' },
      { emoji: '🍛', name: 'King Biryani', price: '₹299' },
      { emoji: '🥙', name: 'Loaded Shawarma', price: '₹219' },
      { emoji: '🍔', name: 'Double Smash Burger', price: '₹249' },
      { emoji: '🥘', name: 'Dal Makhani + Naan', price: '₹199' },
      { emoji: '🫕', name: 'Paneer Handi', price: '₹229' }
    ]
  },
  healthy: {
    label: 'Healthy',
    emoji: '💪',
    desc: 'Clean eating, full flavour — no compromise.',
    foods: [
      { emoji: '🥗', name: 'Quinoa Power Bowl', price: '₹229' },
      { emoji: '🥤', name: 'Green Detox Juice', price: '₹119' },
      { emoji: '🥜', name: 'Protein Satay', price: '₹199' },
      { emoji: '🫐', name: 'Açaí Smoothie Bowl', price: '₹179' },
      { emoji: '🥚', name: 'Egg White Omelette', price: '₹129' },
      { emoji: '🍇', name: 'Fruit & Nut Salad', price: '₹149' }
    ]
  },
  nostalgic: {
    label: 'Nostalgic',
    emoji: '🏠',
    desc: 'Ghar ka khaana — tastes like home.',
    foods: [
      { emoji: '🍛', name: 'Rajma Chawal', price: '₹129' },
      { emoji: '🫓', name: 'Aloo Paratha + Curd', price: '₹99' },
      { emoji: '🥛', name: 'Haldi Doodh', price: '₹59' },
      { emoji: '🍲', name: 'Sambar Rice', price: '₹99' },
      { emoji: '🥟', name: 'Ghar ki Khichdi', price: '₹89' },
      { emoji: '🍮', name: 'Gajar Halwa', price: '₹79' }
    ]
  },
  adventurous: {
    label: 'Adventurous',
    emoji: '🌏',
    desc: 'Global flavours, delivered to your door.',
    foods: [
      { emoji: '🫔', name: 'Korean Bibimbap', price: '₹269' },
      { emoji: '🍣', name: 'Sushi Platter', price: '₹399' },
      { emoji: '🥙', name: 'Lebanese Mezze', price: '₹319' },
      { emoji: '🍜', name: 'Pad Thai', price: '₹229' },
      { emoji: '🌮', name: 'Baja Tacos', price: '₹199' },
      { emoji: '🥘', name: 'Moroccan Tagine', price: '₹289' }
    ]
  },
  comfort: {
    label: 'Comfort',
    emoji: '🤗',
    desc: 'Warm, cosy, wrapping you in flavour.',
    foods: [
      { emoji: '🍜', name: 'Hot Tomato Soup', price: '₹99' },
      { emoji: '🫕', name: 'Mac & Cheese', price: '₹179' },
      { emoji: '🥧', name: 'Apple Pie', price: '₹149' },
      { emoji: '☕', name: 'Masala Chai + Biscuit', price: '₹69' },
      { emoji: '🥞', name: 'Buttermilk Pancakes', price: '₹139' },
      { emoji: '🍲', name: 'Ghee Dal Tadka', price: '₹119' }
    ]
  },
  celebrating: {
    label: 'Celebrating',
    emoji: '🎂',
    desc: 'Every win deserves a legendary meal!',
    foods: [
      { emoji: '🎂', name: 'Custom Celebration Cake', price: '₹649' },
      { emoji: '🥂', name: 'Sparkling Lemonade', price: '₹149' },
      { emoji: '🍾', name: 'Mango Mousse Dome', price: '₹299' },
      { emoji: '🥩', name: 'BBQ Feast Platter', price: '₹599' },
      { emoji: '🎁', name: 'Surprise Dessert Box', price: '₹399' },
      { emoji: '🍱', name: 'Premium Bento Set', price: '₹449' }
    ]
  }
};

const moodCards = document.querySelectorAll('.mood-card');
const moodResult = document.getElementById('mood-result');

moodCards.forEach(card => {
  card.addEventListener('click', () => {
    moodCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const key = card.dataset.mood;
    const data = moodData[key];
    if (!data) return;

    const header = moodResult.querySelector('.mood-result-header');
    const grid   = moodResult.querySelector('.food-recommendations');

    header.innerHTML = `
      <div class="big-emoji">${data.emoji}</div>
      <div>
        <h3>${data.label} Mode 🔥</h3>
        <p>${data.desc}</p>
      </div>
    `;

    grid.innerHTML = data.foods.map(f => `
      <div class="food-rec-item">
        <div class="emoji">${f.emoji}</div>
        <h4>${f.name}</h4>
        <div class="price">${f.price}</div>
        <button class="add-btn" onclick="addToCart('${f.name}', '${f.emoji}')">+ Add</button>
      </div>
    `).join('');

    moodResult.classList.add('visible');
    moodResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

/* ─── Cart ───────────────────────────────────────────── */
let cartCount = 0;
function addToCart(name, emoji) {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  document.getElementById('cart-count').style.display = 'inline-flex';
  showToast(`${emoji} ${name} added to cart!`);
}

/* ─── Earnings calculator ────────────────────────────── */
const ordersInput = document.getElementById('orders-input');
const earningsDisplay = document.getElementById('earnings-display');

if (ordersInput && earningsDisplay) {
  ordersInput.addEventListener('input', () => {
    const orders = parseInt(ordersInput.value) || 0;
    const per = 8; // ₹8 per order
    const monthly = orders * per * 30;
    earningsDisplay.textContent = '₹' + monthly.toLocaleString('en-IN');
  });
}

/* ─── Tier card click ────────────────────────────────── */
document.querySelectorAll('.tier-cta').forEach(btn => {
  btn.addEventListener('click', () => showToast('🎉 Join QB Circle — coming soon!'));
});

/* ─── Store buttons ──────────────────────────────────── */
document.querySelectorAll('.store-btn').forEach(btn => {
  btn.addEventListener('click', () => showToast('📱 App launching soon — stay tuned!'));
});

/* ─── BYOT CTA ───────────────────────────────────────── */
document.getElementById('byot-cta')?.addEventListener('click', () => {
  showToast('♻️ Registered for BYOT programme!');
});

/* ─── Smooth scroll for nav links ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── "Order Now" hero CTA ───────────────────────────── */
document.getElementById('hero-order-btn')?.addEventListener('click', () => {
  document.getElementById('mood-menu').scrollIntoView({ behavior: 'smooth' });
});

/* ─── Live kitchen counter update ───────────────────── */
setInterval(() => {
  const el = document.getElementById('orders-live');
  if (el) {
    const n = parseInt(el.textContent.replace(/,/g,'')) + Math.floor(Math.random() * 3) + 1;
    el.textContent = n.toLocaleString('en-IN');
  }
}, 5000);

/* ─── Recipe submit ──────────────────────────────────── */
document.getElementById('recipe-submit')?.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('recipe-name')?.value?.trim();
  if (!name) { showToast('⚠️ Please enter a recipe name!'); return; }
  showToast(`👩‍🍳 "${name}" submitted! Earn up to ₹500/mo!`);
  document.getElementById('recipe-form').reset();
  document.getElementById('earnings-display').textContent = '₹0';
});
