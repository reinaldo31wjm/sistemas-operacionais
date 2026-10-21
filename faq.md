# perguntas frequentes

## o sistema monitora o computador do visitante?

Não. Ele monitora o ambiente onde o servidor está executando.

## é necessário instalar dependências?

Não há dependências externas de runtime. Node.js 18.15 ou superior é suficiente.

## as métricas ficam armazenadas?

Não. A API retorna um retrato atual; séries históricas precisam ser armazenadas por outro sistema.

## por que o disco pode aparecer indisponível?

Contêineres restritos ou versões específicas do Node.js podem não permitir a leitura do armazenamento.

## existe autenticação?

Não na versão atual. O serviço não deve ser tratado como painel privado sem uma camada adicional de proteção.
