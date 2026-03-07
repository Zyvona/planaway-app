import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Plane, DollarSign, CalendarDays, Compass, BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlacesAutocomplete from "@/components/PlacesAutocomplete";
import PastExpeditions from "@/components/PastExpeditions";
import { sanitizeInput } from "@/lib/sanitize";
import { signOut } from "@/lib/supabase";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";

interface OnboardingFormProps {
  onSubmit: (data: {
    origin: string;
    destination: string;
    budget: string;
    days: string;
    originCoords?: { lat: number; lng: number };
    destinationCoords?: { lat: number; lng: number };
  }) => void;
  isLoading?: boolean;
}

const OnboardingForm = ({ onSubmit, isLoading = false }: OnboardingFormProps) => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [originCoords, setOriginCoords] = useState<{ lat: number; lng: number } | undefined>();
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination && budget && days && !isLoading) {
      onSubmit({
        origin: sanitizeInput(origin),
        destination: sanitizeInput(destination),
        budget,
        days,
        originCoords,
        destinationCoords,
      });
    }
  };

  const isValid = origin && destination && budget && days && !isLoading;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center bg-primary"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/30" />

      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex w-full items-center justify-between px-5 pt-8 pb-4"
      >
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-accent" />
          <span className="text-xl font-heading font-extrabold text-primary-foreground tracking-tight">
            PlanAway
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/my-expeditions")}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg px-4 py-2 h-auto font-heading font-semibold text-xs uppercase tracking-wider"
          >
            <BookOpen className="h-4 w-4 mr-1.5" />
            My Expeditions
          </Button>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="bg-card/50 hover:bg-card border-primary-foreground/20 text-primary-foreground shadow-lg px-3 py-2 h-auto"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </motion.header>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mx-4 mt-2 mb-8 w-full max-w-md rounded-2xl bg-card shadow-2xl shadow-primary/40 overflow-hidden"
      >
        {/* Card Header */}
        <div className="bg-primary px-6 pt-7 pb-5">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-accent mb-2">
            Solo Adventure Awaits
          </p>
          <h1 className="text-2xl font-heading font-extrabold text-primary-foreground leading-tight">
            Plan Your Perfect Trip
          </h1>
          <p className="text-sm text-primary-foreground/70 mt-1.5">
            Tell us where you're headed and we'll handle the rest.
          </p>

          {/* Diamond divider */}
          <div className="flex items-center gap-2 mt-5">
            <div className="flex-1 h-px bg-primary-foreground/20" />
            <div className="h-2.5 w-2.5 rotate-45 bg-accent" />
            <div className="flex-1 h-px bg-primary-foreground/20" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pt-6 pb-5 space-y-6">
          {/* Origin */}
          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-foreground mb-3 block">
              Origin City
            </label>
            <div className="border-b-2 border-primary/20 pb-2 focus-within:border-primary transition-colors">
              <PlacesAutocomplete
                value={origin}
                onChange={setOrigin}
                onPlaceSelect={(place) => {
                  setOriginCoords({ lat: place.lat, lng: place.lng });
                }}
                placeholder="Where are you departing from?"
                icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-body"
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-foreground mb-3 block">
              Destination City
            </label>
            <div className="border-b-2 border-primary/20 pb-2 focus-within:border-secondary transition-colors">
              <PlacesAutocomplete
                value={destination}
                onChange={setDestination}
                onPlaceSelect={(place) => {
                  setDestinationCoords({ lat: place.lat, lng: place.lng });
                }}
                placeholder="Where do you want to go?"
                icon={<Plane className="h-4 w-4 text-muted-foreground" />}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-body"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-foreground mb-3 block">
              Total Budget
            </label>
            <div className="flex items-center gap-3 border-b-2 border-primary/20 pb-2 focus-within:border-accent transition-colors">
              <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="number"
                placeholder="e.g. 2000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-body"
              />
            </div>
          </div>

          {/* Days */}
          <div>
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-foreground mb-3 block">
              Number of Days
            </label>
            <div className="flex items-center gap-3 border-b-2 border-primary/20 pb-2 focus-within:border-success transition-colors">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="number"
                placeholder="e.g. 7"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-body"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              size="xl"
              disabled={!isValid}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Planning Your Trip...
                </>
              ) : (
                <>
                  <Plane className="h-5 w-5" />
                  Plan My Trip
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-border px-6 py-3 text-center">
          <p className="text-xs text-muted-foreground font-body">
            Powered by AI · Built for solo explorers
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;
