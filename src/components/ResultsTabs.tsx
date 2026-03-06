import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, DollarSign, ShieldCheck, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import VibeChips from "@/components/VibeChips";
import ActivityOptions, { ActivityOption } from "@/components/ActivityOptions";
import { toast } from "sonner";

interface ResultsTabsProps {
  origin: string;
  destination: string;
  budget: string;
  days: string;
  onDataUpdate: (data: {
    itinerary?: any;
    budget?: any;
    safety?: any;
    selectedVibes?: string[];
    activitySelections?: Record<number, string>;
  }) => void;
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

const ResultsTabs = ({ origin, destination, budget, days, onDataUpdate }: ResultsTabsProps) => {
  const [itineraryData, setItineraryData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);
  const [safetyData, setSafetyData] = useState<any>(null);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [activitySelections, setActivitySelections] = useState<Record<number, string>>({});
  const [isRefining, setIsRefining] = useState(false);

  useEffect(() => {
    const mockItinerary = {
      days: Array.from({ length: parseInt(days) }, (_, i) => ({
        day: i + 1,
        activities: [
          {
            id: `day${i + 1}-option-a`,
            title: `Explore ${destination}`,
            description: "Discover the main attractions and hidden gems",
            duration: "3-4 hours",
            cost: "$30-50",
          },
          {
            id: `day${i + 1}-option-b`,
            title: "Local dining experience",
            description: "Taste authentic local cuisine",
            duration: "2-3 hours",
            cost: "$20-40",
          },
        ],
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

    const initialSelections: Record<number, string> = {};
    mockItinerary.days.forEach((day: any) => {
      initialSelections[day.day] = day.activities[0].id;
    });
    setActivitySelections(initialSelections);

    onDataUpdate({
      itinerary: mockItinerary,
      budget: mockBudget,
      safety: mockSafety,
      selectedVibes: [],
      activitySelections: initialSelections,
    });
  }, [origin, destination, budget, days, onDataUpdate]);

  const handleVibeToggle = async (vibeId: string) => {
    const newSelectedVibes = selectedVibes.includes(vibeId)
      ? selectedVibes.filter((v) => v !== vibeId)
      : [...selectedVibes, vibeId];

    setSelectedVibes(newSelectedVibes);

    if (newSelectedVibes.length > 0) {
      await refineItinerary(newSelectedVibes);
    }
  };

  const refineItinerary = async (vibes: string[]) => {
    setIsRefining(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/refine-itinerary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          currentItinerary: itineraryData,
          selectedVibes: vibes,
          budget,
          destination,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refine itinerary");
      }

      const data = await response.json();
      if (data.success && data.itinerary) {
        setItineraryData(data.itinerary);

        const newSelections: Record<number, string> = {};
        data.itinerary.days.forEach((day: any) => {
          newSelections[day.day] = day.activities[0].id;
        });
        setActivitySelections(newSelections);

        onDataUpdate({
          itinerary: data.itinerary,
          budget: budgetData,
          safety: safetyData,
          selectedVibes: vibes,
          activitySelections: newSelections,
        });

        toast.success("Itinerary refined to match your vibes!");
      }
    } catch (error) {
      console.error("Error refining itinerary:", error);
      toast.error("Failed to refine itinerary. Please try again.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleActivitySelection = (dayNumber: number, optionId: string) => {
    const newSelections = {
      ...activitySelections,
      [dayNumber]: optionId,
    };
    setActivitySelections(newSelections);

    onDataUpdate({
      itinerary: itineraryData,
      budget: budgetData,
      safety: safetyData,
      selectedVibes,
      activitySelections: newSelections,
    });
  };

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

      <TabsContent value="itinerary" className="flex-1 p-5 mt-0 overflow-y-auto">
        <h3 className="font-heading font-bold text-foreground mb-0.5">Daily Itinerary</h3>
        <p className="text-muted-foreground text-xs mb-5">Your personalized day-by-day plan</p>

        <VibeChips
          selectedVibes={selectedVibes}
          onVibeToggle={handleVibeToggle}
          isRefining={isRefining}
        />

        {isRefining && (
          <div className="flex items-center gap-2 mb-4 text-secondary text-sm font-heading">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Refining your itinerary...</span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-border" />
          <div className="h-2 w-2 rotate-45 bg-accent" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {!itineraryData ? (
          <SkeletonBlock />
        ) : (
          <div className="space-y-4">
            {itineraryData.days.map((day: any) => (
              <div
                key={day.day}
                className="rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-heading font-bold text-secondary-foreground">
                      {day.day}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-foreground">Day {day.day}</h4>
                </div>

                <ActivityOptions
                  options={day.activities}
                  selectedOptionId={activitySelections[day.day] || day.activities[0]?.id}
                  onSelect={(optionId) => handleActivitySelection(day.day, optionId)}
                  dayNumber={day.day}
                />
              </div>
            ))}
          </div>
        )}
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
