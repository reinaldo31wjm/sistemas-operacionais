# documentação de projeto

## 1. identificação

**Nome:** System Monitor  
**Tipo:** painel web de observabilidade  
**Finalidade:** estudo acadêmico e diagnóstico básico do ambiente de execução  
**Público:** estudantes, desenvolvedores e pessoas responsáveis por validar um serviço Node.js

## 2. contexto e problema

Serviços web precisam de sinais mínimos de operação para indicar se continuam ativos e se o ambiente apresenta indícios de sobrecarga. Sem uma visão centralizada, a pessoa responsável precisa consultar comandos do sistema, logs e endpoints separados.

O System Monitor reúne essas informações em um painel e em uma API simples. O projeto também demonstra uma prática importante de engenharia: cada comportamento relevante deve ter uma explicação que permita executar, verificar e manter o sistema.

## 3. objetivo

Coletar e exibir métricas operacionais atuais do ambiente de execução, fornecendo uma interface visual para diagnóstico e endpoints HTTP para verificação automatizada.

## 4. escopo

### Incluído

- coleta de CPU, memória, disco, carga do sistema e uptime;
- leitura de memória e uptime do processo Node.js;
- exposição das métricas em `GET /api/stats`;
- painel web com atualização periódica, pausa e atualização manual;
- histórico recente de diagnóstico no cliente;
- endpoint `GET /healthz`;
- serviço de arquivos estáticos com validação de caminhos;
- cabeçalhos básicos de segurança;
- execução local com Node.js;
- implantação preparada para Render;
- documentação técnica e operacional.

### Fora do escopo

- autenticação e autorização;
- banco de dados ou armazenamento histórico no servidor;
- alertas por e-mail, webhook ou mensageria;
- controle remoto do servidor monitorado;
- garantia de medição do hardware físico da hospedagem;
- suíte completa de testes automatizados;
- gerenciamento de usuários ou múltiplos painéis.

## 5. requisitos funcionais

| id | requisito | critério de aceitação |
| --- | --- | --- |
| rf-01 | apresentar o painel | `GET /` retorna uma página HTML funcional; |
| rf-02 | fornecer métricas | `GET /api/stats` retorna JSON com timestamp, CPU, memória, uptime e disco; |
| rf-03 | atualizar automaticamente | o navegador consulta a API e atualiza os indicadores; |
| rf-04 | atualizar manualmente | o usuário consegue solicitar uma nova leitura; |
| rf-05 | pausar atualizações | o usuário consegue interromper e retomar o ciclo automático; |
| rf-06 | exibir diagnóstico | a interface apresenta histórico recente de indicadores; |
| rf-07 | informar disponibilidade | `GET /healthz` retorna `{"status":"ok"}` com o processo ativo; |
| rf-08 | servir arquivos | CSS e JavaScript são entregues com caminho e tipo de conteúdo válidos; |
| rf-09 | aceitar configuração | o serviço utiliza `PORT` e trata `SHOW_HOST_DETAILS` conforme documentado. |

## 6. requisitos não funcionais

| id | requisito | critério de aceitação |
| --- | --- | --- |
| rnf-01 | compatibilidade | Node.js 18.15 ou superior consegue executar o serviço; |
| rnf-02 | reprodutibilidade | uma cópia limpa do repositório inicia sem dependências externas de runtime; |
| rnf-03 | desempenho | coleta de CPU e leituras frequentes utilizam amostragem ou cache curto; |
| rnf-04 | acessibilidade | a interface permite navegação por teclado e respeita redução de movimento; |
| rnf-05 | segurança | o servidor aplica CSP, valida arquivos estáticos e não deve expor segredos; |
| rnf-06 | operação | o serviço escuta a porta configurada e possui endpoint de health check; |
| rnf-07 | manutenção | alterações de comportamento devem atualizar os documentos relacionados. |

## 7. cenários de uso

### diagnóstico rápido

A pessoa acessa o painel, observa CPU, memória e disco e consulta o diagnóstico para verificar se existe tendência recente de aumento.

### verificação de hospedagem

A plataforma inicia o processo com `npm start`, fornece `PORT` e consulta `/healthz`. Uma resposta positiva indica que o processo está respondendo, mas não garante que todas as métricas estejam disponíveis.

### integração por script

Um script interno consulta `/api/stats` e pode armazenar os resultados externamente. O System Monitor não promete retenção, agregação ou análise histórica desses dados.

### estudo de arquitetura

Estudantes relacionam `lib/metrics.js`, `server.js`, `lib/page.js` e `public/` ao fluxo de uma requisição, observando como a coleta chega à interface.

## 8. critérios de qualidade documental

A documentação deve ser revisada quando houver alteração em rota, campo JSON, variável de ambiente, requisito, estrutura, segurança ou deploy. Nenhuma funcionalidade deve ser apresentada como implementada sem evidência no código.

Os arquivos principais do sistema são:

- `server.js`: servidor HTTP, rotas e proteção básica;
- `lib/metrics.js`: coleta e cache de métricas;
- `lib/page.js`: geração do HTML inicial;
- `public/`: CSS, JavaScript e animações;
- `render.yaml`: configuração de publicação;
- `docs/`: documentação técnica, operacional e didática.
