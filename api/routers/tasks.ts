import express from 'express';
import mongoose from 'mongoose';
import { handleError } from '../lib/handleError';
import { auth, type RequestWithUser } from '../middleware/auth';
import { Task } from '../models/Task';
import type { TaskMutation } from '../types';

export const tasksRouter = express.Router();

tasksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { user, body } = req;

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const taskMutation: TaskMutation = {
      user: user._id,
      title: body.title,
      description: body.description,
      status: body.status,
    };

    const task = new Task(taskMutation);
    await task.save();

    return res.status(201).send(task);
  } catch (error) {
    handleError(error, res, next);

    return next(error);
  }
});

tasksRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const tasks = await Task.find({ user: user._id });

    return res.send(tasks);
  } catch (error) {
    handleError(error, res, next);

    return next(error);
  }
});

tasksRouter.put('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { user, body, params } = req;

    const taskId = params.id;
    const updates: Partial<TaskMutation> = body;

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const task = await Task.findOneAndUpdate({ _id: taskId, user: user._id }, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(400).json({ error: 'Task not found' });
    }

    return res.send(task);
  } catch (error) {
    handleError(error, res, next);

    return next(error);
  }
});

tasksRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { user, params } = req;
    const taskId = params.id;

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const task = await Task.findOne({ _id: taskId, user: user._id });

    if (!task) {
      return res.status(400).send({ error: 'Task not found' });
    }

    await Task.deleteOne({ _id: taskId });

    return res.send({ message: 'Successfully deleted task' });
  } catch (error) {
    handleError(error, res, next);

    return next(error);
  }
});
