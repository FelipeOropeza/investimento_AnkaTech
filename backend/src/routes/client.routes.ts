import { FastifyInstance } from "fastify";
import {
  createClientHandler,
  listClientsHandler,
  getByClientsHandler,
  listAssetsByClientHandler,
  updateClientHandler,
} from "../controllers/client.controller";

export async function clientRoutes(server: FastifyInstance) {
  server.post("/clients", createClientHandler);
  server.get("/clients", listClientsHandler);
  server.get("/clients/:id", getByClientsHandler);
  server.get("/clients/:id/assets", listAssetsByClientHandler);
  server.put("/clients/:id", updateClientHandler);
}
