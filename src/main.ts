import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import schema from "./schema";

dotenv.config();

// Create and set Express (route handler)
const app = express();
app.use("*", cors());
app.use(compression());

// Create HTTP Server
const server = http.createServer(app);

// Create and set Apollo Server
const apollo = new ApolloServer({
  schema,
  tracing: true,
  engine: {
    apiKey: process.env.API_KEY,
  },
  subscriptions: {
    onConnect: (connectionParams: any, WebSocket) => {
      console.log("[Subscription] Params:", connectionParams);
      if (connectionParams.Authorization) {
        console.log(
          `[Subscription] Auth Token: ${connectionParams.Authorization}`
        );
        return {};
      }
      throw new Error("[Subscription] Missing Auth Token");
    },
  },
  context: async ({ req, connection }) => {
    if (connection) {
      console.log("[Context] Context: ", connection.context);
      return connection.context;
    } else {
      console.log(`[Context] No connection`);
      const token = req.headers.authorization || "";
      console.log(`[Context] Token: ${token}`);
      return { token };
    }
  },
});
apollo.applyMiddleware({ app, path: "/graphql" });
apollo.installSubscriptionHandlers(server);

server.listen({ port: 4000 }, () => {
  console.log(`🚀🚀 Listening at http://localhost:3000/graphql`);
});
