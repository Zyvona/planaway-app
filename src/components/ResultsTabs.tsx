import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, DollarSign, ShieldCheck, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ActivityOptions, { ActivityOption } from "@/components/ActivityOptions";
import { toast } from "sonner";
import { saveTrip } from "@/lib/supabase";

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
          body: JSON.stringify({
            origin,
            destination,
            budget,
            days,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate trip");
        }

        const result = await response.json();
        if (result.success && result.data) {
          const tripData = result.data;
          setItineraryData(tripData.itinerary_data);
          setBudgetData(tripData.budget_data);
          setSafetyData(tripData.safety_data);
          setMarketNote(tripData.market_note || "");

          const initialSelections: Record<number, string> = {};
          tripData.itinerary_data?.forEach((day: any) => {
            initialSelections[day.day] = day.activities[0].id;
          });
          setActivitySelections(initialSelections);

          const dataToSave = {
            itinerary: tripData.itinerary_data,
            budget: tripData.budget_data,
            safety: tripData.safety_data,
            selectedVibes: [],
            activitySelections: initialSelections,
            marketNote: tripData.market_note || "",
          };

          onDataUpdate(dataToSave);

          const saved = await saveTrip({
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

          if (saved) {
            toast.success("Trip generated and saved!");
          } else {
            toast.error("Failed to save trip");
          }
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
        data.itinerary.forEach((day: any) => {
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
          <span className="text-sm font-semibold">The Journey</span>
        </TabsTrigger>
        <TabsTrigger
          value="budget"
          className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:shadow-none text-muted-foreground h-full font-heading"
        >
          <DollarSign className="h-4 w-4" />
          <span className="text-sm font-semibold">The Ledger</span>
        </TabsTrigger>
        <TabsTrigger
          value="safety"
          className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-success data-[state=active]:bg-transparent data-[state=active]:text-success data-[state=active]:shadow-none text-muted-foreground h-full font-heading"
        >
          <ShieldCheck className="h-4 w-4" />
          <span className="text-sm font-semibold">The Sentinel</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="itinerary" className="flex-1 p-5 mt-0 overflow-y-auto">
        <h3 className="font-heading font-bold text-foreground mb-0.5">Daily Itinerary</h3>
        <p className="text-muted-foreground text-xs mb-5">Your personalized day-by-day plan</p>


        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-border" />
          <div className="h-2 w-2 rotate-45 bg-accent" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {!itineraryData ? (
          <SkeletonBlock />
        ) : (
          <div className="space-y-4">
            {itineraryData.map((day: any) => (
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

        {budgetData?.booking_link && (
          <a
            href={budgetData.booking_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-4 px-4 py-2.5 text-sm font-heading font-bold rounded-lg transition-colors"
            style={{
              backgroundColor: '#1A3A5C',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0f2844';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1A3A5C';
            }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Book Flight
          </a>
        )}

        {!budgetData ? (
          <SkeletonBlock />
        ) : (
          <div className="space-y-4">
            {budgetData.categories?.map((category: any, index: number) => (
              <div key={index} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-heading font-semibold text-foreground">
                    {category.name}
                  </span>
                  <span className="text-sm font-heading font-bold text-accent">
                    ${category.amount.toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
            {budgetData.flight_estimate && (
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-heading font-semibold text-foreground">
                    Flight Estimate
                  </span>
                  <span className="text-sm font-heading font-bold text-accent">
                    ${budgetData.flight_estimate}
                  </span>
                </div>
              </div>
            )}

            {budgetData.tier_comparison && (
              <div className="mt-6">
                <h4 className="font-heading font-bold text-foreground mb-3">Value Optimizer</h4>
                <div className="space-y-3">
                  {Object.entries(budgetData.tier_comparison).map(([tier, data]: [string, any]) => (
                    <div key={tier} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-heading font-bold text-foreground capitalize">
                          {tier}
                        </span>
                        <span className="text-sm font-heading font-bold text-accent">
                          ${data.total}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <span>Stay: ${data.accommodation}</span>
                        <span>Food: ${data.food}</span>
                        <span>Fun: ${data.activities}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {marketNote && (
              <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-3">
                <p className="text-xs text-muted-foreground italic">{marketNote}</p>
              </div>
            )}
          </div>
        )}
      </TabsContent>

      <TabsContent value="safety" className="flex-1 p-5 mt-0">
        <h3 className="font-heading font-bold text-foreground mb-0.5">Safety Tips</h3>
        <p className="text-muted-foreground text-xs mb-5">Stay safe on your solo adventure</p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-border" />
          <div className="h-2 w-2 rotate-45 bg-accent" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {!safetyData ? (
          <SkeletonBlock />
        ) : (
          <div className="space-y-4">
            {safetyData.score && (
              <div className="rounded-xl border border-success/30 bg-success/5 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-heading font-bold text-foreground">
                    Safety Score
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            i < safetyData.score ? 'bg-success' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-heading font-bold text-success">
                      {safetyData.score}/10
                    </span>
                  </div>
                </div>
              </div>
            )}

            {safetyData.emergency_contacts && safetyData.emergency_contacts.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <h4 className="text-sm font-heading font-bold text-foreground mb-3">
                  Emergency Contacts ({new Date().getFullYear()})
                </h4>
                <div className="space-y-2">
                  {safetyData.emergency_contacts.map((contact: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">{contact.service}</span>
                      <a
                        href={`tel:${contact.number}`}
                        className="font-heading font-semibold text-accent hover:underline"
                      >
                        {contact.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {safetyData.tips && safetyData.tips.length > 0 && (
              <div className="space-y-2">
                {safetyData.tips.map((tip: string, index: number) => (
                  <div key={index} className="rounded-xl border border-border bg-card p-3 shadow-sm">
                    <p className="text-xs text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ResultsTabs;
