# requisitos

Os requisitos oficiais estão em [documentacao-de-projeto.md](../documentacao-de-projeto.md). Esta página destaca o contrato mínimo do sistema:

- `GET /` deve entregar o painel web;
- `GET /api/stats` deve retornar as métricas atuais em JSON;
- `GET /healthz` deve informar se o processo está ativo;
- a interface deve atualizar os indicadores e permitir pausa manual;
- o serviço deve aceitar a porta definida por `PORT`;
- a aplicação deve evitar a exposição de segredos e caminhos de arquivos inválidos.

Autenticação, persistência histórica, alertas externos e controle remoto permanecem fora do escopo atual.
