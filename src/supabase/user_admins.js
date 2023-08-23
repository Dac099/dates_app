import { createClient } from "@supabase/supabase-js";

const admin_supbase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_SERVICE_ROL, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
});


export const getUser = async(user_id) => {
  try {
    const { data, error } = await admin_supbase.auth.admin.getUserById(user_id);

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = async(user_id) => {
  try {
    const { data, error } = await admin_supbase.auth.admin.deleteUser(user_id);

    if(error) throw new Error(error);

    return data;

  } catch (error) {
    console.log(error);
  }
}
