import React from 'react';
import { BiEditAlt } from "react-icons/bi";


const GroupCard = (props) => {
  const date = props.date.split('T')[0];
  return (
    <article 
      className='bg-zinc-200/90 p-3 rounded-md flex-shrink hover:shadow-lg flex-grow max-w-xs'
    >
      <p
        className='text-rose-400 font-extrabold text-xl text-center mb-3'
      >
        {props.title}
      </p>
      <div className='flex gap-2 justify-between items-center'>
        <p
          className='text-zinc-600 text-sm'
        >
          {date}
        </p>
        <p
          className='bg-white p-2 rounded-xl cursor-pointer text-xl text-rose-500'
        >
          <BiEditAlt />
        </p>
      </div>
    </article>
  );
}

export {GroupCard};