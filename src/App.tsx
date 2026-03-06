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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!envCheck.isValid) {
    return <EnvErrorDisplay missingVars={envCheck.missingVars} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <div className="h-8 w-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

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
