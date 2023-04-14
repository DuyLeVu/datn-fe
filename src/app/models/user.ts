import {Role} from "./role";

export interface User {
  id?: number;
  username?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  enabled?: boolean;
  roles?: [Role];
  avatar?: string;
  posts?: string;
  linkdocs?: string;
  comments?: string;
  status?: string;
  dateOfBirth?: Date;
  gender?: string;
  questions?: string;
}
