# documentação da api

## 1. finalidade

A API do System Monitor expõe leituras atuais do ambiente e um sinal simples de disponibilidade. Ela foi projetada para ser consumida pelo próprio painel, por comandos de diagnóstico e por integrações internas autorizadas.

A API não possui autenticação, não persiste histórico e não deve ser interpretada como uma medição garantida do hardware físico da hospedagem.

## 2. regras gerais

- protocolo: HTTP;
- métodos aceitos: `GET` e `HEAD`;
- respostas JSON: `application/json; charset=utf-8`;
- rota inexistente: `404 Not Found`;
- método não permitido: `405 Method Not Allowed`;
- erro interno do servidor: pode resultar em `500 Internal Server Error`;
- leituras: representam o momento da consulta, com cache curto conforme o tipo de dado.

## 3. `GET /healthz`

Endpoint destinado à plataforma de hospedagem e a verificações rápidas.

### resposta `200 ok`

```json
{"status":"ok"}
```

O retorno confirma que o processo HTTP está disponível. Ele não significa que disco, carga ou todas as métricas estejam disponíveis no ambiente.

### exemplos

```bash
curl -i http://localhost:3000/healthz
curl -I http://localhost:3000/healthz
```

## 4. `GET /api/stats`

Retorna um retrato das métricas coletadas no instante da consulta.

### exemplo de resposta

```json
{
  "timestamp": 1720000000000,
  "serverTime": "03/07/2024, 12:00:00 BRT",
  "uptime": "0h 12m 34s",
  "processUptime": "0h 12m 30s",
  "loadSupported": true,
  "load1": "0.42",
  "load5": "0.37",
  "load15": "0.31",
  "cores": [12, 8, 10],
  "loadPercent": 10,
  "usedMem": 512,
  "freeMem": 1536,
  "totalMem": 2048,
  "memUsagePercent": 25,
  "memSource": "cgroup",
  "processMem": "18.20",
  "rss": "42.5",
  "disk": {
    "available": true,
    "totalGB": "10.7",
    "usedGB": "2.1",
    "percent": 20
  }
}
```

### campos

| campo | significado |
| --- | --- |
| `timestamp` | instante da coleta em milissegundos desde Unix Epoch; |
| `serverTime` | data e hora formatadas no servidor; |
| `uptime` | tempo de atividade do sistema; |
| `processUptime` | tempo de atividade do processo Node.js; |
| `loadSupported` | indica se a carga do sistema está disponível; |
| `load1`, `load5`, `load15` | médias de carga de 1, 5 e 15 minutos; |
| `cores` | estimativa de uso por núcleo; |
| `loadPercent` | estimativa média de utilização dos núcleos; |
| `usedMem`, `freeMem`, `totalMem` | memória em MB; |
| `memUsagePercent` | percentual calculado de memória utilizada; |
| `memSource` | origem usada para estimar a memória, como cgroup, meminfo ou os; |
| `processMem` | heap utilizado pelo processo Node.js, em MB; |
| `rss` | Resident Set Size do processo, em MB; |
| `disk` | objeto com disponibilidade, capacidade, uso e percentual do disco. |

Quando o armazenamento não puder ser consultado, `disk.available` será `false` e os valores de capacidade poderão ser nulos. Quando a carga não for suportada, `loadSupported` indicará essa condição e os números não devem ser interpretados como zero real.

## 5. interpretação

Os valores são observacionais e dependem do sistema operacional, das permissões e dos limites do contêiner. Uma porcentagem alta pode representar sobrecarga do processo, do contêiner ou do host compartilhado. Uma porcentagem baixa não garante que a aplicação esteja funcional em todos os aspectos.

O painel usa faixas visuais para facilitar a leitura, mas essas faixas são sinais de acompanhamento, não diagnósticos definitivos:

- **normal:** abaixo de 60%;
- **atenção:** de 60% a 84%;
- **crítico:** 85% ou mais.

## 6. verificação completa

```bash
curl -i http://localhost:3000/healthz
curl -i http://localhost:3000/api/stats
curl -I http://localhost:3000/
```

Para uma integração externa, armazene os dados fora do System Monitor se precisar de histórico, gráficos temporais ou alertas.
