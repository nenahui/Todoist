import { createTask, editTask, fetchOne, fetchTasks } from '@/features/Task/taskThunks';
import type { Task } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface TaskState {
  tasks: Task[];
  oneTask: Task | null;
  isLoading: boolean;
  isCreating: boolean;
  isEditing: boolean;
}

const initialState: TaskState = {
  tasks: [],
  oneTask: null,
  isLoading: false,
  isCreating: false,
  isEditing: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload: apiTasks }) => {
        state.tasks = apiTasks;
        state.isLoading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchOne.pending, (state) => {
        state.isLoading = true;
        state.oneTask = null;
      })
      .addCase(fetchOne.fulfilled, (state, { payload: apiTask }) => {
        state.oneTask = apiTask;
        state.isLoading = false;
      })
      .addCase(fetchOne.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(createTask.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(editTask.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editTask.fulfilled, (state) => {
        state.isEditing = false;
      })
      .addCase(editTask.rejected, (state) => {
        state.isEditing = false;
      });
  },
  selectors: {
    selectTaskTasks: (state) => state.tasks,
    selectTaskLoading: (state) => state.isLoading,
    selectTaskOne: (state) => state.oneTask,
  },
});

export const { selectTaskTasks, selectTaskLoading, selectTaskOne } = taskSlice.selectors;
