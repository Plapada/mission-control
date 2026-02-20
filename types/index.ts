// Types for Mission Control Dashboard

export type AgentStatus = 'sleeping' | 'working' | 'blocked';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Agent {
  id: string;
  name: string;
  function: string;
  status: AgentStatus;
  thread_id: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  agent_id?: string;
  agent?: Agent;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface ActivityLog {
  id: string;
  agent_id: string;
  agent?: Agent;
  action: string;
  details: Record<string, any>;
  timestamp: string;
}

export interface TokenUsage {
  id: string;
  agent_id?: string;
  agent?: Agent;
  model: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  cost: number;
  session_key?: string;
  timestamp: string;
}

export interface TokenStats {
  totalSpend: number;
  monthlyBudget: number;
  avgPerSession: number;
  usagePercentage: number;
}

export interface TokenUsageByModel {
  model: string;
  totalTokens: number;
  totalCost: number;
  percentage: number;
}

export interface MonthlyUsage {
  month: string;
  tokens: number;
}
