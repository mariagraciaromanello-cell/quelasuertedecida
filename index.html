--- src/App.tsx (原始)
export default function App() {
  return (
    <div/>
  );
}


+++ src/App.tsx (修改后)
import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

// ============================================================
// DATOS: Colores para los segmentos de la ruleta
// ============================================================
const WHEEL_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7',
  '#FF8A5C', '#A8E6CF', '#FF85A1', '#45B7D1',
  '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E9', '#F0B27A',
  '#82E0AA', '#F1948A', '#85929E', '#73C6B6'
];

// ============================================================
// DATOS: Ruletas predeterminadas
// ============================================================
interface PresetWheel {
  id: string;
  emoji: string;
  title: string;
  options: string[];
}

const PRESET_WHEELS: PresetWheel[] = [
  {
    id: 'comida',
    emoji: '🍕',
    title: '¿Qué comemos?',
    options: ['Pizza', 'Pasta', 'Empanadas', 'Hamburguesas', 'Milanesas', 'Tacos', 'Asado', 'Ensalada']
  },
  {
    id: 'pelicula',
    emoji: '🎬',
    title: '¿Qué vemos?',
    options: ['Una película', 'Una serie', 'Una comedia', 'Un documental', 'Algo que ya conocemos', 'Algo nuevo']
  },
  {
    id: 'hoy',
    emoji: '☀️',
    title: '¿Qué hacemos hoy?',
    options: ['Salir a caminar', 'Cocinar algo rico', 'Ver una película', 'Leer', 'Ordenar algo', 'Salir a tomar un café', 'Hacer nada', 'Una sorpresa']
  },
  {
    id: 'pareja',
    emoji: '❤️',
    title: 'Plan para dos',
    options: ['Cena en casa', 'Salir a comer', 'Película', 'Caminata', 'Café', 'Juego de mesa', 'Paseo', 'Sorpresa']
  },
  {
    id: 'decidi',
    emoji: '🎲',
    title: 'Decidí por mí',
    options: ['Sí', 'No', 'Ahora', 'Después', 'Probemos', 'Cambiemos de plan']
  },
  {
    id: 'tareas',
    emoji: '🧹',
    title: '¿Quién hace qué?',
    options: ['Persona 1', 'Persona 2', 'Persona 3', 'Persona 4']
  },
  {
    id: 'viaje',
    emoji: '✈️',
    title: '¿A dónde vamos?',
    options: ['Plaza', 'Café', 'Cine', 'Restaurante', 'Parque', 'Museo', 'Paseo', 'Nos quedamos en casa']
  },
  {
    id: 'regalo',
    emoji: '🎁',
    title: '¿Qué regalo elegimos?',
    options: ['Algo útil', 'Algo divertido', 'Algo personalizado', 'Algo para disfrutar', 'Una experiencia', 'Algo dulce', 'Un libro', 'Una sorpresa']
  }
];

// ============================================================
// TIPOS
// ============================================================
interface WheelData {
  id: string;
  name: string;
  options: string[];
  favorite: boolean;
  createdAt: number;
}

interface HistoryEntry {
  wheelName: string;
  result: string;
  emoji: string;
  timestamp: number;
}

type Screen = 'home' | 'presets' | 'create' | 'wheel' | 'myWheels' | 'history';

// ============================================================
// UTILIDADES: localStorage
// ============================================================
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

// ============================================================
// UTILIDADES: Compartir y copiar
// ============================================================
async function shareResult(result: string, wheelName: string): Promise<boolean> {
  const text = `La suerte decidió:\n\n${result}\n\n¡Probá vos también en ¡QUE LA SUERTE DECIDA!`;

  if (navigator.share) {
    try {
      await navigator.share({ title: '¡QUE LA SUERTE DECIDA!', text });
      return true;
    } catch {
      // User cancelled or share failed
    }
  }
  return false;
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
    }
  }
  // Fallback: textarea
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    return true;
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

