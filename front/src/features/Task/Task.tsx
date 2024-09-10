import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { CustomLoader } from '@/components/Loader/CustomLoader';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/features/Task/components/TaskCard/TaskCard';
import { selectTaskLoading, selectTaskTasks } from '@/features/Task/taskSlice';
import { fetchTasks } from '@/features/Task/taskThunks';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Task: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTaskTasks);
  const isLoading = useAppSelector(selectTaskLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (isLoading) {
    return <CustomLoader absoluteCenter size={6} />;
  }

  return (
    <div>
      <div className={'flex justify-between mb-3 items-center'}>
        <h3 className={'text-xl'}>All Tasks</h3>
        <Link to={'/new-task'}>
          <Button>Create Task</Button>
        </Link>
      </div>
      {tasks.length === 0 ? (
        <p className={'text-center mt-52 text-muted-foreground text-sm'}>Task list is empty</p>
      ) : (
        <>
          <div className={'flex flex-col gap-2'}>
            {tasks.map((task) => (
              <TaskCard task={task} key={task._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
