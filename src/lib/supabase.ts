import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey= process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;


export const Supabase = createClient(supabaseUrl, supabaseAnonKey);