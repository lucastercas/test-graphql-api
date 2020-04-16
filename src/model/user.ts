export default interface User {
  id: number;
  name: string;
  complete_name: string;
  cpf: string;
  active: boolean;
  age: number;
  cards: number[];
  accessRule: string;
}
