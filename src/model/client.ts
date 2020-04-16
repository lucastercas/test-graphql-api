import Card from "./card";
import User from "./user";

export default interface Client extends User {
  cards: number[];
}
