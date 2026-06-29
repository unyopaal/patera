import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required');
}

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Helper functions
export const getUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getMeetings = async (type?: 'thursday' | 'sunday') => {
  let query = supabase.from('meetings').select('*');
  if (type) query = query.eq('type', type);
  const { data, error } = await query.order('date', { ascending: false });
  return { data, error };
};

export const getRegistrations = async (meetingId: string) => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*, users(*)')
    .eq('meeting_id', meetingId);
  return { data, error };
};

export const createRegistration = async (
  meetingId: string,
  userId: string,
  status: 'confirmed' | 'waitingA' | 'waitingB' | 'cancelled' | 'maybe' = 'confirmed'
) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([{ meeting_id: meetingId, user_id: userId, status }])
    .select();
  return { data, error };
};

export const updateRegistrationStatus = async (
  registrationId: string,
  status: 'confirmed' | 'waitingA' | 'waitingB' | 'cancelled' | 'maybe'
) => {
  const { data, error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', registrationId)
    .select();
  return { data, error };
};