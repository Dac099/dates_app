import React from 'react';
import { BsSearch } from "react-icons/bs";

export const SearchBarConnections = ({all_users}) => {
  const [ users, setUsers ] = React.useState(all_users);
  const [ user_search, setUserSearch ] = React.useState('');
  const [ users_filtered, setUsersFiltered ] = React.useState([]);

  const findUsers = (user_name) => {
    console.log('Buscando parecidos con ' + user_name);
  }

  return (
    <article className='flex flex-col gap-4'>
      <div className='flex justify-between items-center border-2 border-neutral-300 rounded-xl h-12'>
        <input 
          type="text" 
          value={user_search}
          onChange={e => {
            setUserSearch(e.target.value);
            findUsers(e.target.value);
          }}
          className='h-5/6 w-5/6 outline-none pl-2 font-semibold text-lg text-rose-950 ml-1'
        />
        <BsSearch className='bg-white w-1/6 text-rose-500 text-right'/>
      </div>

      <section className='flex flex-wrap gap-2 justify-center'>
        {users.map((user, index) => (
          <article
            key={index}
            className='flex justify-between items-center border-2 border-neutral-200 rounded-lg p-2 w-72'
          >            
            <img 
              src={user.url_img}
              className='w-10 h-10 rounded-full'
            />
            <p className='w-5/6 font-semibold text-lg text-slate-800'>{user.name}</p>
          </article>
        ))}
      </section>
    </article>
  );
}