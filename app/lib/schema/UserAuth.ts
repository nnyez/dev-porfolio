import { Role } from "./types";

export interface UserAuth {
  userId: number;
  email: string;
  name: string;
  rol: Role;
  token: string;
}
