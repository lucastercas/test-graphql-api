import Admin from "../model/admin";
import Client from "../model/client";
import Card from "../model/card";

const admins: Admin[] = [
  {
    id: 0,
    name: "alisson",
    email: "alisson@mail.com",
    complete_name: "Alisson Nsei",
    cpf: "789.789.789-02",
    active: true,
    age: 83,
    department: "technology",
  },
];

const clients: Client[] = [
  {
    id: 0,
    name: "vinicius",
    email: "vinicius@mail.com",
    complete_name: "Vinicius Costa",
    cpf: "123.123.123-01",
    active: true,
    age: 21,
    cards: [0, 1],
  },
  {
    id: 1,
    name: "micael",
    email: "micael@mail.com",
    complete_name: "Micael Gomes",
    cpf: "456.456.456-02",
    active: false,
    age: 23,
    cards: [2],
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

export default { admins, clients, cards };
