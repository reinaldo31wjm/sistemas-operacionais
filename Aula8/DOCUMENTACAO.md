# Documentação técnica consolidada — System Monitor

Este documento reúne contexto, requisitos, arquitetura, API, operação, validação e deploy do projeto. Políticas de contribuição, segurança, conduta e licença ficam em arquivos próprios para evitar misturar responsabilidades.

## 1. Objetivo e escopo

O System Monitor é um painel web de observabilidade executado com Node.js nativo. Coleta CPU, memória, disco, carga, uptime, processo, interfaces de rede e contexto do ambiente; apresenta os dados no navegador e os disponibiliza em JSON.

### Incluído

- painel web responsivo em `/`;
- API de métricas em `/api/stats`;
- health check em `/healthz`;
- CPU por núcleo, memória, disco, carga e uptime;
- contagem de arquivos do projeto, IP principal, hostname, sistema operacional, arquitetura, endianness e versão do Node.js;
- identificação de modo local/cloud, provedor, `NODE_ENV` e porta;
- atualização automática, pausa, atualização manual e diagnóstico no navegador;
- execução local e configuração de deploy no Render por `render.yaml`.

### Fora do escopo

Autenticação, autorização, banco de dados, histórico persistente, alertas, controle remoto e garantia de que as métricas representem o hardware físico da hospedagem.

## 2. Tecnologias e execução

- Node.js 18.15 ou superior;
- módulo HTTP nativo do Node.js;
- HTML, CSS e JavaScript sem framework;
- nenhuma dependência externa de runtime;
- Render como destino configurado em `render.yaml`.

```bash
git clone https://github.com/reinaldo31wjm/system-monitor.git
cd system-monitor
npm start
```

Acesse `http://localhost:3000`. Para desenvolvimento, use `npm run dev`. A porta pode ser alterada com `PORT=8080 npm start`.

Variáveis:

| Variável | Padrão | Finalidade |
|---|---:|---|
| `PORT` | `3000` | Porta HTTP do serviço. |
| `SHOW_HOST_DETAILS` | `false` | Exibe usuário, diretório home e MAC quando habilitada. |
| `NODE_ENV` | `development` | Identifica o ambiente Node.js. |

## 3. Estrutura e arquitetura

```text
Aula8/
├── README.md                         # entrada rápida
├── DOCUMENTACAO.md                  # documentação técnica
├── RESUMO_AULA.md                   # resumo didático
├── contributing.md                  # contribuição e Pull Requests
├── security.md                      # política de segurança
├── code_of_conduct.md               # código de conduta
├── license                          # licença MIT do material
└── Aula08-Documentacao-de-Software.pdf

O código da aplicação permanece na pasta `Aula7`, que é a fonte da implementação.
```

No código da Aula 7:

```text
server.js              # servidor, rotas e headers
lib/metrics.js         # coleta, normalização e cache
lib/page.js            # HTML inicial
public/css/style.css   # layout
public/js/app.js       # interface, atualização e diagnóstico
public/js/rain.js      # animação em canvas
render.yaml            # configuração do Render
```

Fluxo:

```text
Sistema operacional
        │
        ▼
lib/metrics.js ── coleta, normalização e cache
        │
        ▼
server.js ─────── HTTP, rotas, arquivos estáticos e segurança
        │
        ├── /api/stats ── JSON
        ├── /healthz ─── disponibilidade
        └── / ─────────── HTML inicial
                              │
                              ├── public/js/app.js
                              ├── public/js/rain.js
                              └── public/css/style.css
```

`metrics.js` calcula CPU por amostragem, memória, disco, carga, uptime, processo, rede, contagem de arquivos e ambiente. `page.js` gera o HTML inicial. `app.js` atualiza os dados, abas, histórico e diagnóstico. `rain.js` controla a animação visual. O servidor valida métodos e caminhos e aplica CSP, `X-Content-Type-Options` e `Referrer-Policy`.

## 4. API

Métodos aceitos: `GET` e `HEAD`. Rotas desconhecidas retornam `404`; outros métodos retornam `405`.

| Rota | Resposta |
|---|---|
| `/` | Página HTML do painel. |
| `/api/stats` | Métricas atuais em JSON. |
| `/healthz` | `{"status":"ok"}`. |
| `/css/*`, `/js/*` | Arquivos estáticos permitidos. |

