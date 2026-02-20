'use client';

import { useDroppable } from '@dnd-kit/core';
import { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { getStatusLabel, getStatusColor } from '@/lib/utils';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

const columnConfig: Record<TaskStatus, { icon: string; color: string }> = {
  todo: { icon: '📋', color: 'bg-slate-400' },
  in_progress: { icon: '⚡', color: 'bg-blue-500' },
  review: { icon: '👀', color: 'bg-amber-500' },
  done: { icon: '✅', color: 'bg-emerald-500' },
};

export function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const config = columnConfig[status];

  return (
    <div className="flex-1 min-w-[280px] max-w-[350px]">
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className={cn('w-3 h-3 rounded-full', config.color)} />
        <h2 className="font-semibold text-slate-700">
          {getStatusLabel(status)}
        </h2>
        <span className="ml-auto bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium">
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'kanban-column space-y-3 transition-colors',
          isOver && 'bg-blue-50/50 ring-2 ring-blue-500/20'
        )}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <span className="text-2xl mb-2">{config.icon}</span>
            <p className="text-sm">No tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
}
