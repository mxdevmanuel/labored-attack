import { Snippet } from './snippet.dto';

export interface User {
  id: string;
  username: string;
  snippets?: Snippet[];
  created: Date;
  updated: Date;
}
