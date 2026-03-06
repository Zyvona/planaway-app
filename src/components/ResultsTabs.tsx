import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, DollarSign, ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type BudgetLevel = "Economy" | "Standard" | "Luxury";

interface ResultsTabsProps {
  origin: string;
  destination: string;
  budget: string;
  days: string;
  budgetLevel: BudgetLevel;
  onDataUpdate: (data: { itinerary?: any; budget?: any; safety?: any }) => void;
}

const SkeletonCard = ({ lines = 3 }: { lines?: number }) => (
  <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className="h-4 rounded-md" style={{ width: `${85 - i * 15}%` }} />
    ))}
  </div>
);

const SkeletonBlock = () => (
  <div className="space-y-4">
    <SkeletonCard lines={3} />
    <SkeletonCard lines={2} />
    <SkeletonCard lines={3} />
  </div>
);

const ResultsTabs = ({ origin, destination, budget, days, budgetLevel, onDataUpdate }: ResultsTabsProps) => {
  const [itineraryData, setItineraryData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);
  const [safetyData, setSafetyData] = useState<any>(null);

  useEffect(() => {
    const mockItinerary = {
      days: Array.from({ length: parseInt(days) }, (_, i) => ({
        day: i + 1,
        activities: [`Explore ${destination}`, "Local dining", "Evening relaxation"],
      })),
    };
    const mockBudget = {
      categories: [
        { name: "Accommodation", amount: parseFloat(budget) * 0.4 },
        { name: "Food", amount: parseFloat(budget) * 0.3 },
        { name: "Activities", amount: parseFloat(budget) * 0.2 },
        { name: "Transport", amount: parseFloat(budget) * 0.1 },
      ],
    };
    const mockSafety = {
      tips: [
        "Keep copies of important documents",
        "Share your itinerary with someone",
        "Stay aware of your surroundings",
      ],
    };

    setItineraryData(mockItinerary);
    setBudgetData(mockBudget);
    setSafetyData(mockSafety);
    onDataUpdate({ itinerary: mockItinerary, budget: mockBudget, safety: mockSafety });
  }, [origin, destination, budget, days, budgetLevel, onDataUpdate]);

  return (
    <Tabs defaultValue="itinerary" className="flex flex-col h-full">
      <TabsList className="grid w-full grid-cols-3 bg-card rounded-none border-b border-border h-13 p-0">
        <TabsTrigger
          value="itinerary"
          className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:text-secondary data-[state=active]:shadow-none text-muted-foreground h-full font-heading"
        >
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm font-semibold">Itinerary</span>
        </TabsTrigger>
        <TabsTrigger
          value="budget"
          className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:shadow-none text-muted-foreground h-full font-heading"
        >
          <DollarSign className="h-4 w-4" />
          <span className="text-sm font-semibold">Budget</span>
        </TabsTrigger>
        <TabsTrigger
          value="safety"
          className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-success data-[state=active]:bg-transparent data-[state=active]:text-success data-[state=active]:shadow-none text-muted-foreground h-full font-heading"
        >
          <ShieldCheck className="h-4 w-4" />
          <span className="text-sm font-semibold">Safety</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="itinerary" className="flex-1 p-5 mt-0">
        <h3 className="font-heading font-bold text-foreground mb-0.5">Daily Itinerary</h3>
        <p className="text-muted-foreground text-xs mb-5">Your personalized day-by-day plan</p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-border" />
          <div className="h-2 w-2 rotate-45 bg-accent" />
          <div className="flex-1 h-px bg-border" />
        </div>
        <SkeletonBlock />
      </TabsContent>

      <TabsContent value="budget" className="flex-1 p-5 mt-0">
        <h3 className="font-heading font-bold text-foreground mb-0.5">Budget Breakdown</h3>
        <p className="text-muted-foreground text-xs mb-5">See where every dollar goes</p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-border" />
          <div className="h-2 w-2 rotate-45 bg-accent" />
          <div className="flex-1 h-px bg-border" />
        </div>
        <SkeletonBlock />
      </TabsContent>

      <TabsContent value="safety" className="flex-1 p-5 mt-0">
        <h3 className="font-heading font-bold text-foreground mb-0.5">Safety Tips</h3>
        <p className="text-muted-foreground text-xs mb-5">Stay safe on your solo adventure</p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-border" />
          <div className="h-2 w-2 rotate-45 bg-accent" />
          <div className="flex-1 h-px bg-border" />
        </div>
        <SkeletonBlock />
      </TabsContent>
    </Tabs>
  );
};

export default ResultsTabs;
