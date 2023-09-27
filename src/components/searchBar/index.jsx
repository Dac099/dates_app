import React from 'react';
import { LiaUserSecretSolid } from "react-icons/lia";
import { MdOutlineDone, MdCancel } from "react-icons/md";

export const SearchBar = ({ users, connections, requesters, requesteds, cancelRequest }) => {
  const [ search_pattern, setSearchPattern ] = React.useState('');
  const [ filtered_users, setFilteredUsers ] = React.useState([]);

  const getUserStatus = (user_id) => {
    let status = 'stranger';

    connections.forEach(connection => {
      if(
        connection.requester && connection.requester === user_id ||
        connection.requested && connection.requested === user_id 
      ) { status = 'connected' }
    });

    requesteds.forEach(request => {
      if(request.requested === user_id) status = 'requested';
    });

    requesters.forEach(request => {
      if(request.requester === user_id) status = 'requester';
    })

    return status;
  }

  const filterUsers = (user_pattern) => {
    user_pattern = user_pattern.toLowerCase().trim()

    user_pattern.length > 0 
    ? setFilteredUsers(users.filter(user => user.user_name.toLowerCase().trim().includes(user_pattern)))
    : setFilteredUsers([]);
  }
  
  return (
    <article
      className='max-w-5xl mx-auto'
    >
      <input 
        type="text" 
        placeholder='Conectate con alguien'
        value={search_pattern}
        onChange={e => {
          setSearchPattern(e.target.value);
          filterUsers(e.target.value);
        }}
        className='h-10 pl-2 rounded-lg bg-rose-100 outline-2 outline-red-200 text-rose-900 font-semibold placeholder-rose-400 w-full mb-6 text-2xl'
      />
      <section
        className='flex flex-col items-center max-h-96 overflow-y-auto'
      >
        {filtered_users.map(user => (
          <UserSearchedCard 
            key={user.id}
            url_img={user.url_img}
            user_name={user.user_name}
            status={getUserStatus(user.id)}
            cancelRequest={cancelRequest}
          />
        ))}
      </section>
    </article>
  );
}

const UserSearchedCard = ({user_name, url_img, status, cancelRequest}) => {
  const handleCancelRequest = () => {
    
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
              className='w-10 h-10 object-contain rounded-full'
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
          >
            <MdOutlineDone />
          </button>

          <button 
            type="button"
            className='border-2 hover:bg-pink-200 border-pink-500 rounded-lg font-semibold text-pink-500 px-2'
          >
            <MdCancel />
          </button>
        </div>
      }
    </article>
  );
}