import React from 'react';

export const RequestCard = ({user_data, requester=false, requested=false}) => {
  return (
    <article className='border-2 border-gray-200 rounded-lg p-1 w-full mb-3 hover:shadow-md hover:shadow-gray-300'>

      <div className='flex gap-4 items-center'>

        <div className='w-14 h-14 grid place-content-center bg-orange-400 rounded-full mb-2'>
          <img 
            src={user_data.url_img}
            className='w-12 h-12 rounded-full'
          />
        </div>

        <p className='text-xl font-semibold text-slate-800'>{user_data.name}</p>

      </div>

      <div className='flex justify-between gap-2'>
        {requester &&
          <button 
            type="button"
            className='border-2 border-green-400 hover:bg-green-200 px-2 h-10 w-24 rounded-md text-green-900 font-semibold flex-grow'
          >
            Aceptar
          </button>        
        }

        <button 
          type="button"
          className='border-2 border-red-400 hover:bg-red-200 px-2 h-10 w-24 rounded-md text-red-900 font-semibold flex-grow'
        >
          {requester ? 'Rechazar' : 'Eliminar'}
        </button>
      </div>

    </article>
  );
}