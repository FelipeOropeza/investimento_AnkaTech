import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prismaClient";
import { CreateClientInput } from "../schemas/client.schema";

export async function createClientHandler(
  request: FastifyRequest<{ Body: CreateClientInput }>,
  reply: FastifyReply
) {
  try {
    const client = await prisma.cliente.create({
      data: request.body,
    });
    return reply.code(201).send(client);
  } catch (error) {
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

export async function updateClientHandler(
  request: FastifyRequest<{ Params: { id: string }; Body: CreateClientInput }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);
  try {
    const client = await prisma.cliente.update({
      where: { id },
      data: request.body,
    });
    return reply.send(client);
  } catch (error) {
    return reply.code(404).send({ message: "Cliente não encontrado." });
  }
}
