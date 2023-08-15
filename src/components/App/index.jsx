import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from '../../routes/signIn';
import { SignUp } from '../../routes/signUp';
import { Main } from '../main';
import { Profile } from '../../routes/profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'perfil',
        element: <Profile />
      },
      {
        path: 'conexiones',
        element: <p className='text-center text-5xl font-black text-amber-600'>Proximamente</p>
      }
    ]
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: 'signin',
    element: <SignIn />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
};

export {App};