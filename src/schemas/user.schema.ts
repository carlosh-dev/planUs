import { z } from 'zod';

export const userRegistrationSchema = z.object({
  name: z
    .string({ error: 'O nome é obrigatório.' })
    .min(1, 'O nome é obrigatório.'),
  email: z.email({ error: 'Email inválido.' }),
  password: z
    .string({ error: 'A senha deve conter no mínimo 8 caracteres.' })
    .min(8, 'A senha deve conter no mínimo 8 caracteres.'),
});

export const userLoginSchema = z.object({
  email: z.email({ error: 'Email inválido.' }),
  password: z
    .string({ error: 'A senha deve conter no mínimo 8 caracteres.' })
    .min(8, 'A senha deve conter no mínimo 8 caracteres.'),
});

export type UserRegistrationType = z.infer<typeof userRegistrationSchema>;
export type UserLoginType = z.infer<typeof userLoginSchema>;
