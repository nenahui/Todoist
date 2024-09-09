import { Layout } from '@/components/Layout/Layout';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { Auth } from '@/features/Auth/Auth';
import { Home } from '@/features/Home/Home';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

export const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token && !pathname.includes('login')) {
      navigate('/auth/signup');
    }
  }, [navigate, token, pathname]);

  return (
    <ThemeProvider defaultTheme={'dark'} storageKey={'todo-theme'}>
      <Layout>
        <Routes>
          <Route path={'/auth/login'} element={<Auth type={'login'} />} />
          <Route path={'/auth/signup'} element={<Auth type={'register'} />} />
          <Route path={'/'} element={<Home />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};
