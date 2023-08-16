import React from 'react';
import { getGroupByID } from '../../supabase/groups';
import { getActivitiesByGroupId } from '../../supabase/activities';
import { useLoaderData } from 'react-router-dom';
import { TbMoodSadDizzy } from "react-icons/tb";


export const Group = () => {
  const group_data = useLoaderData();
  const { group, activities } = group_data;

  return (
    <article>

      <section className='flex justify-center sm:justify-between flex-wrap gap-4 mb-10 items-center'>

        <section>
          <p className='text-3xl sm:text-4xl font-bold text-slate-800'>{group.title}</p>
          <p className='text-md text-slate-500 pl-2 italic'>{group.description}</p>
        </section>

        <button
          type='button'
          className='bg-neutral-300 rounded-md shadow-lg px-2 font-bold text-zinc-600 h-10 hover:shadow-gray-400'
        >
          Nueva actividad
        </button>

      </section>

      {activities.length < 1 &&
        <section className='flex flex-wrap items-center justify-center animate-bounce'>
          <span className='text-9xl text-rose-500'><TbMoodSadDizzy className='inline'/></span> 
          <p className='text-2xl text-slate-800 font-semibold text-center'>Aun no cuentas con actividades creadas</p>
        </section>
      }
    </article>
  );
}

//loader
export const fetchGroup = async({params}) => {
  const group = await getGroupByID(params.group_id);
  const group_id = group[0].id;

  const activities = await getActivitiesByGroupId(group_id);
  return {
    group: group[0],
    activities
  };
}