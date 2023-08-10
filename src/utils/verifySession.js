import { supabase } from "../supabase/client";

//If the function gets an error, it's because there is a session and the user will be redirected to a path
const  retrieveUserSession = async(to_navigate, navigate) =>  {
  try {    
    const { data, error } = await supabase.auth.getSession();
    
    if(!error){
      navigate(to_navigate);
    }else{
      throw new Error(error);
    }

  } catch (error) {
    console.log(error.message);
  }
}

export {retrieveUserSession};