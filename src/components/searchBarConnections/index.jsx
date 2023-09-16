import React from 'react';
import { BsSearch } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa6";

export const SearchBarConnections = ({all_users, connections, in_demand, requesters}) => {
  const [ users, setUsers ] = React.useState(all_users.data);
  const [ user_search, setUserSearch ] = React.useState('');
  const [ users_filtered, setUsersFiltered ] = React.useState([]);

  const findUsers = (name_pattern) => {
    name_pattern = name_pattern.replace(/\s+/g, '').toLowerCase();
    
    if(name_pattern.length === 0) {
      setUsersFiltered([]);
      return;
    }

    setUsersFiltered(users.filter(user => user.user_name.toLowerCase().includes(name_pattern)));
  }

  const userInConnections = (user_id) => {
    let user_in_connections = false;
    
    connections.forEach(connection => {
      if(connection.requester === user_id || connection.in_demand === user_id){
        user_in_connections = true;        
      }
    })

    return user_in_connections;
  }

  const userInRequesters = (user_id) => {
    let user_is_requester = false;
    
    requesters.forEach(user => {
      if(user.id === user_id) user_is_requester = true;
    })

    return user_is_requester;
  }

  const userInDemands = (user_id) => {
    let user_in_demands = false;

    in_demand.forEach(user => {
      if(user.id === user_id) user_in_demands = true;
    });

    return user_in_demands;
  }

  return (
    <article className='flex flex-col gap-4 w-full'>
      <div className='flex justify-between items-center border-2 border-neutral-300 rounded-xl h-12'>
        <input 
          type="text" 
          value={user_search}
          placeholder='Busca tu nueva conexión'
          onChange={e => {
            setUserSearch(e.target.value);
            findUsers(e.target.value);
          }}
          className='h-5/6 w-5/6 outline-none pl-2 font-semibold text-lg text-rose-950 ml-1'
        />
        <div className='bg-white w-1/6 h-full text-rose-500 flex justify-end items-center rounded-full'>
          <BsSearch className='mr-1 text-2xl'/>
        </div>
      </div>

      <section className='grid sm:grid-cols-2 gap-2'>
        {users_filtered.map((user, index) => (
          <article
            key={index}
            className='flex justify-between items-center border-2 border-neutral-200 rounded-lg p-1 w-full'
          >    
            {user.url_img 
              ? 
              <img 
                src={user.url_img}
                className='w-10 h-10 rounded-full object-cover'
              /> 
              :
              <FaUserSecret className='text-3xl text-rose-800'/>
            }        
            <p className='w-5/6 font-semibold text-lg text-orange-400'>{user.user_name}</p>  

            {userInConnections(user.id) &&
              <button 
                disabled="disabled"
                className='border-2 border-gray-400 font-semibold text-gray-700 bg-gray-200 px-2 rounded-md'
              >
                Conectados
              </button>
            } 

            {userInRequesters(user.id) &&
              <div className='flex justify-between gap-2'>
                <button 
                  type="button"
                  className='border-2 border-green-400 font-semibold text-green-700 hover:bg-green-200 px-2 rounded-md'
                >
                  Aceptar
                </button>
                <button 
                  type="button"
                  className='border-2 border-red-400 rounded-md px-2 font-semibold text-red-700 hover:bg-red-200'
                >
                  Rechazar
                </button>
              </div>
            } 

            {userInDemands(user.id) &&
              <button 
                type="button"
                className='border-2 border-red-400 rounded-md px-2 font-semibold text-red-700 hover:bg-red-200'
              >
                Cancelar
              </button>
            }     

            {!userInConnections(user.id) && !userInDemands(user.id) && !userInRequesters(user.id) &&
              <button 
                type="button"
                className='border-2 border-green-400 font-semibold text-green-700 hover:bg-green-200 px-2 rounded-md'
              >
                Conexión
              </button>
            }

          </article>
        ))}
      </section>
    </article>
  );
}