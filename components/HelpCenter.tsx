
import React from 'react';
import { HelpCircle, Star, BookOpen, Timer, Calendar, Layout } from 'lucide-react';
import { ThemeColor, AppMode } from '../types';
import { THEMES, MODE_CONFIG } from '../constants';

interface HelpCenterProps {
  theme: ThemeColor;
  mode: AppMode;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ theme, mode }) => {
  const themeClasses = THEMES[theme];
  const modeClasses = MODE_CONFIG[mode];

  const guides = [
    {
      icon: Star,
      title: "Sistema de Gamificación",
      description: "Gana EXP completando hábitos (+15 EXP), tareas (+25 EXP) y sesiones de Pomodoro (+20 EXP). Sube de nivel para desbloquear nuevos retos."
    },
    {
      icon: Calendar,
      title: "Gestión de Hábitos",
      description: "Crea rutinas personalizadas con color e ícono. Marca el check para confirmar tu progreso diario y mantener tus rachas activas."
    },
    {
      icon: BookOpen,
      title: "Aula Virtual",
      description: "Organiza tus materias. Añade 'Clases' para tomar apuntes directamente y 'Tareas' para llevar un control de tus entregas académicas."
    },
    {
      icon: Timer,
      title: "Enfoque Pomodoro",
      description: "Usa el temporizador para estudiar en bloques de 25 minutos con 5 de descanso. ¡Sigue funcionando aunque navegues por otras pestañas!"
    },
    {
      icon: Layout,
      title: "Personalización",
      description: "Cambia el tema de color y el modo de apariencia (Luz, Oscuro, Neón o Contraste) desde la sección de Ajustes para mayor comodidad."
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className={`inline-flex p-4 rounded-3xl ${themeClasses.light} ${themeClasses.text} mb-2`}>
          <HelpCircle size={40} />
        </div>
        <h2 className="text-4xl font-black">Centro de Aprendizaje Nodus</h2>
        <p className={`${modeClasses.textMuted} text-lg`}>Aprende a dominar tu tiempo y convertir tu vida en una aventura épica de productividad.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, idx) => (
          <div key={idx} className={`p-8 rounded-3xl border shadow-sm transition-all hover:scale-[1.02] ${modeClasses.card}`}>
            <div className={`w-12 h-12 rounded-2xl ${themeClasses.primary} flex items-center justify-center text-white mb-6 shadow-lg`}>
              <guide.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{guide.title}</h3>
            <p className={`${modeClasses.textMuted} leading-relaxed`}>{guide.description}</p>
          </div>
        ))}
      </div>

      <div className={`p-10 rounded-[3rem] border-2 border-dashed flex flex-col items-center text-center space-y-4 ${mode === AppMode.LIGHT ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
        <h4 className="text-xl font-bold">¿Necesitas más ayuda?</h4>
        <p className={`${modeClasses.textMuted}`}>Nodus está diseñado para ser intuitivo. Empieza creando tu primera materia en el Aula Virtual o tu primer hábito para comenzar a ganar EXP.</p>
      </div>
    </div>
  );
};

export default HelpCenter;