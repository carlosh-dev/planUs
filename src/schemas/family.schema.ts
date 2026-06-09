import z from 'zod';

export const createFamilySchema = z.object({
  name: z.string('Nome é obrigatório.'),
  users: z.array(z.uuid()).min(1),
});

export type createFamilyType = z.infer<typeof createFamilySchema>;
