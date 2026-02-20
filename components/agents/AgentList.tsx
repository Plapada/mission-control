'use client';

import { Agent } from '@/types';
import { AgentCard } from './AgentCard';

interface AgentListProps {
  agents: Agent[];
}

export function AgentList({ agents }: AgentListProps) {
  if (agents.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-slate-400">No agents found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
