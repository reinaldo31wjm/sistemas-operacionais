# Atividade da Aula 3 — Git, VS Code e GitHub

## 1. Resumo da atividade proposta no PDF

A atividade da aula possui três etapas:

1. Configurar a integração entre a IDE instalada no computador, o Git e a conta pessoal do GitHub. A autenticação deve funcionar e a IDE deve reconhecer o repositório remoto, permitindo realizar `commit`, `push` e `pull`.
2. Criar um repositório de teste com pelo menos um arquivo inicial. Depois, alterar o arquivo, fazer commit e sincronizar com o GitHub. Em seguida, apagar a pasta local, clonar novamente o repositório com `git clone` e verificar se o projeto foi restaurado.
3. Pesquisar cinco projetos de outros usuários no GitHub, clonar cada projeto para o computador e analisar o conteúdo dos repositórios.

## 2. Como subir um código pelo VS Code

O VS Code possui integração com Git e permite inicializar repositórios, preparar arquivos, fazer commits, criar branches e sincronizar alterações sem sair do editor [5]. Para realizar a atividade com o projeto da Aula 3, siga este roteiro.

### 5.1 Pré-requisitos

1. Instale o **Git** e o **VS Code**.
2. Confirme a instalação abrindo o terminal e executando:

```bash
git --version
```

3. Configure seu nome e e-mail, caso ainda não tenha feito isso:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@example.com"
```

4. Entre no GitHub pelo navegador ou use a autenticação solicitada pelo VS Code. Não coloque senha ou token dentro de arquivos do projeto.

### 5.2 Abrir ou criar o projeto

Para enviar o projeto existente da Aula 3:

1. Baixe ou clone o projeto original.
2. Abra a pasta `Aula3` no VS Code usando **File > Open Folder**.
3. Verifique se os arquivos `index.html`, `script.js` e `style.css` aparecem no Explorer.
4. Abra `index.html` no navegador para conferir se o projeto funciona.

Se preferir começar um projeto novo, crie uma pasta, abra-a no VS Code e adicione um arquivo, por exemplo `README.md` ou `index.html`.

### 5.3 Inicializar o repositório

Na barra lateral do VS Code:

1. Abra **Source Control** ou **Controle de Código-Fonte**.
2. Clique em **Initialize Repository** ou **Inicializar Repositório**.
3. O VS Code criará a pasta oculta `.git` e passará a acompanhar as alterações.
4. Revise os arquivos modificados antes de confirmar o commit. O editor de diferenças mostra o que foi acrescentado, removido ou alterado [5].

Pelo terminal integrado, o mesmo procedimento pode ser feito com:

```bash
git init
git add .
git commit -m "Adiciona simulador da Aula 3"
```

### 5.4 Publicar no GitHub

1. Na tela **Source Control**, selecione **Publish to GitHub** ou **Publicar no GitHub**.
2. Faça login quando o VS Code solicitar.
3. Informe o nome do repositório, por exemplo `atividade-aula3-sistemas-operacionais`.
4. Escolha se o repositório será público ou privado.
5. Confirme a publicação.
6. Acesse seu perfil no GitHub e verifique se os arquivos foram enviados.

O comando de publicação do VS Code pode criar o repositório remoto e enviar os commits locais em uma única operação [5]. Como alternativa, também é possível criar o repositório vazio no GitHub e adicionar a URL remota pelo terminal:

```bash
git remote add origin https://github.com/SEU_USUARIO/atividade-aula3-sistemas-operacionais.git
git branch -M main
git push -u origin main
```

### 5.5 Alterar, fazer commit e sincronizar

Depois de publicar, altere o código, por exemplo, mudando um texto do `index.html` ou uma cor do `style.css`.

No VS Code:

1. Volte à tela **Source Control**.
2. Confira o diff da alteração.
3. Clique no sinal de `+` para preparar o arquivo, isto é, fazer o *stage*.
4. Escreva uma mensagem objetiva, como `Atualiza painel de métricas`.
5. Clique em **Commit**.
6. Clique em **Sync Changes**, **Push** ou use o menu de ações para enviar a alteração.

Pelo terminal, o fluxo equivalente é:

```bash
git status
git add index.html
git commit -m "Atualiza painel de métricas"
git push
```

### 5.6 Testar o clone e a restauração

Para cumprir a segunda etapa da atividade, copie a URL do repositório no GitHub e, em outra pasta, execute:

```bash
git clone https://github.com/SEU_USUARIO/atividade-aula3-sistemas-operacionais.git
cd atividade-aula3-sistemas-operacionais
```

Abra a nova pasta no VS Code e confirme se `index.html`, `script.js` e `style.css` foram restaurados. Em seguida, execute novamente o projeto no navegador. Esse teste comprova que o código salvo no GitHub pode ser recuperado em outra cópia local.

## 3. Resultado esperado para entrega

Ao final, o aluno deve ter:

- Git instalado e configurado;
- VS Code conectado à conta do GitHub;
- um repositório remoto contendo o código;
- pelo menos um commit com mensagem clara;
- uma alteração posterior enviada por `push` ou **Sync Changes**;
- um teste de `git clone` que restaure o projeto;
- análise de cinco repositórios públicos, conforme solicitado na atividade.

Para o projeto desta pasta, uma entrega adequada pode conter os três arquivos da aplicação, o PDF ou um `README.md` explicando a simulação e um histórico de commits mostrando a evolução do código.



## Referências
1. [1] [Pasta Aula3 no repositório sistemas-operacionais-1](https://github.com/reinaldo31wjm/sistemas-operacionais-1/tree/main/Aula3 )

5. [5] [Source Control no Visual Studio Code](https://code.visualstudio.com/docs/sourcecontrol/overview )

6. [6] [Documentação do GitHub sobre criação e publicação de projeto](https://docs.github.com/en/get-started/start-your-journey/uploading-a-project-to-github )

