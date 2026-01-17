
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Check, Trash2, Clock, AlignLeft, Palette, LayoutGrid } from 'lucide-react';
import { Habit, ThemeColor, AppMode } from '../types';
import { HABIT_ICONS, getIcon, THEMES, MODE_CONFIG } from '../constants';

interface HabitTrackerProps {
  habits: Habit[];
  onAddHabit: (habit: Habit) => void;
  onToggleHabit: (habitId: string) => void;
  onDeleteHabit: (habitId: string) => void;
  theme: ThemeColor;
  mode: AppMode;
}

const COLOR_OPTIONS = [
  { label: 'Azul', value: 'bg-blue-500' },
  { label: 'Verde', value: 'bg-emerald-500' },
  { label: 'Naranja', value: 'bg-orange-500' },
  { label: 'Rosa', value: 'bg-rose-500' },
  { label: 'Violeta', value: 'bg-violet-500' },
  { label: 'Cyan', value: 'bg-cyan-500' },
];

const AutoResizeTextarea = ({ value, onChange, placeholder, className }: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} resize-none overflow-hidden`}
    />
  );
};

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onAddHabit, onToggleHabit, onDeleteHabit, theme, mode }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDesc, setNewHabitDesc] = useState('');
  const [newHabitTime, setNewHabitTime] = useState('08:00');
  const [selectedIcon, setSelectedIcon] = useState('Book');
  const [selectedColor, setSelectedColor] = useState('bg-blue-500');
  
  const themeClasses = THEMES[theme];
  const modeClasses = MODE_CONFIG[mode];
  const today = new Date().toISOString().split('T')[0];

  const handleAdd = () => {
    if (!newHabitName.trim()) return;
    onAddHabit({
      id: Math.random().toString(36).substr(2, 9),
      name: newHabitName,
      description: newHabitDesc,
      time: newHabitTime,
      color: selectedColor,
      icon: selectedIcon,
      completedDates: [],
      frequency: 'daily'
    });
    setNewHabitName(''); setNewHabitDesc(''); setIsAdding(false);
  };

  const inputClasses = `w-full px-4 py-2 rounded-xl border bg-transparent focus:outline-none focus:ring-2 ${
    mode === AppMode.LIGHT ? 'border-slate-200 focus:ring-slate-400' : 'border-white/10 focus:ring-white/30 text-white'
  }`;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Tus Hábitos</h3>
          <p className={modeClasses.textMuted}>Cada pequeña acción cuenta</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white shadow-md transition-all active:scale-95 ${themeClasses.primary}`}
        >
          <Plus size={20} />
          <span>Nuevo Hábito</span>
        </button>
      </div>

      {isAdding && (
        <div className={`p-8 rounded-3xl shadow-xl border animate-in fade-in zoom-in-95 ${modeClasses.card}`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase ${modeClasses.textMuted}`}>Nombre</label>
                <input className={inputClasses} value={newHabitName} onChange={(e)=>setNewHabitName(e.target.value)} placeholder="Ej. Meditar" />
              </div>
              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase ${modeClasses.textMuted}`}>Descripción</label>
                <AutoResizeTextarea 
                  className={inputClasses} 
                  value={newHabitDesc} 
                  onChange={(e: any)=>setNewHabitDesc(e.target.value)} 
                  placeholder="¿Por qué es importante?" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase ${modeClasses.textMuted}`}>Hora Diaria</label>
                  <input type="time" className={inputClasses} value={newHabitTime} onChange={(e)=>setNewHabitTime(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase ${modeClasses.textMuted}`}>Ícono</label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-2 border border-white/5 rounded-xl">
                    {HABIT_ICONS.map((icon) => (
                      <button key={icon.name} onClick={() => setSelectedIcon(icon.name)} className={`p-2 rounded-lg transition-all ${selectedIcon === icon.name ? `${themeClasses.primary} text-white` : 'hover:bg-white/5 opacity-50'}`}>
                        {icon.component}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase ${modeClasses.textMuted} flex items-center space-x-2`}>
                   <Palette size={14} /> <span>Color Distintivo</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_OPTIONS.map(c => (
                    <button key={c.value} onClick={()=>setSelectedColor(c.value)} className={`w-10 h-10 rounded-full border-4 transition-all ${selectedColor === c.value ? 'border-white scale-110' : 'border-transparent'} ${c.value}`} />
                  ))}
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button onClick={() => setIsAdding(false)} className={modeClasses.textMuted}>Cancelar</button>
                <button onClick={handleAdd} className={`px-8 py-3 rounded-2xl text-white font-bold shadow-lg ${themeClasses.primary}`}>Guardar Hábito</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {habits.length === 0 && !isAdding && (
        <div className={`p-20 rounded-[3rem] border-2 border-dashed flex flex-col items-center text-center space-y-4 ${mode === AppMode.LIGHT ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
          <div className={`${modeClasses.textMuted} opacity-20`}><LayoutGrid size={80} /></div>
          <p className={`${modeClasses.textMuted} font-medium`}>Aún no tienes hábitos creados.<br/>Comienza definiendo una pequeña acción diaria.</p>
        </div>
      )}

      <div className="grid gap-6">
        {habits.map(habit => {
          const isCompletedToday = habit.completedDates.includes(today);
          return (
            <div key={habit.id} className={`group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 p-6 rounded-[2.5rem] border shadow-sm transition-all hover:translate-y-[-2px] ${modeClasses.card} border-l-[12px] ${habit.color.replace('bg-', 'border-')}`}>
              
              {/* Sección 1: Icono e Identidad */}
              <div className="flex items-center space-x-4">
                <div className={`p-5 rounded-[1.5rem] ${habit.color} text-white shadow-xl flex-shrink-0`}>
                  {getIcon(habit.icon)}
                </div>
              </div>

              {/* Sección 2: Información Centralizada */}
              <div className="flex flex-col justify-center space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className={`text-xl font-black tracking-tight ${isCompletedToday ? 'line-through opacity-40' : ''}`}>
                    {habit.name}
                  </h4>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-black text-white ${habit.color} shadow-sm`}>
                    <Clock size={12} strokeWidth={3} />
                    <span>{habit.time}</span>
                  </div>
                </div>
                {habit.description && (
                  <p className={`text-sm leading-relaxed ${modeClasses.textMuted} line-clamp-2 italic`}>
                    {habit.description}
                  </p>
                )}
              </div>
              
              {/* Sección 3: Controles y Progreso */}
              <div className="flex items-center justify-between md:justify-end space-x-6 border-t md:border-t-0 pt-4 md:pt-0 border-white/10">
                <div className="flex flex-col items-center px-4">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Racha</p>
                   <p className={`text-2xl font-black ${themeClasses.text} leading-none`}>{habit.completedDates.length}<span className="text-xs ml-0.5">d</span></p>
                </div>

                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => onToggleHabit(habit.id)}
                    className={`h-14 w-14 rounded-[1.2rem] flex items-center justify-center transition-all active:scale-90 border-4 ${
                      isCompletedToday 
                        ? `${themeClasses.primary} text-white border-transparent shadow-lg` 
                        : `border-slate-100 dark:border-white/5 ${modeClasses.textMuted} hover:bg-white/5`
                    }`}
                  >
                    <Check size={28} strokeWidth={4} />
                  </button>
                  <button 
                    onClick={() => onDeleteHabit(habit.id)}
                    className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-colors"
                    title="Eliminar hábito"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitTracker;
