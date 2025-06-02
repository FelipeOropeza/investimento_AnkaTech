import { FastifyInstance } from "fastify";
import {
  createClientHandler,
  listClientsHandler,
  getByClientsHandler,
  updateClientHandler,
} from "../controllers/client.controller";

export async function clientRoutes(server: FastifyInstance) {
  server.post("/clients", createClientHandler);
  server.get("/clients", listClientsHandler);
  server.get("/clients/:id", getByClientsHandler);
  server.put("/clients/:id", updateClientHandler);
}
