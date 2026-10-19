# Execução do projeto na Railway

## Como executar

```bash
chmod +x iniciar-railway.sh
./iniciar-railway.sh
```

Acesse:

- <http://localhost:3001>
- <http://localhost:3001/health>
- <http://localhost:3001/api/metrics>

## Variáveis do ambiente

| Variável | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `RAILWAY_ENVIRONMENT` | `production` |
| `RAILWAY_PROJECT_NAME` | `so-dashboard` |
| `RAILWAY_SERVICE_NAME` | `so-dashboard` |
| `PORT` | `3001` |

A aplicação identifica `RAILWAY_ENVIRONMENT` e apresenta Railway como provedor no cartão **Ambiente de execução**.

Na publicação cloud, a Railway fornece um domínio público e executa o mesmo comando `npm start` definido no projeto.
