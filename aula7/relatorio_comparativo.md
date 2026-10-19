# Relatório comparativo: Render e Railway

## 1. Objetivo

O objetivo desta atividade é ampliar uma aplicação Node.js com Express para criar um dashboard de monitoramento de sistema operacional, publicar a aplicação em serviços cloud e comparar o Render com a Railway.

A aplicação apresenta dados de CPU, memória, uptime, arquivos, rede, sistema operacional, processo e variáveis do ambiente de execução.

## 2. Requisitos atendidos

| Requisito da aula | Implementação |
|---|---|
| API REST com Express | Servidor Express em `server.js` |
| Uso de `process.env.PORT` | Porta configurável para execução local e cloud |
| Percentual de RAM | KPI e barra visual no dashboard |
| Uso médio da CPU | Cálculo por amostras sucessivas |
| Uptime formatado | Exibição em dias, horas e minutos |
| Quantidade de arquivos | Leitura do diretório do projeto |
| IP principal | Leitura das interfaces de rede |
| Status geral | Classificação NORMAL, ATENÇÃO ou ALTO USO |
| Dados do sistema operacional | Hostname, tipo, release, plataforma, arquitetura e endianness |
| Versão do Node.js | Obtida por `process.version` |
| Ambiente local/cloud | Identificação por variáveis Render/Railway |
| Endpoint de saúde | `/health` |
| Endpoint de métricas | `/api/metrics` |
| Segunda plataforma cloud | Railway |
| Relatório comparativo | Este documento |

## 3. Procedimento de publicação

1. Executar a aplicação localmente com `npm install` e `npm start`.
2. Criar um repositório Git com `package.json`, `server.js` e os arquivos de documentação.
3. Publicar o repositório no Render como **Web Service**.
4. Publicar o mesmo repositório na Railway como serviço Node.js.
5. Configurar `npm install` como build e `npm start` como inicialização.
6. Acessar, em cada provedor, as rotas `/`, `/api/metrics` e `/health`.
7. Registrar as métricas de cada ambiente e comparar os resultados.

## 4. Registro dos ambientes

| Item | Render | Railway |
|---|---|---|
| URL pública | `[informar URL do Render]` | `[informar URL da Railway]` |
| Comando de build | `npm install` | `npm install` ou detecção automática |
| Comando de start | `npm start` | `npm start` |
| Health check | `/health` | `/health` |
| Hostname exibido | `[registrar]` | `[registrar]` |
| Plataforma/arquitetura | `[registrar]` | `[registrar]` |
| Versão do Node.js | `[registrar]` | `[registrar]` |
| IP principal | `[registrar]` | `[registrar]` |
| RAM exibida | `[registrar]` | `[registrar]` |
| CPU/load average | `[registrar]` | `[registrar]` |
| Uptime | `[registrar]` | `[registrar]` |

## 5. Principais diferenças

| Critério | Render | Railway |
|---|---|---|
| Modelo de configuração | Fluxo explícito de criação de Web Service, com comandos de build e start informados no painel. | Fluxo orientado a projetos, com detecção de `package.json`, templates e configuração de infraestrutura. |
| Integração com Git | Conecta o repositório e realiza novos deploys quando há push na branch configurada. | Trabalha com projetos e deploys a partir de repositório ou template, automatizando a configuração inicial. |
| Variáveis e porta | A aplicação deve escutar `process.env.PORT`; o Render fornece a porta do serviço. | A aplicação deve escutar `process.env.PORT`; a Railway fornece variáveis do ambiente do serviço. |
| Organização dos recursos | Serviços web, deploys, TLS e rede privada são configurados diretamente no serviço. | Aplicação, banco de dados e outros componentes podem ser organizados dentro de um mesmo projeto. |
| Escalabilidade | Configurada conforme o serviço e o plano escolhido. | Recursos de infraestrutura podem ser ajustados dentro do projeto. |
| Identificação no dashboard | A variável `RENDER` identifica o Render. | A variável `RAILWAY_ENVIRONMENT` identifica a Railway. |

## 6. Análise dos dados

Os valores de hostname, release do kernel, arquitetura, memória, CPU e uptime podem ser diferentes entre os provedores porque cada aplicação roda em uma instância ou contêiner próprio. Essa diferença não permite concluir, isoladamente, que uma plataforma é mais rápida, pois região, tamanho do serviço, carga do ambiente e momento da coleta também influenciam os resultados.

O uptime pode ser reiniciado após novo deploy, manutenção ou alteração de configuração. O IP principal pode ser privado ou interno ao ambiente e não deve ser confundido com o endereço público do domínio da aplicação.

## 7. Conclusão

Render e Railway reduzem o trabalho operacional necessário para colocar uma aplicação Express na Internet. O desenvolvedor fornece o código, os comandos de execução e as variáveis necessárias, enquanto a plataforma administra a execução do processo e a exposição HTTP.

O Render oferece um caminho direto para Web Services e deploy contínuo. A Railway apresenta uma organização orientada a projetos e facilita a composição entre aplicação, banco de dados e outros serviços. Para este dashboard, ambas atendem ao requisito de hospedagem cloud; a escolha depende do nível de integração de infraestrutura desejado.

## 8. Fontes consultadas

- Render. *Deploy a Node Express App on Render*. <https://render.com/docs/deploy-node-express-app>
- Render. *Web Services*. <https://render.com/docs/web-services>
- Railway. *Deploy Node.js*. <https://railway.com/deploy/node-js>
