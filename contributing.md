# como contribuir

Contribuições para o System Monitor podem incluir correções no código, melhorias no painel, ajustes de acessibilidade e atualização da documentação.

## fluxo recomendado

1. Leia o [readme](readme.md) e a documentação relacionada à alteração.
2. Crie uma branch descritiva, como `docs/melhora-api` ou `fix/health-check`.
3. Faça uma mudança pequena e focada.
4. Execute o servidor e valide `/`, `/api/stats` e `/healthz`.
5. Atualize a documentação quando mudar uma rota, métrica, variável ou comportamento.
6. Abra um Pull Request informando problema, solução, arquivos alterados e forma de validação.

## checklist do pull request

- [ ] os nomes e links estão em minúsculas e corretos;
- [ ] as instruções podem ser reproduzidas;
- [ ] a alteração foi validada localmente;
- [ ] não foram incluídos segredos ou dados pessoais;
- [ ] os documentos relacionados foram atualizados;
- [ ] funcionalidades não implementadas não foram descritas como prontas.
