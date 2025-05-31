import { FastifyInstance } from "fastify";

const ativosFixos = [
  { nome: "Ação XYZ", valor: 100.0 },
  { nome: "Fundo ABC", valor: 200.0 },
];

export async function assetRoutes(server: FastifyInstance) {
  server.get("/ativos", async (request, reply) => {
    return reply.send(ativosFixos);
  });
}
