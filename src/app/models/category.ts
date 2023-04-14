import { Role } from "./role";

export interface Category {
    id?: number;
    name?: string;
    description?: string;
    role?: Role;
    countPosts?: number;
  }
  