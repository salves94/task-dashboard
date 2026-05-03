import type { Task } from '../types/index';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm group">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 rounded-full border-2 border-indigo-500 checked:bg-indigo-500 transition-all cursor-pointer"
        />
        <div>
          <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </p>
          <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">
            {task.category}
          </span>
        </div>
      </div>
      <button 
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-2"
      >
        🗑️
      </button>
    </div>
  );
}