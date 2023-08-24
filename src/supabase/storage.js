import { supabase } from "./client";

export const uploadProfilePicture = async(file, user_id) => {
  try {
    const { data, error } = await supabase
    .storage
    .from('avatar')
    .upload(`${user_id}_picture.png`, file);

    if(error) console.log(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}