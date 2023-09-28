import React from 'react';
import { LiaUserSecretSolid } from "react-icons/lia";
import { Connections_context } from '../../context/connections';
import { deleteRequest, acceptConnection } from '../../supabase/connections';

export const Requesters = () => {
  const { requesters, reloadData, user_id } = React.useContext(Connections_context);

  const cancelRequest = async(request_id) => {
    await deleteRequest(request_id);
    reloadData();
  }

  const acceptRequest = async(request) => {
    await acceptConnection(request.requester, user_id, request.id);
    reloadData();
  }

  return (
    <section
      className='h-96'
    >
      <p 
        className={`text-xl font-bold text-center  mb-4 ${requesters.length < 1 ? 'text-amber-700/20' : 'text-amber-700'}`}      
      >
        Quieren conectar contigo
      </p>
      <div
        className='overflow-y-auto max-h-80'
      >
        {requesters.map(request => (
          <article
            key={request.id}
            className='border-2 p-2 box-border rounded-lg shadow-md bg-orange-100/20 border-orange-300 flex flex-col gap-2 w-3/4 mx-auto'
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
          
          <div
            className='flex gap-2 self-end'
          >
            <button 
              type="button"
              onClick={() => cancelRequest(request.id)}
              className='border-2 border-rose-500 font-bold p-2 rounded-lg text-rose-800 hover:bg-rose-300'
            >
              Cancelar
            </button>
            <button 
              type="button"
              onClick={() => acceptRequest(request)}
              className='border-2 border-violet-500 font-bold p-2 rounded-lg text-violet-800 hover:bg-violet-300'
            >
              Aceptar
            </button>
          </div>
          </article>
        ))}
      </div>
    </section>
  );
}