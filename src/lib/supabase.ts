import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BudgetLevel = "Economy" | "Standard" | "Luxury";

export interface Trip {
  id?: string;
  origin: string;
  destination: string;
  origin_lat?: number;
  origin_lng?: number;
  destination_lat?: number;
  destination_lng?: number;
  budget: number;
  budget_level: BudgetLevel;
  days: number;
  itinerary_data?: any;
  budget_data?: any;
  safety_data?: any;
  created_at?: string;
  updated_at?: string;
}

export async function saveTrip(tripData: {
  origin: string;
  destination: string;
  budget: string;
  days: string;
  budget_level: BudgetLevel;
  originCoords?: { lat: number; lng: number };
  destinationCoords?: { lat: number; lng: number };
}): Promise<Trip | null> {
  const { data, error } = await supabase
    .from("trips")
    .insert({
      origin: tripData.origin,
      destination: tripData.destination,
      origin_lat: tripData.originCoords?.lat,
      origin_lng: tripData.originCoords?.lng,
      destination_lat: tripData.destinationCoords?.lat,
      destination_lng: tripData.destinationCoords?.lng,
      budget: parseFloat(tripData.budget),
      budget_level: tripData.budget_level,
      days: parseInt(tripData.days, 10),
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
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching trips:", error);
    return [];
  }

  return data || [];
}
