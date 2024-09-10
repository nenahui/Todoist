import { Toaster } from '@/components/ui/toaster';
import React, { type PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={'container mx-auto mt-4'}>
      {/* <Header /> */}
      {children}
      <Toaster />
    </div>
  );
};
