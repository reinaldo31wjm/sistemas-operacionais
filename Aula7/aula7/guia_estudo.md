# Guia de estudo e execução — Aula 7

Este guia acompanha o projeto `SO Dashboard`. Use-o como roteiro para compreender o código, executar a aplicação, publicar o serviço e produzir o relatório.

## 1. O problema que o projeto resolve

Um sistema operacional administra recursos que normalmente não aparecem para quem usa uma aplicação: tempo de CPU, memória, processos, interfaces de rede e arquivos. O projeto transforma parte dessas informações em uma API e em uma página web.

A aplicação não é uma ferramenta completa de monitoramento de produção. Ela é um instrumento didático para observar o ambiente em que o processo Node.js está executando e relacionar os dados com conceitos de Sistemas Operacionais e computação em nuvem.

## 2. Arquitetura do projeto

```text
Navegador ou cliente HTTP
          |
          v
     Express / server.js
       |       |       |
       v       v       v
      os     process   fs/path
       |       |       |
       +-------+-------+
               |
               v
        JSON em /api/metrics
               |
               v
         Dashboard em /
```

### Componentes

- **Express:** registra rotas HTTP e envia respostas.
- **CORS:** permite requisições de origens diferentes quando necessário.
- **`os`:** lê CPU, memória, uptime, hostname, arquitetura e rede.
- **`process`:** informa PID, versão do Node.js, memória do processo e ambiente.
- **`fs` e `path`:** inspecionam os arquivos do diretório de execução.
- **`render.yaml` e `railway.json`:** descrevem configurações de deploy.

## 3. Preparação do ambiente

Confirme as versões instaladas:

```bash
node --version
npm --version
```

O projeto requer Node.js 18 ou superior. Depois, instale exatamente as versões registradas no lockfile:

```bash
npm ci
```

Use `npm install` quando estiver adicionando ou atualizando dependências. Use `npm ci` para reproduzir a instalação registrada em `package-lock.json`.

## 4. Execução local padrão

Inicie o servidor:

```bash
npm start
```

Acesse:

- <http://localhost:3000> — dashboard;
- <http://localhost:3000/api/metrics> — métricas em JSON;
- <http://localhost:3000/health> — resposta de saúde.

O processo permanece ativo no terminal. Para interrompê-lo, pressione `Ctrl+C`.

Para desenvolvimento, o script abaixo reinicia o processo quando `server.js` é alterado:

```bash
npm run dev
```

## 5. Simulação do ambiente Railway

O script `iniciar-railway.sh` define variáveis semelhantes às encontradas em um serviço Railway e usa `3001` como porta local:

```bash
chmod +x iniciar-railway.sh
./iniciar-railway.sh
```

Nesse modo, use:

- <http://localhost:3001>;
- <http://localhost:3001/api/metrics>;
- <http://localhost:3001/health>.

A simulação não cria um serviço cloud nem substitui o deploy. Ela apenas ajuda a observar como `RAILWAY_ENVIRONMENT`, `RAILWAY_PROJECT_NAME` e `RAILWAY_SERVICE_NAME` aparecem no dashboard.

Se a variável `PORT` já estiver definida, o script preserva esse valor:

```bash
PORT=4000 ./iniciar-railway.sh
```

## 6. Testes essenciais

Valide a sintaxe do servidor:

```bash
npm test
```

Com a aplicação em execução, consulte o health check:

```bash
curl -i http://localhost:3000/health
```

Uma resposta esperada é semelhante a:

```json
{"status":"ok","timestamp":"2026-10-22T00:00:00.000Z"}
```

Consulte as métricas e verifique se o JSON contém `kpis`, `system`, `memory`, `cpu`, `network`, `files`, `process`, `environment` e `time`:

```bash
curl -s http://localhost:3000/api/metrics
```

## 7. Como ler o código

A função `cpuSnapshot()` captura os tempos de CPU fornecidos pelo Node.js. `cpuUsageBetween()` compara a captura atual com a anterior. Como o cálculo depende de um intervalo, uma requisição logo após a inicialização pode produzir `0%` ou uma leitura pouco representativa.

A função `collectMetrics()` reúne os dados em um único objeto. Essa separação facilita a reutilização das métricas pela API e pela interface HTML.

