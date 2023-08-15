import { supabase } from "./client";

export const getUserData = async() => {
  try {
    //returns the username, total groups, total conections and total activities
    const { count:total_groups, error:groups_error } = await supabase.from('groups').select('*', {count: 'exact', head: true});
    
    const { count:total_activities, error:activities_error } = await supabase.from('activities').select('*', {count: 'exact', head: true});

    const { data:sesion_data, error:session_error } = await supabase.auth.getSession();
    
    return {
      user_name: sesion_data.session.user.user_metadata.name,
      total_activities,
      total_groups
    }

  } catch (error) {
    console.log(error);
  }
}