import { GraphQLSchema } from "graphql";
import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers/resolver";
import * as typeDefs from "./schema/schema.graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
