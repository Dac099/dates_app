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