import { z } from "zod";

export const createClientSchema = z.object({
  nome: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z
    .string({ invalid_type_error: "O email é obrigatório" })
    .email({ message: "Formato de email inválido" }),
  status: z.enum(["ativo", "inativo"], {
    errorMap: () => ({ message: "O status deve ser 'ativo' ou 'inativo'" }),
  }),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
