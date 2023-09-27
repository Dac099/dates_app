import { supabase } from "./client";

export const getPublicUsers = async(user_id) => {
  const { data, error } = await supabase
  .from('users')
  .select('id, user_name, url_img')
  .neq('id', user_id)

  if(error) console.log(error);

  return { data, error };
}

export const getUserConnections = async(user_id) => {
  const requesters = supabase
  .from('connections')
  .select(`
    id,
    requester,
    users!connections_requester_fkey(user_name, url_img)
  `)
  .eq('requested', user_id);
  
  const requesteds = supabase
  .from('connections')
  .select(`
    id,
    requested,
    users!connections_requested_fkey(user_name, url_img)
  `)
  .eq('requester', user_id);

  const response = await Promise.all([requesteds, requesters]);
  
  if(response[0].error || response[1].error){
    console.log(response);
  }

  return {
    data: [...response[0].data, ...response[1].data],
    errors: [
      response[0].error,
      response[1].error
    ]
  }
}

export const getRequestersOfUser = async(user_id) => {
  const { data, error } = await supabase
  .from('petitions')
  .select(`
    id,
    requester,
    users!petitions_requester_fkey(user_name, url_img)
  `)
  .eq('requested', user_id);

  if(error) console.log(error);

  return { data, error };
}

export const getUserRequests = async(user_id) => {
  const { data, error }= await supabase
  .from('petitions')
  .select(`
    id,
    requested,
    users!petitions_requested_fkey(user_name, url_img)
  `)
  .eq('requester', user_id);

  if(error) console.log(error);

  return { data, error };
}

export const getPublicUserId = async(session_id) => {
  const { data, error } = await supabase
  .from('users')
  .select('id')
  .eq('admin_id', session_id);

  return data[0].id
}

export const createConnection = async(requester, requested) => {
  const { data, error } = await supabase
  .from('connections')
  .insert({ requester, requested })
  .select();

  if(error) console.log(error);

  return data;
}

export const createRequest = async(requester, requested) => {
  const { data, error } = await supabase
  .from('petitions')
  .insert({requester, requested})
  .select();

  if(error) console.log(error);

  return data;
}

export const deleteRequest = async(petition_id) => {
  const { error } = await supabase
  .from('petitions')
  .delete()
  .eq('id', petition_id);

  if(error) console.log(error);

  return error;
}

export const acceptConnection = async(requester, requested, petition_id) => {
  const [ connection_created, request_deleted ] = await Promise.all([
    createConnection(requester, requested),
    deleteRequest(petition_id)
  ]);

  return { connection_created, request_deleted };
}

export const deleteConnection = async(connection_id) => {
  const { error } = await supabase
  .from('connections')
  .delete()
  .eq('id', connection_id);

  return error;
}