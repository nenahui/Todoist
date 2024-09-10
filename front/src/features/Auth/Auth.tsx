import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { selectAuthLoading, selectAuthUser } from '@/features/Auth/authSlice';
import { userLogin, userSignUp } from '@/features/Auth/authThunks';
import type { UserFields } from '@/types';
import { Loader } from 'lucide-react';
import React, { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss';

interface Props {
  type: 'login' | 'register';
}

export const Auth: React.FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const user = useAppSelector(selectAuthUser);
  const [userFields, setUserFields] = useState<UserFields>({
    username: '',
    password: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setUserFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (type === 'register') {
      return dispatch(userSignUp(userFields));
    }

    await dispatch(userLogin(userFields));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', user._id);
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className={styles.loginBlock}>
      <form onSubmit={handleSubmit}>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl font-medium'>{type === 'login' ? 'Login' : 'Sign Up'}</CardTitle>
            <CardDescription>
              {type === 'login'
                ? 'Enter your username and password below to log into your account.'
                : 'Enter your username and password below to create your account.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  name='username'
                  onChange={handleInputChange}
                  placeholder='Enter your username...'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  minLength={type === 'register' ? 4 : undefined}
                  onChange={handleInputChange}
                  placeholder='Enter your password...'
                  required
                />
              </div>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {type === 'login' ? 'Login' : 'Create an account'}
                <Loader
                  className={`ml-1 opacity-0 ${isLoading && 'opacity-100'} size-4 text-muted-foreground animate-spin`}
                />
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              {type === 'login' ? 'Don`t have an account?' : 'Already have an account?'}&nbsp;
              <Link to={`/auth/${type === 'register' ? 'login' : 'signup'}`} className='underline'>
                {type === 'register' ? 'Sign Ip' : 'Sign In'}
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
