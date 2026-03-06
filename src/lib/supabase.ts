import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Check your Bolt Project Settings.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 1. Updated Interface to match your SQL exactly
export interface Trip {
  // ... previous fields
  itinerary_data: {
    day: number;
    activities: {
      time: string;
      description: string;
      map_link: string; // Crucial for "Real" feeling
    }[];
  }[];
  budget_data: {
    flight_estimate: number;
    booking_link: string; // Crucial for "Real" feeling
    tier_comparison: any;
  };
}

// 2. Secured Save Function
export async function saveTrip(tripData: Trip): Promise<Trip | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("trips")
    .insert({
      ...tripData,
      user_id: user.id,
      // Ensure we map the local UI state names to DB names if they differ
      budget_limit: tripData.budget_limit,
      duration_days: tripData.duration_days
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error saving trip:", error);
    return null;
  }
  return data;
}

// 3. Secured Fetch Function
export async function getTrips(): Promise<Trip[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq('user_id', user.id) // Security: only see your own expeditions
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
  return data || [];
}