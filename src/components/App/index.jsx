import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from '../../routes/signIn';

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
    element: <p>Aqui registrate</p>
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