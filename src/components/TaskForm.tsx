import { useState } from 'react';
import type { Task } from '../types/index';

interface Props {
  onAddTask: (title: string, category: Task['category']) => void;
}

export function TaskForm({ onAddTask }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title, category);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué tienes pendiente?"
          className="w-full p-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <div className="flex justify-between items-center">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value as Task['category'])}
            className="p-2 bg-gray-50 rounded-lg text-sm font-medium"
          >
            <option value="Personal">🏠 Personal</option>
            <option value="Trabajo">💼 Trabajo</option>
            <option value="Salud">🍎 Salud</option>
          </select>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Añadir
          </button>
        </div>
      </div>
    </form>
  );
}