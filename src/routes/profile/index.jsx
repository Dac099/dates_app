import React from 'react';
import { getUserData } from '../../supabase/user';
import { LiaUserEditSolid } from "react-icons/lia";
import { signOut } from '../../supabase/auth';
import { useLoaderData, Link, useNavigate, useLocation } from 'react-router-dom';
import { retrieveUserSession } from '../../utils/verifySession';

const Profile = () => {
  const user_data = useLoaderData();
  const url_picture = user_data.url_picture;
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    retrieveUserSession(true, navigate, location.pathname);
  }, []);

  return (
    <section className='flex flex-wrap gap-7 justify-center sm:justify-around h-4/6'>
      <section className='flex flex-col items-center gap-4'>
        <div className='rounded-full relative bg-amber-600 w-36 h-36'>
          {url_picture !== '' &&
            <img 
              src={url_picture}
              className='absolute top-0 left-0 w-full h-full rounded-full object-cover' 
            />
          }
          <div 
            className='absolute bottom-1 right-1 bg-pink-700 w-11 h-11 rounded-full grid place-content-center text-2xl text-center text-pink-100 cursor-pointer'
          >
            <Link
              to={`/profile/${user_data.id}/edit`}
            >
              <LiaUserEditSolid />
            </Link>
          </div>
        </div>

        <button 
          type='button'
          className='bg-gray-500 text-gray-200 font-semibold w-28 h-10 rounded-md cursor-pointer shadow-sm hover:shadow-amber-400 border-amber-400 border-solid hover:border-2'
          onClick={async () => {
            await signOut();
            window.location.href = '/signin';
          }}
        >
          Cerrar sesión
        </button>
      </section>

      <section className='sm:w-2/3 flex flex-col items-center gap-8 justify-between'>
        <article>
          <p className='text-amber-600 font-bold text-2xl'>Nombre de usuario</p>
          <p 
            className='text-xl text-slate-800 bg-gray-300 shadow-lg rounded-md h-10 grid place-content-center'
          >
            {user_data.user_name}
          </p>
        </article>

        <article className='grid grid-cols-2 grid-rows-3 gap-3'>
          <p 
            className='bg-gray-300 text-slate-800 h-12 grid place-content-center rounded-md shadow-md font-normal p-2 text-center'
          >
            Grupos creados
          </p>

          <p 
            className='text-slate-800 font-black text-2xl text-center bg-gray-300 rounded-md shadow-md grid place-content-center'
          >
            {user_data.total_groups}
          </p>

          <p
            className='bg-gray-300 text-slate-800 h-12 grid place-content-center rounded-md shadow-md font-normal p-2 text-center'
          >
            Actividades creadas
          </p>

          <p 
            className='text-slate-800 font-black text-2xl text-center bg-gray-300 rounded-md shadow-md grid place-content-center'
          >
            {user_data.total_activities}
          </p>

          <p
           className='bg-gray-300 text-slate-800 h-12 grid place-content-center rounded-md shadow-md font-normal p-2 text-center'
          >
            Conexiones con realizadas
          </p>

          <p 
            className='text-slate-800 font-black text-2xl text-center bg-gray-300 rounded-md shadow-md grid place-content-center'
          >
            {user_data.total_connections}
          </p>
        </article>
      </section>
    </section>
  );
}

//Loaders
export const fetchUserData = async() => {
  const userData = await getUserData();
  if(!userData) window.location.href = '/signin';
  return userData;
}

export {Profile};