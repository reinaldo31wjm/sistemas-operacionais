# arquitetura do system monitor

## visão geral

A aplicação segue uma arquitetura compacta em camadas: coleta de métricas, servidor HTTP, geração da página e interação no navegador. Essa separação permite estudar cada responsabilidade sem depender de um framework de servidor.

## fluxo de dados

```text
sistema operacional
        |
        v
lib/metrics.js ---> coleta, normalização e cache
        |
        v
server.js --------> rotas HTTP, arquivos estáticos e segurança
        |
        +--> GET /api/stats ---> resposta JSON
        +--> GET /healthz -----> status do processo
        +--> GET / -------------> página HTML
                                      |
                                      +--> public/js/app.js
                                      |       consulta, indicadores e diagnóstico
                                      +--> public/js/rain.js
                                      |       animação visual em canvas
                                      +--> public/css/style.css
                                              layout e acessibilidade
```

## componentes

### `server.js`

É o ponto de entrada. Cria o servidor HTTP nativo, verifica método e URL, encaminha as rotas, entrega recursos de `public/` e aplica cabeçalhos como Content Security Policy, `X-Content-Type-Options` e `Referrer-Policy`.

### `lib/metrics.js`

Centraliza a leitura das métricas. Calcula CPU, memória, carga, armazenamento, uptime, memória do processo e interfaces de rede. Leituras frequentes usam amostragem ou cache para evitar trabalho repetido a cada requisição.

### `lib/page.js`

Gera a página HTML inicial. Essa escolha mantém o servidor responsável pela entrega do documento sem exigir um framework frontend ou uma etapa de compilação.

### `public/js/app.js`

Controla a experiência no navegador: chamadas à API, atualização automática, atualização manual, pausa, abas, histórico, estados de normalidade e mensagens de falha.

### `public/js/rain.js`

Implementa a animação em canvas, incluindo densidade, velocidade e sincronização visual com o estado observado. A animação deve reduzir atividade quando a aba está em segundo plano ou quando o usuário prefere menos movimento.

### `public/css/style.css`

Define o layout responsivo, cores dos níveis, estados de foco, componentes do painel e identidade visual cyberpunk.

## decisões técnicas

1. **Node.js nativo:** torna o fluxo HTTP explícito e reduz a superfície de dependências.
2. **API separada da apresentação:** permite validar a coleta com `curl` e reutilizar os dados em outro cliente.
3. **cache curto:** evita que múltiplos visitantes provoquem leituras idênticas em sequência.
4. **configuração por ambiente:** `PORT` permite que a mesma aplicação funcione localmente e no Render.
5. **validação de arquivos:** limita recursos estáticos ao diretório permitido e reduz risco de path traversal.
6. **renderização progressiva:** o servidor entrega a página inicial e o navegador atualiza os dados depois.
7. **acessibilidade:** teclado e redução de movimento são tratados como requisitos, não apenas como melhorias visuais.

## segurança e privacidade

O projeto não utiliza credenciais para coletar as métricas, mas informações de host podem revelar detalhes da infraestrutura. Por isso, `SHOW_HOST_DETAILS` deve permanecer desativado quando não houver necessidade clara.

A aplicação aplica cabeçalhos de proteção e valida caminhos. Essas medidas não substituem autenticação, firewall, controle de acesso ou revisão de segurança para um ambiente produtivo.

## interpretação operacional

Uma métrica representa uma leitura do ambiente em que o processo está executando. Em contêineres, a memória pode vir de limites de cgroup, a quantidade de CPUs pode refletir a plataforma e a leitura de disco pode ser bloqueada. O painel deve ser usado como sinal de diagnóstico, não como fonte única para decisões críticas.
