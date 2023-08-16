import { supabase } from "./client";

export const getGroups = async() => {
  try {
    const { data, error } = await supabase.from('groups').select();    

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error)
  }
}

export const createGroup = async(group_data) => {
  try {
    const { data,error } = await supabase
    .from('groups')
    .insert({
      title: group_data.title,
      description: group_data.description
    })
    .select();
    
    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}

export const getGroupByID = async(group_id) => {
  try {
    const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', group_id);

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}