// ============================================================
// COMPONENTE: Logo SVG
// ============================================================
function Logo({ size = 120 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-label="Logo de ¡Que la suerte decida!"
      role="img"
    >
      {/* Ruleta exterior */}
      <circle cx="100" cy="100" r="90" fill="#2D3436" stroke="#FFD93D" strokeWidth="4" />
      {/* Segmentos */}
      <path d="M100 100 L100 10 A90 90 0 0 1 178 55 Z" fill="#FF6B6B" />
      <path d="M100 100 L178 55 A90 90 0 0 1 190 100 Z" fill="#4ECDC4" />
      <path d="M100 100 L190 100 A90 90 0 0 1 178 145 Z" fill="#FFD93D" />
      <path d="M100 100 L178 145 A90 90 0 0 1 100 190 Z" fill="#6C5CE7" />
      <path d="M100 100 L100 190 A90 90 0 0 1 22 145 Z" fill="#FF8A5C" />
      <path d="M100 100 L22 145 A90 90 0 0 1 10 100 Z" fill="#A8E6CF" />
      <path d="M100 100 L10 100 A90 90 0 0 1 22 55 Z" fill="#FF85A1" />
      <path d="M100 100 L22 55 A90 90 0 0 1 100 10 Z" fill="#45B7D1" />
      {/* Centro */}
      <circle cx="100" cy="100" r="22" fill="white" stroke="#2D3436" strokeWidth="3" />
      <circle cx="100" cy="100" r="8" fill="#FF6B6B" />
      {/* Puntero */}
      <polygon points="100,5 93,22 107,22" fill="#2D3436" stroke="#FFD93D" strokeWidth="2" />
    </svg>
  );
}

