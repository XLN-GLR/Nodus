
import React, { useState, useRef, useEffect } from 'react';
import { Plus, BookOpen, User, Calendar as CalendarIcon, FileText, CheckCircle2, ChevronRight, Notebook as NoteIcon, Inbox } from 'lucide-react';
import { Subject, ThemeColor, Task, AppMode, Note } from '../types';
import { THEMES, MODE_CONFIG } from '../constants';

interface ClassroomProps {
  subjects: Subject[];
  onAddSubject: (subject: Subject) => void;
  onAddTask: (subjectId: string, task: Task) => void;
  onAddNote: (subjectId: string, note: Note) => void;
  onToggleTask: (subjectId: string, taskId: string) => void;
  theme: ThemeColor;
  mode: AppMode;
}

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

const Classroom: React.FC<ClassroomProps> = ({ subjects, onAddSubject, onAddTask, onAddNote, onToggleTask, theme, mode }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'classes' | 'tasks'>('classes');
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  
  const [newSubName, setNewSubName] = useState('');
  const [newSubInstr, setNewSubInstr] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const themeClasses = THEMES[theme];
  const modeClasses = MODE_CONFIG[mode];
  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  const handleAddSubject = () => {
    if (!newSubName.trim()) return;
    onAddSubject({
      id: Math.random().toString(36).substr(2, 9),
      name: newSubName,
      instructor: newSubInstr || 'Sin instructor',
      color: themeClasses.primary,
      tasks: [],
      notes: []
    });
    setNewSubName(''); setNewSubInstr(''); setIsAddingSubject(false);
  };

  const handleAddTask = () => {
    if (!selectedSubjectId || !newTaskTitle.trim()) return;
    onAddTask(selectedSubjectId, {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      dueDate: newTaskDate || new Date().toISOString().split('T')[0],
      completed: false
    });
    setNewTaskTitle(''); setNewTaskDate('');
  };

  const handleAddNote = () => {
    if (!selectedSubjectId || !newNoteTitle.trim()) return;
    onAddNote(selectedSubjectId, {
      id: Math.random().toString(36).substr(2, 9),
      title: newNoteTitle,
      content: newNoteContent,
      createdAt: new Date().toLocaleDateString()
    });
    setNewNoteTitle(''); setNewNoteContent('');
  };

  const inputBaseClasses = `w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 bg-transparent transition-all ${
    mode === AppMode.LIGHT ? 'border-slate-200 focus:ring-slate-400 text-slate-900' : 'border-white/20 focus:ring-white/40 text-white placeholder:text-white/30'
  }`;

  if (selectedSubjectId && selectedSubject) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 pb-20">
        <button onClick={() => setSelectedSubjectId(null)} className={`${modeClasses.textMuted} hover:text-white flex items-center space-x-1 mb-2`}>
          <ChevronRight className="rotate-180" size={18} />
          <span>Volver a mis materias</span>
        </button>

        <div className={`p-8 rounded-[2.5rem] text-white ${themeClasses.primary} shadow-lg relative overflow-hidden ${mode === AppMode.NEON ? themeClasses.neon : ''}`}>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-1">{selectedSubject.name}</h2>
            <div className="flex items-center space-x-4 text-white/80 font-medium">
              <span className="flex items-center space-x-1"><User size={16} /> <span>{selectedSubject.instructor}</span></span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 border-b border-white/10">
          <button 
            onClick={() => setActiveSubTab('classes')}
            className={`pb-2 px-4 font-bold transition-all ${activeSubTab === 'classes' ? `${themeClasses.text} border-b-2 border-current` : modeClasses.textMuted}`}
          >
            Clases y Apuntes
          </button>
          <button 
            onClick={() => setActiveSubTab('tasks')}
            className={`pb-2 px-4 font-bold transition-all ${activeSubTab === 'tasks' ? `${themeClasses.text} border-b-2 border-current` : modeClasses.textMuted}`}
          >
            Tareas y Entregas
          </button>
        </div>

        {activeSubTab === 'classes' ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className={`p-6 rounded-3xl border shadow-sm ${modeClasses.card}`}>
                <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
                  <NoteIcon size={20} className={themeClasses.text} />
                  <span>Nueva Clase / Apunte</span>
                </h3>
                <div className="space-y-4">
                  <input className={inputBaseClasses} placeholder="Título del tema..." value={newNoteTitle} onChange={(e)=>setNewNoteTitle(e.target.value)} />
                  <AutoResizeTextarea className={`${inputBaseClasses} min-h-[120px]`} placeholder="Escribe tus apuntes aquí..." value={newNoteContent} onChange={(e: any)=>setNewNoteContent(e.target.value)} />
                  <button onClick={handleAddNote} className={`w-full py-3 rounded-2xl text-white font-black ${themeClasses.primary} shadow-lg active:scale-95 transition-transform`}>Guardar Apunte</button>
                </div>
              </div>

              <div className="space-y-6">
                {selectedSubject.notes.map(note => (
                  <div key={note.id} className={`p-8 rounded-[2rem] border shadow-sm ${modeClasses.card}`}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-black text-xl">{note.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${mode === AppMode.LIGHT ? 'bg-slate-100' : 'bg-white/5'} ${modeClasses.textMuted}`}>{note.createdAt}</span>
                    </div>
                    <p className="whitespace-pre-wrap opacity-80 leading-relaxed text-sm sm:text-base">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className={`p-6 rounded-3xl border shadow-sm ${modeClasses.card}`}>
                <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
                  <FileText size={20} className={themeClasses.text} />
                  <span>Programar Tarea</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${modeClasses.textMuted}`}>TEMA DE TAREA</label>
                    <input className={inputBaseClasses} placeholder="Nombre de la tarea..." value={newTaskTitle} onChange={(e)=>setNewTaskTitle(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${modeClasses.textMuted}`}>FECHA DE ENTREGA</label>
                    <input type="date" className={inputBaseClasses} value={newTaskDate} onChange={(e)=>setNewTaskDate(e.target.value)} />
                  </div>
                </div>
                <button onClick={handleAddTask} className={`w-full py-3 rounded-2xl text-white font-black ${themeClasses.primary} shadow-lg active:scale-95 transition-transform`}>Añadir Tarea</button>
              </div>

              <div className="space-y-3">
                {selectedSubject.tasks.map(task => (
                  <div key={task.id} className={`flex items-center justify-between p-5 rounded-2xl border ${modeClasses.subCard}`}>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => onToggleTask(selectedSubject.id, task.id)} className={`transition-all ${task.completed ? themeClasses.text : modeClasses.textMuted}`}>
                        <CheckCircle2 size={28} fill={task.completed ? 'currentColor' : 'none'} strokeWidth={2.5} />
                      </button>
                      <div>
                        <p className={`font-bold ${task.completed ? 'line-through opacity-40' : ''}`}>{task.title}</p>
                        <p className={`text-[11px] font-bold flex items-center space-x-1 ${modeClasses.textMuted} mt-0.5 uppercase tracking-wider`}>
                           <CalendarIcon size={12} /> <span>Vence: {task.dueDate}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black">Mis Materias</h3>
          <p className={modeClasses.textMuted}>Organiza tus clases y tareas</p>
        </div>
        <button onClick={() => setIsAddingSubject(true)} className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-bold shadow-lg transition-all active:scale-95 ${themeClasses.primary}`}>
          <Plus size={20} />
          <span>Nueva Materia</span>
        </button>
      </div>

      {isAddingSubject && (
        <div className={`p-8 rounded-[2rem] border shadow-xl ${modeClasses.card} animate-in zoom-in-95`}>
           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ${modeClasses.textMuted}`}>NOMBRE DE MATERIA</label>
                <input placeholder="Ej. Matemáticas Avanzadas" className={inputBaseClasses} value={newSubName} onChange={(e) => setNewSubName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] font-black uppercase tracking-widest ${modeClasses.textMuted}`}>INSTRUCTOR / PROFESOR</label>
                <input placeholder="Nombre del docente" className={inputBaseClasses} value={newSubInstr} onChange={(e) => setNewSubInstr(e.target.value)} />
              </div>
           </div>
           <div className="mt-8 flex justify-end space-x-4">
              <button onClick={() => setIsAddingSubject(false)} className={`${modeClasses.textMuted} font-bold`}>Cancelar</button>
              <button onClick={handleAddSubject} className={`px-8 py-3 text-white rounded-2xl font-black shadow-lg ${themeClasses.primary}`}>Crear Materia</button>
           </div>
        </div>
      )}

      {subjects.length === 0 && !isAddingSubject && (
        <div className={`p-20 rounded-[3rem] border-2 border-dashed flex flex-col items-center text-center space-y-4 ${mode === AppMode.LIGHT ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
          <div className={`${modeClasses.textMuted} opacity-20`}><Inbox size={80} /></div>
          <p className={`${modeClasses.textMuted} font-medium`}>Aún no has agregado ninguna materia.<br/>Crea una para empezar a organizar tus apuntes.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map(subject => (
          <div key={subject.id} onClick={() => setSelectedSubjectId(subject.id)} className={`group cursor-pointer rounded-[2rem] border shadow-sm hover:shadow-2xl transition-all overflow-hidden ${modeClasses.card} hover:-translate-y-2`}>
            <div className={`h-32 ${subject.color} relative p-6 flex flex-col justify-end`}>
               <h4 className="text-white font-black text-2xl drop-shadow-lg leading-tight">{subject.name}</h4>
               <BookOpen className="absolute top-6 right-6 text-white/40" size={32} />
            </div>
            <div className="p-6 flex justify-between items-center bg-transparent">
              <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase tracking-wider ${modeClasses.textMuted}`}>Actividades</span>
                <span className="font-bold">{subject.tasks.length} tareas</span>
              </div>
              <span className={`font-black text-xs px-4 py-2 rounded-xl ${mode === AppMode.LIGHT ? 'bg-slate-50' : 'bg-white/5'} ${themeClasses.text}`}>GESTIONAR</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classroom;
