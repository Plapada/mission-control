-- Disable RLS and create public insert policy
ALTER TABLE agents DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE token_usage DISABLE ROW LEVEL SECURITY;

-- Insert sample agents
INSERT INTO agents (name, function, status, thread_id) VALUES
  ('Pi', 'Orchestrator', 'working', '40'),
  ('Master Planner', 'Planejador', 'working', '42'),
  ('DevCraft', 'Artesão de ferramentas', 'working', '433'),
  ('Creator', 'Criadora de agentes', 'working', '551');

-- Insert sample tasks
INSERT INTO tasks (title, description, priority, status) VALUES
  ('Finalizar Mission Control Dashboard', 'Terminar componentes e fazer deploy', 'high', 'in_progress'),
  ('Configurar Supabase', 'Criar banco de dados e executar script SQL', 'high', 'done'),
  ('Testar integração', 'Verificar se tudo está funcionando', 'medium', 'todo'),
  ('Deploy na Vercel', 'Fazer deploy do projeto Next.js', 'medium', 'todo');

-- Insert sample activities
INSERT INTO activity_logs (agent_id, action, details) 
SELECT id, 'Sistema inicializado', '{"source": "setup"}'::jsonb FROM agents LIMIT 1;

-- Insert sample token usage
INSERT INTO token_usage (agent_id, model, input_tokens, output_tokens, cost)
SELECT id, 'MiniMax-M2.5', 5000, 7500, 0.12 FROM agents WHERE name = 'Pi'
UNION ALL
SELECT id, 'MiniMax-M2.5', 8000, 12000, 0.18 FROM agents WHERE name = 'DevCraft'
UNION ALL
SELECT id, 'MiniMax-M2.5', 3000, 4500, 0.07 FROM agents WHERE name = 'Master Planner'
UNION ALL
SELECT id, 'MiniMax-M2.5', 4000, 6000, 0.09 FROM agents WHERE name = 'Creator';
