import React from 'react';
import { getUserData } from '../../supabase/get_user_data';
import { LiaUserEditSolid } from "react-icons/lia";

const Profile = () => {
  const [ user_data, setUserData] = React.useState({});

  React.useEffect(() => {
    getUserData()
    .then(data => setUserData(data))
  }, []);

  return (
    <section className='flex flex-wrap gap-7 justify-center sm:justify-around h-4/6'>
      <section>
        <div className='rounded-full relative bg-amber-600 w-36 h-36'>
          <div className='absolute bottom-1 right-1 bg-pink-700 w-11 h-11 rounded-full grid place-content-center text-2xl text-center text-pink-100 cursor-pointer'>
            <LiaUserEditSolid />
          </div>
        </div>
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
            0
          </p>
        </article>
      </section>
    </section>
  );
}

export {Profile};