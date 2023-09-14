import React from 'react';
import { MdGroups } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { BiSolidUser } from "react-icons/bi";
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { retrieveUserSession } from '../../utils/verifySession';
import { Groups } from '../../routes/groups';
import { NavBar } from '../NavBar';

const Main = () => {  
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    retrieveUserSession(true, navigate, location.pathname);
  }, []);

  return (
    <>
      <NavBar />

      <main
        className='p-2 md:h-5/6 w-screen'
      >
        {location.pathname === '/' &&
          <Groups />
        }

        {location.pathname !== '/' &&
          <Outlet />
        }
      </main>
    </>
  );
}


export {Main};