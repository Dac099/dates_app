import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from '../../routes/signIn';
import { SignUp } from '../../routes/signUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Aqui se ven los grupos</p>
  },
  {
    path: '/profile',
    element: <p>Aqui se ve el perfil del usuario</p>
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/signin',
    element: <SignIn />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
};

export {App};