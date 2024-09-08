import mongoose, { Types } from 'mongoose';
import { User } from './User';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,

    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['new', 'in_progress', 'complete'],
    default: 'new',
  },
});

export const Task = mongoose.model('Task', TaskSchema);
