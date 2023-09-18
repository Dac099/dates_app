import { supabase } from "./client";

export const getUserConnections = async() => {
  try {
    const { data, error } = await supabase
    .from('conections')
    .select();

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.error(error);
  }
};

export const createNewConnection = async(new_connection) => {
  try {
    const { data, error } = await supabase
    .from('conections')
    .insert(new_connection);

    return { data, error };
  } catch (error) {
    console.error(error);
  }
}

export const deleteConnection = async(connection_id) => {
  try {
    const { error } = await supabase
    .from('conections')
    .delete()
    .eq('id', connection_id);

    return error;

  } catch (error) {
    console.error(error);
  }
};

export const getRequests = async() => {
  try {
    const { data, error } = await supabase
    .from('petitions')
    .select()

    if(error) throw new Error(error)

    return data;

  } catch (error) {
    console.error(error);
  }
};

export const cancelRequest = async(requester, user_in_demand) => {
  try {
    const { data, error } = await supabase
    .from('petitions')
    .delete()
    .match({requester, in_demand: user_in_demand});

    console.log(data, error);

  } catch (error) {
    console.error(error);
  }
}

export const acceptRequest = async(request_id, request, in_demand) => {
  try {
    const { data: connection_data, error: connection_error } = await createNewConnection({
      request,
      in_demand
    });

    const { error: delete_error } = await supabase
    .from('petitions')
    .delete()
    .eq(id, request_id);

    return {
      connection_data,
      connection_error,
      delete_error,
    };

  } catch (error) {
    console.error(error);
  }
}

export const newRequest = async(requester, in_demand) => {
  try {
    const { data, error } = await supabase
    .from('petitions')
    .insert({
      requester,
      in_demand
    })
    .select();

    console.log(data, error);

    return {
      data, 
      error
    };

  } catch (error) {
    console.error(error);
  }
}

export const getAllUsers = async() => {
  try {
    const { data, error } = await supabase
    .from('users')
    .select();

    return { data, error };

  } catch (error) {
    console.log(error);
  }
}

//Get the ID from the table users by the ID of the user in session
export const getUserIdByAdminId = async(admin_id) => {
  try {
    const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('admin_id', admin_id);

    if(error) throw new Error(error);

    return data[0].id;

  } catch (error) {
    console.log(error);
  }
}


//get when the user is the requester
export const getUserRequest = (all_requests, user_id) => {
  return all_requests.filter(request => request.requester === user_id);
}
//get when the user is the requested
export const getUserInDemandRequests = (all_requests, user_id) => {
  return all_requests.filter(request => request.in_demand === user_id);
}

//get user by id
export const getUserById = async(user_id) => {
  try {
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user_id);

    if(error) throw new Error(error);

    return data[0];

  } catch (error) {
    console.log(error);
  }
}

//get profiles that user request 
export const getInDemandUsers = async(requests) => {
  try {
    const requestsPromises = requests.map(request => getUserById(request.in_demand));
    const [ users ] = await Promise.all(requestsPromises);

    return users.data;

  } catch (error) {
    console.log(error);
  }
}

//get profiles from users that request for the user
export const getRequestersUsers = async(requests) => {
  try {
    //for each requester get his user_id
    const users_id_promises = requests.map(request => getUserIdByAdminId(request.requester));
    const [ users_data ] = await Promise.all(users_id_promises);

    return users_data.data;

  } catch (error) {
    console.log(error);
  }
}