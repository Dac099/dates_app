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

export const updateGroup = async(group_id, new_data) => {
  try { 
    
    const { error } = await supabase
    .from('groups')
    .update(new_data)
    .eq('id', group_id)

    if(error) throw new Error(error);

  } catch (error) {
    console.log(error);
  }
}

export const deleteGroup = async(group_id) => {
  try {
    const { error } = await supabase
    .from('groups')
    .delete()
    .eq('id', group_id);

    if(error) throw new Error(error);

  } catch (error) {
    console.log(error);
  }
}