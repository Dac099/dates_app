import React from 'react';
import { SearchBar } from '../../components/searchBar';
import { Connections_context } from '../../context/connections';
import { Requesteds } from '../../components/Requesteds';
import { Requesters } from '../../components/Requesters';
import { UserConnections } from '../../components/UserConnections';

export const Connections = () => {
  const {
    loading,
    on_error,
  } = React.useContext(Connections_context);

  if(on_error){
    return <p>Error</p>
  }

  if(loading){ 
    return <p>Cargando</p>;
  }
  
  return (
    <>
      <SearchBar/>
      <Requesteds />
      <Requesters />
      <UserConnections />
    </>
  );
}
