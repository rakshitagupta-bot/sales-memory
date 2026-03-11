// db.js — Database connection
// Connects to Supabase using credentials from your .env file

const { createClient } = require('@supabase/supabase-js');

const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = db;
