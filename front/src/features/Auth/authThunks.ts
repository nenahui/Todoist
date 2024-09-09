import { axiosApi } from '@/axiosApi';
import { toast } from '@/hooks/use-toast';
import type { User, UserFields } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const userLogin = createAsyncThunk<User | null, UserFields>('loginOrCreate', async (user) => {
  try {
    const { data: apiUser } = await axiosApi.post<User>('/users/sessions', user);

    return apiUser;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast({
        description: error.response.data.error,
      });
    }
    return null;
  }
});

export const userSignUp = createAsyncThunk<User | null, UserFields>('loginOrCreate', async (user) => {
  try {
    const { data: apiUser } = await axiosApi.post<User>('/users', user);

    return apiUser;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast({
        description: error.message,
      });
    }
    console.log(error);
    return null;
  }
});
