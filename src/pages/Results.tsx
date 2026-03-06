import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Plane, Compass } from "lucide-react";
import ResultsTabs from "@/components/ResultsTabs";
import heroBg from "@/assets/hero-bg.jpg";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as { origin: string; destination: string; budget: string; days: string } | null;

  if (!data) {
    navigate("/");
    return null;
  }

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
        <span className="text-xs font-heading font-semibold uppercase tracking-widest text-accent">
          AI Travel Planner
        </span>
      </motion.header>

      {/* Route Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 px-5 pb-4"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-primary-foreground/70 text-xs mb-3 hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          New Trip
        </button>
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
        <ResultsTabs />
      </motion.div>
    </div>
  );
};

export default Results;
