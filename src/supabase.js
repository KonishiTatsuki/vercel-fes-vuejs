import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseUrl = "https://jnaybgrdsjmlrddryktq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuYXliZ3Jkc2ptbHJkZHJ5a3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2NTE2MzMsImV4cCI6MTk5MTIyNzYzM30.XyIR5Mi_Ru8WE0PQSDOHrcFETm8_ZTZumJ4W-EOthhs"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
