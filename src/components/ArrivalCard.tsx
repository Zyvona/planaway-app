import { Plane, Home, Info, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ArrivalCardProps {
  origin: string;
  destination: string;
}

const getTransportAdvice = (destination: string) => {
  const dest = destination.toLowerCase();

  if (dest.includes("tokyo")) {
    return {
      transport: "Take the Narita Express (N'EX) or Keisei Skyliner from the airport to central Tokyo. Travel time: 60-90 minutes.",
      tip: "Buy a Suica or Pasmo card at the airport for seamless public transport access throughout your trip.",
      simCard: "Purchase a Japan travel SIM card or pocket WiFi at the airport. Many tourists prefer pocket WiFi for unlimited data."
    };
  } else if (dest.includes("london")) {
    return {
      transport: "Take the Heathrow Express to Paddington Station (15 mins) or the Elizabeth Line for a more affordable option (45 mins).",
      tip: "Get an Oyster card or use contactless payment for all public transport. Download Citymapper app for navigation.",
      simCard: "Buy a UK SIM card at the airport or use international roaming. Airport shops offer tourist data packages."
    };
  } else if (dest.includes("paris")) {
    return {
      transport: "Take the RER B train from Charles de Gaulle to central Paris. Travel time: 45-60 minutes. Buy tickets at airport machines.",
      tip: "Be vigilant with your belongings on public transport. Keep valuables in front pockets and bags zipped.",
      simCard: "Purchase a European SIM card at the airport for data access. Many providers offer tourist packages."
    };
  } else if (dest.includes("new york") || dest.includes("nyc")) {
    return {
      transport: "Take the AirTrain to Jamaica Station, then the LIRR or subway to Manhattan. Alternatively, use a yellow cab or rideshare.",
      tip: "Download the Uber or Lyft app before arrival. The official NYC taxi app is Curb for yellow cabs.",
      simCard: "T-Mobile and AT&T offer tourist SIM cards at JFK airport with good coverage across the US."
    };
  } else if (dest.includes("bangkok")) {
    return {
      transport: "Take the Airport Rail Link to Phaya Thai or Makkasan stations. Travel time: 30 minutes. Very affordable and efficient.",
      tip: "Download Grab app (Southeast Asia's Uber) for reliable taxis. Always insist on using the meter for regular taxis.",
      simCard: "AIS and TrueMove offer tourist SIM cards with unlimited data at arrival halls. Very affordable (~$10 for 7 days)."
    };
  } else if (dest.includes("singapore")) {
    return {
      transport: "Take the MRT (Mass Rapid Transit) directly from Changi Airport to the city. Clean, safe, and efficient.",
      tip: "Get an EZ-Link card for public transport. Singapore is extremely safe and easy to navigate as a solo traveler.",
      simCard: "Purchase a Singtel or StarHub tourist SIM card at the airport for excellent 5G coverage citywide."
    };
  } else {
    return {
      transport: "Research airport transfer options in advance. Look for official airport shuttles, trains, or reputable taxi services.",
      tip: "Use official taxi ranks or pre-booked transfers. Download local ride-hailing apps before arrival.",
      simCard: "Buy a local SIM card at the airport arrivals hall for data access and local calls during your trip."
    };
  }
};

const ArrivalCard = ({ origin, destination }: ArrivalCardProps) => {
  const advice = getTransportAdvice(destination);

  return (
    <Card className="border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/5 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2 text-muted-foreground">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>{origin}</span>
            <Plane className="h-4 w-4 text-secondary" />
            <ArrowRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">{destination}</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-heading font-bold text-secondary">
          Touchdown in {destination}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-heading font-semibold text-sm mb-2 text-foreground flex items-center gap-2">
            <Plane className="h-4 w-4 text-accent" />
            Getting to Your Hotel
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {advice.transport}
          </p>
        </div>

        <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: '#EAF0F8' }}>
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <h4 className="font-heading font-semibold text-sm text-foreground">
              Check-in at Hotel
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Standard check-in time is usually 2-3 PM. If arriving early, most hotels will store your luggage while you explore.
          </p>
        </div>

        <Alert className="bg-accent/10 border-accent/30">
          <Info className="h-4 w-4 text-accent" />
          <AlertDescription className="text-sm">
            <div className="font-semibold mb-1 text-foreground">Solo Arrival Tips</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• {advice.simCard}</li>
              <li>• {advice.tip}</li>
              <li>• Share your accommodation details with someone back home for safety.</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ArrivalCard;
