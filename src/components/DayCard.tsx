import { Clock, MapPin, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface Activity {
  time: string;
  title: string;
  location: string;
  cost: number;
  costCurrency: string;
  emoji: string;
}

interface DayCardProps {
  dayNumber: number;
  vibeKeyword: string;
  neighborhood: string;
  activities: Activity[];
  tip: string;
}

const DayCard = ({ dayNumber, vibeKeyword, neighborhood, activities, tip }: DayCardProps) => {
  const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);
  const currency = activities[0]?.costCurrency || "$";

  return (
    <Card className="border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/5 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-1">
          <CardTitle className="text-2xl font-heading font-bold text-secondary">
            Day {dayNumber}
          </CardTitle>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 font-heading text-xs">
            {vibeKeyword}
          </Badge>
        </div>
        <p className="text-sm font-heading font-semibold text-foreground/80">{neighborhood}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span className="text-lg">{currency}</span>
          <span>Estimated daily cost: {currency}{totalCost.toLocaleString()}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-5 space-y-4">
          <h4 className="font-heading font-bold text-sm mb-2 text-foreground">
            Today's Activities
          </h4>

          <div className="relative space-y-6">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent via-secondary to-accent" />

            {activities.map((activity, index) => (
              <div key={index} className="relative flex gap-4">
                <div className="relative z-10 flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-lg">
                    {activity.emoji}
                  </div>
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-semibold text-foreground">{activity.time}</span>
                  </div>
                  <h5 className="font-heading font-semibold text-sm text-foreground mb-1">
                    {activity.title}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="text-xs text-accent font-semibold">
                    {activity.cost === 0 ? 'Free' : `${currency}${activity.cost.toLocaleString()}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Alert className="bg-accent/10 border-accent/30 p-5">
          <Info className="h-4 w-4 text-accent" />
          <AlertDescription className="text-sm">
            <div className="font-bold mb-1 text-foreground">Pro Solo Tip</div>
            <p className="text-muted-foreground">{tip}</p>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default DayCard;