import { supabase } from "./client";

export const getUserData = async() => {
  try {
    const user_data = [
      supabase.from('groups').select('*', {count: 'exact', head: true}),
      supabase.from('activities').select('*', {count: 'exact', head: true}),      
      supabase.from('connections').select('*', {count: 'exact', head: true}),
      supabase.auth.getUser(),
    ];
    
    const [ 
      groups, 
      activities, 
      connections, 
      admin_user 
    ] = await Promise.all(user_data);

    if(groups.error) throw new Error(groups.error);
    if(activities.error) throw new Error(activities.error);
    if(connections.error) throw new Error(connections.error);
    if(admin_user.error) throw new Error(admin_user.error)

    const { user } = admin_user.data;

    return {
      id: user.id,
      user_name: user.user_metadata.name,
      url_picture: user.user_metadata.url_picture,
      total_activities: activities.count,
      total_groups: groups.count, 
      total_connections: connections.count
    }

  } catch (error) {
    console.log(error);
  }
}

export const getUser = async() => {
  try {
    const { data, error } = await supabase.auth.getUser();

    return { data, error };

  } catch (error) {
    console.log(error);
  }
}

export const updateUserImgUrl = async(new_url, key) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        url_picture: new_url,
        key
      }
    });

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}

export const updateUserName = async(new_user_name) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        name: new_user_name
      }
    });

    if(error) throw new Error(error);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const updateUserEmail = async(new_email) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: new_email
    });

    if(error) throw new Error(error);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const updateUserPassword = async(new_password) => {
  try {
    const { data, error } = await supabase
    .auth
    .updateUser({
      password: new_password
    })

    if(error){
      throw new Error(error.message);
    }else{
      return data;
    }
    
  } catch (error) {
    console.log(error);
  }
}

export const insertUserInUsers = async(user_data) => {
  try {
    const { email, user_name, admin_id } = user_data;

    const { error } = await supabase
    .from('users')
    .insert({
      user_name,
      email,
      admin_id,
      url_img: ''
    });

    return error;

  } catch (error) {
    console.error(error);
  }
}

export const verifyUserNameUnique = async(user_name) => {
  try {
    const { data, error } = await supabase
    .from('users')
    .select('user_name')
    .eq('user_name', user_name);

    if(error) throw new Error(error);

    return data.length < 1;

  } catch (error) {
    console.log(error);
  }
}

export const updatePublicEmail = async(new_email, admin_id) => {
  try {
    const { error } = await supabase
    .from('users')
    .update({ email: new_email })
    .eq('admin_id', admin_id);

    if(error) throw new Error(error);

  } catch (error) {
    console.log(error);
  }
}

export const updatePublicUserName = async(new_name, admin_id) => {
  try {
    const { error } = await supabase
    .from('users')
    .update({ user_name: new_name })
    .eq('admin_id', admin_id);

    if(error) throw new Error(error);

  } catch (error) {
    console.log(error);
  }
}

export const updatePublicURLPicture = async(url_img, admin_id) => {
  try {
    const { error } = await supabase
    .from('users')
    .update({ url_img : url_img })
    .eq('admin_id', admin_id);

    if(error) throw new Error(error);

  } catch (error) {
    console.log(error);
  }
}