/**
 * NEXCOREMC - PRODUCTION CORE JAVASCRIPT
 * Fast, lightweight, zero-gimmick script:
 * - Real live server status polling (60s interval)
 * - Clean native anchor navigation & mobile drawer
 * - Java/Bedrock edition tabs
 * - Store currency switcher (INR / USD)
 * - Kit preview modal
 * - One-click IP copy with toast notification
 * - Standard performant IntersectionObserver scroll reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothAnchorScroll();
  initParticleCanvas();
  initPerksComparator();
  initCurrencySwitcher();
  initRankKitModal();
  initClipboardHandlers();
  initScrollReveal();
  initNavbarScrollSpy();
  initMobileDrawer();
  initEditionTabs();
  initFaqAccordion();
  initLiveStats();
  initScrollTop();
});

/* --------------------------------------------------------------------------
   1. NATIVE SMOOTH ANCHOR NAVIGATION (NO SCROLL HIJACKING)
   -------------------------------------------------------------------------- */
function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      try {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();

          // Close mobile drawer if open
          const drawer = document.getElementById('mobile-drawer');
          const backdrop = document.getElementById('drawer-backdrop');
          const toggleBtn = document.getElementById('hamburger-toggle');
          if (drawer && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            if (backdrop) backdrop.classList.remove('active');
            if (toggleBtn) {
              toggleBtn.classList.remove('active');
              toggleBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
          }

          const header = document.getElementById('main-header');
          const headerHeight = header ? header.offsetHeight : 74;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = Math.max(0, elementPosition + window.pageYOffset - (headerHeight + 16));

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      } catch (err) {
        // Fallback for query selectors
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. SUBTLE EMBER / PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let animationFrameId;
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 16 : 30;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.radius = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 46, 46, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update();
      p.draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }
  });
}

/* --------------------------------------------------------------------------
   3. STORE CURRENCY SWITCHER (INR / USD)
   -------------------------------------------------------------------------- */
function initCurrencySwitcher() {
  const inrBtn = document.getElementById('currency-inr-btn');
  const usdBtn = document.getElementById('currency-usd-btn');
  const priceEls = document.querySelectorAll('.price-val');
  const priceAltEls = document.querySelectorAll('.price-alt-val');

  if (!inrBtn || !usdBtn) return;

  function setCurrency(currency) {
    if (currency === 'USD') {
      usdBtn.classList.add('active');
      inrBtn.classList.remove('active');
      priceEls.forEach(el => {
        const usdVal = el.getAttribute('data-usd');
        if (usdVal) el.innerText = usdVal;
      });
      priceAltEls.forEach(el => {
        const usdAlt = el.getAttribute('data-usd');
        if (usdAlt) el.innerText = usdAlt;
      });
    } else {
      inrBtn.classList.add('active');
      usdBtn.classList.remove('active');
      priceEls.forEach(el => {
        const inrVal = el.getAttribute('data-inr');
        if (inrVal) el.innerText = inrVal;
      });
      priceAltEls.forEach(el => {
        const inrAlt = el.getAttribute('data-inr');
        if (inrAlt) el.innerText = inrAlt;
      });
    }

    try {
      localStorage.setItem('nex_currency', currency);
    } catch (e) {}
  }

  inrBtn.addEventListener('click', () => setCurrency('INR'));
  usdBtn.addEventListener('click', () => setCurrency('USD'));

  try {
    const saved = localStorage.getItem('nex_currency');
    if (saved === 'USD') setCurrency('USD');
  } catch (e) {}
}

/* --------------------------------------------------------------------------
   4. VIP PERKS COMPARISON MATRIX DRAWER
   -------------------------------------------------------------------------- */
