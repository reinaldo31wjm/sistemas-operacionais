# processo de desenvolvimento e deploy

## 1. objetivo do processo

O processo reduz o risco de publicar uma alteração que funcione apenas na máquina de quem desenvolveu. Código, documentação e configuração devem evoluir juntos, principalmente quando a mudança afeta uma rota, métrica, variável de ambiente ou comportamento visual.

## 2. fluxo recomendado

```text
branch de trabalho
        |
        v
código + documentação
        |
        v
validação local
        |
        v
pull request e revisão
        |
        v
integração na branch principal
        |
        v
deploy no render
        |
        v
logs + health check + inspeção visual
```

## 3. desenvolvimento

1. atualize a branch principal local;
2. crie uma branch com objetivo claro, como `docs/melhora-api` ou `fix/health-check`;
3. faça uma alteração pequena e focada;
4. atualize os documentos afetados;
5. execute a validação local;
6. registre um commit que explique a mudança;
7. abra um Pull Request com contexto e evidências.

Exemplos de commits:

```text
docs: detalha interpretação das métricas
fix: corrige resposta do health check
feat: adiciona atualização manual do painel
```

## 4. revisão do pull request

A revisão deve responder:

- o problema está descrito com clareza?
- a solução corresponde ao código alterado?
- as rotas documentadas existem?
- os exemplos podem ser copiados e executados?
- as variáveis de ambiente estão corretas?
- a alteração expõe host, credencial ou dado pessoal?
- a documentação continua sem prometer funcionalidades futuras?
- a interface preserva acessibilidade e redução de movimento?

## 5. validação local

O projeto não possui uma suíte automatizada completa. A validação mínima exige o servidor em execução:

```bash
npm start
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
curl -fsSI http://localhost:3000/
```

Depois, abra o painel e verifique atualização automática, atualização manual, pausa, diagnóstico, abas, navegação por teclado e resposta quando a animação reduzida está ativada. O comando automatizado equivalente está em `scripts/testes-basicos.sh`.

## 6. build e dependências

Não há etapa de compilação nem dependências externas de runtime. O comando `npm start` executa diretamente o servidor. O `package-lock.json` pertence ao projeto npm e deve ser preservado quando a estrutura de scripts for alterada.

## 7. deploy no render

O arquivo `render.yaml` descreve a configuração esperada. O serviço deve:

1. utilizar o runtime Node;
2. iniciar com `npm start`;
3. aceitar a variável `PORT` fornecida pela plataforma;
4. usar `/healthz` como health check;
5. manter segredos fora do repositório.

Após o deploy, verifique:

1. logs de inicialização sem erros;
2. abertura da página principal;
3. retorno de `/healthz`;
4. retorno de `/api/stats`;
5. atualização visual do painel;
6. comportamento de métricas indisponíveis.

A URL pública atualmente documentada é [system-monitor](https://system-monitor-i16u.onrender.com). Uma URL só deve ser apresentada como publicada quando houver evidência de que o serviço está acessível.

## 8. rollback e manutenção

Se uma alteração introduzir erro, interrompa a divulgação da versão, registre o problema, reverta para a última versão funcional e abra uma correção separada. Depois, atualize a documentação para registrar a causa e a forma de validação.
