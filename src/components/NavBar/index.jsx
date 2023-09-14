import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MdGroups as GroupsIcon } from "react-icons/md";
import { TbCirclesRelation as ConnectionIcon } from "react-icons/tb";
import { BiSolidUser as ProfileIcon } from "react-icons/bi";


export const NavBar = () => {
  const location = useLocation();
  const regexToGroupsPath = /^\/groups/;
  const regexToProfilePath = /^\/profile/;

  return (
    <section
      className='w-full flex justify-center items-center sm:justify-between bg-rose-500 p-2'
    >
      <Link 
        to='/' 
        className='hidden sm:block text-3xl font-bold text-rose-100 cursor-pointer'
      >
        Citas y amigos
      </Link>
      <nav>
        <ul
          className='flex gap-2 items-center'
        >

          <li>
            <Link 
              to='/'
            >
              <div 
                className='bg-rose-200 rounded-lg flex items-center gap-2 p-2'
              >
                <GroupsIcon 
                  className={regexToGroupsPath.test(location.pathname) || location.pathname === '/' ?
                    `text-rose-900 text-3xl` :
                    `text-rose-900 text-xl`
                  }
                />
                {regexToGroupsPath.test(location.pathname) || location.pathname === '/' &&
                  <p className='font-bold text-rose-900'>Grupos</p>
                }
              </div>
            </Link>
          </li>

          <li>
            <Link 
              to='/connections'
            >
              <div
                className='bg-rose-200 rounded-lg flex items-center gap-2 p-2'
              >
                <ConnectionIcon 
                  className={location.pathname === '/connections' ?
                  `text-rose-900 text-3xl` :
                  `text-rose-900 text-xl`
                  } 
                />
                {location.pathname === '/connections' &&
                  <p className='font-bold text-rose-900'>Conexiones</p>
                }
              </div>
            </Link>
          </li>

          <li>
            <Link 
              to='/profile'
            >
              <div
                className='bg-rose-200 rounded-lg flex items-center gap-2 p-2'
              >
                <ProfileIcon 
                  className={regexToProfilePath.test(location.pathname) ?
                  `text-rose-900 text-3xl` :
                  `text-rose-900 text-xl`
                  } 
                />
                {regexToProfilePath.test(location.pathname) &&
                  <p className='font-bold text-rose-900'>Perfil</p>
                }
              </div>
            </Link>
          </li>

        </ul>
      </nav>
    </section>
  );
}