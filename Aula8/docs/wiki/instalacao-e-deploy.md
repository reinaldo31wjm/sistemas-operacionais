# instalação e deploy

## execução local

```bash
git clone https://github.com/reinaldo31wjm/system-monitor.git
cd system-monitor
npm start
```

Acesse `http://localhost:3000`. Consulte o [readme](../../readme.md) para a variável `PORT` e o comando de desenvolvimento.

## render

Use `npm start` como comando de inicialização e `/healthz` como health check path. A variável `PORT` deve ser fornecida pela plataforma.

O procedimento completo e a validação pós-deploy estão em [processo-devops.md](../processo-devops.md).
