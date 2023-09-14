import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getUserConnections, getUserRequests } from '../../supabase/connections';
import { getUser } from '../../supabase/user';
import { RequestCard } from '../../components/requestCard';
import { SearchBarConnections } from '../../components/searchBarConnections';
import { ConnectionCard } from '../../components/connectionCard';

export const Connections = () => {
  const data = useLoaderData();
  // console.log(data);

  const fake_data = [
    {
      url_img: 'https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Dac099'
    },
    {
      url_img: 'https://images.pexels.com/photos/478544/pexels-photo-478544.jpeg?auto=compress&cs=tinysrgb&w=1600',
      name: 'Arepa con queso'
    },
    {
      url_img: 'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=1600',
      name: 'Tamal de huevo'
    },
    {
      url_img: 'https://images.pexels.com/photos/2010877/pexels-photo-2010877.jpeg?auto=compress&cs=tinysrgb&w=1600',
      name: 'Xbox pirata'
    },
  ];

  return (
    <article className=''>
      
      <section className='shadow-md rounded-md p-1 border-gray-200 border-2 mb-4 w-full md:w-10/12 lg:w-3/5 mx-auto'>
        <SearchBarConnections all_users={fake_data}/>  
      </section>

      <section className='flex gap-2 flex-col sm:flex-row justify-between w-full md:w-10/12 lg:w-3/5 mx-auto mb-4'>
        <section className='shadow-md rounded-md p-2 border-gray-200 border-2 sm:w-1/2 h-min max-w-xl min-w-min max-h-80'>
          <p className='text-2xl font-bold text-center text-rose-600 mb-4'>Solicitudes recibidas</p>

          <div className='max-h-52 flex flex-col overflow-y-scroll'>
            {fake_data.map((user, index) => (
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
            {fake_data.map((user, index) => (
                <RequestCard 
                  key={index}
                  user_data={user}
                  requested={true}
                />
            ))}
          </div>
        </section>
      </section>      

      <section className='shadow-xl rounded-md p-2 border-gray-200 border-2 w-full md:w-10/12 lg:w-3/5 mx-auto'>
        <p className='text-2xl font-bold text-center text-rose-600 mb-4'>Todas tus conexiones</p>
        <div
          className='grid  gap-2 min-[375px]:grid-cols-2 min-[600px]:grid-cols-4 max-h-[250px] overflow-y-scroll'
        >
          {fake_data.map((user, index) => (
            <ConnectionCard 
              key={index}
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
  const { data: { user }, error_user_error } = await getUser();

  const {
    data: connections_data,
    error: connections_error
  } = await getUserConnections();

  const {
    data: requests_data,
    error: requests_error
  } = await getUserRequests(user.id);

  if(requests_error) console.error(requests_error);
  if(connections_error) console.error(connections_error);

  return { connections_data, requests_data };
}