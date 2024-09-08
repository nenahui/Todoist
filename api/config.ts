import path from 'node:path';

const rootPath = __dirname;

export const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  port: 8000,
  database: 'mongodb://localhost/todolist',
};
