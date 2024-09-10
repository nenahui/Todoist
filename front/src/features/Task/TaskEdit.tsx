import { Button } from '@/components/ui/button';
import { TaskForm } from '@/features/Task/components/TaskForm/TaskForm';
import React from 'react';
import { Link } from 'react-router-dom';

export const TaskEdit: React.FC = () => {
  return (
    <>
      <div className={'mb-4'}>
        <div className={'flex justify-between mb-3'}>
          <h2 className={'text-xl'}>Edit Task</h2>
          <Link to={'/'}>
            <Button>Cancel</Button>
          </Link>
        </div>
        <span className={'text-sm text-muted-foreground'}>Fill in the fields below to edit the task</span>
      </div>

      <TaskForm />
    </>
  );
};
