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

export const createGroup = async(groud_data) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .insert(groud_data)
      .select();
    
    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}