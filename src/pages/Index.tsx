import { useNavigate } from "react-router-dom";
import OnboardingForm from "@/components/OnboardingForm";

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: {
    origin: string;
    destination: string;
    budget: string;
    days: string;
    originCoords?: { lat: number; lng: number };
    destinationCoords?: { lat: number; lng: number };
  }) => {
    navigate("/results", { state: data });
  };

  return <OnboardingForm onSubmit={handleSubmit} />;
};

export default Index;
