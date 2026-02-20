'use client';

import { Agent, AgentStatus } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { cn, getStatusLabel } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
}

const statusConfig: Record<AgentStatus, { color: string; animate: boolean }> = {
  sleeping: { color: 'bg-slate-400', animate: false },
  working: { color: 'bg-emerald-500', animate: true },
  blocked: { color: 'bg-red-500', animate: false },
};

export function AgentCard({ agent }: AgentCardProps) {
  const config = statusConfig[agent.status];

  return (
    <div className="glass-card p-4 flex items-center gap-4">
      <div className="relative">
        <Avatar 
          fallback={agent.name.charAt(0)} 
          size="lg"
        />
        <span 
          className={cn(
            'absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white',
            config.color,
            config.animate && 'animate-pulse-working'
          )}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-800 truncate">
            {agent.name}
          </h3>
          {agent.function && (
            <span className="text-xs text-slate-400">
              {agent.function}
            </span>
          )}
        </div>
        
        <p className="text-sm text-slate-500 mt-1">
          {getStatusLabel(agent.status)}
        </p>
      </div>
    </div>
  );
}
