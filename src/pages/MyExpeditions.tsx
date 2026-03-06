import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, MapPin, Plane, Plus, Calendar, DollarSign } from "lucide-react";
import { getTrips, type Trip } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import heroBg from "@/assets/hero-bg.jpg";

const MyExpeditions = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    setLoading(true);
    const data = await getTrips();
    setTrips(data);
    setLoading(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-primary/40" />

      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex w-full items-center justify-between px-5 pt-8 pb-3"
      >
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-accent" />
          <span className="text-lg font-heading font-extrabold text-primary-foreground tracking-tight">
            PlanAway
          </span>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg px-4 py-2 h-auto font-heading font-semibold text-xs uppercase tracking-wider"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          New Trip
        </Button>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 px-5 pb-4"
      >
        <h1 className="text-3xl font-heading font-extrabold text-primary-foreground mb-2">
          My Expeditions
        </h1>
        <p className="text-sm text-primary-foreground/70">
          Your saved adventures and planned journeys
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex-1 rounded-t-2xl bg-card shadow-2xl shadow-primary/30 overflow-hidden"
      >
        <div className="p-5 h-full overflow-y-auto">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-5">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Compass className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                No Expeditions Yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Start planning your first adventure and it will appear here
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Plan Your First Trip
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/30">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-bold text-foreground text-base truncate">
                            {trip.origin}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Plane className="h-3.5 w-3.5 text-secondary" />
                        <span className="text-sm font-heading font-semibold text-foreground truncate">
                          {trip.destination}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{trip.days} days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span>${trip.budget.toLocaleString()}</span>
                          <span className="ml-auto px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                            {trip.budget_level}
                          </span>
                        </div>
                        {trip.created_at && (
                          <div className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-border">
                            Saved {formatDate(trip.created_at)}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MyExpeditions;
