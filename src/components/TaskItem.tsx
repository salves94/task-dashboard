import { useState } from 'react';
import type { Task } from '../types/index';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void; // Añadir esto
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);

  const handleUpdate = () => {
    onUpdate(task.id, editText, editCategory);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm group min-h-[80px]">
      <div className="flex items-center gap-4 flex-1 mr-4"> {/* flex-1 permite que esto crezca sin expulsar a los botones */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 rounded-full border-2 border-indigo-500 checked:bg-indigo-500 cursor-pointer flex-shrink-0"
        />
        
        <div className="flex flex-col items-start w-full gap-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
                className="w-full p-1 border-b-2 border-indigo-300 outline-none text-gray-800 text-sm"
              />
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as Task['category'])}
                className="mt-1 text-[10px] font-bold uppercase bg-gray-50 border border-gray-200 rounded p-1 outline-none text-indigo-600"
              >
                <option value="Personal">Personal</option>
                <option value="Trabajo">Trabajo</option>
                <option value="Salud">Salud</option>
              </select>
            </>
          ) : (
            <>
              <p
                className={`font-medium break-all ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
              >
                {task.title}
              </p>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] uppercase tracking-widest font-bold rounded-md">
                {task.category}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Contenedor de botones fijo a la derecha */}
      <div className="flex gap-1 flex-shrink-0">
        <button 
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isEditing) handleUpdate();
            else setIsEditing(true);
          }}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-indigo-600 transition-all p-2"
        >
          {isEditing ? '💾' : '✏️'}
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-2"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}