import React from 'react';
import { FaUserSecret } from "react-icons/fa6";

export const ConnectionCard = ({user, deleteConnection}) => {
  return (
    <article
      className='border-2 border-gray-200 rounded-lg p-1'
    >
      {user.url_img 
        ?
          <img 
            src={user.url_img}
            className='w-28 h-28 rounded-full object-cover mb-3 mx-auto'
          />
        :
          <FaUserSecret 
            className='w-28 h-28 rounded-full object-cover mb-3 mx-auto'
          />
      }
      
      <p className='font-semibold text-slate-800 text-center'>{user.user_name}</p>

      <div className='flex justify-center mt-4'>
        <button 
          type="button"
          className='border-2 border-red-400 rounded-md px-2 text-red-700 font-semibold hover:bg-red-200'
        >
            Desconectar
        </button>
      </div>
    </article>
  );
}