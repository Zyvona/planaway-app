import { useNavigate } from "react-router-dom";
import OnboardingForm from "@/components/OnboardingForm";
import { saveTrip, type BudgetLevel } from "@/lib/supabase";

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    origin: string;
    destination: string;
    budget: string;
    days: string;
    budget_level: BudgetLevel;
    originCoords?: { lat: number; lng: number };
    destinationCoords?: { lat: number; lng: number };
  }) => {
    await saveTrip(data);
    navigate("/results", { state: data });
  };

  return <OnboardingForm onSubmit={handleSubmit} />;
};

export default Index;
