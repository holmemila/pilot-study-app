import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://zonytmnvmwkemrzrtozp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvbnl0bW52bXdrZW1yenJ0b3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNDg0OTIsImV4cCI6MjA5NzkyNDQ5Mn0.dzFKAJufy-pyto845ZAtAd1ymA6E7mftdP4IaddqvQg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)