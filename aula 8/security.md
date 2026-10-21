# política de segurança

O System Monitor expõe métricas operacionais do ambiente de execução. Por isso, qualquer problema de segurança deve ser tratado com responsabilidade, sem publicar dados sensíveis.

## cuidados no uso

- não inclua senhas, tokens, chaves ou arquivos `.env` no repositório;
- avalie com cuidado o uso de `SHOW_HOST_DETAILS` em serviços públicos;
- não teste vulnerabilidades em sistemas sem autorização;
- não divulgue publicamente detalhes exploráveis antes de uma correção.

## como relatar

Abra um relato privado pelo recurso de segurança do GitHub ou entre em contato com a pessoa responsável pelo repositório. Inclua impacto, ambiente afetado e passos seguros para reproduzir o problema, sem enviar credenciais reais.

## escopo

Esta política cobre o código, a documentação e a configuração de deploy do System Monitor. Ambientes derivados do projeto devem definir sua própria política e revisar seus riscos antes de uso em produção.
