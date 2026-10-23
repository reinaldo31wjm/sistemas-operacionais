# Resumo da Aula 7 — Implementação do System Monitor

## 1. Proposta

O System Monitor é um painel web que observa o ambiente de execução do servidor. A aplicação foi construída com Node.js nativo, sem framework de servidor e sem dependências externas de runtime.

O objetivo da aula é relacionar a implementação de um serviço web com conceitos de Sistemas Operacionais: CPU, memória, processos, disco, rede, uptime e execução em contêineres.

## 2. Arquitetura

```text
Sistema operacional
        │
        ▼
lib/metrics.js ── coleta, normalização e cache
        │
        ▼
server.js ─────── rotas, arquivos estáticos e segurança
        │
        ├── /api/stats ── JSON
        ├── /healthz ─── disponibilidade
        └── / ─────────── HTML inicial
                              │
                              ├── public/js/app.js
                              ├── public/js/rain.js
                              └── public/css/style.css
```

`lib/metrics.js` concentra a coleta; `lib/page.js` gera a página inicial; `public/` contém a experiência do navegador; e `server.js` coordena HTTP, segurança e deploy.

## 3. Coleta das métricas

A CPU não deve ser interpretada a partir de uma única leitura. O projeto captura amostras de `os.cpus()` a cada dois segundos e compara o tempo ocupado com o tempo ocioso de cada núcleo.

A memória tenta respeitar limites de contêiner usando cgroup e `/proc/meminfo`. Se essas fontes não estiverem disponíveis, utiliza as APIs do módulo `os`. A origem é registrada no campo `memSource`.

O armazenamento é consultado com `fs.statfsSync()` quando a API está disponível. Em ambientes restritos, `disk.available` fica `false`; isso é diferente de afirmar que o uso é zero.

O processo Node.js é observado por meio de PID, `process.uptime()`, heap utilizado e RSS. Esses valores descrevem o processo, não toda a memória da máquina.

O painel também informa a quantidade de arquivos do projeto, o IP principal, o sistema operacional, a versão do kernel, a arquitetura, o endianness, a versão do Node.js, a porta HTTP, o ambiente Node.js e se a execução foi identificada como local ou cloud. O contador de arquivos ignora `.git` e `node_modules`.

## 4. API e interface

- `GET /` entrega o painel visual.
- `GET /api/stats` retorna métricas, ambiente, porta, IP principal, arquitetura e contagem de arquivos em JSON.
- `GET /healthz` confirma que o servidor responde.
- Os arquivos de `public/` são servidos pelas rotas `/css/*` e `/js/*`, com validação de caminho e MIME type.

A interface consulta a API a cada três segundos, permite atualização manual, pausa a atualização, mostra histórico recente e oferece modos de visualização da chuva em canvas.

## 5. Execução e publicação

```bash
npm start
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
```

O serviço utiliza `PORT`, escuta em `0.0.0.0` e está preparado para o Render por meio de `render.yaml`. O deploy deve usar `npm start` e `/healthz` como health check.

## 6. Conceitos para revisar

1. Por que o cálculo de CPU depende de amostras sucessivas?
2. Qual é a diferença entre `usedMem`, `processMem` e `rss`?
3. Por que a memória de cgroup pode ser diferente de `os.totalmem()`?
4. Por que o disco pode ficar indisponível em um contêiner?
5. O que o uptime do sistema revela e o que `process.uptime()` revela?
6. Por que um IP retornado pelo processo pode não ser o endereço público?
7. Como a aplicação distingue execução local de execução em cloud?
8. Por que a aplicação aceita a porta do ambiente em vez de fixar uma porta cloud?

## 7. Atividade prática

Execute o projeto, consulte as rotas, identifique no código a origem de cada métrica e altere um componente sem quebrar o contrato da API. Em seguida, atualize a documentação da Aula 8 com a mudança realizada e suas evidências de validação.
