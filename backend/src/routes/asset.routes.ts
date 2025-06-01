import { FastifyInstance } from "fastify";
import {
  createAssetHandler,
  listAssetsHandler,
} from "../controllers/asset.controller";

export async function assetRoutes(server: FastifyInstance) {
  server.post("/assets", createAssetHandler);
  server.get("/assets", listAssetsHandler);
}
