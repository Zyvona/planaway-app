import { motion } from "framer-motion";
import { Compass, LogIn, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { signInWithGoogle } from "@/lib/supabase";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";

export default function Auth() {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-primary"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-primary/40" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-card shadow-2xl shadow-primary/40 overflow-hidden"
      >
        <div className="bg-primary px-6 pt-12 pb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="h-10 w-10 text-accent" />
            <span className="text-3xl font-heading font-extrabold text-primary-foreground tracking-tight">
              PlanAway
            </span>
          </div>
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-accent mb-2">
            Solo Adventure Awaits
          </p>
          <h1 className="text-2xl font-heading font-extrabold text-primary-foreground leading-tight">
            Your AI Travel Companion
          </h1>
          <p className="text-sm text-primary-foreground/70 mt-2">
            Plan personalized trips with AI-powered recommendations
          </p>

          <div className="flex items-center gap-2 mt-6">
            <div className="flex-1 h-px bg-primary-foreground/20" />
            <div className="h-2.5 w-2.5 rotate-45 bg-accent" />
            <div className="flex-1 h-px bg-primary-foreground/20" />
          </div>
        </div>

        <div className="px-6 pt-8 pb-6">
          <Button
            onClick={handleGoogleSignIn}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Sign in with Google
          </Button>

          <div className="relative mt-4">
            <Button
              disabled
              size="lg"
              className="w-full bg-muted/50 text-muted-foreground hover:bg-muted/50 opacity-60 cursor-not-allowed"
            >
              <Apple className="h-5 w-5 mr-2" />
              Sign in with Apple
            </Button>
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 bg-accent/20 text-accent border-accent/30 text-xs font-heading font-bold"
            >
              Coming Soon
            </Badge>
          </div>

          <div className="mt-6 space-y-3 text-center text-xs text-muted-foreground">
            <p>Sign in to access your personalized itineraries</p>
            <div className="flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                AI-Powered Planning
              </span>
              <span className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                Save & Sync Trips
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border px-6 py-3 text-center">
          <p className="text-xs text-muted-foreground font-body">
            Powered by AI · Built for solo explorers
          </p>
        </div>
      </motion.div>
    </div>
  );
}
