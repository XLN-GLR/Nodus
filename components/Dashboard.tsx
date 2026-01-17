
import React from 'react';
import { Target, Flame, Star, Clock } from 'lucide-react';
import { Habit, Subject, ThemeColor, UserStats, AppMode } from '../types';
import { THEMES, MODE_CONFIG } from '../constants';

interface DashboardProps {
  stats: UserStats;
  habits: Habit[];
  subjects: Subject[];
  theme: ThemeColor;
  mode: AppMode;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, habits, subjects, theme, mode }) => {
  const themeClasses = THEMES[theme];
  const modeClasses = MODE_CONFIG[mode];
  const today = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
  const pendingTasks = subjects.reduce((acc, sub) => acc + sub.tasks.filter(t => !t.completed).length, 0);

  // Calcular la racha máxima de todos los hábitos
  const maxStreak = habits.length > 0 
    ? Math.max(...habits.map(h => h.completedDates.length)) 
    : 0;

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className={`p-6 rounded-3xl shadow-sm border flex items-center space-x-4 ${modeClasses.card} ${mode === AppMode.LIGHT ? 'border-slate-100' : 'border-white/5'}`}>
      <div className={`p-4 rounded-2xl ${color} shadow-lg ${mode === AppMode.NEON ? 'shadow-[0_0_10px_rgba(255,255,255,0.3)]' : ''}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className={`${modeClasses.textMuted} text-xs font-bold uppercase tracking-wider`}>{label}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Target} label="Hábitos Hoy" value={`${completedToday}/${habits.length}`} color="bg-indigo-500" />
        <StatCard icon={Flame} label="Racha actual" value={`${maxStreak} días`} color="bg-orange-500" />
        <StatCard icon={Star} label="EXP Total" value={stats.exp} color="bg-yellow-500" />
        <StatCard icon={Clock} label="Tareas" value={pendingTasks} color="bg-blue-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className={`p-8 rounded-3xl shadow-sm border ${modeClasses.card} ${mode === AppMode.LIGHT ? 'border-slate-100' : 'border-white/5'}`}>
          <h3 className="text-xl font-bold mb-6">Misiones Diarias</h3>
          <div className="space-y-4">
            {habits.length > 0 ? habits.slice(0, 3).map(habit => (
               <div key={habit.id} className={`flex items-center justify-between p-4 rounded-2xl border ${modeClasses.subCard} ${mode === AppMode.LIGHT ? 'border-slate-100' : 'border-white/5'}`}>
                  <span className="font-medium opacity-90">{habit.name}</span>
                  <span className={`${themeClasses.text} font-bold`}>+15 EXP</span>
               </div>
            )) : (
              <p className={`${modeClasses.textMuted} text-sm italic`}>Agrega hábitos para ver tus misiones.</p>
            )}
            <div className={`flex items-center justify-between p-4 rounded-2xl border border-dashed opacity-40 ${mode === AppMode.LIGHT ? 'border-slate-300 bg-slate-50' : 'border-white/20 bg-white/5'}`}>
                <span className="font-medium">Terminar 25m Pomodoro</span>
                <span className={`${themeClasses.text} font-bold`}>+20 EXP</span>
            </div>
          </div>
        </div>

        <div className={`p-8 rounded-3xl shadow-sm border ${modeClasses.card} ${mode === AppMode.LIGHT ? 'border-slate-100' : 'border-white/5'}`}>
          <h3 className="text-xl font-bold mb-6">Próximos Vencimientos</h3>
          <div className="space-y-4">
            {subjects.flatMap(s => s.tasks.map(t => ({ ...t, subName: s.name }))).filter(t => !t.completed).slice(0, 3).map(task => (
              <div key={task.id} className={`flex items-center justify-between p-4 rounded-2xl border-l-4 border-l-rose-500 border ${modeClasses.subCard} ${mode === AppMode.LIGHT ? 'border-slate-100' : 'border-white/5'}`}>
                <div>
                  <p className="font-bold opacity-90">{task.title}</p>
                  <p className={`text-xs ${modeClasses.textMuted}`}>{task.subName}</p>
                </div>
                <p className="text-xs font-bold text-rose-500 uppercase">{task.dueDate}</p>
              </div>
            ))}
            {pendingTasks === 0 && (
              <div className="text-center py-8">
                <p className={`${modeClasses.textMuted} italic`}>No hay tareas pendientes. ¡Buen trabajo!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;