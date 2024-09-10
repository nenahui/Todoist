import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteTask, fetchTasks } from '@/features/Task/taskThunks';
import type { Task } from '@/types';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  task: Task;
}

export const TaskCard: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(deleteTask(task._id));
    dispatch(fetchTasks());
  };
  return (
    <div className={'flex bg-zinc-900/50 p-3 rounded-lg border justify-between items-center'}>
      <div className='flex flex-col'>
        <h4 className={'font-medium'}>{task.title}</h4>
        <p className={'text-sm'}>{task.description}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size={'icon'} className={'focus-visible:ring-0'}>
            <EllipsisVertical className={'size-4'} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to={`/task-edit/${task._id}`} className={'flex items-center'}>
                Редактировать <Pencil className={'size-4 ml-2'} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Удалить <Trash2 className={'size-4 ml-2'} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
