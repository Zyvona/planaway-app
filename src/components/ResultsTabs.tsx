import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, DollarSign, ShieldCheck, Sparkles, Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ActivityOptions from "@/components/ActivityOptions";
import { Button } from "@/components/ui/button"; // Added missing import
import { toast } from "sonner";
import { saveTrip } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface ResultsTabsProps {
  origin: string;
  destination: string;
  budget: string;
  days: string;
  originCoords?: { lat: number; lng: number };
  destinationCoords?: { lat: number; lng: number };
  loadedTripData?: any;
  onDataUpdate: (data: {
    itinerary?: any;
    budget?: any;
    safety?: any;
    selectedVibes?: string[];
    activitySelections?: Record<number, string>;
    marketNote?: string;
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

const ResultsTabs = ({ origin, destination, budget, days, originCoords, destinationCoords, loadedTripData, onDataUpdate }: ResultsTabsProps) => {
  const navigate = useNavigate(); // Moved inside the component
  const [itineraryData, setItineraryData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);
  const [safetyData, setSafetyData] = useState<any>(null);
  const [marketNote, setMarketNote] = useState<string>("");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [activitySelections, setActivitySelections] = useState<Record<number, string>>({});
  const [isRefining, setIsRefining] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (loadedTripData) {
      setItineraryData(loadedTripData.itinerary_data);
      setBudgetData(loadedTripData.budget_data);
      setSafetyData(loadedTripData.safety_data);
      setSelectedVibes(loadedTripData.selected_vibes || []);
      setActivitySelections(loadedTripData.activity_selections || {});
      setMarketNote(loadedTripData.market_note || "");

      onDataUpdate({
        itinerary: loadedTripData.itinerary_data,
        budget: loadedTripData.budget_data,
        safety: loadedTripData.safety_data,
        selectedVibes: loadedTripData.selected_vibes || [],
        activitySelections: loadedTripData.activity_selections || {},
        marketNote: loadedTripData.market_note || "",
      });
      return;
    }

    const generateTrip = async () => {
      setIsGenerating(true);
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        const response = await fetch(`${supabaseUrl}/functions/v1/generate-trip`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ origin, destination, budget, days }),
        });

        if (!response.ok) throw new Error("Failed to generate trip");

        const result = await response.json();
        if (result.success && result.data) {
          const tripData = result.data;
          setItineraryData(tripData.itinerary_data);
          setBudgetData(tripData.budget_data);
          setSafetyData(tripData.safety_data);
          setMarketNote(tripData.market_note || "");

          const initialSelections: Record<number, string> = {};
          tripData.itinerary_data?.forEach((day: any) => {
            if (day.activities?.[0]) {
               initialSelections[day.day] = day.activities[0].id;
            }
          });
          setActivitySelections(initialSelections);

          onDataUpdate({
            itinerary: tripData.itinerary_data,
            budget: tripData.budget_data,
            safety: tripData.safety_data,
            selectedVibes: [],
            activitySelections: initialSelections,
            marketNote: tripData.market_note || "",
          });

          await saveTrip({
            origin,
            destination,
            origin_lat: originCoords?.lat,
            origin_lng: originCoords?.lng,
            destination_lat: destinationCoords?.lat,
            destination_lng: destinationCoords?.lng,
            budget_limit: parseFloat(budget),
            duration_days: parseInt(days, 10),
            itinerary_data: tripData.itinerary_data,
            budget_data: tripData.budget_data,
            safety_data: tripData.safety_data,
            selected_vibes: [],
            activity_selections: initialSelections,
            market_note: tripData.market_note || "",
          });

          toast.success("Trip generated and saved!");
        }
      } catch (error) {
        console.error("Error generating trip:", error);
        toast.error("Failed to generate trip. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    };

    generateTrip();
  }, [origin, destination, budget, days, originCoords, destinationCoords, loadedTripData, onDataUpdate]);

  const handleActivitySelection = (dayNumber: number, optionId: string) => {
    const newSelections = { ...activitySelections, [dayNumber]: optionId };
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
    <div className="flex flex-col h-full bg-card">
      {/* Home Button Header Section */}
      <div className="flex items-center border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="h-13 w-13 rounded-none border-r border-border hover:bg-muted/50 text-[#1A3A5C]"
        >
          <Home className="h-5 w-5" />
        </Button>

        <Tabs defaultValue="itinerary" className="flex-1">
          <TabsList className="grid w-full grid-cols-3 bg-transparent rounded-none h-13 p-0">
            <TabsTrigger
              value="itinerary"
              className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary h-full font-heading"
            >
              <CalendarDays className="h-4 w-4" />
              <span className="text-sm font-semibold">The Journey</span>
            </TabsTrigger>
            <TabsTrigger
              value="budget"
              className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-accent h-full font-heading"
            >
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-semibold">The Ledger</span>
            </TabsTrigger>
            <TabsTrigger
              value="safety"
              className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-success data-[state=active]:text-success h-full font-heading"
            >
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm font-semibold">The Sentinel</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs defaultValue="itinerary" className="flex-1 overflow-hidden">
        {/* Itinerary Content */}
        <TabsContent value="itinerary" className="h-full p-5 mt-0 overflow-y-auto">
          <h3 className="font-heading font-bold text-foreground mb-0.5">Daily Itinerary</h3>
          <p className="text-muted-foreground text-xs mb-5">Your personalized plan</p>

          {!itineraryData || !Array.isArray(itineraryData) ? (
            <SkeletonBlock />
          ) : (
            <div className="space-y-4">
              {itineraryData.map((day: any) => (
                <div key={day.day} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-sm font-heading font-bold text-secondary-foreground">{day.day}</span>
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

        {/* Budget Content */}
        <TabsContent value="budget" className="h-full p-5 mt-0 overflow-y-auto">
           <h3 className="font-heading font-bold text-foreground mb-0.5">The Ledger</h3>
           {/* Budget mapping logic here (consistent with previous versions) */}
           {!budgetData ? <SkeletonBlock /> : (
             <div className="space-y-4">
                {budgetData.categories?.map((cat: any, i: number) => (
                  <div key={i} className="flex justify-between p-3 border rounded-lg bg-white">
                    <span>{cat.name}</span>
                    <span className="font-bold text-accent">${cat.amount}</span>
                  </div>
                ))}
             </div>
           )}
        </TabsContent>

        {/* Safety Content */}
        <TabsContent value="safety" className="h-full p-5 mt-0 overflow-y-auto">
           <h3 className="font-heading font-bold text-foreground mb-0.5">The Sentinel</h3>
           <p className="text-xs text-muted-foreground mb-4 font-bold">Emergency Contacts ({new Date().getFullYear()})</p>
           {!safetyData ? <SkeletonBlock /> : (
             <div className="space-y-3">
                {safetyData.emergency_contacts?.map((contact: any, i: number) => (
                  <div key={i} className="flex justify-between p-2 border-b">
                    <span className="text-xs">{contact.service}</span>
                    <span className="text-xs font-bold text-accent">{contact.number}</span>
                  </div>
                ))}
             </div>
           )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsTabs;