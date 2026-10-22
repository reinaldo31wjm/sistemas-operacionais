# Resumo da Aula 7 — Sistemas Operacionais e Nuvem

## Objetivo

Nesta aula, uma aplicação Node.js criada com Express é ampliada para funcionar como um dashboard de monitoramento. O exercício relaciona conceitos de Sistemas Operacionais — processos, CPU, memória, rede e arquivos — com a execução de aplicações em uma infraestrutura cloud.

## 1. API REST com Express

Uma API REST disponibiliza recursos por meio de requisições HTTP. No projeto, o Express registra as rotas e produz respostas JSON ou HTML:

- `GET /`: dashboard visual;
- `GET /api/metrics`: dados das métricas;
- `GET /health`: verificação de disponibilidade.

A dependência `cors` permite que clientes em origens diferentes façam requisições quando essa política for necessária. A porta não deve ser fixada em produção: o servidor usa `process.env.PORT` e mantém `3000` como padrão local.

## 2. Coleta de informações do sistema

O módulo nativo `os` fornece informações do ambiente em que o processo está executando:

- `os.cpus()`: modelo, tempos e quantidade de núcleos;
- `os.totalmem()` e `os.freemem()`: memória total e livre;
- `os.uptime()`: tempo de atividade do sistema;
- `os.networkInterfaces()`: interfaces e endereços de rede;
- `os.hostname()`, `os.type()`, `os.release()` e `os.arch()`: identificação do sistema.

O objeto `process` complementa a coleta com PID, caminho de execução, diretório de trabalho, versão do Node.js, memória do processo e variáveis de ambiente.

## 3. CPU, memória e interpretação

O uso de CPU é calculado comparando duas amostras dos tempos de cada núcleo. A diferença entre o tempo total e o tempo ocioso representa o trabalho observado no intervalo. Por isso, a primeira amostra não deve ser interpretada como uma medição completa.

O percentual de RAM é calculado por:

```text
(total de memória - memória livre) / total de memória × 100
```

O `load average` é mantido como uma métrica separada. Ele representa a carga média observada em janelas de 1, 5 e 15 minutos e não deve ser confundido com o percentual de CPU.

## 4. Sistema de arquivos e processos

A aplicação lista os itens do diretório de execução e conta os arquivos do projeto, ignorando `.git` e `node_modules`. A tabela visual mostra uma amostra limitada para não tornar o dashboard excessivamente grande.

O cartão de processo permite observar o PID, a memória residente do Node.js, o diretório de trabalho e o uptime do processo. Esses dados ajudam a relacionar um programa em execução com os recursos administrados pelo sistema operacional.

## 5. Execução local e cloud

Localmente, o processo usa a porta `3000` por padrão. Em uma plataforma cloud, o provedor define `PORT`; por isso, o código escuta `0.0.0.0` e lê essa variável de ambiente.

O provedor é identificado por variáveis disponíveis no processo, como `RENDER` ou `RAILWAY_ENVIRONMENT`. Os dados de hostname, IP, memória, CPU e uptime representam a instância ou o contêiner do serviço. Uma nova implantação pode alterar esses valores.

## 6. Publicação e health check

O deploy segue um fluxo comum:

1. validar a aplicação localmente;
2. enviar o código para um repositório Git;
3. criar um Web Service ou serviço equivalente;
4. informar os comandos de instalação e inicialização;
5. configurar `/health` para verificar disponibilidade;
6. testar `/`, `/api/metrics` e `/health` após o deploy.

O health check deve ser simples e rápido. Ele confirma que o processo responde, mas não prova que todos os recursos externos da aplicação estão funcionando.

## 7. Relação com Sistemas Operacionais

O projeto torna visíveis conceitos que normalmente ficam ocultos:

- **processos:** PID, tempo e memória do Node.js;
- **CPU:** núcleos, tempos ociosos e carga média;
- **memória:** memória total, livre e utilizada;
- **arquivos:** diretórios, tamanhos e datas de modificação;
- **rede:** interfaces e endereços IP;
- **virtualização:** diferença entre a máquina física do provedor e a instância entregue ao serviço.

## 8. Atividade proposta

Execute o dashboard localmente e publique-o em pelo menos uma plataforma. Depois, compare Render e Railway — ou duas execuções equivalentes — considerando processo de deploy, configuração, logs, health check, porta, ambiente e métricas observadas.

O relatório deve separar **fato observado** de **interpretação**. Registre a data e o horário de cada coleta, pois CPU, memória e uptime variam com o tempo. Não use uma única leitura para afirmar que um provedor é mais rápido.

## Perguntas para discussão

1. Por que `process.env.PORT` é necessário em um serviço cloud?
2. Por que a primeira leitura de CPU pode ser enganosa?
3. O que muda entre o uptime do sistema e o uptime do processo?
4. Por que o IP mostrado no contêiner pode não ser o IP público da aplicação?
5. Quais informações do dashboard seriam insuficientes para uma ferramenta de monitoramento de produção?
