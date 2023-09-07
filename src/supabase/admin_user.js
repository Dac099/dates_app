
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_SERVICE_ROL, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export const getUserByID = async(user_id) => {
  try {
    const { data, error } = await supabase.auth.admin.getUserById(user_id);

    return { data, error };
    
  } catch (error) {
    console.log(error);
  }
}
