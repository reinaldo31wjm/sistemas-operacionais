# Execução e publicação na Railway

Este arquivo diferencia a simulação local do ambiente Railway real. A simulação apenas define variáveis de ambiente; ela não cria um serviço remoto.

## Simulação local

Na pasta `aula7`, instale as dependências e execute:

```bash
npm ci
chmod +x iniciar-railway.sh
./iniciar-railway.sh
```

O script define `PORT=3001` como padrão local. Acesse:

- <http://localhost:3001>
- <http://localhost:3001/health>
- <http://localhost:3001/api/metrics>

Para escolher outra porta:

```bash
PORT=4000 ./iniciar-railway.sh
```

## Variáveis simuladas

| Variável | Valor padrão | Finalidade |
|---|---|---|
| `NODE_ENV` | `production` | indica o modo de execução |
| `RAILWAY_ENVIRONMENT` | `production` | permite identificar Railway no dashboard |
| `RAILWAY_PROJECT_NAME` | `so-dashboard` | nome ilustrativo do projeto |
| `RAILWAY_SERVICE_NAME` | `so-dashboard` | nome ilustrativo do serviço |
| `PORT` | `3001` | porta local usada pelo script |

Na resposta JSON, `environment.provider` deve aparecer como `Railway` e `environment.railway` como `true`.

## Publicação real

1. Envie a pasta para um repositório GitHub.
2. Crie um projeto na Railway e adicione um serviço conectado ao repositório.
3. Confirme que o serviço reconheceu o `package.json`.
4. Use `npm start` como comando de inicialização, se a detecção automática não o configurar.
5. Configure `/health` como health check.
6. Gere um domínio público.
7. Teste `/`, `/api/metrics` e `/health` usando o domínio gerado.

No ambiente real, não fixe a porta manualmente. A Railway fornece `PORT`, e o servidor usa essa variável automaticamente. O arquivo `railway.json` registra o comando `npm start`, a rota de health check e a política de reinício.

## Verificação após o deploy

```bash
curl -fsS https://SEU-DOMINIO/health
curl -fsS https://SEU-DOMINIO/api/metrics
```

Substitua `SEU-DOMINIO` pelo endereço gerado pela Railway. Registre no relatório a URL, o horário da coleta, a revisão publicada e as métricas observadas.

## Segurança

Não adicione tokens, senhas ou credenciais ao script, ao repositório ou ao relatório. Variáveis sensíveis devem ser configuradas no painel da plataforma.
