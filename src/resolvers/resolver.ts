import { IResolvers } from "graphql-tools";
import User from "../model/user";
import Card from "../model/card";

const users: User[] = [
  {
    id: 0,
    name: "vinicius",
    complete_name: "Vinicius Costa",
    cpf: "123.123.123-01",
    active: true,
    age: 21,
    cards: [0, 1],
    accessRule: "CLIENT",
  },
  {
    id: 1,
    name: "micael",
    complete_name: "Micael Gomes",
    cpf: "456.456.456-02",
    active: false,
    age: 23,
    cards: [2],
    accessRule: "CLIENT",
  },
  {
    id: 2,
    name: "alisson",
    complete_name: "Alisson Nsei",
    cpf: "789.789.789-02",
    active: true,
    age: 83,
    cards: [],
    accessRule: "ADMIN",
  },
];

const cards: Card[] = [
  {
    id: 0,
    number: "1234 1234 1234 1234",
    agency: "1234-0",
    account: "12.345-0",
    owner: 0,
  },
  {
    id: 1,
    number: "5678 5678 5678 5768",
    agency: "1234-0",
    account: "12.345-0",
    owner: 0,
  },
  {
    id: 2,
    number: "9999 9999 9999 9999",
    agency: "1234-0",
    account: "12.345-0",
    owner: 1,
  },
];

const resolverMap: IResolvers = {
  User: {
    cards: (parent: User, args: any, ctx: any, info: any): Card[] => {
      const result: Card[] = [];
      parent.cards.forEach((d) => {
        result.push(cards[d]);
      });
      return result;
    },
  },
  Card: {
    owner: (parent: Card, args: any, ctx: any, info: any): User =>
      users[parent.owner],
  },
  Query: {
    users: (): User[] => users,
    cards: (): Card[] => cards,
    userById: (_: void, args: any): User => users[args.id],
    cardById: (_: void, args: any): Card => cards[args.id],
    userByAccess: (_: void, args: any): User[] => {
      const result: User[] = [];
      users.forEach((user: User) => {
        if (user.accessRule == args.rule) result.push(user);
      });
      return result;
    },
  },
};

export default resolverMap;
