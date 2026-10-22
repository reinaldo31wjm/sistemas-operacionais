# Aula 7 — Dashboard de Sistemas Operacionais na Nuvem

Projeto prático da disciplina de Sistemas Operacionais: uma API REST em Node.js e Express que coleta informações do sistema e as apresenta em um dashboard web. A aplicação pode ser executada localmente ou publicada em uma plataforma cloud, como Render ou Railway.

## O que você vai aprender

Ao concluir a atividade, você deverá ser capaz de:

- criar uma API HTTP com Express;
- ler informações do sistema operacional usando o módulo nativo `os`;
- observar processos, memória, CPU, rede e sistema de arquivos;
- configurar uma aplicação para usar a porta fornecida pelo ambiente cloud;
- publicar uma aplicação Node.js a partir de um repositório Git;
- comparar duas plataformas de hospedagem usando evidências coletadas nos endpoints.

## Visão geral da aplicação

O dashboard possui três rotas principais:

| Rota | Finalidade |
|---|---|
| `/` | Interface visual com os indicadores do sistema |
| `/api/metrics` | Métricas em formato JSON, úteis para testes e integração |
| `/health` | Verificação simples de disponibilidade do serviço |

As métricas incluem uso de RAM, uso médio da CPU entre amostras, uptime, quantidade de arquivos do projeto, IP principal, status geral, informações do sistema, processo Node.js, interfaces de rede e ambiente de execução.

> Em um serviço cloud, esses dados descrevem o contêiner ou a instância atribuída à aplicação. Eles não representam necessariamente todo o hardware físico do provedor.

## Pré-requisitos

- Node.js 18 ou superior;
- npm;
- Git;
- uma conta no GitHub para o deploy;
- conta no Render ou na Railway, caso a etapa cloud seja realizada.

## Execução local

Entre nesta pasta e instale as dependências:

```bash
cd aula7
npm install
npm start
```

Abra <http://localhost:3000>. Para desenvolvimento, com reinício automático ao salvar arquivos:

```bash
npm run dev
```

Valide a sintaxe sem iniciar o servidor:

```bash
npm test
```

Também é possível testar as rotas pelo terminal:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/metrics
```

## Como interpretar os indicadores

- **RAM usada:** percentual de `totalmem - freemem`. É uma fotografia da memória disponível no momento da coleta.
- **CPU média:** média do uso por núcleo calculada entre duas leituras de `os.cpus()`. A primeira leitura tende a ser pouco representativa.
- **Load average:** média de trabalho observado pelo sistema nos últimos 1, 5 e 15 minutos. Não é a mesma coisa que percentual instantâneo de CPU.
- **Uptime:** tempo de atividade do sistema ou do processo, dependendo do cartão consultado.
- **Arquivos:** quantidade de arquivos do projeto, ignorando `.git` e `node_modules`; a tabela exibe apenas os primeiros itens do diretório.
- **IP principal:** primeiro endereço IPv4 não interno encontrado. Em cloud, ele pode ser privado.
- **Status:** classificação didática baseada em limiares de RAM, CPU e carga; não substitui uma ferramenta de observabilidade.

## Publicação no Render

1. Faça commit e push dos arquivos da pasta `aula7` para um repositório GitHub.
2. No painel do Render, escolha **New > Web Service** e conecte o repositório.
3. Use `npm install` como comando de build e `npm start` como comando de inicialização.
4. Configure a rota `/health` como health check, quando essa opção estiver disponível.
5. Após o deploy, teste a URL pública nas rotas `/`, `/api/metrics` e `/health`.

A aplicação escuta `process.env.PORT`, requisito importante para funcionar em serviços web gerenciados. A configuração equivalente está em `render.yaml`.

## Publicação na Railway

1. Crie um projeto na Railway a partir do repositório GitHub.
2. Confirme que o serviço reconheceu o `package.json` e o comando `npm start`.
3. Configure `/health` como rota de health check.
4. Gere um domínio público e teste as três rotas da aplicação.
5. Registre os dados exibidos pelo dashboard para preencher o relatório comparativo.

A configuração declarativa está em `railway.json`. O script `iniciar-railway.sh` serve para simular localmente variáveis comuns da Railway; ele não é obrigatório no deploy automático.

## Entregáveis

- `server.js`: API, coleta de métricas e interface web;
- `package.json` e `package-lock.json`: scripts e dependências;
- `render.yaml` e `railway.json`: configurações dos provedores;
- `guia_estudo.md`: roteiro detalhado de execução, testes, interpretação e solução de problemas;
- `resumo_aula.md`: conceitos e roteiro de aprendizagem;
- `relatorio_comparativo.md`: modelo para comparar Render e Railway;
- `aula07-projetonuvemesistemasoperacionais.pdf`: enunciado original da atividade.

## Checklist de entrega

- [ ] A aplicação inicia com `npm start`.
- [ ] `npm test` termina sem erro.
- [ ] `/health` retorna JSON com `status: "ok"`.
- [ ] `/api/metrics` retorna as métricas esperadas.
- [ ] O dashboard foi testado localmente.
- [ ] O deploy foi realizado em pelo menos uma plataforma.
- [ ] O relatório registra URLs, data da coleta e limitações da comparação.
- [ ] Nenhuma chave, senha ou token foi enviado ao repositório.

## Referências

- [Documentação do Render — Deploy a Node Express App](https://render.com/docs/deploy-node-express-app)
- [Documentação do Railway](https://docs.railway.com/)
- [Documentação do Node.js — módulo `os`](https://nodejs.org/api/os.html)
- [Documentação do Express](https://expressjs.com/)
