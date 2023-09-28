import { supabase } from "./client";


export const createFolderWithPicture = async(user_id, picture) => {
  try {
    const img_type = picture.type.split('/')[1];
    const { data, error } = await supabase
    .storage
    .from('avatar')
    .upload(`${user_id}/${Date.now()}.${img_type}`, picture, {
      cacheControl: 'no-cache'
    });

    if(error){
      throw new Error(error.message);
    }else{
      return data;
    }

  } catch (error) {
    console.error(error);
  }
}

export const getPublicUrlPicture = async(picture_path) => {
  try {
    const { data } = await supabase
    .storage
    .from('avatar')
    .getPublicUrl(picture_path);
  
    return data;
    
  } catch (error) {
    console.error(error);
  }
}

export const deleteUserPicture = async(user_id, key) => {
  try {
    const { data, error } = await supabase
    .storage    
    .from('avatar')    
    .remove([`${user_id}/${key}.png`]);

    if(error){
      throw new Error(error.message);
    }else{
      return data;
    }

  } catch (error) {
    console.error(error);
  }
}