import React from 'react';
import { LiaUserSecretSolid } from "react-icons/lia";
import { MdOutlineDone, MdCancel } from "react-icons/md";
import { Connections_context } from '../../context/connections';
import { 
  deleteRequest, 
  createRequest,
  acceptConnection,
} from '../../supabase/connections';

export const UserSearchedCard = ({user_name, url_img, user_id}) => {
  const [ status, setStatus ] = React.useState('stranger');
  const {
    requesters,
    requesteds,
    connections,
    reloadData,
    user_id : user_client
  } = React.useContext(Connections_context);

  React.useEffect(() => {
    connections.forEach(connection => {
      if(
        connection.requester && connection.requester === user_id ||
        connection.requested && connection.requested === user_id 
      ) { setStatus('connected') }
    });
  
    requesteds.forEach(request => {
      if(request.requested === user_id) setStatus('requested');
    });
  
    requesters.forEach(request => {
      if(request.requester === user_id) setStatus('requester');
    })
    
  }, []);

  const cancelRequest = async() => {
    const request_id = requesteds.find(request => request.requested === user_id).id;
    await deleteRequest(request_id);
    setStatus('stranger');
    reloadData();
  } 

  const requestUser = async() => {
    await createRequest(user_client, user_id);
    setStatus('requested');
    reloadData();
  }

  const acceptRequester = async() => {
    const request_id = requesters.find(request => request.requester === user_id).id;
    await acceptConnection(user_id,user_client, request_id);
    reloadData();
  }

  const declineRequester = async() => {
    const request_id = requesters.find(request => request.requester === user_id).id;
    await deleteRequest(request_id);
    reloadData();
  }

  return (
    <article
      className={`border-2 rounded-lg box-border p-2 flex justify-between  w-full md:w-4/6 bg-yellow-100/30 border-yellow-200
        ${status === 'requester' ? 'max-sm:flex-col' : ''}`
      }
    >
      <div
        className='flex gap-2 items-center'
      >
        {url_img 
          ? 
            <img 
              src={url_img} 
              className='w-10 h-10 object-cover rounded-full'
            />
          :
            <LiaUserSecretSolid 
              className='w-10 h-10 text-rose-700 bg-white rounded-full border-2 border-rose-700'
            />
        }

        <p className='font-semibold text-lg text-yellow-900'>{user_name}</p>
      </div>

      {status === 'stranger' &&
        <button 
          type="button"
          className='border-2 hover:bg-violet-200 border-violet-700 rounded-lg font-semibold text-violet-700 px-2'
          onClick={requestUser}
        >
          Conectar
        </button>
      }

      {status === 'connected' &&
        <button
          disabled  
          type='button'
          className='border-2 bg-gray-200 border-gray-700 rounded-lg font-semibold text-gray-700 px-2'
        >
          Conectados
        </button>
      }

      {status === 'requested' &&
        <button 
          type="button"
          className='border-2 hover:bg-rose-200 border-rose-700 rounded-lg font-semibold text-rose-700 px-2'
          onClick={cancelRequest}
        >
          Cancelar
        </button>
      }

      {status === 'requester' &&
        <div 
          className='flex gap-2 self-end h-10'
        >
          <button 
            type="button"
            className='border-2 hover:bg-violet-200 border-violet-500 rounded-lg font-semibold text-violet-700 px-2'
            onClick={acceptRequester}
          >
            <MdOutlineDone />
          </button>

          <button 
            type="button"
            className='border-2 hover:bg-pink-200 border-pink-500 rounded-lg font-semibold text-pink-500 px-2'
            onClick={declineRequester}
          >
            <MdCancel />
          </button>
        </div>
      }
    </article>
  );
}