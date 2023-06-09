import {Role} from "./role";

export interface UserToken {
  id?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  accessToken?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  enabled?: boolean;
  roles?: Role[];
}
