import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { usersRouter } from './routers/users';

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

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