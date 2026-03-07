import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import Index from "./pages/Index";
import Results from "./pages/Results";
import MyExpeditions from "./pages/MyExpeditions";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import EnvErrorDisplay from "@/components/EnvErrorDisplay";
import { checkRequiredEnvVars } from "@/lib/env-check";
import { supabase } from "@/lib/supabase";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const envCheck = checkRequiredEnvVars();

  const [user, setUser] = useState<any>(null);
const [authLoading, setAuthLoading] = useState(true);

useEffect(() => {
  // Check active session immediately
  const initAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setAuthLoading(false);
  };

  initAuth();

  // Listen for changes (Sign In / Sign Out)
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
    setAuthLoading(false);
  });

  return () => subscription.unsubscribe();
}, []);

if (authLoading) return <div className="h-screen bg-[#FDFBF7] flex items-center justify-center">Loading...</div>;

// Only show onboarding if user is explicitly authenticated
return user ? <OnboardingForm /> : <LoginView />;


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" replace />} />
            <Route path="/" element={user ? <Index /> : <Navigate to="/auth" replace />} />
            <Route path="/results" element={user ? <Results /> : <Navigate to="/auth" replace />} />
            <Route path="/my-expeditions" element={user ? <MyExpeditions /> : <Navigate to="/auth" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
