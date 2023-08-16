import React from 'react';
import { Link } from 'react-router-dom';


const GroupCard = (props) => {
  const date = props.date.split('T')[0];

  return (
    <Link 
      to={`groups/${props.group_id}`}
      className='bg-zinc-200/90 p-3 rounded-md flex-shrink hover:shadow-lg hover:shadow-neutral-400 flex-grow max-w-xs relative cursor-pointer'
    >
      <p
        className='text-rose-400 font-extrabold text-xl text-center mb-3'
      >
        {props.title}
      </p>

      <p
        className='text-zinc-600 text-sm absolute bottom-1 right-1'
      >
        {date}
      </p>
    </Link>
  );
}

export {GroupCard};