import { supabase } from "../supabase/client";

//If data.session it's null, then navigate to signin
const  retrieveUserSession = async(insideApp, navigate, to_navigate) =>  {
  try {    
    const { data, error } = await supabase.auth.getSession();

    if(insideApp){
      if(!data.session){
        navigate('/signin');
        return;
      }
    }

    if(data.session){
      navigate(to_navigate)
    }

    if(error){
      throw new Error(error);
    }
  } catch (error) {
    console.log(error.message);
  }
}

export {retrieveUserSession};

/**
 * En signin:
 *  1- Si sesion, ve a root
 *  2- Si no hay sesion, quedate ahi
 * 
 * En signup:
 *  1- Si hay sesion, ve a root
 *  2- Si no hay sesion, quedate ahi
 * 
 * Dentro de la app:
 *  1- Si hay sesion, quedate ahi
 *  2- Si no hay sesion, ve a signin
 */