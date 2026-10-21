# system monitor — documentação de software

O **System Monitor** é um painel web de observabilidade que apresenta, em tempo real, métricas do ambiente onde o serviço está sendo executado. O projeto serve como estudo de caso da Aula 08 sobre documentação de software.

## acesso público

[abrir o system-monitor](https://system-monitor-i16u.onrender.com)

## visão rápida

A aplicação coleta CPU, memória, disco, carga do sistema, uptime e dados do processo Node.js. O servidor disponibiliza as informações em JSON e o navegador exibe os indicadores em um painel responsivo.

Principais características:

- execução com Node.js e APIs nativas;
- interface sem framework frontend;
- atualização automática e diagnóstico no navegador;
- API `GET /api/stats`;
- health check `GET /healthz`;
- deploy configurado para o Render;
- identidade visual cyberpunk com suporte a `prefers-reduced-motion`.

Em hospedagens, as métricas representam o contêiner ou ambiente de execução do serviço, não o computador do visitante.

## executar localmente

Requisitos: Git e Node.js 18.15 ou superior.

```bash
git clone https://github.com/reinaldo31wjm/system-monitor.git
cd system-monitor
npm start
```

Acesse <http://localhost:3000>. Para usar outra porta:

```bash
PORT=8080 npm start
```

O projeto não possui dependências externas de runtime, portanto não é necessário executar `npm install`. Para desenvolvimento, use `npm run dev`.

## configuração essencial

| variável | padrão | finalidade |
| --- | --- | --- |
| `PORT` | `3000` | Porta HTTP do serviço; no Render, é fornecida pela plataforma. |
| `SHOW_HOST_DETAILS` | `false` | Habilita detalhes adicionais do host; use com cautela em ambientes públicos. |

Não publique senhas, tokens, chaves ou arquivos `.env` com valores reais.

## verificar o serviço

```bash
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
curl -fsSI http://localhost:3000/
```

O endpoint `/healthz` retorna `{"status":"ok"}` quando o processo está ativo. A descrição completa das rotas e campos está em [docs/documentacao-api.md](docs/documentacao-api.md).

## documentação do projeto

Cada documento tem uma responsabilidade específica:

- [documentacao-de-projeto.md](docs/documentacao-de-projeto.md): contexto, escopo, requisitos e cenários de uso;
- [documentacao-api.md](docs/documentacao-api.md): contrato HTTP, campos, exemplos e limitações;
- [arquitetura.md](docs/wiki/arquitetura.md): módulos, fluxo de dados e decisões técnicas;
- [processo-devops.md](docs/processo-devops.md): desenvolvimento, validação, revisão e deploy;
- [checklist-documentacao.md](docs/checklist-documentacao.md): revisão antes de integrar ou publicar;
- [materiais da aula](docs/aulas/): PDF e resumo da Aula 08.

## colaboração e segurança

- [como contribuir](contributing.md)
- [código de conduta](code-of-conduct.md)
- [política de segurança](security.md)
- [licença](license)

A documentação deve ser atualizada junto com mudanças em rotas, métricas, variáveis, requisitos ou procedimentos de operação.
