# Relatório comparativo — Render e Railway

## 1. Identificação

- **Aluno(s):** _preencher_
- **Turma:** _preencher_
- **Data das coletas:** _preencher_
- **Repositório:** _preencher_

## 2. Objetivo

Publicar o dashboard de Sistemas Operacionais em serviços cloud e comparar o processo de configuração e os dados observados em cada ambiente. A comparação deve registrar evidências, sem concluir que uma plataforma é superior com base em uma única leitura.

## 3. Procedimento reproduzível

1. Execute `npm install`, `npm test` e `npm start` localmente.
2. Valide `/health`, `/api/metrics` e `/`.
3. Publique a mesma revisão do código no Render e na Railway, quando possível.
4. Use `npm install` e `npm start`, ou registre os comandos efetivamente utilizados.
5. Configure `/health` como health check.
6. Aguarde o serviço ficar disponível e colete os dados no mesmo período.
7. Repita a coleta pelo menos três vezes, separando horário e URL.
8. Preencha as tabelas e descreva as limitações da comparação.

## 4. Requisitos atendidos

| Requisito | Evidência no projeto |
|---|---|
| API REST com Express | `server.js` e rotas HTTP |
| Porta configurável | `process.env.PORT` |
| RAM e CPU | `/api/metrics` e cartões do dashboard |
| Uptime e processo | campos `time`, `process` e `kpis` |
| Arquivos e rede | campos `files` e `network` |
| Sistema operacional | campo `system` |
| Ambiente cloud | campo `environment` |
| Health check | `/health`, `render.yaml` e `railway.json` |

## 5. Configuração e operação

| Critério | Render | Railway |
|---|---|---|
| URL pública | _preencher_ | _preencher_ |
| Branch/revisão publicada | _preencher_ | _preencher_ |
| Build command | `npm install` ou _registrar_ | detecção automática ou _registrar_ |
| Start command | `npm start` | `npm start` |
| Health check | `/health` | `/health` |
| Tempo aproximado de deploy | _preencher_ | _preencher_ |
| Forma de visualizar logs | _preencher_ | _preencher_ |
| Configuração de variáveis | _preencher_ | _preencher_ |

## 6. Métricas observadas

Registre a data e o horário de cada leitura. Os valores são específicos da instância e podem mudar após reinício ou novo deploy.

| Métrica | Render — coleta 1 | Render — coleta 2 | Railway — coleta 1 | Railway — coleta 2 |
|---|---:|---:|---:|---:|
| RAM usada (%) | _preencher_ | _preencher_ | _preencher_ | _preencher_ |
| CPU média (%) | _preencher_ | _preencher_ | _preencher_ | _preencher_ |
| Load average (1 min) | _preencher_ | _preencher_ | _preencher_ | _preencher_ |
| Uptime do sistema | _preencher_ | _preencher_ | _preencher_ | _preencher_ |
| Uptime do processo | _preencher_ | _preencher_ | _preencher_ | _preencher_ |
| Arquivos do projeto | _preencher_ | _preencher_ | _preencher_ | _preencher_ |
| Arquitetura | _preencher_ | _preencher_ | _preencher_ | _preencher_ |
| Versão do Node.js | _preencher_ | _preencher_ | _preencher_ | _preencher_ |

## 7. Análise

### Processo de deploy

Descreva a sequência de criação do serviço, a integração com GitHub, os comandos utilizados e a forma de acompanhar logs e falhas.

### Execução e ambiente

Explique as diferenças de hostname, arquitetura, versão do Node.js, uptime e IP. Indique quais campos foram observados diretamente no dashboard e quais vieram da configuração do provedor.

### Desempenho

Compare CPU, RAM e carga apenas como observações daquele intervalo. Região, tamanho da instância, concorrência, aquecimento do serviço e momento da coleta afetam os resultados. O dashboard não mede latência, throughput, disponibilidade histórica nem desempenho sustentado.

### Relação com Sistemas Operacionais

Relacione os resultados com gerenciamento de processos, escalonamento de CPU, memória, sistema de arquivos, interfaces de rede e virtualização.

## 8. Conclusão

Escreva uma conclusão baseada nas evidências coletadas. Indique qual plataforma foi mais simples para este exercício e justifique com critérios observáveis, como configuração, logs, health check e fluxo de deploy. Evite generalizações sobre custo, desempenho ou confiabilidade que não tenham sido medidas nesta atividade.

## 9. Referências

- [Render — Deploy a Node Express App](https://render.com/docs/deploy-node-express-app)
- [Railway — Documentação](https://docs.railway.com/)
- [Node.js — módulo `os`](https://nodejs.org/api/os.html)
- [Express — documentação oficial](https://expressjs.com/)
