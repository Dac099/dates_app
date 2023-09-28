import React from 'react';
import { LiaUserSecretSolid } from "react-icons/lia";
import { Connections_context } from '../../context/connections';
import { deleteRequest } from '../../supabase/connections';

export const Requesteds = () => {
  const { requesteds, reloadData } = React.useContext(Connections_context);

  const cancelRequest = async(request_id) => {
    await deleteRequest(request_id);
    reloadData();
  }

  return (
    <section
      className='h-96'
    >
      <p 
        className={`text-xl font-bold text-center  mb-4 ${requesteds.length < 1 ? 'text-amber-700/20' : 'text-amber-700'}`} 
      >
        Con quien quieres conectar
      </p>
      <div
        className='overflow-y-auto max-h-80'
      >
        {requesteds.map(request => (
          <article
            key={request.id}
            className='border-2 p-2 box-border rounded-lg shadow-md bg-orange-100/20 border-orange-300 flex justify-between w-3/4 mx-auto'
          >

            <div
              className='flex gap-2 items-center'
            >
              {request.users.url_img
                ? <img src={request.users.url_img} className='w-10 h-10 rounded-full object-cover bg-white border-2 border-orange-400 border-dashed text-orange-700'/>
                : <LiaUserSecretSolid className='w-10 h-10 rounded-full bg-white border-2 border-orange-400 border-dashed text-orange-700'/>
              }

              <p className='text-lg font-semibold text-rose-600'>{request.users.user_name}</p>
            </div>

          <button 
            type="button"
            onClick={()=>cancelRequest(request.id)}
            className='border-2 border-rose-500 font-bold p-2 rounded-lg text-rose-800 hover:bg-rose-300'
          >
            Cancelar
          </button>
          </article>
        ))}
      </div>
    </section>
  );
}