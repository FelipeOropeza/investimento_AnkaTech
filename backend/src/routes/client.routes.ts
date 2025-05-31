import { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createClientHandler, listClientsHandler, updateClientHandler } from "../controllers/client.controller";
import { createClientSchema } from "../schemas/client.schema";

export async function clientRoutes(server: FastifyInstance) {
  server.post(
    "/clients",
    {
      schema: {
        body: zodToJsonSchema(createClientSchema),
      },
    },
    createClientHandler
  );

  server.get("/clients", listClientsHandler);

  server.put(
    "/clients/:id",
    {
      schema: {
        body: zodToJsonSchema(createClientSchema),
      },
    },
    updateClientHandler
  );
}
