import User from "./user";

export default interface Admin extends User {
  department: string;
}