// ============================================================
// COMPONENTE: Ruleta con Canvas
// ============================================================
function WheelCanvas({
  options,
  rotation,
  onCanvasReady
}: {
  options: string[];
  rotation: number;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(320);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const size = Math.min(containerWidth - 20, 420);
        setCanvasSize(Math.max(size, 260));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (onCanvasReady) onCanvasReady(canvas);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    ctx.scale(dpr, dpr);

    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const radius = canvasSize / 2 - 8;
    const segmentAngle = (2 * Math.PI) / options.length;

    // Limpiar
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Dibujar segmentos (offset -PI/2 para que el segmento 0 empiece arriba)
    const drawOffset = -Math.PI / 2;
    options.forEach((option, i) => {
      const startAngle = i * segmentAngle + rotation + drawOffset;
      const endAngle = startAngle + segmentAngle;

      // Segmento
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
      ctx.fill();

      // Borde del segmento
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texto (rotado al centro del segmento)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#1a1a2e';
      ctx.font = `bold ${Math.max(11, Math.min(16, canvasSize / (options.length * 1.5)))}px Nunito, sans-serif`;

      // Truncar texto si es muy largo
      const maxTextWidth = radius * 0.65;
      let text = option;
      while (ctx.measureText(text).width > maxTextWidth && text.length > 3) {
        text = text.slice(0, -1);
      }
      if (text !== option) text += '…';

      ctx.fillText(text, radius - 15, 5);
      ctx.restore();
    });

    // Borde exterior
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#2D3436';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Centro
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#2D3436';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();

  }, [options, rotation, canvasSize, onCanvasReady]);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div className="relative">
        {/* Puntero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
          <svg width="32" height="36" viewBox="0 0 32 36">
            <polygon points="16,36 4,4 28,4" fill="#2D3436" stroke="#FFD93D" strokeWidth="2" />
          </svg>
        </div>
        <canvas
          ref={canvasRef}
          style={{ width: canvasSize, height: canvasSize }}
          aria-label="Ruleta de decisiones"
        />
      </div>
    </div>
  );
}

// ============================================================
// COMPONENTE: Confeti de celebración
// ============================================================
function fireConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#FF8A5C']
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#FF8A5C']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

// ============================================================
// COMPONENTE PRINCIPAL: App
// ============================================================
export default function App() {
  // Estado de navegación
  const [screen, setScreen] = useState<Screen>('home');

  // Estado de la ruleta actual
  const [currentWheel, setCurrentWheel] = useState<WheelData | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [wheelName, setWheelName] = useState('');
  const [newOption, setNewOption] = useState('');

  // Estado de la ruleta visual
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Opciones de la ruleta
  const [noRepeat, setNoRepeat] = useState(false);
  const [eliminateWinner, setEliminateWinner] = useState(false);
  const [appearedOptions, setAppearedOptions] = useState<string[]>([]);

  // Ruletas guardadas
  const [savedWheels, setSavedWheels] = useState<WheelData[]>(() =>
    loadFromStorage<WheelData[]>('queLaSuerteDecida_wheels', [])
  );

  // Historial
  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    loadFromStorage<HistoryEntry[]>('queLaSuerteDecida_history', [])
  );

  // UI
  const [copied, setCopied] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Persistencia
  useEffect(() => {
    saveToStorage('queLaSuerteDecida_wheels', savedWheels);
  }, [savedWheels]);

  useEffect(() => {
    saveToStorage('queLaSuerteDecida_history', history);
  }, [history]);

  // ============================================================
  // NAVEGACIÓN
  // ============================================================
  const goHome = () => {
    setScreen('home');
    setShowResult(false);
    setResult(null);
    setIsSpinning(false);
  };

  const goToCreate = () => {
    setOptions([]);
    setWheelName('');
    setNoRepeat(false);
    setEliminateWinner(false);
    setAppearedOptions([]);
    setScreen('create');
  };

  const goToPresets = () => setScreen('presets');
  const goToMyWheels = () => setScreen('myWheels');
  const goToHistory = () => setScreen('history');

  // ============================================================
  // GESTIÓN DE OPCIONES
  // ============================================================
  const addOption = () => {
    const trimmed = newOption.trim();
    if (trimmed && options.length < 20) {
      setOptions([...options, trimmed]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const startEditOption = (index: number) => {
    setEditingIndex(index);
    setEditText(options[index]);
  };

  const saveEditOption = () => {
    if (editingIndex !== null && editText.trim()) {
      const newOpts = [...options];
      newOpts[editingIndex] = editText.trim();
      setOptions(newOpts);
    }
    setEditingIndex(null);
    setEditText('');
  };

  // ============================================================
  // CARGAR RULETA PREDETERMINADA
  // ============================================================
  const loadPreset = (preset: PresetWheel) => {
    setCurrentWheel({
      id: preset.id,
      name: preset.title,
      options: [...preset.options],
      favorite: false,
      createdAt: Date.now()
    });
    setOptions([...preset.options]);
    setWheelName(preset.title);
    setNoRepeat(false);
    setEliminateWinner(false);
    setAppearedOptions([]);
    setRotation(0);
    setResult(null);
    setShowResult(false);
    setScreen('wheel');
  };

  // ============================================================
  // CARGAR RULETA GUARDADA
  // ============================================================
  const loadSavedWheel = (wheel: WheelData) => {
    setCurrentWheel(wheel);
    setOptions([...wheel.options]);
    setWheelName(wheel.name);
    setNoRepeat(false);
    setEliminateWinner(false);
    setAppearedOptions([]);
    setRotation(0);
    setResult(null);
    setShowResult(false);
    setScreen('wheel');
  };

  // ============================================================
  // GUARDAR RULETA
  // ============================================================
  const saveWheel = () => {
    if (options.length < 2) return;
    const wheel: WheelData = {
      id: Date.now().toString(),
      name: wheelName || 'Mi ruleta',
      options: [...options],
      favorite: false,
      createdAt: Date.now()
    };
    setSavedWheels(prev => [wheel, ...prev]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteSavedWheel = (id: string) => {
    setSavedWheels(prev => prev.filter(w => w.id !== id));
    setConfirmDelete(null);
  };

  const toggleFavorite = (id: string) => {
    setSavedWheels(prev => prev.map(w =>
      w.id === id ? { ...w, favorite: !w.favorite } : w
    ));
  };

  // ============================================================
  // GIRAR LA RULETA
  // ============================================================
  const spinWheel = useCallback(() => {
    if (isSpinning || options.length < 2) return;

    // Verificar "no repetir"
    if (noRepeat && appearedOptions.length >= options.length) {
      setResult('🎉 ¡Ya salieron todas!');
      setShowResult(true);
      setAppearedOptions([]);
      fireConfetti();
      return;
    }

    // Seleccionar resultado aleatorio
    let availableOptions = [...options];
    if (noRepeat) {
      availableOptions = options.filter(o => !appearedOptions.includes(o));
    }

    const resultIndex = Math.floor(Math.random() * availableOptions.length);
    const selectedOption = availableOptions[resultIndex];
    const actualIndex = options.indexOf(selectedOption);

    // Calcular ángulo final para que el segmento seleccionado quede bajo el puntero
    const segmentAngle = (2 * Math.PI) / options.length;
    // Con drawOffset = -PI/2, el centro del segmento i está en:
    // i * segmentAngle + segmentAngle/2 + rotation - PI/2
    // El puntero está en -PI/2 (arriba)
    // Necesitamos: targetCenter + rotation_final - PI/2 ≡ -PI/2 (mod 2*PI)
    // => targetCenter + rotation_final ≡ 0 (mod 2*PI)
    const targetCenter = actualIndex * segmentAngle + segmentAngle / 2;
    const desiredBase = -targetCenter;

    // Añadir jitter aleatorio dentro del segmento para naturalidad
    const jitter = (Math.random() - 0.5) * segmentAngle * 0.6;

    // Calcular delta: cuánto debe girar desde la posición actual
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 vueltas completas
    const remainder = ((desiredBase + jitter - rotation) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const delta = remainder + spins * 2 * Math.PI;
    const finalRotation = rotation + delta;

    setIsSpinning(true);
    setResult(null);
    setShowResult(false);

    // Animación con easing
    const startRotation = rotation;
    const totalRotation = finalRotation - startRotation;
    const duration = 4500 + Math.random() * 1500; // 4.5-6 segundos
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentRotation = startRotation + totalRotation * eased;
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setRotation(finalRotation);
        setIsSpinning(false);
        setResult(selectedOption);
        setShowResult(true);

        // Añadir al historial
        const entry: HistoryEntry = {
          wheelName: wheelName || 'Ruleta',
          result: selectedOption,
          emoji: '🎯',
          timestamp: Date.now()
        };
        setHistory(prev => [entry, ...prev].slice(0, 10));

        // Actualizar appeared options
        if (noRepeat) {
          setAppearedOptions(prev => [...prev, selectedOption]);
        }

        // Eliminar ganador si está activado
        if (eliminateWinner) {
          setTimeout(() => {
            setOptions(prev => {
              const newOpts = prev.filter(o => o !== selectedOption);
              return newOpts;
            });
          }, 2000);
        }

        // Confeti
        fireConfetti();
      }
    };

    requestAnimationFrame(animate);
  }, [isSpinning, options, rotation, noRepeat, appearedOptions, eliminateWinner, wheelName]);

  // ============================================================
  // COMPARTIR Y COPIAR
  // ============================================================
  const handleShare = async () => {
    if (!result) return;
    const shared = await shareResult(result, wheelName);
    if (!shared) {
      const text = `La suerte decidió:\n\n${result}\n\n¡Probá vos también en ¡QUE LA SUERTE DECIDA!`;
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = `La suerte decidió: ${result}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    saveToStorage('queLaSuerteDecida_history', []);
  };

  // ============================================================
  // RENDERIZADO
  // ============================================================
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3 flex items-center justify-between">
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-white font-bold hover:opacity-80 transition-opacity"
          aria-label="Ir al inicio"
        >
          <Logo size={36} />
          <span className="hidden sm:inline text-sm font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            ¡QUE LA SUERTE DECIDA!
          </span>
        </button>
        <div className="flex gap-2">
          {savedWheels.length > 0 && (
            <button
              onClick={goToMyWheels}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition-colors"
              aria-label="Mis ruletas"
            >
              📂 Mis ruletas
            </button>
          )}
          {history.length > 0 && (
            <button
              onClick={goToHistory}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition-colors"
              aria-label="Historial"
            >
              📋 Historial
            </button>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center px-4 py-6 max-w-2xl mx-auto w-full">

        {/* ====== PANTALLA INICIAL ====== */}
        {screen === 'home' && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <div className="mb-4 animate-bounce-slow">
              <Logo size={140} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              ¡QUE LA SUERTE DECIDA!
            </h1>
            <p className="text-lg text-yellow-200 font-semibold italic mb-4">
              "Dejá que la suerte decida."
            </p>
            <p className="text-white/90 text-base mb-8 max-w-md">
              ¿No sabés qué elegir? Poné las opciones y dejá que la ruleta decida por vos.
            </p>

            <button
              onClick={goToCreate}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 mb-6 active:scale-95"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              🎡 Crear mi ruleta
            </button>

            <p className="text-white/80 text-sm mb-3">
              También podés empezar con una ruleta preparada
            </p>
            <button
              onClick={goToPresets}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all duration-200 border-2 border-white/30 hover:border-white/50"
            >
              ✨ Ver ruletas predeterminadas
            </button>
          </div>
        )}

        {/* ====== PANTALLA: RULETAS PREDETERMINADAS ====== */}
        {screen === 'presets' && (
          <div className="w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              ✨ Elegí una ruleta
            </h2>
            <p className="text-white/80 text-center mb-6">Tocá una para empezar a girar</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRESET_WHEELS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset)}
                  className="p-5 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-200 text-left hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="text-3xl mb-2">{preset.emoji}</div>
                  <div className="text-white font-bold text-lg">{preset.title}</div>
                  <div className="text-white/70 text-sm mt-1">{preset.options.length} opciones</div>
                </button>
              ))}
            </div>

            <button
              onClick={goHome}
              className="mt-6 mx-auto block px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors"
            >
              ← Volver
            </button>
          </div>
        )}

        {/* ====== PANTALLA: CREAR RULETA ====== */}
        {screen === 'create' && (
          <div className="w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              ¿Qué tenemos que decidir?
            </h2>
            <p className="text-white/80 text-center mb-6">Creá tu ruleta personalizada</p>

            {/* Nombre de la ruleta */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2 text-sm">Nombre de la ruleta</label>
              <input
                type="text"
                value={wheelName}
                onChange={e => setWheelName(e.target.value)}
                placeholder="Ej.: ¿Qué hacemos el sábado?"
                className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:bg-white/25 transition-colors text-base"
                maxLength={50}
              />
            </div>

            {/* Agregar opciones */}
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2 text-sm">
                Agregá las opciones ({options.length}/20)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={e => setNewOption(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addOption()}
                  placeholder="Escribí una opción…"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:bg-white/25 transition-colors text-base"
                  maxLength={40}
                />
                <button
                  onClick={addOption}
                  disabled={!newOption.trim() || options.length >= 20}
                  className="px-5 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-900 font-bold rounded-xl transition-colors whitespace-nowrap"
                >
                  + Agregar
                </button>
              </div>
            </div>

            {/* Lista de opciones */}
            {options.length > 0 && (
              <div className="mb-6 space-y-2 max-h-64 overflow-y-auto">
                {options.map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 bg-white/15 rounded-xl border border-white/20"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: WHEEL_COLORS[i % WHEEL_COLORS.length] }}
                    />
                    {editingIndex === i ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveEditOption()}
                        onBlur={saveEditOption}
                        className="flex-1 px-2 py-1 bg-white/20 border border-white/40 rounded text-white text-sm focus:outline-none focus:border-yellow-400"
                        autoFocus
                        maxLength={40}
                      />
                    ) : (
                      <span className="flex-1 text-white font-medium text-sm">{opt}</span>
                    )}
                    <button
                      onClick={() => startEditOption(i)}
                      className="p-1.5 text-white/70 hover:text-yellow-300 transition-colors"
                      aria-label={`Editar ${opt}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => removeOption(i)}
                      className="p-1.5 text-white/70 hover:text-red-300 transition-colors"
                      aria-label={`Eliminar ${opt}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Opciones de la ruleta */}
            {options.length >= 2 && (
              <div className="mb-6 space-y-3 p-4 bg-white/10 rounded-xl border border-white/20">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noRepeat}
                    onChange={e => setNoRepeat(e.target.checked)}
                    className="w-5 h-5 rounded accent-yellow-400"
                  />
                  <span className="text-white text-sm font-medium">
                    ☑ No repetir hasta haber pasado por todas las opciones
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eliminateWinner}
                    onChange={e => setEliminateWinner(e.target.checked)}
                    className="w-5 h-5 rounded accent-yellow-400"
                  />
                  <span className="text-white text-sm font-medium">
                    ☑ Eliminar la opción ganadora después de cada giro
                  </span>
                </label>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (options.length >= 2) {
                    setCurrentWheel({
                      id: Date.now().toString(),
                      name: wheelName || 'Mi ruleta',
                      options: [...options],
                      favorite: false,
                      createdAt: Date.now()
                    });
                    setRotation(0);
                    setResult(null);
                    setShowResult(false);
                    setScreen('wheel');
                  }
                }}
                disabled={options.length < 2}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-400 to-emerald-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {options.length < 2 ? 'Necesitás al menos 2 opciones' : '🎡 ¡Girar la ruleta!'}
              </button>
              <button
                onClick={saveWheel}
                disabled={options.length < 2}
                className="px-6 py-4 bg-white/20 hover:bg-white/30 disabled:opacity-40 text-white font-semibold rounded-2xl transition-colors border-2 border-white/30"
              >
                💾 Guardar
              </button>
            </div>

            {options.length < 2 && (
              <p className="text-yellow-200 text-sm mt-3 text-center">
                Necesitás al menos 2 opciones para girar la ruleta.
              </p>
            )}

            {copied && (
              <p className="text-green-300 text-sm mt-2 text-center font-semibold">
                ✓ Ruleta guardada
              </p>
            )}

            <button
              onClick={goHome}
              className="mt-4 mx-auto block px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors"
            >
              ← Volver
            </button>
          </div>
        )}

        {/* ====== PANTALLA: RULETA ====== */}
        {screen === 'wheel' && options.length >= 2 && (
          <div className="w-full animate-fadeIn flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {wheelName || '¡Que gire!'}
            </h2>

            {/* Ruleta */}
            <div className="w-full max-w-[440px] mb-6">
              <WheelCanvas options={options} rotation={rotation} />
            </div>

            {/* Botón GIRAR */}
            {!showResult && (
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="px-10 py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-black text-2xl rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95 animate-pulse-glow"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {isSpinning ? '🌀 Girando...' : '🎡 ¡GIRAR!'}
              </button>
            )}

            {/* Opciones rápidas */}
            {!showResult && !isSpinning && (
              <div className="mt-4 flex gap-2 flex-wrap justify-center">
                <button
                  onClick={() => setScreen('create')}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  ✏️ Cambiar opciones
                </button>
                <button
                  onClick={saveWheel}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  💾 Guardar
                </button>
              </div>
            )}

            {/* Opciones de no-repetir y eliminar */}
            {!showResult && !isSpinning && (
              <div className="mt-4 flex gap-4 flex-wrap justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noRepeat}
                    onChange={e => setNoRepeat(e.target.checked)}
                    className="w-4 h-4 rounded accent-yellow-400"
                  />
                  <span className="text-white/80 text-xs font-medium">No repetir</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eliminateWinner}
                    onChange={e => setEliminateWinner(e.target.checked)}
                    className="w-4 h-4 rounded accent-yellow-400"
                  />
                  <span className="text-white/80 text-xs font-medium">Eliminar ganador</span>
                </label>
              </div>
            )}

            {/* ====== MODAL DE RESULTADO ====== */}
            {showResult && result && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-scaleIn">
                  <div className="text-lg font-bold text-gray-500 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    ¡LA SUERTE DECIDIÓ!
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 py-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    🎯 {result}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => { setShowResult(false); setResult(null); setTimeout(spinWheel, 300); }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform active:scale-95"
                    >
                      🎡 Girar otra vez
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors text-sm"
                      >
                        📋 Copiar
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors text-sm"
                      >
                        ↗ Compartir
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setShowResult(false); setResult(null); setScreen('create'); }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors text-sm"
                      >
                        ✏️ Cambiar opciones
                      </button>
                      <button
                        onClick={goHome}
                        className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors text-sm"
                      >
                        🏠 Nueva ruleta
                      </button>
                    </div>
                  </div>

                  {copied && (
                    <p className="text-green-600 text-sm mt-3 font-semibold">✓ Resultado copiado</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====== PANTALLA: MIS RULETAS ====== */}
        {screen === 'myWheels' && (
          <div className="w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              📂 Mis ruletas
            </h2>
            <p className="text-white/80 text-center mb-6">Tus ruletas guardadas</p>

            {savedWheels.length === 0 ? (
              <div className="text-center text-white/70 py-8">
                <p className="text-4xl mb-3">🎡</p>
                <p>Todavía no guardaste ninguna ruleta.</p>
                <p className="text-sm mt-2">Creá una y guardala para usarla después.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedWheels.map(wheel => (
                  <div
                    key={wheel.id}
                    className="p-4 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 flex items-center gap-3"
                  >
                    <button
                      onClick={() => toggleFavorite(wheel.id)}
                      className="text-2xl hover:scale-125 transition-transform"
                      aria-label={wheel.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      {wheel.favorite ? '♥' : '♡'}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold truncate">{wheel.name}</div>
                      <div className="text-white/60 text-sm">{wheel.options.length} opciones</div>
                    </div>
                    <button
                      onClick={() => loadSavedWheel(wheel)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-lg text-sm transition-colors"
                    >
                      Abrir
                    </button>
                    {confirmDelete === wheel.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => deleteSavedWheel(wheel.id)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs font-bold"
                        >
                          Sí
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-2 py-1 bg-white/20 text-white rounded text-xs"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(wheel.id)}
                        className="p-2 text-white/60 hover:text-red-300 transition-colors"
                        aria-label={`Eliminar ${wheel.name}`}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={goHome}
              className="mt-6 mx-auto block px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors"
            >
              ← Volver
            </button>
          </div>
        )}

        {/* ====== PANTALLA: HISTORIAL ====== */}
        {screen === 'history' && (
          <div className="w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              📋 Últimas decisiones
            </h2>
            <p className="text-white/80 text-center mb-6">Las últimas 10 decisiones de la suerte</p>

            {history.length === 0 ? (
              <div className="text-center text-white/70 py-8">
                <p className="text-4xl mb-3">🎯</p>
                <p>Todavía no hay decisiones registradas.</p>
                <p className="text-sm mt-2">¡Girá la ruleta para empezar!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((entry, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 flex items-center gap-3"
                  >
                    <span className="text-xl">{entry.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold truncate">{entry.result}</div>
                      <div className="text-white/60 text-xs">{entry.wheelName}</div>
                    </div>
                    <span className="text-white/40 text-xs">
                      {new Date(entry.timestamp).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="mt-4 mx-auto block px-4 py-2 bg-red-500/30 hover:bg-red-500/50 text-white font-semibold rounded-xl transition-colors text-sm border border-red-400/30"
              >
                🗑️ Borrar historial
              </button>
            )}

            <button
              onClick={goHome}
              className="mt-4 mx-auto block px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors"
            >
              ← Volver
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 px-4 border-t border-white/10">
        <p className="text-white/60 text-xs font-semibold">
          ¡QUE LA SUERTE DECIDA! · Una miniapp gratuita para decidir jugando.
        </p>
        <p className="text-white/40 text-xs mt-1">
          Sin registro · Sin datos personales
        </p>
      </footer>
    </div>
  );
}
