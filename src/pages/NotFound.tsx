import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-primary/50" />

      <div className="relative z-10 mx-4 w-full max-w-sm rounded-2xl bg-card shadow-2xl shadow-primary/40 overflow-hidden text-center">
        <div className="bg-primary px-6 pt-6 pb-4">
          <Compass className="h-8 w-8 text-accent mx-auto mb-2" />
          <h1 className="text-5xl font-heading font-extrabold text-primary-foreground">404</h1>
        </div>
        <div className="px-6 py-6">
          <p className="text-foreground font-heading font-semibold mb-1">Off the beaten path!</p>
          <p className="text-muted-foreground text-sm mb-5">This route doesn't exist on our map.</p>
          <Button asChild size="xl" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
