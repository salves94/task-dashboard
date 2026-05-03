import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task } from './types/index';

// Asegúrate de que estos archivos existan en src/components/
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks-v1', []);
  const [filter, setFilter] = useState<'Todas' | Task['category']>('Todas');

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

  const filteredTasks = tasks.filter(t => filter === 'Todas' || t.category === filter);

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-black mb-8 text-indigo-600">TaskFlow</h1>

      <TaskForm onAddTask={handleAddTask} />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['Todas', 'Personal', 'Trabajo', 'Salud'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              filter === f ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filteredTasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-center py-10 text-gray-400 italic">No hay tareas en esta categoría.</p>
        )}
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