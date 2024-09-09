import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { tasksRouter } from './routers/tasks';
import { usersRouter } from './routers/users';
import cors from 'cors';

const app = express();
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(config.port, () => {
    console.log(`Server running on port: ${config.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
