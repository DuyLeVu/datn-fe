import {Role} from "./role";

export interface JWTResponse {
  id: number;
  accessToken: string;
  type?: string;
  username: string;
  roles: Role[];
}
