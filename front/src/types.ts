export interface UserFields {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  image: string | null;
}

export interface Task {
  _id: string;
  user: string;
  title: string;
  description: string | null;
  status: 'new' | 'in_progress' | 'complete';
}

export interface TaskMutation {
  user: string;
  title: string;
  description: string | null;
  status: 'new' | 'in_progress' | 'complete';
}
