import { PubSub } from "apollo-server";
import { IResolvers } from "graphql-tools";
import bd from "../bd/bd";
import Admin from "../model/admin";
import Card from "../model/card";
import Client from "../model/client";
import User from "../model/user";

const pubsub = new PubSub();

const CLIENT_ADDED = "CLIENT_ADDED";
const ADMIN_ADDED = "ADMIN_ADDED";

const resolverMap: IResolvers = {
  User: {
    __resolveType: (parent: any, ctx: any, info: any) => {
      if (parent.cards) return "Client";
      if (parent.department) return "Admin";
    },
  },

  Admin: {},

  Client: {
    cards: (parent: Client, args: any, ctx: any, info: any): Card[] => {
      const result: Card[] = [];
      parent.cards.forEach((d) => {
        result.push(bd.cards[d]);
      });
      return result;
    },
  },

  Card: {
    owner: (parent: Card): User => bd.clients[parent.owner],
  },

  Query: {
    users: (): Array<User> => {
      const allAdmins: Array<Admin | Client> = bd.admins;
      const allClients: Array<Admin | Client> = bd.clients;
      return allAdmins.concat(allClients);
    },
    cards: (): Card[] => bd.cards,
    clients: (): Client[] => bd.clients,
    admins: (): Admin[] => bd.admins,
    // userById: (_: void, args: any): User => {},
    userByEmail: (_: void, args: any): User => {
      const allAdmins: Array<Admin | Client> = bd.admins;
      const allClients: Array<Admin | Client> = bd.clients;
      const allUsers: Array<User> = allAdmins.concat(allClients);
      allUsers.filter((user) => {
        if (user.email == args.email) return true;
        return false;
      });
      return allUsers[0];
    },
    cardById: (_: void, args: any): Card => bd.cards[args.id],
  },

  Mutation: {
    addClient: (_: void, { client }: any) => {
      const newClient = {
        ...client,
        id: bd.clients.length,
        active: true,
        cards: [],
      };
      bd.clients.push(newClient);
      pubsub.publish(CLIENT_ADDED, { userAdded: newClient });
      return newClient;
    },
  },

  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator([CLIENT_ADDED, ADMIN_ADDED]),
    },
  },
};

export default resolverMap;
