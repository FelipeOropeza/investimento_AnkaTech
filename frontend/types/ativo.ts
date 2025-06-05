import { z } from 'zod';

// Schema recebe strings no formulário (input)
export const ativoSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  valorAtual: z
    .string()
    .nonempty('Valor é obrigatório')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 0, 'Valor deve ser um número positivo'),
});

// Tipo dos valores do formulário (tudo string)
export type AtivoFormValues = z.input<typeof ativoSchema>;

// Tipo dos dados validados (após transformação)
export type AtivoFormData = z.output<typeof ativoSchema>;

// Modelo do ativo (pode ter outras propriedades)
export type Ativo = {
  id: number;
  nome: string;
  valorAtual: number;
  clienteId: number;
};
