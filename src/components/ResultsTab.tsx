import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, DollarSign, ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ArrivalCard from "@/components/ArrivalCard";
import DayCard from "@/components/DayCard";
import { generateItinerary } from "@/lib/itinerary-generator";
import { useState } from "react";

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

interface ResultsTabsProps {
  origin?: string;
  destination?: string;
  days?: string;
  budget?: string;
}

const ResultsTabs = ({ origin, destination, days, budget }: ResultsTabsProps) => {
  const totalDays = days ? parseInt(days) : 7;
  const itinerary = destination ? generateItinerary(destination, totalDays) : [];
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const currentDayContent = selectedDay === 1
    ? { type: 'arrival' as const }
    : { type: 'day' as const, day: itinerary.find(day => day.dayNumber === selectedDay) };

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

      <TabsContent value="itinerary" className="flex-1 flex flex-col mt-0 overflow-hidden">
        <div className="px-5 pt-5 pb-3">
          <h3 className="font-heading font-bold text-foreground mb-0.5">Daily Itinerary</h3>
          <p className="text-muted-foreground text-xs mb-5">Your personalized day-by-day plan</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-border" />
            <div className="h-2 w-2 rotate-45 bg-accent" />
            <div className="flex-1 h-px bg-border" />
          </div>
        </div>

        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-5 pb-4 border-b border-border/50">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-3">
              <Button
                variant={selectedDay === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(1)}
                className="font-heading font-semibold whitespace-nowrap"
              >
                Day 1
              </Button>
              {itinerary.map((day) => (
                <Button
                  key={day.dayNumber}
                  variant={selectedDay === day.dayNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDay(day.dayNumber)}
                  className="font-heading font-semibold whitespace-nowrap"
                >
                  Day {day.dayNumber}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {origin && destination ? (
            <div>
              {currentDayContent.type === 'arrival' && (
                <ArrivalCard origin={origin} destination={destination} />
              )}
              {currentDayContent.type === 'day' && currentDayContent.day && (
                <DayCard
                  dayNumber={currentDayContent.day.dayNumber}
                  vibeKeyword={currentDayContent.day.vibeKeyword}
                  neighborhood={currentDayContent.day.neighborhood}
                  activities={currentDayContent.day.activities}
                  tip={currentDayContent.day.tip}
                />
              )}
            </div>
          ) : (
            <SkeletonBlock />
          )}
        </div>
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