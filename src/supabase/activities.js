import { supabase } from './client';

export const getActivitiesByGroupId = async(group_id) => {
  try {
    const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('group_id', group_id);

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}


export const createNewActivitie = async(act_data, group_id) => 
{
  try {
    const { data, error } = await supabase
    .from('activities')
    .insert({
      title: act_data.title,
      comments: act_data.comments,
      rating: act_data.rating,
      group_id,      
    })
    .select();

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}
