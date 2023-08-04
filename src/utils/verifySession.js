import { supabase } from "../supabase/client";

const  retrieveUserSession = async(to_navigate, navigate) =>  {
  try {    
    const { data, error } = await supabase.auth.getSession();
    
    if(!error){
      navigate(to_navigate);
    }

    throw new Error(error);
  } catch (error) {
    console.log(error.message);
  }
}

export {retrieveUserSession};