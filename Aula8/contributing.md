# Como contribuir

Contribuições para o System Monitor podem incluir correções no código, melhorias no painel, ajustes de acessibilidade e atualização da documentação.

## Fluxo recomendado

1. Leia o `README.md` e a seção correspondente de `DOCUMENTACAO.md`.
2. Crie uma branch descritiva, como `docs/melhora-api` ou `fix/health-check`.
3. Faça uma mudança pequena e focada.
4. Execute a validação local descrita em `DOCUMENTACAO.md`.
5. Atualize a documentação quando mudar uma rota, métrica, variável ou comportamento.
6. Abra um Pull Request informando problema, solução, arquivos alterados e forma de validação.

## Checklist do Pull Request

- [ ] As instruções podem ser reproduzidas.
- [ ] A alteração foi validada localmente.
- [ ] Rotas, campos e exemplos correspondem ao código.
- [ ] Não foram incluídos segredos ou dados pessoais.
- [ ] Os documentos relacionados foram atualizados.
- [ ] Funcionalidades não implementadas não foram descritas como prontas.
- [ ] A mudança preserva a validação de arquivos estáticos e os headers de segurança.

## Validação local

Os comandos e a inspeção visual estão documentados na seção de validação do `DOCUMENTACAO.md`. O projeto não possui suíte automatizada de testes nem etapa de build.
