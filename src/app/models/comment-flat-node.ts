import { User } from "./user";

export interface CommentFlatNode {
    expandable: boolean;
    content?: string;
    user?: User;
    createAt?: string;
    // likes?:string;
    level: number;
    type: any
}
