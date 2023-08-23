import { supabase } from "./client";

export const getUserData = async() => {
  try {
    //returns the username, total groups, total conections and total activities
    const { count:total_groups, error:groups_error } = await supabase.from('groups').select('*', {count: 'exact', head: true});
    
    const { count:total_activities, error:activities_error } = await supabase.from('activities').select('*', {count: 'exact', head: true});

    const { data:sesion_data, error:session_error } = await supabase.auth.getSession();

    if(groups_error) throw new Error(groups_error);
    if(activities_error) throw new Error(activities_error);
    if(session_error) throw new Error(session_error);
    
    return {
      id: sesion_data.session.user.id,
      user_name: sesion_data.session.user.user_metadata.name,
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

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}