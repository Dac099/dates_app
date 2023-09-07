import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getUserConnections, getUserRequests } from '../../supabase/connections';
import { getUser } from '../../supabase/user';
import { RequestCard } from '../../components/requestCard';

export const Connections = () => {
  const data = useLoaderData();
  // console.log(data);

  const fake_data = [
    {
      url_img: 'https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Dac099'
    },
    {
      url_img: 'https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Arepa con queso'
    },
    {
      url_img: 'https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Tamal de huevo'
    },
    {
      url_img: 'https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Xbox pirata'
    },
  ];

  return (
    <article className='flex flex-wrap gap-3 items-center'>
      
      <section className='shadow-md rounded-md p-2 border-gray-200 border-2 w-full'>
        //Search bar connections

      </section>

      <section className='flex w-full gap-2 flex-col sm:flex-row justify-between'>
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

      <section className='shadow-xl rounded-md p-2 border-gray-200 border-2 w-full'>
        //list all the connection completed

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