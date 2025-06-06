import { z } from 'zod';

export const ativoSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  valorAtual: z.number().min(0, 'Valor deve ser um número positivo'),
});

export type AtivoFormData = z.infer<typeof ativoSchema>;

export type Ativo = {
  id: number;
  nome: string;
  valorAtual: number;
  clienteId: number;
};
