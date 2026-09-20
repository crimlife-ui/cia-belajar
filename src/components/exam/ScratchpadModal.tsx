import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  X,
  RotateCcw,
  Trash2,
  Maximize2,
  Minimize2,
  Grid,
  Square,
  Eraser,
  PenLine,
  Eye,
  EyeOff,
} from 'lucide-react';

interface ScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  playClick?: () => void;
}

type ToolType = 'pen' | 'eraser';

interface StrokePoint {
  x: number;
  y: number;
}

interface Stroke {
  points: StrokePoint[];
  color: string;
  size: number;
  isEraser: boolean;
}

const PEN_COLORS = [
  { id: 'slate', hex: '#334155', name: 'Pensil' },
  { id: 'blue', hex: '#2563eb', name: 'Biru' },
  { id: 'black', hex: '#09090b', name: 'Hitam' },
  { id: 'red', hex: '#dc2626', name: 'Merah' },
  { id: 'emerald', hex: '#059669', name: 'Hijau' },
];

const STROKE_SIZES = [
  { label: 'Tipis', size: 2 },
  { label: 'Sedang', size: 4 },
  { label: 'Tebal', size: 8 },
];

export const ScratchpadModal: React.FC<ScratchpadModalProps> = ({
  isOpen,
  onClose,
  playClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [tool, setTool] = useState<ToolType>('pen');
  const [selectedColor, setSelectedColor] = useState<string>('#2563eb');
  const [strokeSize, setStrokeSize] = useState<number>(3);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // Persistent strokes history
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const [, setForceUpdate] = useState({});

  // Redraw all strokes onto canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all stored strokes
    strokesRef.current.forEach(stroke => {
      if (stroke.points.length < 2) {
        if (stroke.points.length === 1) {
          ctx.beginPath();
          ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = stroke.isEraser ? '#ffffff' : stroke.color;
          ctx.globalCompositeOperation = stroke.isEraser ? 'destination-out' : 'source-over';
          ctx.fill();
        }
        return;
      }

      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.strokeStyle = stroke.isEraser ? '#ffffff' : stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = stroke.isEraser ? 'destination-out' : 'source-over';
      ctx.stroke();
    });

    // Reset composite mode
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Resize canvas when modal opens or container size changes
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = Math.floor(rect.width);
    const displayHeight = Math.floor(rect.height);

    if (displayWidth === 0 || displayHeight === 0) return;

    // Check if canvas size actually changed
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      redrawCanvas();
    }
  }, [redrawCanvas]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        resizeCanvas();
      }, 50);
      window.addEventListener('resize', resizeCanvas);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isOpen, resizeCanvas, isMaximized]);

  // Pointer event handlers (smooth drawing for touch, mouse, and stylus)
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): StrokePoint | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}

    const pt = getCanvasCoords(e);
    if (!pt) return;

    isDrawingRef.current = true;
    const newStroke: Stroke = {
      points: [pt],
      color: selectedColor,
      size: tool === 'eraser' ? strokeSize * 4 : strokeSize,
      isEraser: tool === 'eraser',
    };
    currentStrokeRef.current = newStroke;
    strokesRef.current.push(newStroke);

    // Draw initial dot
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, newStroke.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = newStroke.isEraser ? '#ffffff' : newStroke.color;
      ctx.globalCompositeOperation = newStroke.isEraser ? 'destination-out' : 'source-over';
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    const pt = getCanvasCoords(e);
    if (!pt) return;

    const stroke = currentStrokeRef.current;
    const prevPt = stroke.points[stroke.points.length - 1];
    stroke.points.push(pt);

    // Incremental draw
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(prevPt.x, prevPt.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.strokeStyle = stroke.isEraser ? '#ffffff' : stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = stroke.isEraser ? 'destination-out' : 'source-over';
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    }
    isDrawingRef.current = false;
    currentStrokeRef.current = null;
    setForceUpdate({});
  };

  const handleUndo = () => {
    playClick?.();
    if (strokesRef.current.length > 0) {
      strokesRef.current.pop();
      redrawCanvas();
      setForceUpdate({});
    }
  };

  const handleClear = () => {
    playClick?.();
    strokesRef.current = [];
    redrawCanvas();
    setForceUpdate({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-pop">
      <div
        className={`flex flex-col bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden transition-all duration-200 ${
          isTransparent ? 'opacity-85' : 'opacity-100'
        } ${
          isMaximized
            ? 'w-full h-full max-w-none max-h-none rounded-none'
            : 'w-full max-w-3xl h-[85vh] max-h-[750px]'
        }`}
      >
        {/* Modal Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 select-none shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <div>
              <h3 className="font-black text-sm sm:text-base leading-tight">
                Buku Pencakar (Kertas Cakar Hitung)
              </h3>
              <p className="text-[10px] font-bold text-amber-900 hidden sm:block">
                Coret-coret hitung susun di sini tanpa takut salah!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Grid Toggle */}
            <button
              onClick={() => {
                playClick?.();
                setShowGrid(g => !g);
              }}
              title={showGrid ? 'Ganti ke Kertas Polos' : 'Ganti ke Kertas Kotak Matematika'}
              className={`p-1.5 rounded-xl border font-extrabold text-xs flex items-center gap-1 transition-colors ${
                showGrid
                  ? 'bg-amber-600 text-white border-amber-700'
                  : 'bg-white/80 hover:bg-white text-amber-900 border-amber-300'
              }`}
            >
              {showGrid ? <Grid className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              <span className="hidden md:inline">{showGrid ? 'Kotak' : 'Polos'}</span>
            </button>

            {/* Transparency Toggle */}
            <button
              onClick={() => {
                playClick?.();
                setIsTransparent(t => !t);
              }}
              title={isTransparent ? 'Mode Normal' : 'Mode Tembus Pandang (Lihat Soal di Balik Kertas)'}
              className={`p-1.5 rounded-xl border font-extrabold text-xs flex items-center gap-1 transition-colors ${
                isTransparent
                  ? 'bg-amber-600 text-white border-amber-700'
                  : 'bg-white/80 hover:bg-white text-amber-900 border-amber-300'
              }`}
            >
              {isTransparent ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="hidden md:inline">Transparan</span>
            </button>

            {/* Maximize Toggle */}
            <button
              onClick={() => {
                playClick?.();
                setIsMaximized(m => !m);
              }}
              title={isMaximized ? 'Perkecil' : 'Perbesar Penuh'}
              className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-amber-900 border border-amber-300"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={() => {
                playClick?.();
                onClose();
              }}
              title="Tutup Buku Pencakar (Coretan tetap tersimpan)"
              className="p-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white border border-rose-600 active:scale-95 transition-transform"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Toolbar: Tools, Colors, Sizes & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-amber-50 border-b-2 border-amber-200">
          {/* Tool Selector: Pen vs Eraser */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-amber-200 shadow-xs">
            <button
              onClick={() => {
                playClick?.();
                setTool('pen');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                tool === 'pen'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Pena</span>
            </button>
            <button
              onClick={() => {
                playClick?.();
                setTool('eraser');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                tool === 'eraser'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Penghapus</span>
            </button>
          </div>

          {/* Color Palette (Active when tool === 'pen') */}
          {tool === 'pen' && (
            <div className="flex items-center gap-1.5">
              {PEN_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    playClick?.();
                    setSelectedColor(c.hex);
                  }}
                  title={c.name}
                  style={{ backgroundColor: c.hex }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform active:scale-90 ${
                    selectedColor === c.hex
                      ? 'border-amber-900 scale-125 shadow-md'
                      : 'border-white hover:scale-110'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Stroke Size Selector */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-amber-200 shadow-xs">
            {STROKE_SIZES.map(s => (
              <button
                key={s.size}
                onClick={() => {
                  playClick?.();
                  setStrokeSize(s.size);
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all ${
                  strokeSize === s.size
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Actions: Undo & Clear All */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={strokesRef.current.length === 0}
              title="Batalkan goresan terakhir (Undo)"
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Undo</span>
            </button>

            <button
              onClick={handleClear}
              disabled={strokesRef.current.length === 0}
              title="Bersihkan seluruh kertas cakar"
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3 h-3" />
              <span>Hapus Semua</span>
            </button>
          </div>
        </div>

        {/* Canvas Interactive Drawing Surface */}
        <div
          ref={containerRef}
          className={`relative flex-1 w-full h-full touch-none overflow-hidden select-none ${
            showGrid ? 'bg-math-grid' : 'bg-white'
          }`}
          style={{
            cursor: tool === 'eraser' ? 'crosshair' : 'crosshair',
            backgroundImage: showGrid
              ? 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px), linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)'
              : undefined,
            backgroundSize: showGrid ? '24px 24px, 24px 24px, 24px 24px' : undefined,
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full h-full block"
          />

          {strokesRef.current.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 select-none">
              <div className="text-center">
                <span className="text-4xl block mb-1">✏️</span>
                <p className="text-sm font-black text-slate-600">
                  Gunakan jari, stylus, atau mouse untuk mencakar hitungan di sini!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Status */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 border-t border-slate-200 text-[11px] font-bold text-slate-500 select-none">
          <span>💡 Tips: Coretanmu tidak akan hilang jika jendela ini ditutup.</span>
          <button
            onClick={() => {
              playClick?.();
              onClose();
            }}
            className="text-amber-800 hover:underline font-black"
          >
            Lanjut Kerjakan Soal ➔
          </button>
        </div>
      </div>
    </div>
  );
};
