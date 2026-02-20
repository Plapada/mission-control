'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreVertical, Calendar } from 'lucide-react';
import { Task, TaskPriority } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { formatRelativeTime, cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
}

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  low: { label: 'Low', className: 'priority-low' },
  medium: { label: 'Medium', className: 'priority-medium' },
  high: { label: 'High', className: 'priority-high' },
  urgent: { label: 'Urgent', className: 'priority-urgent' },
};

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priority = priorityConfig[task.priority];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'glass-card p-4 cursor-grab active:cursor-grabbing group',
        isDragging && 'opacity-50 rotate-2'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', priority.className)}>
          {priority.label}
        </span>
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded transition-all">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-sm text-slate-500 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="w-3 h-3" />
          {formatRelativeTime(task.created_at)}
        </div>

        {task.agent && (
          <div className="flex items-center gap-2">
            <Avatar 
              fallback={task.agent.name.charAt(0)} 
              size="sm" 
            />
            <span className="text-xs text-slate-500">{task.agent.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