function initPerksComparator() {
  const toggleBtn = document.getElementById('comparator-toggle-btn');
  const tableWrap = document.getElementById('comparator-table-wrap');
  if (!toggleBtn || !tableWrap) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = tableWrap.classList.contains('hidden');
    if (isHidden) {
      tableWrap.classList.remove('hidden');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    } else {
      tableWrap.classList.add('hidden');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   5. MINECRAFT IN-GAME RANK & KIT PREVIEW MODAL
   -------------------------------------------------------------------------- */
const ranksData = {
  'VIP+': {
    name: 'VIP+',
    colorClass: 'mc-green',
    tier: 'TIER 1 - STARTER VIP',
    price: '₹129 / $1.35 per month',
    orderCode: '!buy VIP+',
    perks: [
      { label: 'VIP+ Chat Prefix & In-Game Tag', color: 'mc-green' },
      { label: 'Create up to 5 Homes', color: 'mc-white' },
      { label: '3 Personal Vaults (/pv 1-3)', color: 'mc-white' },
      { label: 'Claim Fly For 10min', color: 'mc-white' },
      { label: 'VIP+ Kit Access', color: 'mc-green' }
    ],
    commands: [],
    commandsStatus: 'COMING SOON'
  },
  'CORE': {
    name: 'CORE',
    colorClass: 'mc-blue',
    tier: 'TIER 2 - ESSENTIAL',
    price: '₹249 / $2.61 per month',
    orderCode: '!buy CORE',
    perks: [
      { label: 'CORE Chat Prefix & In-Game Tag', color: 'mc-blue' },
      { label: 'Create up to 6 Homes', color: 'mc-white' },
      { label: '4 Personal Vaults (/pv 1-4)', color: 'mc-white' },
      { label: 'Claim Fly For 20min', color: 'mc-white' },
      { label: 'CORE Kit Access', color: 'mc-blue' }
    ],
    commands: [],
    commandsStatus: 'COMING SOON'
  },
  'BOSS': {
    name: 'BOSS',
    colorClass: 'mc-red',
    tier: 'TIER 3 - POPULAR',
    price: '₹459 / $4.81 per month',
    orderCode: '!buy BOSS',
    perks: [
      { label: 'BOSS Chat Prefix & In-Game Tag', color: 'mc-red' },
      { label: 'Create up to 7 Homes', color: 'mc-white' },
      { label: '5 Personal Vaults (/pv 1-5)', color: 'mc-white' },
      { label: 'Claim Fly For 20min', color: 'mc-white' },
      { label: 'BOSS Kit Access', color: 'mc-red' }
    ],
    commands: ['AntMan Custom Tool For 10day'],
    commandsStatus: ''
  },
  'GOD': {
    name: 'GOD',
    colorClass: 'mc-aqua',
    tier: 'TIER 4 - SUPREME',
    price: '₹899 / $9.42 per month',
    orderCode: '!buy GOD',
    perks: [
      { label: 'GOD Chat Prefix & In-Game Tag', color: 'mc-aqua' },
      { label: 'Create up to 8 Homes', color: 'mc-white' },
      { label: '8 Personal Vaults (/pv 1-8)', color: 'mc-white' },
      { label: 'Claim Fly For Infinite Duration', color: 'mc-white' },
      { label: 'Claim! ClaimBlocks Every 15days', color: 'mc-white' },
      { label: 'GOD Kit Access', color: 'mc-aqua' }
    ],
    commands: ['/anvil', '/grindstone', '/enderchest', '/recipe', '/smithingtable', '/stonecutter', '/claimblocks'],
    commandsStatus: ''
  },
  'NEX': {
    name: 'NEX',
    colorClass: 'mc-red',
    tier: 'TIER 5 - SERVER ELITE',
    price: '₹1199 / $12.56 per month',
    orderCode: '!buy NEX',
    perks: [
      { label: 'NEX Chat Prefix & In-Game Tag', color: 'mc-red' },
      { label: 'Create up to 10 Homes', color: 'mc-white' },
      { label: '10 Personal Vaults (/pv 1-10)', color: 'mc-white' },
      { label: 'Claim Fly For Infinite Duration', color: 'mc-white' },
      { label: 'Claim! ClaimBlocks Every 15days', color: 'mc-white' },
      { label: 'NEX Kit Access', color: 'mc-red' }
    ],
    commands: ['/anvil', '/grindstone', '/enderchest', '/recipe', '/smithingtable', '/stonecutter', '/claimblocks'],
    commandsStatus: ''
  },
  'CUSTOM': {
    name: 'CUSTOM',
    colorClass: 'mc-aqua',
    tier: 'SPECIAL TIER - EXCLUSIVE VIP',
    price: '₹1899 / $19.79 per month',
    orderCode: '!buy CUSTOM',
    perks: [
      { label: 'CUSTOM Chat Prefix & In-Game Tag', color: 'mc-aqua' },
      { label: 'Create up to 10 Homes', color: 'mc-white' },
      { label: '20 Personal Vaults (/pv 1-20)', color: 'mc-white' },
      { label: 'Claim Fly For Infinite Duration', color: 'mc-white' },
      { label: 'Claim! ClaimBlocks Every 15days', color: 'mc-white' },
      { label: 'Custom In-Game Name', color: 'mc-yellow' },
      { label: 'Custom Chat Color', color: 'mc-yellow' },
      { label: 'Custom Kit Access', color: 'mc-yellow' }
    ],
    commands: ['Custom Commands / Non-OP', '2x OP Tools Included'],
    commandsStatus: ''
  }
};

function initRankKitModal() {
  const modal = document.getElementById('rank-kit-modal');
  const closeBtn = document.getElementById('rank-modal-close-btn');
  const previewBtns = document.querySelectorAll('.kit-preview-btn');
  const tierEl = document.getElementById('mc-modal-tier');
  const titleEl = document.getElementById('mc-modal-title');
  const priceEl = document.getElementById('mc-modal-price');
  const perksEl = document.getElementById('mc-modal-perks');
  const commandsWrap = document.getElementById('mc-modal-commands-wrap');
  const commandsEl = document.getElementById('mc-modal-commands');
  const copyBtn = document.getElementById('copy-rank-order-btn');
  const copyText = document.getElementById('copy-order-btn-text');

  if (!modal || !previewBtns.length) return;

  let currentRankData = null;

  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const rankKey = btn.getAttribute('data-rank') || 'VIP+';
      const data = ranksData[rankKey] || ranksData['VIP+'];
      currentRankData = data;

      if (tierEl) tierEl.innerText = data.tier;
      if (titleEl) {
        titleEl.innerText = data.name;
        titleEl.className = `mc-rank-name ${data.colorClass}`;
      }
      if (priceEl) priceEl.innerText = data.price;

      if (perksEl) {
        perksEl.innerHTML = data.perks.map(p => {
          return `<div class="mc-perk-item"><span class="mc-bullet ${p.color}">•</span> <span class="${p.color}">${p.label}</span></div>`;
        }).join('');
      }

      if (commandsWrap && commandsEl) {
        if (data.commandsStatus) {
          commandsEl.innerHTML = `<span class="mc-red">${data.commandsStatus}</span>`;
        } else if (data.commands && data.commands.length) {
          commandsEl.innerHTML = data.commands.map(cmd => `<span class="mc-cmd-tag">${cmd}</span>`).join(' ');
        } else {
          commandsEl.innerHTML = `<span class="mc-gray">-</span>`;
        }
      }

      if (copyText) copyText.innerText = `Copy ${data.name} Order Code`;
      modal.classList.remove('hidden');
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!currentRankData) return;
      const code = `${currentRankData.orderCode} (Rank: ${currentRankData.name} - ${currentRankData.price})`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          if (copyText) copyText.innerText = 'Copied to Clipboard!';
          showToast({
            title: 'Copied Order Code',
            message: `${currentRankData.orderCode} copied - paste in #tickets on Discord.`
          });
          setTimeout(() => {
            if (copyText && currentRankData) {
              copyText.innerText = `Copy ${currentRankData.name} Order Code`;
            }
          }, 2500);
        });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. COPY TO CLIPBOARD & TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
