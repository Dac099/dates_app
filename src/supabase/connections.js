import { supabase } from "./client";

export const getUserConnections = async() => {
  try {
    const { data, error } = await supabase
    .from('conections')
    .select();

    return { data, error };
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

export const getUserRequests = async(user_id) => {
  try {
    const { data, error } = await supabase
    .from('requests')
    .select('*')
    .eq('requested', user_id);

    return { data, error };

  } catch (error) {
    console.error(error);
  }
};

export const getUserRequesters = async(user_id) => {
  try {
    const { data, error } = await supabase
    .from('requests')
    .select('*')
    .eq('requester', user_id);

    return { data, error };

  } catch (error) {
    console.log(error);
  }
}

export const cancelRequest = async(request_id) => {
  try {
    const { error } = await supabase
    .from('requests')
    .delete()
    .eq(id, request_id);

    return error;

  } catch (error) {
    console.error(error);
  }
}

export const acceptRequest = async(request_id, requester, requested) => {
  try {
    const { data: connection_data, error: connection_error } = await createNewConnection({
      requester,
      requested
    });

    const { error: delete_error } = await supabase
    .from('requests')
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

export const newRequest = async(requester, requested) => {
  try {
    const { data, error } = await supabase
    .from('requests')
    .insert({
      requested,
      requester
    });

    return {
      data, 
      error
    };

  } catch (error) {
    console.error(error);
  }
}