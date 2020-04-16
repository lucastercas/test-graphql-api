import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import schema from "./schema";

dotenv.config();

const app = express();

const server = new ApolloServer({
  schema,
});

app.use("*", cors());
app.use(compression());
server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);

httpServer.listen({ port: 3000 }, () => {
  console.log(`Listening at localhost:3000/graphql`);
});
