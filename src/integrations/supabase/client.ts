// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ygqykeegpgyuscgwckzv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncXlrZWVncGd5dXNjZ3dja3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0MjIxMjYsImV4cCI6MjA1MDk5ODEyNn0.FE8GAfWPmn7-07S-kO8NCnBudDJyjxpPNsHwERAPvLc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);