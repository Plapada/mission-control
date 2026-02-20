-- Remove duplicate agents (keep only the oldest ones)
DELETE FROM agents 
WHERE id IN (
  SELECT id FROM agents 
  WHERE name IN ('Pi', 'Master Planner', 'DevCraft', 'Creator')
  AND created_at > (
    SELECT MIN(created_at) FROM agents a2 
    WHERE a2.name = agents.name
  )
);
