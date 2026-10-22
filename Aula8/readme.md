# system monitor — documentação de software

O **System Monitor** é um painel web de observabilidade desenvolvido em Node.js para acompanhar, em tempo real, os recursos do ambiente onde o serviço está sendo executado. O projeto coleta indicadores operacionais, disponibiliza os dados por uma API HTTP e apresenta as informações em uma interface visual responsiva.

Além de funcionar como uma aplicação prática, o repositório é o estudo de caso da Aula 08 sobre documentação de software. A organização dos arquivos demonstra como registrar objetivo, escopo, requisitos, arquitetura, API, processo de desenvolvimento, segurança, validação e deploy sem transformar a documentação em uma coleção de textos repetidos.

## acesso público

A versão publicada pode ser acessada em:

[abrir o system-monitor](https://system-monitor-i16u.onrender.com)

> As métricas exibidas correspondem ao contêiner ou servidor que executa a aplicação. Elas não representam o computador do visitante.

## problema e objetivo

Em uma aplicação hospedada, nem sempre é simples perceber se o processo está ativo, se o ambiente está sobrecarregado ou se uma falha está relacionada ao serviço. O System Monitor oferece uma visão rápida para diagnóstico operacional, reunindo em uma única tela informações que normalmente seriam consultadas por comandos diferentes.

O objetivo é permitir que uma pessoa:

- visualize CPU, memória, disco, carga e uptime;
- observe o consumo do processo Node.js;
- consulte as métricas por JSON em scripts ou ferramentas externas;
- confirme a disponibilidade do serviço por um health check;
- identifique limitações do ambiente de execução;
- compreenda a relação entre coleta, servidor, API e interface.

## principais recursos

- painel web atualizado automaticamente;
- atualização manual e pausa do ciclo automático;
- histórico recente para apoiar o diagnóstico no navegador;
- classificação visual dos indicadores em normal, atenção e crítico;
- consulta da carga do sistema em médias de 1, 5 e 15 minutos;
- informações de uptime do sistema e do processo Node.js;
- leitura de memória do sistema e do processo;
- disponibilidade e uso do armazenamento quando o ambiente permite a leitura;
- endpoint `/healthz` para plataformas de hospedagem;
- navegação por teclado e suporte a `prefers-reduced-motion`;
- interface visual cyberpunk com animação em canvas;
- deploy preparado para o Render por meio de `render.yaml`.

## tecnologias e requisitos

| componente | escolha | motivo |
| --- | --- | --- |
| runtime | Node.js 18.15 ou superior | fornece APIs nativas para processo, sistema, rede e servidor HTTP; |
| servidor | módulo `http` do Node.js | reduz dependências e torna o fluxo de requisições explícito; |
| frontend | HTML, CSS e JavaScript | mantém a aplicação leve e fácil de estudar; |
| versionamento | Git e GitHub | registra alterações, revisão e colaboração; |
| hospedagem | Render | oferece execução do serviço e health check; |
| persistência | não utilizada | o sistema apresenta leituras atuais e não armazena histórico no servidor. |

O projeto não possui dependências externas de runtime. Portanto, para a execução básica, não é necessário executar `npm install`.

## execução local

```bash
git clone https://github.com/reinaldo31wjm/system-monitor.git
cd system-monitor
npm start
```

Depois, acesse <http://localhost:3000>. Para utilizar outra porta:

```bash
PORT=8080 npm start
```

Durante o desenvolvimento, o comando abaixo inicia o script configurado para observar alterações:

```bash
npm run dev
```

No Windows PowerShell, a variável pode ser definida assim:

```powershell
$env:PORT=8080; npm start
```

## configuração

| variável | padrão | obrigatória | finalidade e cuidado |
| --- | --- | --- | --- |
| `PORT` | `3000` | não | define a porta HTTP. Em hospedagens, deve ser aceita a porta fornecida pela plataforma; |
| `SHOW_HOST_DETAILS` | `false` | não | habilita detalhes adicionais do host. Em serviços públicos, avalie se a exposição é realmente necessária. |

Nunca publique senhas, tokens, chaves privadas, dados pessoais ou arquivos `.env` com valores reais.

## API e verificação rápida

O serviço possui três pontos de entrada principais:

- `GET /`: entrega o painel web;
- `GET /api/stats`: retorna as métricas atuais em JSON;
- `GET /healthz`: indica se o processo está ativo.

Exemplos de verificação:

```bash
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
curl -fsSI http://localhost:3000/
```

O health check retorna `{"status":"ok"}` quando o processo está disponível. A descrição completa dos campos, métodos, respostas e limitações está em [docs/documentacao-api.md](docs/documentacao-api.md).

## documentação do projeto

Cada documento possui uma finalidade principal:

- [documentacao-de-projeto.md](docs/documentacao-de-projeto.md): contexto, escopo, requisitos, critérios de aceitação e cenários de uso;
- [documentacao-api.md](docs/documentacao-api.md): contrato HTTP, campos das métricas, exemplos e interpretação;
- [arquitetura.md](docs/wiki/arquitetura.md): componentes, fluxo de dados, decisões técnicas e privacidade;
- [processo-devops.md](docs/processo-devops.md): branches, revisão, validação e publicação;
- [checklist-documentacao.md](docs/checklist-documentacao.md): conferência antes de integrar ou publicar;
- [materiais da aula](docs/aulas/): PDF e resumo sobre documentação de software.

## validação mínima

O projeto não possui uma suíte automatizada de testes configurada. A validação atual combina verificações HTTP e inspeção visual:

```bash
npm start
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
curl -fsSI http://localhost:3000/
```

No navegador, verifique a atualização automática, a atualização manual, a pausa, o histórico de diagnóstico, a navegação por teclado e o comportamento com redução de movimento. O script equivalente está em [`scripts/testes-basicos.sh`](scripts/testes-basicos.sh).

## deploy no render

1. Crie um Web Service ou Blueprint conectado ao repositório.
2. Selecione o runtime Node.
3. Use `npm start` como comando de inicialização.
4. Configure `/healthz` como caminho de health check.
5. Não fixe manualmente `PORT`; o Render fornece esse valor.
6. Após a publicação, confira logs, URL, página principal, `/healthz` e `/api/stats`.

## limites conhecidos

As métricas dependem do sistema operacional, das permissões e dos limites do ambiente. Em contêineres, o total de memória, a quantidade de núcleos e a capacidade do disco podem refletir o contêiner ou a plataforma, não o hardware físico. A carga do sistema pode não estar disponível em determinados ambientes, e o disco pode ser retornado como indisponível.

O projeto também não oferece autenticação, persistência histórica, alertas por e-mail ou webhook, controle remoto nem garantia de que os dados representem um host físico específico. Essas limitações fazem parte do escopo documentado e não devem ser ocultadas em uma apresentação do sistema.

## perguntas frequentes

**O painel monitora o computador do visitante?** Não. Ele monitora o ambiente do servidor, contêiner ou plataforma que executa o processo.

**As métricas ficam armazenadas?** Não. A API retorna leituras atuais; para séries temporais, os dados devem ser armazenados por uma ferramenta externa.

**Existe autenticação?** Não na versão atual. O serviço não deve ser tratado como um painel privado sem uma camada adicional de proteção.

**Por que uma métrica pode ficar indisponível?** A coleta depende do sistema operacional, das permissões e dos recursos expostos pelo ambiente. O disco pode ser marcado como indisponível e a carga pode não ser suportada em determinados sistemas.

## colaboração, segurança e licença

- [como contribuir](contributing.md)
- [código de conduta](code-of-conduct.md)
- [política de segurança](security.md)
- [licença](license)

Mudanças em rotas, métricas, variáveis, requisitos, segurança ou deploy devem ser acompanhadas de atualização documental.
