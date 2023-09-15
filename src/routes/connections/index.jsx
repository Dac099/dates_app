import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getUserConnections, getRequests, getAllUsers } from '../../supabase/connections';
import { getUser } from '../../supabase/user';
import { RequestCard } from '../../components/requestCard';
import { SearchBarConnections } from '../../components/searchBarConnections';
import { ConnectionCard } from '../../components/connectionCard';

export const Connections = () => {
  const {
    connections,
    users,
    users_profiles_demanded,
    users_profiles_requesters
  } = useLoaderData();

  return (
    <article className=''>
      
      <section className='shadow-md rounded-md p-1 border-gray-200 border-2 mb-4 w-full md:w-10/12 lg:w-3/5 mx-auto'>
        <SearchBarConnections all_users={users}/>  
      </section>

      <section className='flex gap-2 flex-col sm:flex-row justify-between w-full md:w-10/12 lg:w-3/5 mx-auto mb-4'>
        <section className='shadow-md rounded-md p-2 border-gray-200 border-2 sm:w-1/2 h-min max-w-xl min-w-min max-h-80'>
          <p className='text-2xl font-bold text-center text-rose-600 mb-4'>Solicitudes recibidas</p>

          <div className='max-h-52 flex flex-col overflow-y-scroll'>
            {users_profiles_requesters.map((user, index) => (
                <RequestCard 
                  key={index}
                  user_data={user}
                  requester={true}
                />
            ))}
          </div>
        </section>

        <section className='shadow-md rounded-md p-2 border-gray-200 border-2 sm:w-1/2 h-min max-w-xl min-w-min max-h-80'>
          <p className='text-2xl font-bold text-center text-rose-600 mb-4'>Solicitudes enviadas</p>

          <div className='max-h-52 flex flex-col overflow-y-scroll'>
            {users_profiles_demanded.map(user => (
                <RequestCard 
                  key={user.id}
                  user_data={user}
                  requested={true}
                />
            ))}
          </div>
        </section>
      </section>      

      <section className='shadow-xl rounded-md p-2 border-gray-200 border-2 w-full md:w-10/12 lg:w-3/5 mx-auto'>
        <p className='text-2xl font-bold text-center text-rose-600 mb-4'>
          {connections.length > 0 
            ?
            `Tus ${connections.length} conexiones`
            :
            'Aquí veras tus próximas conexiones'
          }
        </p>
        <div
          className='grid  gap-2 min-[375px]:grid-cols-2 min-[600px]:grid-cols-4 max-h-[250px] overflow-y-scroll'
        >
          {connections.data.map(user => (
            <ConnectionCard 
              key={user.id}
              user={user}
            />
          ))}
        </div>
      </section>

    </article>
  );
}
import { getUserRequest, getUserInDemandRequests, getUserIdByAdminId, getInDemandUsers, getRequestersUsers } from '../../supabase/connections';

//loader
export const getConnectionsData = async() => {
  const { data: { user }, error_user_error } = await getUser();

  const [ connections, users, requests, user_data ] = await Promise.all([
    getUserConnections(),
    getAllUsers(),
    getRequests(),
    getUserIdByAdminId(user.id),
  ]);
  
  const id_from_admin = user_data.data[0].id;

  const user_requests = getUserRequest(requests.data, user.id);
  const user_in_demand_requests = getUserInDemandRequests(requests.data, id_from_admin);

  const users_profiles_demanded = await getInDemandUsers(user_requests);
  const users_profiles_requesters = await getRequestersUsers(user_in_demand_requests);

  return {
    connections,
    users,
    users_profiles_demanded,
    users_profiles_requesters
  };
}