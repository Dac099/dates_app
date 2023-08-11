import React from 'react';
import { MdGroups } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { BiSolidUser } from "react-icons/bi";
import { Outlet, Link, useLocation } from 'react-router-dom';

const Main = () => {
  const location = useLocation();
  return (
    <>
      <nav 
        className='w-screen flex justify-between p-2 flex-wrap'
      >
        <ul
          className='border-rose-600 border-2 rounded-xl flex gap-2 p-3 items-center w-72 justify-between'
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
              {location.pathname === '/' ? 'Grupos' : ''}
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
              {location.pathname === '/conexiones' ? 'Conexiones' : ''}
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
              {location.pathname === '/perfil' ? 'Perfil' : ''}
            </Link>
          </li>
        </ul>

        <p
          className='border-rose-600 rounded-lg p-1 text-gray-50 font-semibold'
        >
          {
            location.pathname === '/'
            ? 'Tus grupos'
            : location.pathname === '/conexiones'
            ? 'Tus conexiones'
            : location.pathname === '/perfil'
            ? 'Tu perfil'
            : '¿Dónde estamos?'
          }
        </p>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}


export {Main};