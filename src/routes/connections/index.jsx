import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getUser } from '../../supabase/user';
import { RequestCard } from '../../components/requestCard';
import { SearchBarConnections } from '../../components/searchBarConnections';
import { ConnectionCard } from '../../components/connectionCard';
import { 
  getUserConnections, 
  getRequests, 
  getAllUsers, 
  getUserIdByAdminId,
  getUserById
} from '../../supabase/connections';

export const Connections = () => {
  const {
    connections,
    users,
    requests, 
    user_id,
    session_id
  } = useLoaderData();

  const [ in_demand_users, setInDemandUsers ] = React.useState([]);
  const [ requesters, setRequesters ] = React.useState([]);

  React.useEffect(() => {

    const getInDemandUsers = async(requests) => {
      const in_demand_users = requests.filter(request => request.requester === session_id);
      const users_profiles = in_demand_users.map(requests => getUserById(requests.in_demand));
  
      setInDemandUsers(await Promise.all(users_profiles))
    }
  
    const getRequesterUsers = async(requests) => {
      const requesters = requests.filter(request => request.in_demand === user_id);
      const requesters_admin_id = requesters.map(request => request.requester);
      const requesters_id_promises = requesters_admin_id.map(admin_id => getUserIdByAdminId(admin_id));
      const requesters_ids = await Promise.all(requesters_id_promises);
      const requesters_profiles_promises = requesters_ids.map(id => getUserById(id));

      setRequesters(await Promise.all(requesters_profiles_promises));
    }

    getInDemandUsers(requests);
    getRequesterUsers(requests);

  }, []);


  return (
    <article className=''>
      
      <section className='shadow-md rounded-md p-1 border-gray-200 border-2 mb-4 w-full md:w-10/12 lg:w-3/5 mx-auto'>
        <SearchBarConnections all_users={users} connections={connections} requesters={requesters} in_demand={in_demand_users}/>  
      </section>

      <section className='flex gap-2 flex-col sm:flex-row justify-between w-full md:w-10/12 lg:w-3/5 mx-auto mb-4'>
        <section className='shadow-md rounded-md p-2 border-gray-200 border-2 sm:w-1/2 h-min max-w-xl min-w-min max-h-80'>
          <p className='text-2xl font-bold text-center text-rose-600 mb-4'>Solicitudes recibidas</p>

          <div className='max-h-52 flex flex-col overflow-y-scroll'>
            {requesters.map((user, index) => (
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
            {in_demand_users.map(user => (
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
          {connections.map(user => (
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

//loader
export const getConnectionsData = async() => {
  const { data: { user : session }, error_user_error } = await getUser();

  const [ connections, users, requests, user_id ] = await Promise.all([
    getUserConnections(),
    getAllUsers(),
    getRequests(),
    getUserIdByAdminId(session.id),
  ]);
  

  return {
    connections,
    users,
    requests,
    user_id,
    session_id: session.id
  };
}