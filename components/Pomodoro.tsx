
import React from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen } from 'lucide-react';
import { ThemeColor, AppMode } from '../types';
import { THEMES, MODE_CONFIG } from '../constants';

interface PomodoroProps {
  theme: ThemeColor;
  mode: AppMode;
  timeLeft: number;
  isActive: boolean;
  currentMode: 'study' | 'break';
  setIsActive: (val: boolean) => void;
  setCurrentMode: (mode: 'study' | 'break') => void;
  setTimeLeft: (val: number) => void;
}

const Pomodoro: React.FC<PomodoroProps> = ({ 
  theme, mode, timeLeft, isActive, currentMode, setIsActive, setCurrentMode, setTimeLeft 
}) => {
  const themeClasses = THEMES[theme];
  const modeClasses = MODE_CONFIG[mode];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setIsActive(false);
    setTimeLeft(currentMode === 'study' ? 25 * 60 : 5 * 60);
  };

  const totalTime = currentMode === 'study' ? 25 * 60 : 5 * 60;
  const progress = (timeLeft / totalTime) * 100;

  return (
    <div className="max-w-md mx-auto space-y-8 animate-in zoom-in-95">
      <div className="flex flex-col items-center">
        <div className={`flex p-1 rounded-2xl mb-12 ${mode === AppMode.LIGHT ? 'bg-slate-100' : 'bg-white/10'}`}>
           <button 
            onClick={() => { setCurrentMode('study'); setTimeLeft(25 * 60); setIsActive(false); }}
            className={`px-6 py-2 rounded-xl transition-all flex items-center space-x-2 ${currentMode === 'study' ? (mode === AppMode.LIGHT ? 'bg-white shadow-sm text-slate-800' : 'bg-white/20 text-white') : modeClasses.textMuted}`}
           >
              <BookOpen size={18} /> <span>Estudio</span>
           </button>
           <button 
            onClick={() => { setCurrentMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
            className={`px-6 py-2 rounded-xl transition-all flex items-center space-x-2 ${currentMode === 'break' ? (mode === AppMode.LIGHT ? 'bg-white shadow-sm text-slate-800' : 'bg-white/20 text-white') : modeClasses.textMuted}`}
           >
              <Coffee size={18} /> <span>Descanso</span>
           </button>
        </div>

        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 288 288">
            <circle 
              cx="144" cy="144" r="130" 
              stroke="currentColor" strokeWidth="12" 
              fill="transparent" className={`${mode === AppMode.LIGHT ? 'text-slate-100' : 'text-white/5'}`} 
            />
            <circle 
              cx="144" cy="144" r="130" 
              stroke="currentColor" strokeWidth="12" 
              fill="transparent" 
              strokeDasharray={816}
              strokeDashoffset={816 * (1 - progress / 100)}
              strokeLinecap="round"
              className={`${themeClasses.text} transition-all duration-1000 ease-linear ${mode === AppMode.NEON ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}
            />
          </svg>
          <div className="text-center z-10">
            <span className={`text-6xl font-black tabular-nums ${mode === AppMode.LIGHT ? 'text-slate-800' : 'text-white'}`}>{formatTime(timeLeft)}</span>
            <p className={`${modeClasses.textMuted} uppercase tracking-widest text-sm mt-2 font-bold`}>{currentMode === 'study' ? 'Enfoque' : 'Relájate'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-12 mt-12">
          <button 
            onClick={reset}
            className={`p-4 rounded-full shadow-sm border transition-all ${mode === AppMode.LIGHT ? 'bg-white border-slate-100 text-slate-400' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}
          >
            <RotateCcw size={28} />
          </button>
          
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`p-8 rounded-full shadow-xl text-white transition-transform active:scale-95 ${themeClasses.primary} ${mode === AppMode.NEON ? themeClasses.neon : ''}`}
          >
            {isActive ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-3xl border shadow-sm ${modeClasses.subCard} ${mode === AppMode.LIGHT ? 'border-slate-100' : 'border-white/5'}`}>
        <h3 className="font-bold mb-2">Estado Activo</h3>
        <p className={`text-sm ${modeClasses.textMuted}`}>El temporizador sigue funcionando incluso si cambias de pestaña. No pierdas el foco.</p>
      </div>
    </div>
  );
};

export default Pomodoro;
