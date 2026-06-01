# Estrutura MVC — Painel Financeiro (Express + TypeScript)

Para projeto pessoal pequeno, MVC clássico é o ponto certo. Adicionar hexagonal/DDD num painel financeiro pessoal seria over-engineering que te atrasaria sem ganho real.

## Estrutura sugerida

```
painel-financeiro/
├── src/
│   ├── config/
│   │   ├── env.ts                  # validação de variáveis de ambiente
│   │   └── database.ts             # conexão (Prisma, pg, etc.)
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Transaction.ts
│   │   └── Category.ts
│   │
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── TransactionController.ts
│   │   └── CategoryController.ts
│   │
│   ├── services/                   # regras de negócio reutilizáveis
│   │   ├── AuthService.ts
│   │   ├── TransactionService.ts
│   │   └── ReportService.ts        # ex.: saldo, gráficos, totais
│   │
│   ├── routes/
│   │   ├── index.ts                # agrega todas as rotas
│   │   ├── auth.routes.ts          # públicas
│   │   ├── transaction.routes.ts   # privadas
│   │   └── category.routes.ts      # privadas
│   │
│   ├── middlewares/
│   │   ├── validarJWT.ts
│   │   ├── tratarErros.ts
│   │   └── validarSchema.ts        # se usares zod/joi
│   │
│   ├── types/
│   │   ├── express.d.ts            # estende Request com userInfo
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── hash.ts
│   │   └── AppError.ts
│   │
│   ├── app.ts                      # configura Express
│   └── server.ts                   # bootstrap (listen)
│
├── prisma/                         # se usares Prisma
│   └── schema.prisma
├── .env
├── .env.example
├── tsconfig.json
└── package.json
```

## O fluxo

`Route → Middleware → Controller → Service → Model`

O **controller** lida com HTTP (extrai dados do request, devolve resposta). O **service** tem a regra de negócio (validações, cálculos, orquestração). O **model** representa a entidade e fala com o banco. Mantém essa separação e o projeto escala bem mesmo crescendo.

## Exemplo concreto

### Estendendo o `Request` do Express

Para tipar `req.userInfo`:

```typescript
// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      userInfo?: { id: string; email: string };
    }
  }
}
export {};
```

### Middleware JWT

```typescript
// src/middlewares/validarJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function validarJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ erro: 'Token ausente' });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
    };
    req.userInfo = payload;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}
```

### Rotas separadas por acesso

```typescript
// src/routes/auth.routes.ts (públicas)
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const controller = new AuthController();

router.post('/login', controller.login);
router.post('/register', controller.register);

export default router;
```

```typescript
// src/routes/transaction.routes.ts (privadas)
import { Router } from 'express';
import { validarJWT } from '../middlewares/validarJWT';
import { TransactionController } from '../controllers/TransactionController';

const router = Router();
const controller = new TransactionController();

router.use(validarJWT); // protege tudo abaixo

router.get('/', controller.listar);
router.post('/', controller.criar);
router.get('/resumo', controller.resumo);
router.delete('/:id', controller.deletar);

export default router;
```

```typescript
// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import transactionRoutes from './transaction.routes';
import categoryRoutes from './category.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);
router.use('/categories', categoryRoutes);

export default router;
```

### Controller fino

```typescript
// src/controllers/TransactionController.ts
import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  private service = new TransactionService();

  listar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.userInfo!;
      const dados = await this.service.listarPorUsuario(userId);
      res.json(dados);
    } catch (err) {
      next(err);
    }
  };

  criar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.userInfo!;
      const nova = await this.service.criar(userId, req.body);
      res.status(201).json(nova);
    } catch (err) {
      next(err);
    }
  };
}
```

### Service com a regra

```typescript
// src/services/TransactionService.ts
import { prisma } from '../config/database';
import { AppError } from '../utils/AppError';

export class TransactionService {
  async listarPorUsuario(userId: string) {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async criar(
    userId: string,
    dados: { amount: number; type: 'income' | 'expense'; categoryId: string },
  ) {
    if (dados.amount <= 0) throw new AppError('Valor deve ser positivo', 400);
    return prisma.transaction.create({ data: { ...dados, userId } });
  }
}
```

### app.ts

```typescript
// src/app.ts
import express from 'express';
import routes from './routes';
import { tratarErros } from './middlewares/tratarErros';

export const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(tratarErros); // sempre por último
```

## Dicas para o painel financeiro

Como vais lidar com dinheiro, **nunca uses `float` para valores** — usa `Decimal` (Prisma tem suporte nativo) ou armazena em centavos como `Int`. Erros de arredondamento em ponto flutuante são clássicos e desagradáveis nesse domínio.

Vale também colocar **validação de schema** logo no controller (zod é excelente com TypeScript — infere tipos automaticamente). Isso evita que dados malformados cheguem ao service.

A pasta `services/` é onde vais querer um `ReportService` separado para coisas como "saldo do mês", "gastos por categoria", "evolução temporal". Mantém isso fora do `TransactionService`, que cuida só do CRUD de transações — o relatório é uma responsabilidade diferente, mesmo que use os mesmos dados.

Se o projeto crescer e começares a ter muitos arquivos por pasta, aí sim faz sentido migrar para uma estrutura por módulo (`modules/transactions/{controller,service,routes}.ts`). Mas só quando a dor aparecer — não antecipes.
