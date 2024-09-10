import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { CustomLoader } from '@/components/Loader/CustomLoader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { selectTaskLoading, selectTaskOne } from '@/features/Task/taskSlice';
import { createTask, editTask, fetchOne } from '@/features/Task/taskThunks';
import type { TaskMutation } from '@/types';
import React, { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const user = localStorage.getItem('user') as string;
  const dispatch = useAppDispatch();
  const oneTask = useAppSelector(selectTaskOne);
  const isLoading = useAppSelector(selectTaskLoading);

  const [taskMutation, setTaskMutation] = useState<TaskMutation>({
    user,
    title: '',
    description: '',
    status: 'new',
  });

  useEffect(() => {
    if (taskId) {
      dispatch(fetchOne(taskId));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if (oneTask) {
      setTaskMutation({
        user,
        title: oneTask.title,
        description: oneTask.description,
        status: oneTask.status,
      });
    }
  }, [oneTask, user]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setTaskMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: 'new' | 'in_progress' | 'complete') => {
    setTaskMutation((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (taskId) {
      await dispatch(
        editTask({
          _id: taskId,
          ...taskMutation,
        })
      );
      navigate('/');
    } else {
      await dispatch(createTask(taskMutation));
      navigate('/');
    }
  };

  if (isLoading) {
    return <CustomLoader absoluteCenter size={6} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={'flex flex-col gap-3 mx-auto'}>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='title'
            id='title'
            placeholder='Enter the task title'
            name={'title'}
            value={taskMutation.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='description'>Description</Label>
          <Input
            type='description'
            id='description'
            placeholder='Enter the task description'
            name={'description'}
            value={taskMutation.description || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <p className={'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}>
            Status
          </p>

          <Select value={taskMutation.status} onValueChange={handleSelectChange} required>
            <SelectTrigger>
              <SelectValue placeholder='Select a status' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='new'>New</SelectItem>
                <SelectItem value='in_progress'>In Progress</SelectItem>
                <SelectItem value='complete'>Complete</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button>Submit</Button>
      </div>
    </form>
  );
};
