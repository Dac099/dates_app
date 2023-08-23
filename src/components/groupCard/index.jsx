import React from 'react';
import { Link } from 'react-router-dom';
import { BiMessageSquareEdit as Edit } from "react-icons/bi";
import { getGroupByID } from '../../supabase/groups';

const GroupCard = (props) => {
  const date = props.date.split('T')[0];

  return (
    <article 
      className='bg-zinc-200/90 px-2 py-1 rounded-md flex-shrink hover:shadow-lg hover:shadow-neutral-400 flex-grow max-w-xs grid grid-rows-2 gap-2'
    >
      <Link
        to={`groups/${props.group_id}`}
        className='inline justify-self-center'
      >
        <p
          className='text-rose-400 font-extrabold text-xl text-center mb-3 hover:underline underline-offset-2 inline justify-self-center'
        >
          {props.title}
        </p>
      </Link>

      <div
        className='text-zinc-600 text-sm flex justify-between items-center'
      >
        <Link
          to={`/groups/${props.group_id}/edit`}
        >
          <Edit 
            className='hover:bg-white text-3xl p-1 rounded-full border-2 hover:border-rose-500 hover:text-rose-500'
          />
        </Link>

        <p className='cursor-default'>{date}</p>
      </div>
    </article>
  );
}

//loader
export const fetchGroupById = async({params}) => {
  const group = await getGroupByID(params.group_id);
  return group;
}

export {GroupCard};