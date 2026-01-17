
import React from 'react';
import { 
  Book, 
  Dumbbell, 
  Coffee, 
  Code, 
  Briefcase, 
  Heart, 
  Music, 
  Camera, 
  GraduationCap, 
  Zap 
} from 'lucide-react';
import { AppMode, ThemeColor } from './types';

export const HABIT_ICONS = [
  { name: 'Book', component: <Book size={18} /> },
  { name: 'Dumbbell', component: <Dumbbell size={18} /> },
  { name: 'Coffee', component: <Coffee size={18} /> },
  { name: 'Code', component: <Code size={18} /> },
  { name: 'Briefcase', component: <Briefcase size={18} /> },
  { name: 'Heart', component: <Heart size={18} /> },
  { name: 'Music', component: <Music size={18} /> },
  { name: 'Camera', component: <Camera size={18} /> },
  { name: 'Zap', component: <Zap size={18} /> },
  { name: 'GraduationCap', component: <GraduationCap size={18} /> },
];

export const getIcon = (name: string) => {
  const icon = HABIT_ICONS.find(i => i.name === name);
  return icon ? icon.component : <Zap size={18} />;
};

export const THEMES = {
  [ThemeColor.VIOLET]: { primary: 'bg-violet-600', text: 'text-violet-600', ring: 'ring-violet-500', light: 'bg-violet-100', neon: 'shadow-[0_0_15px_rgba(139,92,246,0.5)] border-violet-500/50' },
  [ThemeColor.EMERALD]: { primary: 'bg-emerald-600', text: 'text-emerald-500', ring: 'ring-emerald-500', light: 'bg-emerald-100', neon: 'shadow-[0_0_15px_rgba(16,185,129,0.5)] border-emerald-500/50' },
  [ThemeColor.SKY]: { primary: 'bg-sky-600', text: 'text-sky-400', ring: 'ring-sky-500', light: 'bg-sky-100', neon: 'shadow-[0_0_15px_rgba(56,189,248,0.5)] border-sky-400/50' },
  [ThemeColor.AMBER]: { primary: 'bg-amber-600', text: 'text-amber-500', ring: 'ring-amber-500', light: 'bg-amber-100', neon: 'shadow-[0_0_15px_rgba(245,158,11,0.5)] border-amber-500/50' },
  [ThemeColor.ROSE]: { primary: 'bg-rose-600', text: 'text-rose-500', ring: 'ring-rose-500', light: 'bg-rose-100', neon: 'shadow-[0_0_15px_rgba(244,63,94,0.5)] border-rose-500/50' },
  [ThemeColor.INDIGO]: { primary: 'bg-indigo-600', text: 'text-indigo-400', ring: 'ring-indigo-500', light: 'bg-indigo-100', neon: 'shadow-[0_0_15px_rgba(129,140,248,0.5)] border-indigo-400/50' },
  [ThemeColor.LIME]: { primary: 'bg-lime-600', text: 'text-lime-400', ring: 'ring-lime-500', light: 'bg-lime-100', neon: 'shadow-[0_0_15px_rgba(163,230,53,0.5)] border-lime-400/50' },
  [ThemeColor.ORANGE]: { primary: 'bg-orange-600', text: 'text-orange-500', ring: 'ring-orange-500', light: 'bg-orange-100', neon: 'shadow-[0_0_15px_rgba(249,115,22,0.5)] border-orange-500/50' },
  [ThemeColor.CYAN]: { primary: 'bg-cyan-600', text: 'text-cyan-400', ring: 'ring-cyan-500', light: 'bg-cyan-100', neon: 'shadow-[0_0_15px_rgba(34,211,238,0.5)] border-cyan-400/50' },
  [ThemeColor.FUCHSIA]: { primary: 'bg-fuchsia-600', text: 'text-fuchsia-400', ring: 'ring-fuchsia-500', light: 'bg-fuchsia-100', neon: 'shadow-[0_0_15px_rgba(232,121,249,0.5)] border-fuchsia-400/50' },
};

export const MODE_CONFIG = {
  [AppMode.LIGHT]: {
    bg: 'bg-slate-50',
    sidebar: 'bg-white border-slate-200 text-slate-900',
    card: 'bg-white border-slate-100 text-slate-900 shadow-sm',
    header: 'bg-white/80 border-slate-200 text-slate-900',
    textMuted: 'text-slate-500',
    subCard: 'bg-slate-50 border-slate-100'
  },
  [AppMode.DARK]: {
    bg: 'bg-[#0f172a]',
    sidebar: 'bg-[#1e293b] border-slate-800 text-slate-100',
    card: 'bg-[#1e293b] border-slate-800 text-slate-100',
    header: 'bg-[#1e293b]/80 border-slate-800 text-slate-100',
    textMuted: 'text-slate-400',
    subCard: 'bg-slate-800/40 border-slate-700/50'
  },
  [AppMode.HIGH_CONTRAST]: {
    bg: 'bg-black',
    sidebar: 'bg-black border-white border-2 text-white',
    card: 'bg-black border-white border-2 text-white',
    header: 'bg-black border-white border-b-2 text-white',
    textMuted: 'text-yellow-400 font-bold',
    subCard: 'bg-black border-white border'
  },
  [AppMode.NEON]: {
    bg: 'bg-[#010204]', // Negro casi absoluto para máximo contraste con el neón
    sidebar: 'bg-black border-white/10 text-slate-100',
    card: 'bg-[#0a0c10] border-white/10 text-white backdrop-blur-md', // Fondo muy oscuro para tarjetas
    header: 'bg-black/80 border-white/10 text-white',
    textMuted: 'text-cyan-300/90 font-medium', // Texto cian brillante pero legible
    subCard: 'bg-white/[0.03] border-white/10'
  }
};
