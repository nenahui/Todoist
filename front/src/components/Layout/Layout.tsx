import { Toaster } from '@/components/ui/toaster';
import React, { type PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={'container mx-auto'}>
      {/* <Header /> */}
      {children}
      <Toaster />
    </div>
  );
};
