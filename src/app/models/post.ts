import { User } from 'src/app/models/user';
import { Category } from './category';
import { CommentForm } from './comment';
export interface Post {
  id?: string;
  title?: string;
  createAt?: string;
  status?: string;
  content?: string;
  detail?: string;
  category?: Category;
  user?: User;
  // likes?: string;
  imgs?: string;
  listComment?: CommentForm[];
  description?: string;
}
