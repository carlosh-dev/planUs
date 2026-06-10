import z from 'zod';

import {
  PaymentType,
  TransationType,
} from '../infra/database/generated/prisma/enums.js';

export const createTransactionSchema = z.object({
  name: z.string('Nome é obrigatório.'),
  description: z.string().max(250, 'Máximo de 250 caracteres.').optional(),
  value: z.number().min(1, 'Valor é um campo obrigatório.'),
  userId: z.uuid(),
  recurrent: z.boolean(),
  paymentDate: z.date({
    error: (issue) =>
      issue.input === undefined
        ? 'Data de pagemnto é obrigatório.'
        : 'Data inválida',
  }),
  paymentType: z.enum(PaymentType),
  installments: z.number().optional(),
  type: z.enum(TransationType),
});

export type createTransactionType = z.infer<typeof createTransactionSchema>;
