import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn } from '../../routes/signIn';
import { SignUp } from '../../routes/signUp';
import { Main } from '../main';
import { Profile } from '../../routes/profile';
import { fetchGroups } from '../../routes/groups';
import { postGroup } from '../newGroupForm';
import { fetchUserData } from '../../routes/profile';
import { fetchGroup } from '../group';
import { Group } from '../group';
import { insertNewActivite } from '../newActivitieForm';
import { fetchActivitieById } from '../activitieCard';
import { EditActivitie } from '../../routes/editActivitie';
import { editActivitie } from '../../routes/editActivitie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: fetchGroups,
    action: postGroup,
    children: [
      {
        path: 'groups/:group_id/',
        loader: fetchGroup,
        action: insertNewActivite,
        element: <Group />,
      },
      {
        path: 'groups/:group_id/activities/:activitie_id/edit',
        element: <EditActivitie />,
        loader: fetchActivitieById,
        action: editActivitie
      },
      {
        path: 'perfil',
        element: <Profile />,
        loader: fetchUserData,
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