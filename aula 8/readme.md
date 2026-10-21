# System Monitor — documentação de software

O **System Monitor** é um painel web de observabilidade que acompanha, em tempo real, os recursos do ambiente onde o serviço está sendo executado. O projeto foi escolhido como estudo de caso da Aula 08 porque reúne documentação de projeto, arquitetura, API, operação, segurança e deploy em um sistema pequeno e funcional.

## objetivo do projeto

Oferecer uma visão rápida do estado operacional do serviço, exibindo CPU, memória, disco, carga do sistema, uptime e informações do processo Node.js. As métricas são coletadas no servidor, disponibilizadas por uma API JSON e apresentadas em uma interface web responsiva.

O projeto tem finalidade acadêmica e prática: demonstrar como documentar uma aplicação web sem framework de servidor, com dependências mínimas e instruções reproduzíveis.

## acesso público

A aplicação publicada pode ser acessada em:

[system-monitor](https://system-monitor-i16u.onrender.com)

## recursos principais

- painel visual atualizado automaticamente;
- métricas de CPU, memória, disco, carga e uptime;
- informações do processo Node.js e do ambiente de execução;
- histórico de diagnóstico no navegador;
- API JSON em `GET /api/stats`;
- endpoint de disponibilidade em `GET /healthz`;
- interface com navegação por teclado e suporte a redução de movimento;
- deploy preparado para o Render por meio de `render.yaml`;
- identidade visual cyberpunk com animação em canvas.

> Em ambientes hospedados, as métricas representam o contêiner ou ambiente de execução do serviço, e não o computador de quem acessa o painel.

## tecnologias e requisitos

- Node.js 18.15 ou superior;
- JavaScript com APIs nativas do Node.js;
- servidor HTTP nativo, sem framework;
- HTML, CSS e JavaScript no frontend;
- Git para versionamento;
- Render para publicação, quando desejado.

O projeto não exige `npm install` para executar, pois não possui dependências externas de runtime.

## execução local

```bash
git clone https://github.com/reinaldo31wjm/system-monitor.git
cd system-monitor
npm start
```

Acesse <http://localhost:3000>. Para alterar a porta:

```bash
PORT=8080 npm start
```

Durante o desenvolvimento, é possível usar:

```bash
npm run dev
```

## configuração

| variável | padrão | obrigatória | finalidade |
| --- | --- | --- | --- |
| `PORT` | `3000` | não | Porta HTTP do servidor. O Render fornece esse valor automaticamente. |
| `SHOW_HOST_DETAILS` | `false` | não | Exibe detalhes adicionais do host. Deve ser usada com cautela em ambientes públicos. |

Nunca publique senhas, tokens, chaves de API ou arquivos `.env` com valores reais.

## api e health check

### `GET /api/stats`

Retorna as métricas atuais em JSON, incluindo timestamp, uptime, carga, uso de CPU, memória do sistema, memória do processo Node.js e disco.

```bash
curl http://localhost:3000/api/stats
```

### `GET /healthz`

Indica se o processo está ativo e é usado pela plataforma de hospedagem:

```bash
curl http://localhost:3000/healthz
# {"status":"ok"}
```

A API aceita `GET` e `HEAD`. Outros métodos retornam `405 Method Not Allowed`.

## arquitetura resumida

```text
sistema operacional
        |
        v
lib/metrics.js ---> coleta, normalização e cache
        |
        v
server.js --------> rotas HTTP e segurança
        |
        +--> /api/stats ---> JSON de métricas
        +--> /healthz -----> status do serviço
        +--> / -------------> painel web
                                  |
                                  +--> public/js/app.js
                                  +--> public/js/rain.js
                                  +--> public/css/style.css
```

A separação entre coleta, servidor e interface facilita a manutenção, os testes manuais e a evolução do sistema.

## estrutura da documentação

- [documentação de projeto](docs/documentacao-de-projeto.md): contexto, escopo, requisitos e critérios de aceitação;
- [documentação da api](docs/documentacao-api.md): rotas, campos, exemplos e limites de interpretação;
- [arquitetura](docs/wiki/arquitetura.md): fluxo de dados, responsabilidades e decisões técnicas;
- [processo devops](docs/processo-devops.md): branches, validação, revisão e deploy;
- [checklist de documentação](docs/checklist-documentacao.md): conferências antes da publicação;
- [materiais da aula](docs/aulas/): PDF e resumo da Aula 08.

## validação mínima

O projeto não possui uma suíte automatizada configurada. A verificação mínima consiste em iniciar o servidor e consultar as rotas principais:

```bash
npm start
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
curl -fsSI http://localhost:3000/
```

Também é recomendável abrir o painel no navegador e conferir atualização automática, pausa, abas, indicadores e comportamento com redução de movimento.

## deploy no render

1. Crie um Web Service ou Blueprint a partir do repositório.
2. Use o runtime Node e o comando `npm start`.
3. Configure `/healthz` como health check path.
4. Não fixe manualmente `PORT`; a plataforma fornece essa variável.
5. Após a publicação, valide os logs, a página principal, `/healthz` e `/api/stats`.

## limites e segurança

As métricas dependem do ambiente de execução. Em contêineres, CPU, memória, disco e quantidade de núcleos podem refletir limites da plataforma. O projeto não implementa autenticação, persistência histórica ou alertas externos.

O servidor aplica cabeçalhos de segurança, valida caminhos de arquivos estáticos e evita expor detalhes do host por padrão. Consulte [security.md](security.md) para orientações de comunicação de vulnerabilidades.

## colaboração e licença

- [código de conduta](code-of-conduct.md)
- [como contribuir](contributing.md)
- [licença mit](license)
- [política de segurança](security.md)

Este material foi organizado para fins educacionais e deve ser mantido sincronizado com o código-fonte do projeto.
