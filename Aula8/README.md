# Aula 8 — Documentação do System Monitor

Esta aula documenta o projeto implementado na Aula 7: o [System Monitor](https://github.com/reinaldo31wjm/system-monitor), painel web de observabilidade executado com Node.js nativo.

## Conteúdo

- [Documentação técnica consolidada](DOCUMENTACAO.md): objetivo, escopo, arquitetura, API, requisitos, operação, validação e deploy.
- [Como contribuir](contributing.md): branches, Pull Requests e revisão.
- [Política de segurança](security.md): controles, riscos e relato de vulnerabilidades.
- [Código de conduta](code_of_conduct.md): regras de convivência e comunicação.
- [Licença](license): texto da licença MIT utilizado neste material.
- [Resumo da Aula 8](RESUMO_AULA.md): material didático sobre documentação de software.
- [PDF da Aula 8](Aula08-Documentacao-de-Software.pdf): material original da aula.

## Início rápido

```bash
git clone https://github.com/reinaldo31wjm/system-monitor.git
cd system-monitor
npm start
```

Acesse `http://localhost:3000`. A documentação técnica contém os comandos de validação, as variáveis de ambiente, as rotas, a estrutura do projeto e o procedimento de deploy.

## Organização

A documentação técnica foi consolidada em `DOCUMENTACAO.md`; políticas que possuem função própria permanecem separadas em `contributing.md`, `security.md`, `code_of_conduct.md` e `license`. O código da aplicação permanece na Aula 7, que é a fonte de implementação.

O PDF original da Aula 8 apresenta conceitos gerais de documentação de software. A implementação desta entrega é documentada de acordo com o System Monitor real, e não com exemplos genéricos do PDF.

A documentação distingue o que está implementado do que depende de ação externa. O segundo deploy necessário para uma comparação empírica entre plataformas ainda precisa ser realizado e registrado com evidências reais.
