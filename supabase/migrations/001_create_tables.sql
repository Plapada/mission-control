-- Mission Control Database Schema
-- Migration: 001_create_mission_control_tables.sql

-- Create Enums
DO $$ BEGIN
  CREATE TYPE agent_status AS ENUM ('sleeping', 'working', 'blocked');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'review', 'done');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Agents Table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  function VARCHAR(255),
  status agent_status DEFAULT 'sleeping',
  thread_id VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  status task_status DEFAULT 'todo',
  priority task_priority DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  action VARCHAR(500) NOT NULL,
  details JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Token Usage Table
CREATE TABLE IF NOT EXISTS token_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  model VARCHAR(100) NOT NULL,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER GENERATED ALWAYS AS (input_tokens + output_tokens) STORED,
  cost DECIMAL(10, 6) DEFAULT 0,
  session_key VARCHAR(100),
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_agent_id ON tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_agent_id ON activity_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_token_usage_agent_id ON token_usage(agent_id);
CREATE INDEX IF NOT EXISTS idx_token_usage_timestamp ON token_usage(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_token_usage_model ON token_usage(model);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE agents;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE activity_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE token_usage;

-- Insert Sample Agents (if not exists)
INSERT INTO agents (name, function, status, thread_id) VALUES
  ('Pi', 'Orchestrator', 'working', '40'),
  ('Master Planner', 'Planejador', 'working', '42'),
  ('DevCraft', 'Artesão de ferramentas', 'working', '433'),
  ('Creator', 'Criadora de agentes', 'working', '551')
ON CONFLICT DO NOTHING;

-- Insert Sample Tasks (if not exists)
INSERT INTO tasks (title, description, priority, status) VALUES
  ('Finalizar Mission Control Dashboard', 'Terminar componentes e fazer deploy', 'high', 'in_progress'),
  ('Configurar Supabase', 'Criar banco de dados e executar script SQL', 'high', 'done'),
  ('Testar integração', 'Verificar se tudo está funcionando', 'medium', 'todo'),
  ('Deploy na Vercel', 'Fazer deploy do projeto Next.js', 'medium', 'todo')
ON CONFLICT DO NOTHING;

-- Insert Sample Activities (if not exists)
INSERT INTO activity_logs (agent_id, action, details) 
SELECT id, 'Sistema inicializado', '{"source": "migration"}'::jsonb FROM agents WHERE name = 'DevCraft'
ON CONFLICT DO NOTHING;

-- Insert Sample Token Usage (if not exists)
INSERT INTO token_usage (agent_id, model, input_tokens, output_tokens, cost) VALUES
((SELECT id FROM agents WHERE name = 'Pi' LIMIT 1), 'MiniMax-M2.5', 5000, 7500, 0.12),
((SELECT id FROM agents WHERE name = 'DevCraft' LIMIT 1), 'MiniMax-M2.5', 8000, 12000, 0.18),
((SELECT id FROM agents WHERE name = 'Master Planner' LIMIT 1), 'MiniMax-M2.5', 3000, 4500, 0.07),
((SELECT id FROM agents WHERE name = 'Creator' LIMIT 1), 'MiniMax-M2.5', 4000, 6000, 0.09)
ON CONFLICT DO NOTHING;
