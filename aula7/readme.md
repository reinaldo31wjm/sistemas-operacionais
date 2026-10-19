# SO Dashboard

Dashboard de monitoramento de sistema operacional desenvolvido com **Node.js** e **Express**, conforme o projeto da aula de Nuvem e Sistemas Operacionais.

## Funcionalidades implementadas

- Indicadores de RAM, CPU média, uptime, quantidade de arquivos, IP principal e status geral.
- Informações do sistema operacional: hostname, tipo, release/kernel, plataforma, arquitetura, endianness e versão do Node.js.
- Informações de usuário, processo, rede, arquivos do projeto e ambiente de execução.
- Identificação automática de ambiente local, Render ou Railway por variáveis de ambiente.
- Endpoint JSON em `/api/metrics`.
- Endpoint de saúde em `/health`.
- Atualização automática da página a cada 15 segundos.
- Medição de CPU baseada na diferença entre amostras sucessivas.
- Uso de `process.env.PORT`, compatível com ambientes cloud.

## Executar localmente

```bash
npm install
npm start
```

Acesse <http://localhost:3000>.

Para desenvolvimento:

```bash
npm run dev
```

Validação de sintaxe:

```bash
npm test
```

## Deploy no Render

1. Crie um repositório Git e envie os arquivos do projeto.
2. No Render, escolha **New > Web Service** e conecte o repositório.
3. Utilize:
   - **Language:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. A aplicação utiliza automaticamente a porta fornecida em `process.env.PORT`.
5. Após o deploy, acesse a URL `onrender.com` e teste `/`, `/api/metrics` e `/health`.

## Deploy na Railway

1. Crie um projeto na Railway a partir do repositório GitHub.
2. A Railway identifica o `package.json` e o runtime Node.js.
3. Se necessário, configure o comando de inicialização como `npm start`.
4. A aplicação utiliza a variável `PORT` fornecida pelo serviço.
5. Gere um domínio público e teste `/`, `/api/metrics` e `/health`.
6. O arquivo `railway.json` contém o comando de inicialização e o caminho de health check.

## Relatório

O arquivo `relatorio_comparativo.md` apresenta o procedimento, os critérios de análise e as diferenças entre Render e Railway. O arquivo `resumo_aula.md` resume o conteúdo do PDF fornecido na atividade.

## Observações técnicas

Os valores de hostname, IP, uptime, CPU e memória correspondem ao contêiner ou máquina em que o processo está sendo executado. Em um ambiente cloud, essas informações descrevem a instância do serviço e não necessariamente o hardware físico completo do provedor. O IP exibido pode ser privado e não deve ser confundido com o endereço público do domínio.
