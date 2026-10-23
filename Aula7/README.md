# Aula 7 — Implementação do System Monitor

Esta aula implementa o projeto **System Monitor**, um painel de observabilidade de servidor em Node.js nativo. O sistema coleta métricas do ambiente em que o processo está executando, expõe os dados por uma API HTTP e apresenta um painel web atualizado automaticamente.

O projeto desta aula é o repositório [`reinaldo31wjm/system-monitor`](https://github.com/reinaldo31wjm/system-monitor). O código foi mantido como estudo de caso central; o PDF da aula permanece na raiz da pasta.

## Objetivos

Ao concluir a implementação, você deverá compreender como:

- criar um servidor HTTP sem framework externo;
- separar coleta de métricas, renderização e arquivos estáticos;
- medir CPU por amostragem periódica;
- interpretar memória, disco, carga e uptime;
- exibir quantidade de arquivos, IP principal, status, arquitetura, endianness e versão do Node.js;
- distinguir execução local de execução em nuvem e identificar porta e provedor;
- expor dados em JSON e construir uma interface web;
- aplicar configuração por ambiente, health check e headers básicos de segurança;
- preparar o serviço para execução local e deploy no Render.

## Estrutura do projeto

```text
system-monitor/
├── server.js                  # servidor HTTP, rotas e segurança
├── lib/
│   ├── metrics.js             # coleta, normalização e cache das métricas
│   └── page.js                # geração do HTML inicial
├── public/
│   ├── css/style.css          # layout e identidade visual
│   └── js/
│       ├── app.js             # atualização, abas e diagnóstico
│       └── rain.js            # animação visual em canvas
├── aula07-projetonuvemesistemasoperacionais.pdf
├── README.md                  # guia de implementação
├── RESUMO_AULA.md            # síntese da implementação
├── package.json               # scripts e versão mínima do Node.js
├── package-lock.json
└── render.yaml                # configuração de deploy
```

## Execução local

### Pré-requisito

Node.js 18.15 ou superior. O projeto não possui dependências externas de runtime.

```bash
git clone https://github.com/reinaldo31wjm/system-monitor.git
cd system-monitor
npm start
```

Acesse `http://localhost:3000`. Para desenvolvimento, use:

```bash
npm run dev
```

Para trocar a porta:

```bash
PORT=8080 npm start
```

No PowerShell:

```powershell
$env:PORT=8080; npm start
```

## Rotas implementadas

| Método | Rota | Finalidade |
|---|---|---|
| `GET` ou `HEAD` | `/` | Entrega o painel web. |
| `GET` ou `HEAD` | `/api/stats` | Retorna as métricas atuais em JSON. |
| `GET` ou `HEAD` | `/healthz` | Confirma que o processo HTTP está ativo. |
| `GET` ou `HEAD` | `/css/*` e `/js/*` | Entrega os arquivos permitidos de `public/`. |

Métodos diferentes de `GET` e `HEAD` retornam `405 Method Not Allowed`. Rotas inexistentes retornam `404`.

## Implementação em etapas

1. Leia `server.js` para identificar a criação do servidor e o roteamento.
2. Estude `lib/metrics.js`, especialmente `sampleCpu`, `getMemory`, `getDisk` e `getStats`.
3. Observe o cache curto das métricas e a amostragem de CPU em segundo plano.
4. Analise `lib/page.js` para entender como o HTML inicial é montado.
5. Consulte `public/js/app.js` para acompanhar atualização, pausa, abas e diagnóstico.
6. Consulte `public/js/rain.js` para observar a animação com redução de movimento.
7. Execute a aplicação e valide as rotas principais.
8. Altere uma métrica ou componente visual e documente a mudança.

## Validação

O projeto não possui uma suíte automatizada configurada. A validação mínima é feita com o servidor em execução:

```bash
npm start
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
curl -fsSI http://localhost:3000/
```

No navegador, verifique a atualização automática, o botão de atualização, a pausa, a aba de diagnóstico, os gráficos, a navegação por teclado e o comportamento com `prefers-reduced-motion`.

> O PDF preservado na raiz apresenta conceitos e um roteiro genérico de API. A implementação central desta versão é o System Monitor e usa o módulo HTTP nativo do Node.js, não Express.

## Configuração e deploy

| Variável | Padrão | Finalidade |
|---|---:|---|
| `PORT` | `3000` | Porta HTTP; em cloud deve aceitar o valor fornecido pela plataforma. |
| `SHOW_HOST_DETAILS` | `false` | Controla a exibição de usuário, home e MAC; mantenha desativada em serviços públicos. |

No Render, use `npm start` e configure `/healthz` como health check. O arquivo `render.yaml` já registra runtime, comando de inicialização e variáveis padrão.

## Relação com Sistemas Operacionais

- **CPU:** `os.cpus()` é amostrado a cada dois segundos; o uso é calculado pela diferença entre leituras.
- **Memória:** o código tenta usar limites de cgroup e `/proc/meminfo`, com fallback para `os.totalmem()` e `os.freemem()`.
- **Disco:** `fs.statfsSync()` é usado quando disponível; ambientes restritos podem retornar indisponível.
- **Processo:** `process.memoryUsage()`, `process.uptime()` e PID descrevem o Node.js.
- **Rede:** `os.networkInterfaces()` lista interfaces IPv4 visíveis ao processo.
- **Projeto:** o contador de arquivos ignora `.git` e `node_modules` e é atualizado em cache.
- **Ambiente:** a aplicação registra modo local/cloud, provedor detectado, `NODE_ENV` e porta HTTP.
- **Interpretação:** em contêineres, os valores podem representar limites da plataforma, não o hardware físico completo.

## Segurança e limites

O servidor aplica CSP, `X-Content-Type-Options`, `Referrer-Policy`, validação de caminhos e proteção contra path traversal. Isso não substitui autenticação, firewall ou revisão de segurança de produção.

O painel não possui autenticação, persistência histórica, alertas ou controle remoto. Não publique senhas, tokens, chaves, arquivos `.env` preenchidos ou detalhes restritos do host.

A API é consumida pelo próprio painel no mesmo domínio, portanto não há necessidade de habilitar CORS nesta versão. Se a API for consumida por outro domínio, será necessário definir uma política de origem permitida antes de publicar esse acesso.

## Comparação de plataformas

O projeto está preparado para o Render por meio de `render.yaml`, com `npm start` e `/healthz` como health check. Railway é uma alternativa tecnicamente compatível porque também pode executar `npm start` e receber `PORT`.

| Critério | Render | Railway |
|---|---|---|
| Configuração nesta entrega | `render.yaml` | Não configurado no projeto final |
| Comando | `npm start` | `npm start` |
| Porta | Variável `PORT` | Variável `PORT` |
| Health check | `/healthz` | Deve ser configurado no serviço |
| Evidência | Preparação declarativa | Comparação técnica, sem deploy realizado |

Não foi realizado um segundo deploy nesta entrega. Portanto, URL, tempo de build, disponibilidade e logs da segunda plataforma devem ser preenchidos somente após uma publicação real.

## Material didático

- [Enunciado da Aula 7](aula07-projetonuvemesistemasoperacionais.pdf)
- [Resumo de implementação](RESUMO_AULA.md)
- [Documentação completa da Aula 8](https://github.com/reinaldo31wjm/sistemas-operacionais-1/tree/main/Aula8)
