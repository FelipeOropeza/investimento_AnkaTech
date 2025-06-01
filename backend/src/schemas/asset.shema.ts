import { z } from "zod";

export const createAssetSchema = z.object({
  nome: z.string().min(1, { message: "O nome é obrigatório" }),
  valorAtual: z.number({ invalid_type_error: "O valor atual deve ser um número" }),
  clienteId: z.number({ invalid_type_error: "O clienteId deve ser um número inteiro" }).int(),
});

export type CreateAssetInput = z.infer<typeof createAssetSchema>;
