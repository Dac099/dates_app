import React from 'react';
import { getUser } from '../../supabase/user';
import { 
  getRequestersOfUser,
  getPublicUserId,
  getUserRequests,
  getUserConnections
} from '../../supabase/connections';

export const Connections = () => {
  const [ user_id, setUserId ] = React.useState();
  const [ session_id, setSessionId ] = React.useState();
  const [ loading, setLoading ] = React.useState(true);
  const [ on_error, setOnError ] = React.useState(false);
  const [ error_msg, setErrorMsg ] = React.useState('');

  React.useEffect(() => {
    const fetchData = async() => {
      try {
        const session = await getUser();
        if(session.error) throw new Error(session.error);
        
        const public_id = await getPublicUserId(session.data.user.id);
        if(public_id.error) throw new Error(public_id.error);

        await getUserConnections(public_id);
        
        // await getRequestersOfUser(public_id);
        // await getUserRequests(public_id);


        setSessionId(session.data.user.id);
        setUserId(public_id);        
        setLoading(false);        
      } catch (error) {
        setOnError(true);
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if(on_error){
    return <p>Error</p>
  }

  if(loading){
    return <p>Cargando</p>;
  }
  
  return (
    <>
      <p>{user_id}</p>
      <p>{session_id}</p>
    </>
  );
}
