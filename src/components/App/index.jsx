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
import { fetchGroupById } from '../groupCard';
import { EditGroup } from '../../routes/editGroup';
import { putGroup } from '../../routes/editGroup';
import { getUser } from '../../supabase/user';
import { EditProfile } from '../../routes/editProfile';
import { Connections } from '../../routes/connections';
import { getConnectionsData } from '../../routes/connections';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: fetchGroups,
    action: postGroup,
    children: [
      {
        path: 'groups/:group_id/',
        element: <Group />,
        loader: fetchGroup,
        action: insertNewActivite,
      },
      {
        path: 'groups/:group_id/edit',
        element: <EditGroup />,
        loader: fetchGroupById,
        action: putGroup,
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
        path: 'perfil/:user_id/edit',
        loader: getUser,
        element: <EditProfile />
      },
      {
        path: 'conexiones',
        element: <Connections />,
        loader: getConnectionsData
      },
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