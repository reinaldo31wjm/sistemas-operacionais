# checklist de documentação e entrega

Use este checklist antes de integrar uma alteração ou publicar uma nova versão do System Monitor. Os itens verificam coerência entre código, documentação e operação.

## conteúdo e escopo

- [ ] o objetivo do sistema está descrito em linguagem direta;
- [ ] o texto diferencia funcionalidades implementadas de possibilidades futuras;
- [ ] o escopo informa o que está incluído e o que está fora;
- [ ] requisitos possuem critérios verificáveis;
- [ ] limitações do ambiente estão registradas.

## código e API

- [ ] as rotas documentadas existem no servidor;
- [ ] métodos, status e exemplos correspondem ao comportamento real;
- [ ] os nomes dos campos JSON estão atualizados;
- [ ] o health check foi validado;
- [ ] métricas indisponíveis não são descritas como zero;
- [ ] mudanças de coleta foram refletidas na arquitetura e na API.

## execução e operação

- [ ] a versão mínima do Node.js está informada;
- [ ] os comandos podem ser copiados e executados;
- [ ] as variáveis de ambiente têm padrão e finalidade;
- [ ] o comportamento de `PORT` em hospedagem está explicado;
- [ ] o procedimento do Render corresponde ao `render.yaml`;
- [ ] logs, URL e health check foram conferidos após o deploy.

## interface e acessibilidade

- [ ] atualização automática e pausa foram verificadas;
- [ ] navegação por teclado continua possível;
- [ ] estados de foco permanecem visíveis;
- [ ] `prefers-reduced-motion` é respeitado;
- [ ] mudanças visuais relevantes foram documentadas.

## segurança

- [ ] não há senhas, tokens, chaves ou dados pessoais reais;
- [ ] exemplos usam valores fictícios;
- [ ] detalhes de host são tratados como potencialmente sensíveis;
- [ ] caminhos de arquivos estáticos continuam validados;
- [ ] cabeçalhos de segurança não foram removidos sem justificativa;
- [ ] uma vulnerabilidade não foi publicada em Issue ou Pull Request público.

## organização e revisão

- [ ] o README aponta para os documentos existentes;
- [ ] não foram criados documentos que repetem outro arquivo sem necessidade;
- [ ] os links relativos foram testados;
- [ ] nomes de arquivos e diretórios estão em minúsculas;
- [ ] o conteúdo foi revisado em português claro;
- [ ] o Pull Request informa problema, solução, arquivos afetados e validação.
