import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from '../../routes/signIn';
import { SignUp } from '../../routes/signUp';
import { Main } from '../main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'perfil',
        element: <p>Aqui se ve el perfil del usuario</p>
      },
      {
        path: 'conexiones',
        element: <p>Aqui aparecen las conexiones</p>
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