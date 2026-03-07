import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Check your Bolt Project Settings.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Trip {
  id?: string;
  user_id?: string;
  origin: string;
  destination: string;
  budget_limit: number;
  duration_days: number;
  origin_lat?: number;
  origin_lng?: number;
  destination_lat?: number;
  destination_lng?: number;
  itinerary_data?: any;
  budget_data?: any;
  safety_data?: any;
  selected_vibes?: string[];
  activity_selections?: Record<number, string>;
  market_note?: string;
  created_at?: string;
}

export async function saveTrip(tripData: Partial<Trip>): Promise<Trip | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("No authenticated user");
    return null;
  }

  const { data, error } = await supabase
    .from("trips")
    .insert({
      ...tripData,
      user_id: user.id,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error saving trip:", error);
    return null;
  }
  return data;
}

export async function getTrips(): Promise<Trip[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("No authenticated user");
    return [];
  }

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq('user_id', user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
  return data || [];
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        prompt: 'select_account', // This forces Google to show the account picker every time
        access_type: 'offline',
      }
    },
  });
  if (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}