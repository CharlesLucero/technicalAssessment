// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rhzhmkjocummgriepjnj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoemhta2pvY3VtbWdyaWVwam5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODA3NjIsImV4cCI6MjA0Mzk1Njc2Mn0.GD0RrvJwuPR1TXTJou_HBPE4C7ZLOf-NJb83anZ1Ml0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
