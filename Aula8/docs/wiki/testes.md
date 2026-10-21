# testes e validação

O projeto não possui uma suíte automatizada configurada. A validação mínima é feita com o servidor em execução:

```bash
curl -fsS http://localhost:3000/healthz
curl -fsS http://localhost:3000/api/stats
curl -fsSI http://localhost:3000/
```

Também deve ser verificada a atualização do painel, a pausa, a navegação por teclado e o comportamento com redução de movimento. Consulte [processo-devops.md](../processo-devops.md).
