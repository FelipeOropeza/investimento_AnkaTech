import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prismaClient";
import { createClientSchema } from "../schemas/client.schema";

export async function createClientHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parse = createClientSchema.safeParse(request.body);

  if (!parse.success) {
    const erros = parse.error.errors.map((err) => ({
      campo: err.path[0],
      mensagem: err.message,
    }));
    return reply.code(400).send({ erros });
  }

  try {
    const client = await prisma.cliente.create({
      data: parse.data,
    });
    return reply.code(201).send(client);
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erro ao criar cliente." });
  }
}

export async function listClientsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const clients = await prisma.cliente.findMany();
  return reply.send(clients);
}

export async function getByClientsHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return reply.code(400).send({ message: "ID inválido" });
  }

  try {
    const client = await prisma.cliente.findUnique({
      where: { id },
    });

    if (!client) {
      return reply.code(404).send({ message: "Cliente não encontrado" });
    }

    return reply.send(client);
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erro ao buscar cliente." });
  }
}

export async function listAssetsByClientHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return reply.code(400).send({ message: "ID inválido" });
  }

  try {
    const ativos = await prisma.ativo.findMany({
      where: { clienteId: id },
    });

    return reply.send(ativos);
  } catch (error) {
    console.error(error);
    return reply
      .code(500)
      .send({ message: "Erro ao buscar ativos do cliente." });
  }
}

export async function updateClientHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  if (isNaN(id)) {
    return reply.code(400).send({ message: "ID inválido" });
  }

  const parse = createClientSchema.safeParse(request.body);
  if (!parse.success) {
    const erros = parse.error.errors.map((err) => ({
      campo: err.path[0],
      mensagem: err.message,
    }));
    return reply.code(400).send({ erros });
  }

  try {
    const client = await prisma.cliente.update({
      where: { id },
      data: parse.data,
    });
    return reply.send(client);
  } catch (error) {
    console.error(error);
    return reply.code(404).send({ message: "Cliente não encontrado." });
  }
}
