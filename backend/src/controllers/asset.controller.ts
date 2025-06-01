import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prismaClient";
import { createAssetSchema } from "../schemas/asset.shema";

export async function createAssetHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parse = createAssetSchema.safeParse(request.body);

  if (!parse.success) {
    const erros = parse.error.errors.map((err) => ({
      campo: err.path[0],
      mensagem: err.message,
    }));
    return reply.code(400).send({ erros });
  }

  try {
    const asset = await prisma.ativo.create({
      data: parse.data,
    });

    return reply.code(201).send(asset);
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erro ao criar ativo." });
  }
}

export async function listAssetsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const assets = await prisma.ativo.findMany();
  return reply.send(assets);
}
