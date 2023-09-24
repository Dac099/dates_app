import { supabase } from "./client";

export const getPublicUsers = async(user_id) => {
  const { data, error } = await supabase
  .from('users')
  .select('id, user_name, url_img')
  .neq('id', user_id)

  if(error) console.log(error);

  return data;
}

export const getUserConnections = async() => {
  const { data, error } = await supabase
  .from('connections')
  .select();

  if(error) console.log(error);

  return data;
}

export const getRequestersOfUser = async(user_id) => {
  const requesters_ids = await supabase
  .from('petitions')
  .select(`
    requester,
    users()
  `)
  .eq('requested', user_id);

  if(requesters_ids.error) console.log(requesters_ids.error);

  // console.log(requesters_ids);
}

export const getPublicUserId = async(session_id) => {
  const { data, error } = await supabase
  .from('users')
  .select('id')
  .eq('admin_id', session_id);

  return data[0].id
}