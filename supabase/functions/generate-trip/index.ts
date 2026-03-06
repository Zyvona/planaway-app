import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GenerateTripRequest {
  origin: string;
  destination: string;
  budget: string;
  days: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { origin, destination, budget, days }: GenerateTripRequest = await req.json();

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const currentYear = new Date().getFullYear();
    const duration_days = parseInt(days);

    const prompt = `System Role: You are a real-time travel data engine. You provide accurate, non-hallucinated data for ${currentYear}.

The Mission: Generate a trip from ${origin} to ${destination} for ${duration_days} days.

Constraints for Data Integrity:

1. Itinerary: Each activity MUST include a real-world location name. Include a map_link using https://www.google.com/maps/search/?api=1&query=[Location+Name] (encode spaces as +).

2. Flights: Provide a flight_estimate based on current ${currentYear} market averages for this route (${origin} to ${destination}). Include a booking_link to https://www.google.com/travel/flights?q=flights+from+${origin.replace(/\s/g, '+')}+to+${destination.replace(/\s/g, '+')}.

3. Smart Features: Include vibe_chips (e.g., 'Hidden Gem', 'Crowd-Free', 'Cultural', 'Adventure', 'Relaxation', 'Foodie') and intensity_score (1-10 scale).

4. Value Optimizer: Provide a tier_comparison object with specific price points for Economy, Balanced, and Luxury tiers.

Output Structure (Raw JSON only):
{
  "itinerary_data": [
    {
      "day": 1,
      "activities": [
        {
          "id": "day1-option-a",
          "time": "10:00",
          "title": "Activity title",
          "desc": "Activity description",
          "location": "Specific location name",
          "map_link": "https://www.google.com/maps/search/?api=1&query=...",
          "duration": "2-3 hours",
          "cost": "$20-40",
          "vibe_chips": ["Hidden Gem", "Cultural"],
          "intensity_score": 5
        },
        {
          "id": "day1-option-b",
          "time": "10:00",
          "title": "Alternative activity",
          "desc": "Alternative description",
          "location": "Specific location name",
          "map_link": "https://www.google.com/maps/search/?api=1&query=...",
          "duration": "2-3 hours",
          "cost": "$15-30",
          "vibe_chips": ["Relaxation"],
          "intensity_score": 3
        }
      ]
    }
  ],
  "budget_data": {
    "flight_estimate": 450,
    "daily_allowance": ${Math.round(parseFloat(budget) / duration_days)},
    "tier_comparison": {
      "economy": { "total": 0, "accommodation": 0, "food": 0, "activities": 0 },
      "balanced": { "total": 0, "accommodation": 0, "food": 0, "activities": 0 },
      "luxury": { "total": 0, "accommodation": 0, "food": 0, "activities": 0 }
    },
    "booking_link": "https://www.google.com/travel/flights?q=flights+from+${origin.replace(/\s/g, '+')}+to+${destination.replace(/\s/g, '+')}",
    "categories": [
      { "name": "Accommodation", "amount": ${parseFloat(budget) * 0.4} },
      { "name": "Food", "amount": ${parseFloat(budget) * 0.3} },
      { "name": "Activities", "amount": ${parseFloat(budget) * 0.2} },
      { "name": "Transport", "amount": ${parseFloat(budget) * 0.1} }
    ]
  },
  "safety_data": {
    "score": 7,
    "emergency_contacts": [
      { "service": "Emergency", "number": "911" },
      { "service": "US Embassy", "number": "+1-xxx-xxx-xxxx" }
    ],
    "tips": [
      "Keep copies of important documents",
      "Share your itinerary with someone",
      "Stay aware of your surroundings"
    ]
  },
  "market_note": "Prices reflect ${currentYear} market averages for ${destination}. Book early for best rates."
}

Generate realistic ${currentYear} data for ${destination}. Each day should have 2 activity options. Make activities specific and include real locations.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Gemini API error: ${geminiResponse.statusText} - ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const tripData = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ success: true, data: tripData }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating trip:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
