
export enum ThemeColor {
  VIOLET = 'violet',
  EMERALD = 'emerald',
  SKY = 'sky',
  AMBER = 'amber',
  ROSE = 'rose',
  INDIGO = 'indigo',
  LIME = 'lime',
  ORANGE = 'orange',
  CYAN = 'cyan',
  FUCHSIA = 'fuchsia'
}

export enum AppMode {
  LIGHT = 'light',
  DARK = 'dark',
  HIGH_CONTRAST = 'high-contrast',
  NEON = 'neon'
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  time: string;
  color: string;
  icon: string;
  completedDates: string[]; // ISO Strings (YYYY-MM-DD)
  frequency: 'daily' | 'weekly';
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  instructor: string;
  color: string;
  tasks: Task[];
  notes: Note[];
}

export interface UserStats {
  level: number;
  exp: number;
  totalExpToNextLevel: number;
  userName: string;
  avatarUrl: string;
}
