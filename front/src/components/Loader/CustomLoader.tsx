import { Loader } from 'lucide-react';
import React from 'react';
import styles from './CustomLoader.module.scss';

interface Props {
  absoluteCenter?: boolean;
  size?: number;
}

export const CustomLoader: React.FC<Props> = ({ absoluteCenter = false, size = 4 }) => {
  return (
    <div className={`${absoluteCenter && styles.loader}`}>
      <Loader className={`text-muted-foreground animate-spin size-${size}`} />
    </div>
  );
};
