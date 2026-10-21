# diagramas do system monitor

## fluxo de dados

```text
sistema operacional
        |
        v
lib/metrics.js -> coleta e cache -> server.js
                                      |
                    +-----------------+-----------------+
                    |                 |                 |
                 GET /             /api/stats        /healthz
                    |                 |                 |
               painel web        métricas json    status do serviço
```

A descrição detalhada dos módulos está em [wiki/arquitetura.md](wiki/arquitetura.md).
