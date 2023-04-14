import { User } from "./user";

export interface CommentForm {
    id?: string;
    content?: string;
    user?: User;
    createAt?: string;
    // likes?:string;
    children?: CommentForm[];
}
