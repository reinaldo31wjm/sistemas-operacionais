# api

A referência do contrato HTTP está em [documentacao-api.md](../documentacao-api.md). Os endpoints principais são:

- `GET /`: painel web;
- `GET /api/stats`: métricas atuais em JSON;
- `GET /healthz`: status do processo.

A API não persiste histórico e não exige autenticação.
