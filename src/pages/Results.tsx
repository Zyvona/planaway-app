import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Plane, Compass, Stamp, BookOpen } from "lucide-react";
import { useState } from "react";
import ResultsTabs from "@/components/ResultsTabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";

type BudgetLevel = "Economy" | "Standard" | "Luxury";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [tripData, setTripData] = useState<{
    itinerary?: any;
    budget?: any;
    safety?: any;
  }>({});

  const data = location.state as {
    origin: string;
    destination: string;
    budget: string;
    days: string;
    budget_level: BudgetLevel;
    originCoords?: { lat: number; lng: number };
    destinationCoords?: { lat: number; lng: number };
  } | null;

  if (!data) {
    navigate("/");
    return null;
  }

  const handleSaveTrip = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.from("trips").insert({
        origin: data.origin,
        destination: data.destination,
        origin_lat: data.originCoords?.lat,
        origin_lng: data.originCoords?.lng,
        destination_lat: data.destinationCoords?.lat,
        destination_lng: data.destinationCoords?.lng,
        budget: parseFloat(data.budget),
        budget_level: data.budget_level,
        days: parseInt(data.days, 10),
        itinerary_data: tripData.itinerary,
        budget_data: tripData.budget,
        safety_data: tripData.safety,
      });

      if (error) throw error;

      toast.success("Trip saved to My Expeditions!");
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip. Please try again.");
    } finally {
      setIsSaving(false);
    }
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

      {/* Top Bar */}
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
          onClick={handleSaveTrip}
          disabled={isSaving}
          className="relative bg-gradient-to-br from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-primary-foreground shadow-xl border-2 border-amber-800/50 rounded-full px-5 py-2.5 h-auto font-heading font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
          style={{
            boxShadow: "0 4px 14px 0 rgba(146, 64, 14, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
          }}
        >
          <Stamp className="h-3.5 w-3.5 mr-1.5" />
          {isSaving ? "Saving..." : "Save to My Expeditions"}
        </Button>
      </motion.header>

      {/* Route Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 px-5 pb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-primary-foreground/70 text-xs hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            New Trip
          </button>
          <button
            onClick={() => navigate("/my-expeditions")}
            className="flex items-center gap-1 text-primary-foreground/70 text-xs hover:text-primary-foreground transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            My Expeditions
          </button>
        </div>
        <div className="bg-primary/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-primary-foreground/10">
          <div className="flex items-center gap-2 text-primary-foreground">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm font-heading font-semibold">{data.origin}</span>
            <Plane className="h-3.5 w-3.5 text-secondary mx-1" />
            <span className="text-sm font-heading font-semibold">{data.destination}</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs text-primary-foreground/60">{data.days} days</span>
            <span className="h-1 w-1 rounded-full bg-primary-foreground/30" />
            <span className="text-xs text-primary-foreground/60">${Number(data.budget).toLocaleString()} budget</span>
            <span className="h-1 w-1 rounded-full bg-primary-foreground/30" />
            <span className="text-xs text-accent font-semibold">{data.budget_level}</span>
          </div>
        </div>
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex-1 rounded-t-2xl bg-card shadow-2xl shadow-primary/30 overflow-hidden"
      >
        <ResultsTabs
          origin={data.origin}
          destination={data.destination}
          budget={data.budget}
          days={data.days}
          budgetLevel={data.budget_level}
          onDataUpdate={setTripData}
        />
      </motion.div>
    </div>
  );
};

export default Results;
