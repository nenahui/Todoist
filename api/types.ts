import { Model, Types } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface Task {
  _id: string;
  user: string;
  title: string;
  description: string | null;
  status: 'new' | 'in_progress' | 'complete';
}

export interface TaskMutation {
  user: Types.ObjectId;
  title: string;
  description: string | null;
  status: 'new' | 'in_progress' | 'complete';
}
