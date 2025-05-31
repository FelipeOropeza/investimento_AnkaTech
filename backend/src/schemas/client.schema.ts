import { z } from "zod";

export const createClientSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  status: z.enum(["ativo", "inativo"]),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
