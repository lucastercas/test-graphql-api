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

const sslPath: string = "../assets/ssl/";
console.log(__dirname);
// Create and set HTTPS server
const server = http.createServer(app);

// Create and set Apollo Server
const apollo = new ApolloServer({
  schema,
  tracing: true,
  subscriptions: {
    onConnect: (connectionParams: any, WebSocket) => {
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
      return connection.context;
    } else {
      const token = req.headers.authorization || "";
      return { token };
    }
  },
});
apollo.applyMiddleware({ app, path: "/graphql" });
apollo.installSubscriptionHandlers(server);

server.listen({ port: 4000 }, () => {
  console.log(`🚀🚀 Listening at http://localhost:3000/graphql`);
});
