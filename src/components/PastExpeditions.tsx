import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Trip {
  id: string;
  origin: string;
  destination: string;
  budget: number;
  days: number;
  created_at: string;
  itinerary_data: any;
  budget_data: any;
  safety_data: any;
  selected_vibes: string[];
  activity_selections: Record<number, string>;
  origin_lat?: number;
  origin_lng?: number;
  destination_lat?: number;
  destination_lng?: number;
}

export default function PastExpeditions() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data, error } = await supabase
          .from("trips")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        setTrips(data || []);
      } catch (error) {
        console.error("Error fetching trips:", error);
        toast.error("Failed to load past expeditions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleReopen = (trip: Trip) => {
    navigate("/results", {
      state: {
        origin: trip.origin,
        destination: trip.destination,
        budget: trip.budget.toString(),
        days: trip.days.toString(),
        originCoords: trip.origin_lat && trip.origin_lng
          ? { lat: trip.origin_lat, lng: trip.origin_lng }
          : undefined,
        destinationCoords: trip.destination_lat && trip.destination_lng
          ? { lat: trip.destination_lat, lng: trip.destination_lng }
          : undefined,
        loadedTripData: {
          itinerary_data: trip.itinerary_data,
          budget_data: trip.budget_data,
          safety_data: trip.safety_data,
          selected_vibes: trip.selected_vibes,
          activity_selections: trip.activity_selections,
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-muted/30 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">No expeditions yet. Create your first trip!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {trips.map((trip) => (
        <Card key={trip.id} className="border-border hover:border-accent/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-heading font-semibold text-foreground truncate">
                    {trip.origin} → {trip.destination}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {trip.days} days
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    ${trip.budget.toLocaleString()}
                  </span>
                  <span>
                    {new Date(trip.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => handleReopen(trip)}
                size="sm"
                className="flex-shrink-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-primary-foreground shadow-lg border-2 border-amber-800/50 h-8"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Re-open
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
