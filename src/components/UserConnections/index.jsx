import React from 'react';
import { Connections_context } from '../../context/connections';
import { LiaUserSecretSolid } from "react-icons/lia";
import { deleteConnection } from '../../supabase/connections';

export const UserConnections = () => {
  const { connections, reloadData } = React.useContext(Connections_context);

  const disconnect = async(connection_id) => {
    const error = await deleteConnection(connection_id);
    reloadData();
  } 

  return (
    <section>
      <p
        className='text-xl font-bold text-amber-700 text-center mt-8 mb-4'
      >
        {connections.length > 0 ? 'Tus conexiones' : '̀¿Quién será tu primer conexión?'}
      </p>
      <section
        className='flex gap-2 justify-center'
      >
        {connections.map(connection => (
          <article
            key={connection.id}
            className='border-2 rounded-lg p-4 shadow-md'
          >
            <div>
              {connection.users.url_img
                ? <img 
                  src={connection.users.url_img}
                    className='rounded-full object-cover h-12 w-12 bg-white border-dashed border-2 border-rose-500 mx-auto mb-2'
                  />
                : <LiaUserSecretSolid
                    className='rounded-full object-cover h-12 w-12 bg-white border-dashed border-2 border-rose-500 mx-auto mb-2'
                  />
              }

              <p className='text-center font-semibold text-lg max-w-full'>{connection.users.user_name}</p>
            </div>

            <button
              type='button'
              onClick={() => disconnect(connection.id)}
              className='border-2 rounded-lg p-2 mt-8 text-sm border-rose-800 text-rose-700 font-semibold hover:bg-rose-300'
            >
              Desconectar
            </button>

          </article>
        ))}
      </section>
    </section>
  );
}