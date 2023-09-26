import { supabase } from "./client";

export const getPublicUsers = async(user_id) => {
  const { data, error } = await supabase
  .from('users')
  .select('id, user_name, url_img')
  .neq('id', user_id)

  if(error) console.log(error);

  return data;
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
  
  console.log(response);
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

  console.log(data);
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

  console.log(data);
}

export const getPublicUserId = async(session_id) => {
  const { data, error } = await supabase
  .from('users')
  .select('id')
  .eq('admin_id', session_id);

  return data[0].id
}