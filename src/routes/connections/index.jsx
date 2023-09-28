import React from 'react';
import { SearchBar } from '../../components/searchBar';
import { Connections_context } from '../../context/connections';
import { Requesteds } from '../../components/Requesteds';
import { Requesters } from '../../components/Requesters';
import { UserConnections } from '../../components/UserConnections';
import { OnLoading } from '../../components/OnLoading';
import { OnError } from '../../components/OnError';


export const Connections = () => {
  const {
    loading,
    on_error,
  } = React.useContext(Connections_context);

  if(on_error){
    return <OnError />
  }

  if(loading){ 
    return <OnLoading />
  }
  
  return (
    <>
      <SearchBar/>
      <section
        className='md:grid grid-cols-2 grid-rows-2 max-w-5xl mx-auto'
      >
        <UserConnections />
        <Requesteds />
        <Requesters />
      </section>
    </>
  );
}