A função `getProjectFileCount()` percorre o diretório de execução e ignora `.git` e `node_modules`. A função `getFilesDetailed()` produz a listagem visual dos primeiros itens do diretório. Assim, a contagem total e a tabela têm finalidades diferentes.

A função `healthStatus()` cria uma classificação didática. Ela considera RAM, CPU e `load average`, mas não mede latência, erros, filas, disco, disponibilidade histórica ou dependências externas.

## 8. Diferenças entre métricas parecidas

### Uptime do sistema e do processo

`os.uptime()` representa o tempo de atividade do sistema ou contêiner observado. O uptime calculado com `startedAt` representa há quanto tempo o processo Node.js foi iniciado. Um novo deploy pode reiniciar o processo sem que todos os recursos subjacentes tenham o mesmo tempo de atividade.

### CPU e load average

O percentual de CPU é uma estimativa baseada em amostras sucessivas dos tempos de cada núcleo. O `load average` representa a quantidade média de trabalho observada pelo sistema em janelas de 1, 5 e 15 minutos. Os valores não são equivalentes.

### IP privado e domínio público

O endereço retornado por `os.networkInterfaces()` pertence às interfaces visíveis para o processo. Em um contêiner, ele pode ser privado ou interno. O domínio público fornecido pelo provedor é uma camada diferente da infraestrutura.

### RAM da instância e RAM do processo

A RAM do sistema é estimada com `totalmem()` e `freemem()`. A memória do processo Node.js é obtida por `process.memoryUsage().rss`. A segunda é apenas uma parcela do uso observado pela primeira.

## 9. Deploy no Render

Use o arquivo `render.yaml` como referência ou informe os valores no painel:

```text
Runtime: Node
Build command: npm install
Start command: npm start
Health check path: /health
```

Depois do deploy, teste a URL pública nas três rotas. Se o serviço não iniciar, verifique os logs e confirme se o processo escuta `process.env.PORT` e o endereço `0.0.0.0`.

## 10. Deploy na Railway

A Railway pode detectar o `package.json` automaticamente. Confirme o comando `npm start`, configure `/health` e gere um domínio público. O arquivo `railway.json` registra o comando de inicialização, a rota de health check e a política de reinício.

Não coloque tokens ou senhas no código. Variáveis sensíveis devem ser configuradas no painel do provedor e não devem ser registradas no relatório.

## 11. Coleta para o relatório

Para cada ambiente, registre:

1. URL e data da coleta;
2. revisão ou commit publicado;
3. hostname e arquitetura;
4. versão do Node.js;
5. RAM, CPU e load average;
6. uptime do sistema e do processo;
7. quantidade de arquivos;
8. resultado de `/health`;
9. observações sobre logs e tempo de deploy.

Faça pelo menos três coletas em momentos próximos. Uma única leitura não permite concluir que uma plataforma é mais rápida ou mais estável.

## 12. Problemas comuns

### `npm: command not found`

Instale o Node.js e confirme que `node` e `npm` estão no `PATH`.

### `EADDRINUSE: address already in use`

Outra aplicação já usa a porta. Encerre o processo anterior ou escolha outra porta:

```bash
PORT=4000 npm start
```

### A página abre, mas a API falha

Confira se o processo continua ativo no terminal e teste `/health`. Em seguida, consulte os logs e acesse `/api/metrics` diretamente.

### O deploy inicia e encerra

Confirme o comando `npm start`, a versão do Node.js e o uso de `process.env.PORT`. O servidor precisa escutar em `0.0.0.0` para aceitar conexões externas ao processo.

### O IP ou hostname muda

Isso é esperado quando o provedor substitui ou reinicia a instância. Registre o valor observado e o horário da coleta.

## 13. Questões para responder

1. Por que uma aplicação cloud não deve depender da porta fixa `3000`?
2. Por que a CPU é calculada com duas amostras?
3. Qual é a diferença entre RAM do sistema e RSS do processo?
4. Por que o número de arquivos pode ser maior que o número de linhas da tabela?
5. Por que o IP do contêiner não é necessariamente o endereço público?
6. Quais métricas adicionais seriam necessárias em um ambiente de produção?

## 14. Resultado esperado

Ao final, você deve conseguir iniciar o projeto localmente, validar as três rotas, explicar de onde vêm as principais métricas, publicar a aplicação em uma plataforma cloud e preencher o relatório comparativo com dados observados e limitações claramente descritas.
