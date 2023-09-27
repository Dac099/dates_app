import React from 'react';
import { Connections_context } from '../../context/connections';
import { UserSearchedCard } from '../UserSearchedCard';

export const SearchBar = () => {
  const [ search_pattern, setSearchPattern ] = React.useState('');
  const [ filtered_users, setFilteredUsers ] = React.useState([]);
  const {
    users,
  } = React.useContext(Connections_context);

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
        className='flex flex-col gap-3 items-center max-h-96 overflow-y-auto'
        onMouseLeave={() => {
          setSearchPattern('');
          setFilteredUsers([]);
        }}
      >
        {filtered_users.map(user => (
          <UserSearchedCard 
            key={user.id}
            url_img={user.url_img}
            user_name={user.user_name}
            user_id={user.id}
          />
        ))}
      </section>
    </article>
  );
}
