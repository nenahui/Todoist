import { axiosApi } from '@/axiosApi';
import type { Task, TaskMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('task/fetch', async () => {
  const { data: apiTasks } = await axiosApi.get('/tasks', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return apiTasks;
});

export const deleteTask = createAsyncThunk<void, string>('task/delete', async (id) => {
  await axiosApi.delete(`/tasks/${id}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
});

export const createTask = createAsyncThunk<void, TaskMutation>('task/create', async (task) => {
  await axiosApi.post('/tasks', task, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
});

export const fetchOne = createAsyncThunk<Task, string>('task/fetchOne', async (id) => {
  const { data: apiTask } = await axiosApi.get(`/tasks/${id}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return apiTask;
});

export const editTask = createAsyncThunk('task/edit', async (task: Task) => {
  await axiosApi.put(
    `/tasks/${task._id}`,
    {
      title: task.title,
      description: task.description,
      status: task.status,
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
  );
});
