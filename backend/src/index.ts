import Fastify from "fastify";
import cors from '@fastify/cors';
import { clientRoutes } from "./routes/client.routes";
import { assetRoutes } from "./routes/asset.routes";

const server = Fastify();

server.register(clientRoutes);
server.register(assetRoutes);

server.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
    console.log("Servidor rodando em http://localhost:3001");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();