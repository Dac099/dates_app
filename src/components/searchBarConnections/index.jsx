import React from 'react';
import { BsSearch } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa6";

export const SearchBarConnections = ({all_users}) => {
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
          </article>
        ))}
      </section>
    </article>
  );
}