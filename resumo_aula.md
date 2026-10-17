# Resumo da Aula 07 — Projeto, Nuvem e Sistemas Operacionais

## Tema central

A aula propõe a criação de uma API REST com Node.js e Express e a publicação dessa aplicação em uma plataforma de computação em nuvem. O projeto evolui de uma aplicação que exibe informações básicas da máquina para um dashboard de monitoramento do sistema operacional.

## 1. API REST com Express

O primeiro passo é criar uma pasta para o projeto e inicializar uma aplicação Node.js. Em seguida, instala-se o Express, responsável pela criação do servidor HTTP e das rotas da aplicação. O pacote CORS pode ser utilizado para permitir requisições feitas por aplicações hospedadas em domínios diferentes.

A execução básica do servidor é feita com um comando como:

```bash
node index.js
```

No projeto desenvolvido, essa ideia está implementada em `server.js`, com Express e as rotas `/`, `/api/metrics` e `/health`.

## 2. Publicação no Render

O Render é apresentado como uma plataforma de hospedagem cloud para Node.js, Python e outras tecnologias. O fluxo indicado na aula é:

1. Fazer commit do projeto.
2. Disponibilizar o código em um repositório GitHub.
3. Acessar o painel do Render.
4. Criar um novo **Web Service**.
5. Conectar o repositório.
6. Definir os comandos de build e start.
7. Realizar o deploy e acessar o endereço público gerado.

Para este projeto, os comandos recomendados são:

```text
Build Command: npm install
Start Command: npm start
```

A aplicação usa `process.env.PORT`, prática necessária para que o serviço aceite a porta fornecida pelo provedor cloud.

## 3. Evolução para um dashboard

O dashboard deve apresentar uma visão executiva do ambiente computacional. Os principais indicadores solicitados são:

- Percentual de uso da memória RAM.
- Uso médio da CPU.
- Uptime formatado.
- Quantidade de arquivos do projeto.
- IP principal.
- Status geral da máquina.

Além dos indicadores, a aplicação deve detalhar o sistema operacional, incluindo:

- Nome da máquina ou hostname.
- Tipo do sistema operacional.
- Versão do kernel ou release.
- Plataforma.
- Arquitetura do processador.
- Endianness.
- Versão do Node.js.

No Node.js, essas informações podem ser obtidas principalmente pelo módulo nativo `os`, enquanto dados do processo e do ambiente são obtidos pelo objeto `process`.

## 4. Execução local e cloud

A aplicação deve identificar o ambiente em que está sendo executada. Para isso, pode consultar variáveis de ambiente como `PORT`, `NODE_ENV`, `RENDER` e `RAILWAY_ENVIRONMENT`.

Essa comparação permite observar que a aplicação pode executar localmente ou em uma infraestrutura remota. Em cloud, os dados de CPU, memória, hostname, uptime e rede normalmente representam o contêiner ou a instância atribuída ao serviço, e não necessariamente todo o hardware físico do provedor.

## 5. Segunda plataforma

A proposta da aula exige escolher uma plataforma semelhante ao Render, publicar a aplicação e comparar os servidores. Neste projeto, a plataforma escolhida é a Railway.

Os critérios de comparação incluem:

- Processo de criação do serviço.
- Integração com GitHub.
- Comandos de build e start.
- Configuração de variáveis de ambiente.
- Uso da porta HTTP.
- Logs e health checks.
- Organização de aplicações e bancos de dados.
- Escalabilidade e características do ambiente de execução.

O resultado dessa comparação está no arquivo `relatorio_comparativo.md`.

## 6. Relação com Sistemas Operacionais

O projeto permite observar, na prática, conceitos estudados em Sistemas Operacionais:

- Gerenciamento de memória por meio do uso de RAM.
- Gerenciamento e utilização da CPU.
- Processos, PID e memória utilizada pelo Node.js.
- Sistema de arquivos e metadados dos arquivos do projeto.
- Interfaces de rede e endereçamento IP.
- Tempo de atividade do sistema.
- Relação entre software, hardware virtualizado e infraestrutura cloud.

## 7. Entregáveis relacionados à aula

| Entregável | Arquivo |
|---|---|
| Aplicação Express | `server.js` |
| Dependências e scripts | `package.json` |
| Configuração Render | `render.yaml` |
| Configuração Railway | `railway.json` |
| Instruções de execução e deploy | `readme.md` |
| Relatório comparativo | `relatorio_comparativo.md` |
| Resumo desta aula | `resumo_aula.md` |
| Material original | `aula07-projetonuvemesistemasoperacionais.pdf` |
