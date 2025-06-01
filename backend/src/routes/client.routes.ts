import { FastifyInstance } from "fastify";
import {
  createClientHandler,
  listClientsHandler,
  updateClientHandler,
} from "../controllers/client.controller";

export async function clientRoutes(server: FastifyInstance) {
  server.post("/clients", createClientHandler);
  server.get("/clients", listClientsHandler);
  server.put("/clients/:id", updateClientHandler);
}
