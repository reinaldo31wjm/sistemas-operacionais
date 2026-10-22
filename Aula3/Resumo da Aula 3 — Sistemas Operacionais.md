# Resumo da Aula 3 — Sistemas Operacionais

**Tema:** Conceitos, funções e tipos de sistemas operacionais, Git, VS Code e publicação de código no GitHub.

## 1. Conteúdo principal da aula

A aula apresenta diferentes tipos de sistemas operacionais e relaciona cada tipo às necessidades do ambiente em que ele é utilizado. O sistema operacional administra os recursos do computador, oferece serviços aos programas e organiza a execução das tarefas.

### Tipos de sistemas operacionais

- **Sistemas de grande porte (mainframes):** são projetados para alta capacidade de entrada e saída, processamento de grandes volumes de transações, alta disponibilidade e muitos usuários simultâneos. São comuns em bancos, grandes varejistas e plataformas de comércio eletrônico.
- **Sistemas operacionais de servidor:** atendem vários usuários e serviços pela rede, como páginas web, arquivos, bancos de dados e autenticação. Estabilidade, segurança, escalabilidade e compartilhamento de recursos são prioridades.
- **Sistemas de multiprocessadores:** utilizam várias CPUs ou vários núcleos para executar tarefas em paralelo. Precisam de escalonamento, sincronização, controle de concorrência e mecanismos para manter a coerência de cache.
- **Sistemas de computadores pessoais:** são voltados principalmente para um usuário, com interface gráfica, multiprogramação e compatibilidade com aplicativos. Windows, macOS e Linux são exemplos.
- **Sistemas portáteis:** usados em celulares e tablets, priorizam economia de energia, sensores, segurança por permissões e distribuição de aplicativos. Android e iOS são exemplos.
- **Sistemas embarcados:** executam funções específicas em dispositivos com recursos limitados, como micro-ondas, Smart TVs e sistemas automotivos. Podem exigir resposta rápida e alta confiabilidade.
- **Sistemas de nós sensores:** operam em dispositivos pequenos, normalmente alimentados por bateria, com comunicação sem fio e protocolos leves. Monitoramento ambiental e agricultura de precisão são exemplos de uso.
- **Sistemas de tempo real:** precisam responder dentro de prazos definidos. No modelo **hard real-time**, perder o prazo pode causar uma falha grave; no **soft real-time**, a perda do prazo causa degradação, mas não necessariamente uma falha crítica.
- **Sistemas de cartões inteligentes:** trabalham com memória e processamento limitados, mas exigem segurança, criptografia, autenticação e isolamento entre aplicações.

## 2. Git e controle de versão

O **Git** é um sistema de controle de versão que registra as alterações feitas em arquivos. Ele permite acompanhar o histórico, recuperar versões anteriores, trabalhar em equipe e sincronizar um projeto local com um repositório remoto, como o GitHub.

Os conceitos essenciais são:

- **Repositório:** pasta controlada pelo Git, contendo os arquivos e o histórico do projeto.
- **Commit:** registro de um conjunto de alterações, acompanhado de uma mensagem explicativa.
- **Push:** envio dos commits locais para o repositório remoto.
- **Pull:** busca e integração de alterações existentes no repositório remoto.
- **Clone:** criação de uma cópia local de um repositório remoto.
- **Branch:** linha independente de desenvolvimento, útil para testar funcionalidades sem comprometer a branch principal.

A aula recomenda commits pequenos e frequentes, mensagens claras, uso de branches para novas funcionalidades e testes antes de integrar alterações.

## 3. O que existe na pasta `Aula3` do repositório

A pasta analisada contém o PDF da aula e uma aplicação web formada por `index.html`, `script.js` e `style.css` [1]. O projeto é uma interface chamada **Kernel Workstation**, que simula alguns mecanismos estudados em Sistemas Operacionais.

No `index.html`, a página apresenta:

- seleção do algoritmo de escalonamento da CPU: **FCFS**, **Round Robin** com quantum de 2 segundos e **SJF**;
- seleção da velocidade de simulação;
- botão para criar novos processos;
- indicadores de uso da CPU, ocupação da RAM, quantidade de processos e trocas de contexto;
- tabela de processos, semelhante a uma representação de PCB;
- mapa de 16 blocos de memória, representando paginação;
- terminal de eventos do sistema;
- matriz comparativa entre Linux, Windows NT e macOS [2].

No `script.js`, cada processo recebe um PID, nome, duração e quantidade aleatória de blocos de RAM. A função de alocação reserva blocos livres; quando o processo termina ou é encerrado, a memória é liberada. O simulador atualiza o status do processo entre **PRONTO**, **EXECUTANDO**, **CONCLUÍDO** e **ABORTADO** [3].

O escalonador funciona assim:

- **FCFS:** executa os processos na ordem de chegada.
- **SJF:** escolhe o processo pronto com menor tempo restante.
- **Round Robin:** executa cada processo por até dois segundos e, se ele não terminar, devolve o processo ao final da fila.

O `style.css` cria a aparência visual do simulador: tema escuro, cartões de métricas, barras de progresso, tabela de processos, grade de memória, terminal e cartões comparativos dos sistemas operacionais [4].

Assim, o código da pasta não é apenas um arquivo simples enviado ao GitHub. Ele funciona como uma atividade prática de programação web que representa conceitos da aula, especialmente processos, escalonamento, memória, paginação e trocas de contexto.

## Referências

1. [Pasta Aula3 no repositório sistemas-operacionais-1](https://github.com/reinaldo31wjm/sistemas-operacionais-1/tree/main/Aula3 )
2. [Arquivo index.html da Aula 3](https://raw.githubusercontent.com/reinaldo31wjm/sistemas-operacionais-1/main/Aula3/index.html )
3. [Arquivo script.js da Aula 3](https://raw.githubusercontent.com/reinaldo31wjm/sistemas-operacionais-1/main/Aula3/script.js )
4. [Arquivo style.css da Aula 3](https://raw.githubusercontent.com/reinaldo31wjm/sistemas-operacionais-1/main/Aula3/style.css )
5. [Source Control no Visual Studio Code](https://code.visualstudio.com/docs/sourcecontrol/overview )
