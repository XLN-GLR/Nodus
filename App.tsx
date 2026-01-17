
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import HabitTracker from './components/HabitTracker';
import Classroom from './components/Classroom';
import Pomodoro from './components/Pomodoro';
import HelpCenter from './components/HelpCenter';
import { Habit, Subject, ThemeColor, UserStats, Task, AppMode, Note } from './types';
import { MODE_CONFIG, THEMES } from './constants';
import { Sun, Moon, Zap, Eye, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<ThemeColor>(ThemeColor.VIOLET);
  const [mode, setMode] = useState<AppMode>(AppMode.LIGHT);
  
  // Pomodoro State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'study' | 'break'>('study');
  const timerRef = useRef<number | null>(null);

  // Persistence State
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('nodus_stats');
    return saved ? JSON.parse(saved) : {
      level: 1,
      exp: 0,
      totalExpToNextLevel: 100,
      userName: 'Explorador Nodus',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    };
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('nodus_habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('nodus_subjects');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('nodus_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('nodus_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('nodus_subjects', JSON.stringify(subjects));
  }, [subjects]);

  // Timer Logic
  useEffect(() => {
    if (pomodoroActive && pomodoroTime > 0) {
      timerRef.current = window.setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pomodoroMode === 'study') addExp(20);
      const nextMode = pomodoroMode === 'study' ? 'break' : 'study';
      setPomodoroMode(nextMode);
      setPomodoroTime(nextMode === 'study' ? 25 * 60 : 5 * 60);
      setPomodoroActive(false);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [pomodoroActive, pomodoroTime, pomodoroMode]);

  const addExp = (amount: number) => {
    setStats(prev => {
      let newExp = prev.exp + amount;
      let newLevel = prev.level;
      let newTotal = prev.totalExpToNextLevel;
      if (newExp >= prev.totalExpToNextLevel) {
        newExp = newExp - prev.totalExpToNextLevel;
        newLevel += 1;
        newTotal = Math.round(newTotal * 1.5);
      }
      return { ...prev, level: newLevel, exp: newExp, totalExpToNextLevel: newTotal };
    });
  };

  const onAddHabit = (h: Habit) => setHabits([...habits, h]);
  const onToggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(habits.map(h => {
      if (h.id === id && !h.completedDates.includes(today)) {
        addExp(15);
        return { ...h, completedDates: [...h.completedDates, today] };
      }
      return h;
    }));
  };
  const onDeleteHabit = (id: string) => setHabits(habits.filter(h => h.id !== id));
  
  const onAddSubject = (s: Subject) => setSubjects([...subjects, s]);
  const onAddTask = (subjectId: string, task: Task) => {
    setSubjects(subjects.map(s => s.id === subjectId ? { ...s, tasks: [...s.tasks, task] } : s));
  };
  const onAddNote = (subjectId: string, note: Note) => {
    setSubjects(subjects.map(s => s.id === subjectId ? { ...s, notes: [note, ...s.notes] } : s));
  };
  const onToggleTask = (subjectId: string, taskId: string) => {
    setSubjects(subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          tasks: s.tasks.map(t => {
            if (t.id === taskId) {
              if (!t.completed) addExp(25);
              return { ...t, completed: !t.completed };
            }
            return t;
          })
        };
      }
      return s;
    }));
  };

  const modeClasses = MODE_CONFIG[mode];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} habits={habits} subjects={subjects} theme={theme} mode={mode} />;
      case 'habits':
        return <HabitTracker habits={habits} onAddHabit={onAddHabit} onToggleHabit={onToggleHabit} onDeleteHabit={onDeleteHabit} theme={theme} mode={mode} />;
      case 'classroom':
        return <Classroom subjects={subjects} onAddSubject={onAddSubject} onAddTask={onAddTask} onAddNote={onAddNote} onToggleTask={onToggleTask} theme={theme} mode={mode} />;
      case 'pomodoro':
        return (
          <Pomodoro 
            theme={theme} mode={mode} 
            timeLeft={pomodoroTime} isActive={pomodoroActive} currentMode={pomodoroMode}
            setIsActive={setPomodoroActive} setCurrentMode={setPomodoroMode} setTimeLeft={setPomodoroTime}
          />
        );
      case 'help':
        return <HelpCenter theme={theme} mode={mode} />;
      case 'settings':
        return (
          <div className="space-y-8 pb-20">
            <div className={`p-8 rounded-3xl border shadow-sm space-y-8 ${modeClasses.card}`}>
              <h3 className="text-2xl font-bold flex items-center space-x-2">
                <UserIcon size={24} className={THEMES[theme].text} />
                <span>Perfil de Usuario</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase ${modeClasses.textMuted}`}>Nombre</label>
                  <input 
                    className={`w-full px-4 py-2 rounded-xl border bg-transparent transition-colors ${mode === AppMode.LIGHT ? 'border-slate-200' : 'border-white/10 text-slate-50'}`}
                    value={stats.userName}
                    onChange={(e) => setStats({...stats, userName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase ${modeClasses.textMuted}`}>Avatar URL</label>
                  <input 
                    className={`w-full px-4 py-2 rounded-xl border bg-transparent transition-colors ${mode === AppMode.LIGHT ? 'border-slate-200' : 'border-white/10 text-slate-50'}`}
                    value={stats.avatarUrl}
                    onChange={(e) => setStats({...stats, avatarUrl: e.target.value})}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={() => {
                    if(confirm("¿Estás seguro de que quieres borrar todo tu progreso?")) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="text-rose-500 text-sm font-bold hover:underline"
                >
                  Borrar todos los datos locales
                </button>
              </div>
            </div>

            <div className={`p-8 rounded-3xl border shadow-sm space-y-10 ${modeClasses.card}`}>
              <h3 className="text-2xl font-bold">Personalización</h3>
              <section className="space-y-4">
                <p className={`text-sm font-bold uppercase tracking-wider ${modeClasses.textMuted}`}>Modo de Apariencia</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: AppMode.LIGHT, label: 'Claro', icon: Sun },
                    { id: AppMode.DARK, label: 'Oscuro', icon: Moon },
                    { id: AppMode.NEON, label: 'Neón', icon: Zap },
                    { id: AppMode.HIGH_CONTRAST, label: 'Contraste', icon: Eye },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        mode === m.id ? `border-current ${THEMES[theme].text} bg-white/5 scale-105 shadow-lg` : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <m.icon size={24} className="mb-2" />
                      <span className="text-sm font-medium">{m.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <p className={`text-sm font-bold uppercase tracking-wider ${modeClasses.textMuted}`}>Color de Acento</p>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                  {Object.values(ThemeColor).map((val) => {
                    const colorMap: Record<ThemeColor, string> = {
                      [ThemeColor.VIOLET]: 'bg-violet-600', [ThemeColor.EMERALD]: 'bg-emerald-600',
                      [ThemeColor.SKY]: 'bg-sky-600', [ThemeColor.AMBER]: 'bg-amber-600',
                      [ThemeColor.ROSE]: 'bg-rose-600', [ThemeColor.INDIGO]: 'bg-indigo-600',
                      [ThemeColor.LIME]: 'bg-lime-600', [ThemeColor.ORANGE]: 'bg-orange-600',
                      [ThemeColor.CYAN]: 'bg-cyan-600', [ThemeColor.FUCHSIA]: 'bg-fuchsia-600',
                    };
                    return (
                      <button 
                        key={val} 
                        onClick={() => setTheme(val)} 
                        className={`w-full aspect-square rounded-full border-4 transition-all ${theme === val ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'} ${colorMap[val]}`} 
                        title={val}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        );
      default:
        return <Dashboard stats={stats} habits={habits} subjects={subjects} theme={theme} mode={mode} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} theme={theme} mode={mode}>
      {renderContent()}
    </Layout>
  );
};

export default App;