Exemplos:

```bash
curl -i http://localhost:3000/healthz
curl -i http://localhost:3000/api/stats
curl -I http://localhost:3000/
```

Campos de contexto do `/api/stats`:

- `projectFileCount`: arquivos do projeto, excluindo `.git` e `node_modules`;
- `hostname` e `primaryIp`: identificação do host e primeira interface IPv4 não interna;
- `osType`, `osRelease`, `architecture`, `endianness` e `nodeVersion`;
- `environment.mode`: `local` ou `cloud`;
- `environment.provider`: `Render`, `Railway`, `Vercel`, `Cloud` ou `Local`;
- `environment.nodeEnv` e `environment.port`.

Campos de métricas: `timestamp`, `serverTime`, `uptime`, `processUptime`, `loadSupported`, `load1`, `load5`, `load15`, `cores`, `loadPercent`, `usedMem`, `freeMem`, `totalMem`, `memUsagePercent`, `memSource`, `processMem`, `rss` e `disk`.

O disco pode ficar indisponível em contêineres restritos. Nesse caso, `disk.available` é `false`; isso não significa uso zero. As métricas são observações do ambiente de execução e não são persistidas.

## 5. Requisitos verificáveis

| ID | Requisito | Critério |
|---|---|---|
| RF-01 | Exibir painel | `GET /` retorna HTML. |
| RF-02 | Expor métricas | `GET /api/stats` retorna JSON de sistema e ambiente. |
| RF-03 | Atualizar interface | navegador consulta a API periodicamente. |
| RF-04 | Atualização manual | botão solicita nova leitura. |
| RF-05 | Pausar atualização | botão pausa e retoma o ciclo. |
| RF-06 | Diagnóstico | aba exibe histórico e eventos de nível. |
| RF-07 | Health check | `/healthz` retorna status `ok`. |
| RF-08 | Arquivos estáticos | `/css/*` e `/js/*` retornam recursos permitidos. |
| RNF-01 | Compatibilidade | Node.js 18.15 ou superior. |
| RNF-02 | Reprodutibilidade | execução com o repositório e Node.js. |
| RNF-03 | Desempenho | amostragem em segundo plano e cache curto. |
| RNF-04 | Acessibilidade | teclado e `prefers-reduced-motion`. |
| RNF-05 | Segurança | CSP, validação de caminhos e ausência de segredos. |
| RNF-06 | Operação | `PORT` e `/healthz` disponíveis. |

## 6. Validação e deploy

A validação mínima atual é:

```bash
npm start
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
curl -fsSI http://localhost:3000/
```

Também se deve verificar no navegador atualização automática, pausa, abas, gráficos, teclado e redução de movimento. O projeto não possui suíte automatizada de testes nem etapa de build; `npm start` executa diretamente `server.js`.

O `render.yaml` usa `npm start`, aceita a porta fornecida pela plataforma e define `/healthz` como health check. Após o deploy, conferir logs, página, health check e API. Um deploy só deve ser declarado quando houver URL ou registro que o comprove.

## 7. Comparação de plataformas — modelo não executado

O Render está configurado por `render.yaml`. Railway é uma alternativa tecnicamente compatível porque também pode executar `npm start` e fornecer `PORT`, mas nenhum segundo deploy foi realizado nesta entrega.

| Evidência | Render | Segunda plataforma |
|---|---|---|
| URL pública | preencher com evidência real | preencher com evidência real |
| Data e tempo de build | preencher | preencher |
| Resposta `/healthz` | preencher | preencher |
| Resultado `/api/stats` | preencher | preencher |
| Logs e observações | preencher | preencher |

A preparação para cloud está implementada no Render por meio de `render.yaml`. A comparação empírica com uma segunda plataforma não foi executada nesta entrega; a tabela abaixo é apenas um modelo para preenchimento após um deploy real.

## 8. Documentos relacionados

- `contributing.md`: branches, Pull Requests e validação de contribuições;
- `security.md`: controles, riscos, dados sensíveis e relato de vulnerabilidades;
- `code_of_conduct.md`: convivência e comunicação no projeto;
- `license`: licença MIT.
