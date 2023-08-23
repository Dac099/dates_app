import {supabase} from '../supabase/client';

const signIn = async(email, password) => {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if(error){
      throw new Error(error);
    }

    return data;
  } catch (error) {
    console.log(error.message)
    console.log(error);
  }
}

const signOut = async() => {
  try {
    const { error } = await supabase.auth.signOut();

    if(error){
      throw new Error(error);
    }

  } catch (error) {
    console.log(error);
  }
}

const signUp = async(email, password, name) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          url_picture: ''
        }
      }
    });

    if(error){
      throw new Error(error);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export {signIn, signOut, signUp};