/* =========================================================
   QUE LA SUERTE DECIDA — CHISPA
   Lógica completa: categorías, ruleta, historial, favoritos.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. DATOS: CATEGORÍAS PREDEFINIDAS
     Estructura fácil de modificar/ampliar.
  --------------------------------------------------------- */
  const CATEGORIES = [
    {
      id: 'comida',
      emoji: '🍕',
      name: '¿Qué comemos?',
      options: ['Pizza', 'Empanadas', 'Hamburguesas', 'Pasta', 'Tacos', 'Milanesas']
    },
    {
      id: 'peli',
      emoji: '🎬',
      name: '¿Qué vemos?',
      options: ['Película de acción', 'Comedia', 'Documental', 'Serie nueva', 'Terror', 'Dibujo animado']
    },
    {
      id: 'plan',
      emoji: '🎉',
      name: '¿Qué hacemos hoy?',
      options: ['Quedarse en casa', 'Salir a caminar', 'Juntada con amigos', 'Ver una peli', 'Cocinar algo nuevo', 'Ir al parque']
    },
    {
      id: 'pareja',
      emoji: '❤️',
      name: 'Plan para dos',
      options: ['Cena romántica', 'Maratón de series', 'Paseo al aire libre', 'Noche de juegos', 'Picnic', 'Café y charla']
    },
    {
      id: 'regalo',
      emoji: '🎁',
      name: '¿Qué regalo elegimos?',
      options: ['Libro', 'Plantita', 'Taza personalizada', 'Experiencia', 'Ropa', 'Algo hecho a mano']
    },
    {
      id: 'tareas',
      emoji: '🧹',
      name: '¿Quién hace qué?',
      options: ['Lavar los platos', 'Sacar la basura', 'Ordenar el living', 'Hacer las compras', 'Limpiar el baño', 'Barrer']
    },
    {
      id: 'lugar',
      emoji: '📍',
      name: '¿A dónde vamos?',
      options: ['Al parque', 'Al cine', 'A la plaza', 'A un bar', 'A la costa', 'De compras']
    },
    {
      id: 'sorpresa',
      emoji: '✨',
      name: 'Decidí por mí',
      options: ['Sí', 'No', 'Todavía no', 'Preguntá de nuevo', 'Hacelo ahora', 'Esperá un poco']
    }
  ];

  // Paleta de segmentos (alternada, alto contraste, identidad CHISPA)
  const WHEEL_COLORS = ['#FF6B5B', '#FFC93C', '#2EC4B6', '#4A2E7A', '#FF9F7A', '#2D1B4E'];
  const WHEEL_TEXT_COLORS = ['#FFFFFF', '#2D1B4E', '#FFFFFF', '#FFFFFF', '#2D1B4E', '#FFFFFF'];

  const STORAGE_HISTORY = 'chispa_suerte_historial';
  const STORAGE_FAVORITES = 'chispa_suerte_favoritas';

  /* ---------------------------------------------------------
     2. ESTADO GLOBAL
  --------------------------------------------------------- */
  const state = {
    currentOptions: [],      // opciones activas en la ruleta actual
    currentLabel: '',        // etiqueta / nombre de la ruleta actual
    remainingPool: [],       // índices restantes cuando "no repetir" está activo
    totalRotation: 0,        // rotación acumulada del disco
    isSpinning: false,
    lastSource: 'categoria'  // 'categoria' | 'personalizada'
  };

  /* ---------------------------------------------------------
     3. REFERENCIAS DOM
  --------------------------------------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const navToggle = $('#navToggle');
  const siteNav = $('#siteNav');

  const categoryGrid = $('#categoryGrid');

  const optionForm = $('#optionForm');
  const optionInput = $('#optionInput');
  const optionList = $('#optionList');
  const optionCount = $('#optionCount');
  const clearOptionsBtn = $('#clearOptionsBtn');
  const buildWheelBtn = $('#buildWheelBtn');
  const favoriteNameInput = $('#favoriteName');
  const saveFavoriteBtn = $('#saveFavoriteBtn');

  const wheelCurrentLabel = $('#wheelCurrentLabel');
  const wheelSvg = $('#wheelSvg');
  const wheelDisc = $('#wheelDisc');
  const spinBtn = $('#spinBtn');
  const wheelStatus = $('#wheelStatus');

  const noRepeatToggle = $('#noRepeatToggle');
  const removeWinnerToggle = $('#removeWinnerToggle');
  const soundToggle = $('#soundToggle');

  const historyList = $('#historyList');
  const clearHistoryBtn = $('#clearHistoryBtn');
  const favoritesList = $('#favoritesList');

  const resultModal = $('#resultModal');
  const resultEmoji = $('#resultEmoji');
  const resultText = $('#resultText');
  const modalCloseBtn = $('#modalCloseBtn');
  const spinAgainBtn = $('#spinAgainBtn');
  const changeOptionsBtn = $('#changeOptionsBtn');
  const newWheelBtn = $('#newWheelBtn');
  const shareBtn = $('#shareBtn');

  let lastFocusedElement = null;
  let builderOptions = []; // opciones que el usuario está armando en el builder

  /* ---------------------------------------------------------
     4. UTILIDADES
  --------------------------------------------------------- */
  function saveLS(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* almacenamiento no disponible */ }
  }
  function loadLS(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  function firstEmoji(text) {
    const match = text.match(/^\p{Extended_Pictographic}/u);
    return match ? match[0] : '🎯';
  }

  function showToast(message) {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  /* ---------------------------------------------------------
     5. NAVEGACIÓN MÓVIL
  --------------------------------------------------------- */
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('.site-nav a').forEach((a) => a.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------------------------------------------------------
     6. RENDER DE CATEGORÍAS
  --------------------------------------------------------- */
  function renderCategories() {
    categoryGrid.innerHTML = '';
    CATEGORIES.forEach((cat, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'category-card';
      btn.style.animationDelay = (i * 0.05) + 's';
      btn.setAttribute('data-cat-id', cat.id);
      btn.innerHTML = `
        <span class="category-emoji" aria-hidden="true">${cat.emoji}</span>
        <span class="category-name">${cat.name}</span>
        <span class="category-preview">${cat.options.slice(0, 4).join(' · ')}${cat.options.length > 4 ? '…' : ''}</span>
      `;
      btn.addEventListener('click', () => selectCategory(cat, btn));
      categoryGrid.appendChild(btn);
    });
  }

  function selectCategory(cat, btnEl) {
    $$('.category-card').forEach((c) => c.classList.remove('is-active'));
    if (btnEl) btnEl.classList.add('is-active');
    loadWheel(cat.options.slice(), cat.name, 'categoria');
    scrollToWheel();
  }

  function scrollToWheel() {
    $('#ruleta').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------------------------------------------------------
     7. BUILDER: CREAR MI PROPIA RULETA
  --------------------------------------------------------- */
  function renderBuilderList() {
    optionList.innerHTML = '';
    builderOptions.forEach((text, index) => {
      const li = document.createElement('li');

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'option-text';
      input.value = text;
      input.maxLength = 40;
      input.setAttribute('aria-label', `Opción ${index + 1}`);
      input.addEventListener('change', () => {
        const v = input.value.trim();
        builderOptions[index] = v || text;
        renderBuilderList();
      });

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'option-remove';
      removeBtn.setAttribute('aria-label', `Eliminar ${text}`);
      removeBtn.innerHTML = '&times;';
      removeBtn.addEventListener('click', () => {
        builderOptions.splice(index, 1);
        renderBuilderList();
      });

      li.appendChild(input);
      li.appendChild(removeBtn);
      optionList.appendChild(li);
    });

    optionCount.textContent = `${builderOptions.length} opción${builderOptions.length === 1 ? '' : 'es'} (mínimo 2, máximo 20)`;
    buildWheelBtn.disabled = builderOptions.length < 2;
  }

  optionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = optionInput.value.trim();
    if (!value) return;
    if (builderOptions.length >= 20) {
      showToast('Máximo 20 opciones.');
      return;
    }
    builderOptions.push(value);
    optionInput.value = '';
    optionInput.focus();
    renderBuilderList();
  });

  clearOptionsBtn.addEventListener('click', () => {
    builderOptions = [];
    renderBuilderList();
  });

  buildWheelBtn.addEventListener('click', () => {
    if (builderOptions.length < 2) return;
    const label = favoriteNameInput.value.trim() || 'Mi ruleta';
    loadWheel(builderOptions.slice(), label, 'personalizada');
    scrollToWheel();
  });

  saveFavoriteBtn.addEventListener('click', () => {
    if (builderOptions.length < 2) {
      showToast('Agregá al menos 2 opciones antes de guardar.');
      return;
    }
    const name = favoriteNameInput.value.trim() || `Ruleta (${builderOptions.length} opciones)`;
    const favorites = loadLS(STORAGE_FAVORITES, []);
    favorites.unshift({ id: Date.now(), name, options: builderOptions.slice() });
    saveLS(STORAGE_FAVORITES, favorites);
    renderFavorites();
    showToast('Ruleta guardada en favoritas ⭐');
  });

  /* ---------------------------------------------------------
     8. CONSTRUCCIÓN DE LA RULETA (SVG)
  --------------------------------------------------------- */
  function loadWheel(options, label, source) {
    state.currentOptions = options;
    state.currentLabel = label;
    state.lastSource = source;
    resetPool();
    wheelCurrentLabel.textContent = label;
    drawWheel(options);
    wheelStatus.textContent = '';
  }

  function resetPool() {
    state.remainingPool = state.currentOptions.map((_, i) => i);
  }

  function polarPoint(cx, cy, r, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
  }

  function drawWheel(options) {
    const n = options.length;
    const size = 400;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 4;
    const segAngle = 360 / n;

    let svgContent = '';

    options.forEach((text, i) => {
      const startAngle = i * segAngle;
      const endAngle = startAngle + segAngle;
      const [x1, y1] = polarPoint(cx, cy, r, startAngle);
      const [x2, y2] = polarPoint(cx, cy, r, endAngle);
      const largeArc = segAngle > 180 ? 1 : 0;
      const fill = WHEEL_COLORS[i % WHEEL_COLORS.length];

      svgContent += `<path d="M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="${fill}" stroke="#FFFFFF" stroke-width="2"></path>`;

      // Texto del segmento, radial, legible
      const centerAngle = startAngle + segAngle / 2;
      const textColor = WHEEL_TEXT_COLORS[i % WHEEL_TEXT_COLORS.length];
      const labelRadius = r * 0.62;
      const rotateForText = centerAngle - 90;
      const displayText = text.length > 16 ? text.slice(0, 15) + '…' : text;
      const fontSize = n > 12 ? 12 : n > 8 ? 14 : 17;

      svgContent += `<text x="${(cx + labelRadius).toFixed(2)}" y="${cy.toFixed(2)}" transform="rotate(${rotateForText.toFixed(2)} ${cx} ${cy})" text-anchor="middle" dominant-baseline="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="${fontSize}" fill="${textColor}">${escapeXml(displayText)}</text>`;
    });

    wheelSvg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    wheelSvg.innerHTML = svgContent;
  }

  function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------------------------------------------------------
     9. GIRO Y CÁLCULO DEL GANADOR
  --------------------------------------------------------- */
  function pickTargetIndex() {
    const useNoRepeat = noRepeatToggle.checked;
    if (useNoRepeat) {
      if (state.remainingPool.length === 0) {
        resetPool();
        wheelStatus.textContent = 'Ya pasaron todas las opciones. Empezamos otra vez.';
      }
      const poolIdx = Math.floor(Math.random() * state.remainingPool.length);
      const chosen = state.remainingPool[poolIdx];
      state.remainingPool.splice(poolIdx, 1);
      return chosen;
    }
    return Math.floor(Math.random() * state.currentOptions.length);
  }

  function spinWheel() {
    if (state.isSpinning) return;
    if (state.currentOptions.length < 2) {
      showToast('Elegí una categoría o cargá al menos 2 opciones.');
      return;
    }
    state.isSpinning = true;
    spinBtn.disabled = true;
    wheelStatus.textContent = 'Girando...';

    const n = state.currentOptions.length;
    const segAngle = 360 / n;
    const targetIndex = pickTargetIndex();

    const centerAngle = targetIndex * segAngle + segAngle / 2;
    // pequeño desplazamiento aleatorio dentro del mismo segmento, sin tocar los bordes
    const maxJitter = Math.min(segAngle * 0.35, 14);
    const jitter = (Math.random() * 2 - 1) * maxJitter;
    const targetUnderPointer = (centerAngle + jitter + 360) % 360;

    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5 a 7 vueltas completas
    const neededRotation = (360 - targetUnderPointer) % 360;

    // Rotación total acumulada (siempre hacia adelante, nunca resetea a 0)
    const currentMod = ((state.totalRotation % 360) + 360) % 360;
    let delta = (neededRotation - currentMod + 360) % 360;
    const finalRotation = state.totalRotation + delta + extraSpins * 360;

    state.totalRotation = finalRotation;
    wheelDisc.style.transform = `rotate(${finalRotation}deg)`;

    playSpinSound();

    setTimeout(() => {
      state.isSpinning = false;
      spinBtn.disabled = false;
      const winnerText = state.currentOptions[targetIndex];
      onSpinComplete(winnerText, targetIndex);
    }, 5200);
  }

  function onSpinComplete(winnerText, winnerIndex) {
    playResultSound();
    wheelStatus.textContent = `Resultado: ${winnerText}`;
    showResultModal(winnerText);
    addToHistory(winnerText);

    if (removeWinnerToggle.checked && state.currentOptions.length > 2) {
      state.currentOptions.splice(winnerIndex, 1);
      resetPool();
      drawWheel(state.currentOptions);
    }
  }

  spinBtn.addEventListener('click', spinWheel);
  $('#heroDecidir').addEventListener('click', () => { /* el enlace ya hace scroll; nada más */ });

  /* ---------------------------------------------------------
     10. MODAL DE RESULTADO
  --------------------------------------------------------- */
  function showResultModal(text) {
    // Si la opción ya arranca con un emoji lo usamos; si no, mostramos uno genérico.
    resultEmoji.textContent = firstEmoji(text);
    resultText.textContent = text.replace(/^\p{Extended_Pictographic}\s*/u, '') || text;
    lastFocusedElement = document.activeElement;
    resultModal.hidden = false;
    modalCloseBtn.focus();
    document.addEventListener('keydown', onModalKeydown);
  }

  function closeModal() {
    resultModal.hidden = true;
    document.removeEventListener('keydown', onModalKeydown);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function onModalKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  modalCloseBtn.addEventListener('click', closeModal);
  resultModal.addEventListener('click', (e) => { if (e.target === resultModal) closeModal(); });

  spinAgainBtn.addEventListener('click', () => {
    closeModal();
    spinWheel();
  });

  changeOptionsBtn.addEventListener('click', () => {
    closeModal();
    if (state.lastSource === 'personalizada') {
      $('#crear-ruleta').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      $('#categorias').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  newWheelBtn.addEventListener('click', () => {
    closeModal();
    $$('.category-card').forEach((c) => c.classList.remove('is-active'));
    $('#categorias').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  shareBtn.addEventListener('click', async () => {
    const text = `✨ Que la Suerte Decida: ${resultText.textContent}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Que la Suerte Decida', text });
      } catch (e) { /* usuario canceló */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        showToast('Resultado copiado al portapapeles');
      } catch (e) {
        showToast('No se pudo copiar el resultado');
      }
    }
  });

  /* ---------------------------------------------------------
     11. HISTORIAL
  --------------------------------------------------------- */
  function addToHistory(text) {
    const history = loadLS(STORAGE_HISTORY, []);
    history.unshift({
      text,
      category: state.currentLabel,
      time: new Date().toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    });
    saveLS(STORAGE_HISTORY, history.slice(0, 30));
    renderHistory();
  }

  function renderHistory() {
    const history = loadLS(STORAGE_HISTORY, []);
    historyList.innerHTML = '';
    if (history.length === 0) {
      historyList.innerHTML = '<li class="empty-state">Todavía no tomaste ninguna decisión.</li>';
      return;
    }
    history.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="history-item-main">${firstEmoji(item.text)} ${escapeXml(item.text.replace(/^\p{Extended_Pictographic}\s*/u, ''))}</span>
        <span class="history-item-time">${escapeXml(item.category)} · ${escapeXml(item.time)}</span>
      `;
      historyList.appendChild(li);
    });
  }

  clearHistoryBtn.addEventListener('click', () => {
    saveLS(STORAGE_HISTORY, []);
    renderHistory();
    showToast('Historial borrado');
  });

  /* ---------------------------------------------------------
     12. FAVORITOS
  --------------------------------------------------------- */
  function renderFavorites() {
    const favorites = loadLS(STORAGE_FAVORITES, []);
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
      favoritesList.innerHTML = '<li class="empty-state">Todavía no guardaste ninguna ruleta favorita.</li>';
      return;
    }
    favorites.forEach((fav) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>
          <span class="favorite-name">⭐ ${escapeXml(fav.name)}</span><br>
          <span class="favorite-meta">${fav.options.length} opciones</span>
        </span>
        <span class="favorite-actions"></span>
      `;
      const actions = li.querySelector('.favorite-actions');

      const useBtn = document.createElement('button');
      useBtn.type = 'button';
      useBtn.className = 'btn btn-secondary btn-small';
      useBtn.textContent = 'Usar';
      useBtn.addEventListener('click', () => {
        loadWheel(fav.options.slice(), fav.name, 'personalizada');
        scrollToWheel();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn btn-ghost btn-small';
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', () => {
        const updated = loadLS(STORAGE_FAVORITES, []).filter((f) => f.id !== fav.id);
        saveLS(STORAGE_FAVORITES, updated);
        renderFavorites();
      });

      actions.appendChild(useBtn);
      actions.appendChild(deleteBtn);
      favoritesList.appendChild(li);
    });
  }

  /* ---------------------------------------------------------
     13. SONIDO (Web Audio API, sin archivos externos)
  --------------------------------------------------------- */
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    return audioCtx;
  }

  function playSpinSound() {
    if (!soundToggle.checked) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const ticks = 18;
    for (let i = 0; i < ticks; i++) {
      const t = ctx.currentTime + i * (5 / ticks) * (1 - i / (ticks * 1.6));
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 500;
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    }
  }

  function playResultSound() {
    if (!soundToggle.checked) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99]; // do - mi - sol
    notes.forEach((freq, i) => {
      const t = ctx.currentTime + i * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.42);
    });
  }

  /* ---------------------------------------------------------
     14. INICIALIZACIÓN
  --------------------------------------------------------- */
  function init() {
    renderCategories();
    renderBuilderList();
    renderHistory();
    renderFavorites();

    // Ruleta inicial: primera categoría como muestra
    loadWheel(CATEGORIES[0].options.slice(), CATEGORIES[0].name, 'categoria');
    const firstCard = categoryGrid.querySelector('.category-card');
    if (firstCard) firstCard.classList.add('is-active');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
