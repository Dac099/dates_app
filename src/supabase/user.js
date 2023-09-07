import { supabase } from "./client";

export const getUserData = async() => {
  try {
    //returns the username, total groups, total conections and total activities
    const { count:total_groups, error:groups_error } = await supabase.from('groups').select('*', {count: 'exact', head: true});
    
    const { count:total_activities, error:activities_error } = await supabase.from('activities').select('*', {count: 'exact', head: true});

    const { data: { user } } = await supabase.auth.getUser();

    if(groups_error) throw new Error(groups_error);
    if(activities_error) throw new Error(activities_error);
    
    return {
      id: user.id,
      user_name: user.user_metadata.name,
      url_picture: user.user_metadata.url_picture,
      total_activities,
      total_groups
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
