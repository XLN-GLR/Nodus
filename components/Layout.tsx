
import React from 'react';
import { LayoutDashboard, Calendar, BookOpen, Timer, Settings, HelpCircle } from 'lucide-react';
import { ThemeColor, UserStats, AppMode } from '../types';
import { THEMES, MODE_CONFIG } from '../constants';
import NodusLogo from './NodusLogo';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats: UserStats;
  theme: ThemeColor;
  mode: AppMode;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, stats, theme, mode }) => {
  const themeClasses = THEMES[theme];
  const modeClasses = MODE_CONFIG[mode];
  const progressPercentage = (stats.exp / stats.totalExpToNextLevel) * 100;

  const NavItem = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? `${themeClasses.primary} text-white shadow-lg ${mode === AppMode.NEON ? themeClasses.neon : ''}` 
          : `${modeClasses.textMuted} hover:bg-white/5`
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className={`flex h-screen transition-colors duration-500 ${modeClasses.bg} ${modeClasses.card}`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r flex flex-col hidden md:flex ${modeClasses.sidebar}`}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center space-x-3 mb-6">
            <NodusLogo theme={theme} mode={mode} size={40} />
            <h1 className="text-2xl font-black tracking-tighter">Nodus</h1>
          </div>

          <div className="space-y-2">
            <div className={`flex justify-between text-xs font-bold uppercase ${modeClasses.textMuted}`}>
              <span>Nivel {stats.level}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className={`w-full rounded-full h-2 ${mode === AppMode.LIGHT ? 'bg-slate-100' : 'bg-white/10'}`}>
              <div 
                className={`${themeClasses.primary} h-2 rounded-full transition-all duration-500 ${mode === AppMode.NEON ? themeClasses.neon : ''}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className={`text-[10px] text-center ${modeClasses.textMuted}`}>{Math.round(stats.exp)} / {stats.totalExpToNextLevel} EXP</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="habits" icon={Calendar} label="Hábitos" />
          <NavItem id="classroom" icon={BookOpen} label="Aula Virtual" />
          <NavItem id="pomodoro" icon={Timer} label="Pomodoro" />
          <NavItem id="help" icon={HelpCircle} label="Ayuda" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <NavItem id="settings" icon={Settings} label="Ajustes" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className={`sticky top-0 z-10 glass border-b px-8 py-4 flex justify-between items-center ${modeClasses.header}`}>
          <div className="flex items-center space-x-3">
            <div className="md:hidden">
               <NodusLogo theme={theme} mode={mode} size={32} />
            </div>
            <h2 className="text-xl font-semibold capitalize">
              {activeTab === 'classroom' ? 'Aula Virtual' : activeTab === 'help' ? 'Guía de Ayuda' : activeTab}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex flex-col items-end mr-2">
               <span className="font-bold text-sm leading-none">{stats.userName}</span>
               <span className={`text-[10px] font-bold ${themeClasses.text}`}>LVL {stats.level}</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white/20">
                <img src={stats.avatarUrl} alt="Avatar" />
             </div>
          </div>
        </header>
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 border-t flex justify-around p-2 z-50 ${modeClasses.sidebar}`}>
          <button onClick={() => setActiveTab('dashboard')} className={`p-3 ${activeTab === 'dashboard' ? themeClasses.text : modeClasses.textMuted}`}><LayoutDashboard size={24} /></button>
          <button onClick={() => setActiveTab('habits')} className={`p-3 ${activeTab === 'habits' ? themeClasses.text : modeClasses.textMuted}`}><Calendar size={24} /></button>
          <button onClick={() => setActiveTab('classroom')} className={`p-3 ${activeTab === 'classroom' ? themeClasses.text : modeClasses.textMuted}`}><BookOpen size={24} /></button>
          <button onClick={() => setActiveTab('pomodoro')} className={`p-3 ${activeTab === 'pomodoro' ? themeClasses.text : modeClasses.textMuted}`}><Timer size={24} /></button>
          <button onClick={() => setActiveTab('help')} className={`p-3 ${activeTab === 'help' ? themeClasses.text : modeClasses.textMuted}`}><HelpCircle size={24} /></button>
      </nav>
    </div>
  );
};

export default Layout;
