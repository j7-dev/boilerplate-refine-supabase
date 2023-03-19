import { createClient } from "@refinedev/supabase";

const SUPABASE_URL =
  process.env?.REACT_APP_SUPABASE_URL || "https://supabase.io";
const SUPABASE_KEY = process.env?.REACT_APP_SUPABASE_KEY || "supabaseKey";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
