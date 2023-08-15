import React from 'react';
import { MdGroups } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { BiSolidUser } from "react-icons/bi";
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { retrieveUserSession } from '../../utils/verifySession';
import { Groups } from '../../routes/groups';

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    retrieveUserSession(true, navigate, location.pathname);
  }, []);

  return (
    <>
      <nav 
        className='w-screen flex justify-between p-2 flex-wrap gap-4 '
      >
        <ul
          className='border-rose-600 border-2 rounded-xl flex gap-2 p-3 items-center grow max-w-xs justify-between shrink shadow-md'
        >
          <li>
            <Link 
              to={'/'}
              className={
                location.pathname == '/'
                ? 'bg-red-400 rounded-lg p-1 text-gray-50 font-semibold flex gap-4 items-center'
                : ''
              }
            >
              <MdGroups className={location.pathname === '/' ? 'text-3xl' : 'text-xl'}/>
              <p>{location.pathname === '/' ? 'Grupos' : ''}</p>
            </Link>
          </li>

          <li>
            <Link 
              to={'/conexiones'}
              className={
                location.pathname == '/conexiones'
                ? 'bg-red-400 rounded-lg p-1 text-gray-50 font-semibold flex gap-4 items-center'
                : ''
              }
            >
              <TbCirclesRelation className={location.pathname === '/conexiones' ? 'text-3xl' : 'text-xl'}/>
              <p>{location.pathname === '/conexiones' ? 'Conexiones' : ''}</p>
            </Link>
          </li>

          <li>
            <Link 
              to={'/perfil'}
              className={
                location.pathname == '/perfil'
                ? 'bg-red-400 rounded-lg p-1 text-gray-50 font-semibold flex gap-4 items-center'
                : ''
              }
            >
              <BiSolidUser className={location.pathname === '/perfil' ? 'text-3xl' : 'text-xl'}/>
              <p>{location.pathname === '/perfil' ? 'Perfil' : ''}</p>
            </Link>
          </li>
        </ul>

        <p
          className='border-rose-600 border-2 rounded-xl text-zinc-800 font-semibold flex items-center justify-center text-xl p-3 order-first sm:order-last shrink max-w-xs grow shadow-md'
        >
          Dates App
        </p>
      </nav>

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