import { z } from 'zod';

export const clienteSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  status: z.enum(['ativo', 'inativo'], {
    required_error: 'Status é obrigatório',
  }),
});

export type FormData = z.infer<typeof clienteSchema>;

export type Cliente = {
  id: number;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo';
};
