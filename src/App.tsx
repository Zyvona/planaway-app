import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Results from "./pages/Results";
import MyExpeditions from "./pages/MyExpeditions";
import NotFound from "./pages/NotFound";
import EnvErrorDisplay from "@/components/EnvErrorDisplay";
import { checkRequiredEnvVars } from "@/lib/env-check";

const queryClient = new QueryClient();

const App = () => {
  const envCheck = checkRequiredEnvVars();

  if (!envCheck.isValid) {
    return <EnvErrorDisplay missingVars={envCheck.missingVars} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/results" element={<Results />} />
            <Route path="/my-expeditions" element={<MyExpeditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