function initClipboardHandlers() {
  const copyButtons = document.querySelectorAll('.copy-ip-btn, .copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const ip = btn.getAttribute('data-ip') || 'nexcoremc.in';
      copyToClipboard(ip, btn);
    });
  });
}

async function copyToClipboard(text, triggerElement) {
  let successful = false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      successful = true;
    } catch (err) {
      successful = fallbackCopy(text);
    }
  } else {
    successful = fallbackCopy(text);
  }

  if (successful) {
    showToast({
      title: 'Copied to Clipboard',
      message: `${text} - Ready to paste into Minecraft.`
    });

    if (triggerElement) {
      const btnText = triggerElement.querySelector('.btn-text');

      triggerElement.classList.add('copied-state');
      if (btnText) {
        const oldText = btnText.innerText;
        btnText.innerText = 'COPIED!';
        setTimeout(() => {
          btnText.innerText = oldText;
          triggerElement.classList.remove('copied-state');
        }, 2200);
      } else {
        triggerElement.style.color = '#10b981';
        setTimeout(() => {
          triggerElement.style.color = '';
        }, 2200);
      }
    }
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
  return success;
}

function showToast({ title, message }) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');

  toast.innerHTML = `
    <div class="toast-icon">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3200);
}

/* --------------------------------------------------------------------------
   7. STANDARD SCROLL REVEAL (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. NAVBAR SCROLL BACKGROUND
   -------------------------------------------------------------------------- */
function initNavbarScrollSpy() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-links .nav-link:not(.store-link):not(.discord-nav-link)');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   9. MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('hamburger-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   10. HOW TO JOIN EDITION TABS (JAVA / BEDROCK)
   -------------------------------------------------------------------------- */
function initEditionTabs() {
  const tabJava = document.getElementById('tab-java');
  const tabBedrock = document.getElementById('tab-bedrock');
  const panelJava = document.getElementById('panel-java');
  const panelBedrock = document.getElementById('panel-bedrock');

  if (!tabJava || !tabBedrock || !panelJava || !panelBedrock) return;

  tabJava.addEventListener('click', () => {
    tabJava.classList.add('active');
    tabJava.setAttribute('aria-selected', 'true');
    tabBedrock.classList.remove('active');
    tabBedrock.setAttribute('aria-selected', 'false');

    panelJava.classList.remove('hidden');
    panelBedrock.classList.add('hidden');
  });

  tabBedrock.addEventListener('click', () => {
    tabBedrock.classList.add('active');
    tabBedrock.setAttribute('aria-selected', 'true');
    tabJava.classList.remove('active');
    tabJava.setAttribute('aria-selected', 'false');

    panelBedrock.classList.remove('hidden');
    panelJava.classList.add('hidden');
  });
}

/* --------------------------------------------------------------------------
   11. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const btn = otherItem.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   12. REAL-TIME MINECRAFT SERVER STATUS (REAL DATA ONLY - 60s INTERVAL)
   -------------------------------------------------------------------------- */
async function queryMinecraftServerLive() {
  const primaryUrl = 'https://api.mcsrvstat.us/2/nexcoremc.in';
  const fallbackUrl = 'https://api.mcstatus.io/v2/status/java/nexcoremc.in';

  let statusResult = null;

  // 1. Primary Endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(primaryUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.online === 'boolean') {
        const isOnline = data.online;
        const playerCount = isOnline && data.players && typeof data.players.online === 'number' ? data.players.online : 0;
        const maxPlayers = isOnline && data.players && typeof data.players.max === 'number' ? data.players.max : 1000;
        statusResult = { online: isOnline, players: playerCount, max: maxPlayers };
      }
    }
  } catch (err) {
    // Failover
  }

  // 2. Fallback Endpoint
  if (!statusResult) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(fallbackUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.online === 'boolean') {
          const isOnline = data.online;
          const playerCount = isOnline && data.players && typeof data.players.online === 'number' ? data.players.online : 0;
          const maxPlayers = isOnline && data.players && typeof data.players.max === 'number' ? data.players.max : 1000;
          statusResult = { online: isOnline, players: playerCount, max: maxPlayers };
        }
      }
    } catch (err) {
      console.warn('Live Server Status query failed:', err.message || err);
    }
  }

  // 3. Render real status or honest fallback
  if (statusResult && statusResult.online) {
    updateLivePlayerUI(statusResult.players, true, statusResult.max);
  } else {
    updateLivePlayerUI(0, false);
  }
}

function updateLivePlayerUI(count, online, max = 1000) {
  // 1. Navbar Status Pill
  const navStatusWrap = document.getElementById('navbar-status');
  const navDot = document.getElementById('nav-status-dot') || document.querySelector('#navbar-status .status-dot');
  const navText = document.getElementById('nav-status-text') || document.querySelector('#navbar-status .status-text');
  const navCount = document.getElementById('nav-player-count');

  if (navStatusWrap) {
    if (online) {
      if (navDot) navDot.className = 'status-dot pulsing';
      if (navText) navText.innerText = 'ONLINE';
      if (navCount) {
        navCount.innerText = count.toLocaleString();
        navCount.style.display = '';
      }
      navStatusWrap.title = `${count}/${max} Players Online`;
    } else {
      if (navDot) navDot.className = 'status-dot standby';
      if (navText) navText.innerText = 'ONLINE';
      if (navCount) {
        navCount.innerText = '';
        navCount.style.display = 'none';
      }
      navStatusWrap.title = 'Server is Live - Connect: nexcoremc.in';
    }
  }

  // 2. Hero Section Status Badge
  const heroPlayerDot = document.getElementById('hero-player-dot') || document.querySelector('.live-player-badge .player-dot');
  const heroStatusText = document.getElementById('hero-player-status-text') || document.querySelector('.live-player-badge span:last-child');

  if (heroStatusText) {
    if (online) {
      if (heroPlayerDot) heroPlayerDot.className = 'player-dot';
      heroStatusText.innerHTML = `<strong id="hero-player-count">${count.toLocaleString()}</strong> Players Online Now`;
    } else {
      if (heroPlayerDot) heroPlayerDot.className = 'player-dot standby';
      heroStatusText.innerHTML = `<span>Server is Live - Join Now!</span>`;
    }
  }

  // 3. Mobile Drawer Status Pill
  const drawerDot = document.getElementById('drawer-status-dot') || document.querySelector('.drawer-status .status-dot');
  const drawerText = document.getElementById('drawer-status-text') || document.querySelector('.drawer-status .status-text');
  const drawerCount = document.getElementById('drawer-player-count');

  if (drawerText) {
    if (online) {
      if (drawerDot) drawerDot.className = 'status-dot pulsing';
      drawerText.innerText = 'SERVER ONLINE';
      if (drawerCount) {
        drawerCount.innerText = `${count.toLocaleString()} PLAYING`;
        drawerCount.style.display = '';
      }
    } else {
      if (drawerDot) drawerDot.className = 'status-dot standby';
      drawerText.innerText = 'SERVER IS LIVE';
      if (drawerCount) {
        drawerCount.innerText = '';
        drawerCount.style.display = 'none';
      }
    }
  }
}

function initLiveStats() {
  queryMinecraftServerLive();
  setInterval(queryMinecraftServerLive, 60000);
}

/* --------------------------------------------------------------------------
   13. SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
