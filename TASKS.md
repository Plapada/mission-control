# Mission Control Dashboard - Task List

## Projeto: Mission Control Dashboard
**Supabase MCP:** marinaldopaulino-supabase  
**Última atualização:** 2026-02-20

---

## 📋 TASKS

### FASE 1: Configuração do Supabase

- [x] **1.1** Conectar no projeto Supabase via MCP
- [x] **1.2** Executar script SQL de criação das tabelas (agents, tasks, activity_logs, token_usage)
- [x] **1.3** Verificar se as tabelas foram criadas corretamente
- [x] **1.4** Inserir dados de exemplo (agents, tasks, activities)
- [x] **1.5** Habilitar realtime nas tabelas

### FASE 2: Configuração do Projeto

- [x] **2.1** Criar arquivo `.env.local` com as chaves do Supabase
- [ ] **2.2** Testar conexão com o banco via API
- [ ] **2.3** Verificar se as API routes estão funcionando

### FASE 3: Visuais com Stitch

- [ ] **3.1** Gerar visual da tela principal (Dashboard com Kanban)
- [ ] **3.2** Gerar visual da página de Tasks
- [ ] **3.3** Gerar visual da página de Team/Agentes
- [ ] **3.4** Gerar visual da página de Tokens
- [ ] **3.5** Revisar e validar os visuais com o usuário

### FASE 4: Frontend Next.js

- [ ] **4.1** Ajustar componentes conforme visuais do Stitch
- [ ] **4.2** Implementar Kanban Board completo
- [ ] **4.3** Implementar Agent List com status
- [ ] **4.4** Implementar Activity Feed
- [ ] **4.5** Implementar Token Stats e Gráficos
- [ ] **4.6** Implementar Realtime subscriptions

### FASE 5: Tool OpenClaw

- [ ] **5.1** Configurar variáveis de ambiente da tool
- [ ] **5.2** Testar funções da tool (createTask, updateStatus, etc)
- [ ] **5.3** Registrar tool no OpenClaw

### FASE 6: Deploy

- [ ] **6.1** Criar repositório no GitHub
- [ ] **6.2** Fazer deploy na Vercel
- [ ] **6.3** Configurar variáveis de produção
- [ ] **6.4** Testar aplicação em produção
- [ ] **6.5** Validar realtime em produção

---

## 📌 Observações

- **Supabase MCP:** marinaldopaulino-supabase
- **Stitch API Key:** Configurada no gateway
- **Projeto Next.js:** `mission-control/`
- **Tool:** `mission-control-tool/`
