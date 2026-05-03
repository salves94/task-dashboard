import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task } from './types/index';

// Componentes
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';

// Definición de tipos para los filtros
type StatusFilter = 'pending' | 'completed';

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks-v1', []);
  const [filter, setFilter] = useState<'Todas' | Task['category']>('Todas');
  const [statusTab, setStatusTab] = useState<StatusFilter>('pending');

  const handleAddTask = (title: string, category: Task['category']) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      category,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (id: string, newTitle: string, newCategory: Task['category']) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, title: newTitle, category: newCategory } : t
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusTab === 'completed' ? task.completed : !task.completed;
    const matchesCategory = filter === 'Todas' || task.category === filter;
    return matchesStatus && matchesCategory;
  });

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto flex flex-col">
      <div className="flex-grow">
        <h1 className="text-4xl font-black mb-8 text-indigo-600">TaskFlow</h1>

        <TaskForm onAddTask={handleAddTask} />

        {/* Pestañas de Estado (Pendientes vs Hecho) */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setStatusTab('pending')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              statusTab === 'pending' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pendientes ({tasks.filter(t => !t.completed).length})
          </button>
          <button
            onClick={() => setStatusTab('completed')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              statusTab === 'completed' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Hecho ({tasks.filter(t => t.completed).length})
          </button>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['Todas', 'Personal', 'Trabajo', 'Salud'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                filter === f ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Lista de Tareas */}
        <div className="grid gap-3">
          {filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
              onUpdate={updateTask}
            />
          ))}
          {filteredTasks.length === 0 && (
            <p className="text-center py-10 text-gray-400 italic">
              No hay tareas {statusTab === 'completed' ? 'completadas' : 'pendientes'} en esta categoría.
            </p>
          )}
        </div>
      </div>

      <footer className="mt-12 py-6 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm font-medium">
          Desarrollado con ❤️ por <span className="text-indigo-600 font-bold">Sergio Alves</span>
        </p>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
          © {new Date().getFullYear()} — React + TypeScript
        </p>
      </footer>
    </main>
  );
}