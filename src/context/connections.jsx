import React from 'react';
import { 
  getRequestersOfUser,
  getPublicUserId,
  getUserRequests,
  getUserConnections,
  getPublicUsers,
} from '../supabase/connections';
import { getUser } from '../supabase/user';

export const Connections_context = React.createContext();

export const ConnectionsContext = (props) => {
  const [ user_id, setUserId ] = React.useState();
  const [ session_id, setSessionId ] = React.useState();
  const [ loading, setLoading ] = React.useState(true);
  const [ on_error, setOnError ] = React.useState(false);
  const [ connections, setConnections ] = React.useState([]);
  const [ requesters, setRequesters ] = React.useState([]);
  const [ requesteds, setRequesteds ] = React.useState([]);
  const [ users, setUsers ] = React.useState([]);
  const [ fetcher, setFetcher ] = React.useState(false);

  const reloadData = () => {
    setFetcher(!fetcher);
  }

  React.useEffect(() => {
    const fetchData = async() => {
      try {
        const session = await getUser();
        if(session.error) throw new Error(session.error);
        
        const public_id = await getPublicUserId(session.data.user.id);
        if(public_id.error) throw new Error(public_id.error);

        const [user_connections, requesters_user, user_requests, public_users ] = await Promise.all([
          getUserConnections(public_id),
          getRequestersOfUser(public_id),
          getUserRequests(public_id),
          getPublicUsers(public_id)
        ]);

        if(user_connections.errors[0]) throw new Error(user_connections.errors[0]);
        if(user_connections.errors[1]) throw new Error(user_connections.errors[1]);
        if(requesters_user.error) throw new Error(requesters_user.error);
        if(user_requests.error) throw new Error(user_requests.error);
        if(public_users.error) throw new Error(public_users.error);

        setUsers(public_users.data);
        setConnections(user_connections.data);
        setRequesteds(user_requests.data);
        setRequesters(requesters_user.data);
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
  }, [fetcher]);


  return (
    <Connections_context.Provider
      value={
        {
          user_id,
          session_id,
          loading,
          on_error,
          connections,
          requesters,
          requesteds,
          users,
          setConnections,
          setRequesteds,
          setRequesters,
          reloadData
        }
      }
    >
      {props.children}
    </Connections_context.Provider>
  );
}