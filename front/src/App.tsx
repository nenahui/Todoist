import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { Button } from '@/components/ui/button';
import React from 'react';

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme={'dark'} storageKey={'todo-theme'}>
      <Button>App</Button>
    </ThemeProvider>
  );
};
