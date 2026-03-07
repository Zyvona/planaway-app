import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RefineRequest {
  currentItinerary: any;
  selectedVibes: string[];
  budget: string;
  destination: string;
  origin?: string;
  days?: string;
  previousData?: any;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { currentItinerary, selectedVibes, budget, destination, origin, days, previousData }: RefineRequest = await req.json();

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const currentYear = new Date().getFullYear();
    const vibesList = selectedVibes.join(", ");

    const prompt = `System Role: You are a real-time travel data engine. You provide accurate, non-hallucinated data for ${currentYear}.

Handling User Options: The user has modified their preferences to prioritize these vibes: ${vibesList}.

Use the previous JSON as context and update the relevant sections to ensure consistency:

Previous Data:
${JSON.stringify(previousData || currentItinerary, null, 2)}

Budget: $${budget}
Destination: ${destination}
${origin ? `Origin: ${origin}` : ''}
${days ? `Duration: ${days} days` : ''}

Update ONLY the itinerary_data section to match the selected vibes: ${vibesList}. For each day, provide TWO activity options:
- Option A should focus on the selected vibes
- Option B should offer an alternative that still aligns with at least one of the vibes

Each activity MUST include:
- Real-world location name
- map_link using https://www.google.com/maps/search/?api=1&query=[Location+Name] (encode spaces as +)
- vibe_chips array matching selected vibes
- intensity_score (1-10)

Return ONLY the updated itinerary_data structure:
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
          "vibe_chips": ["${vibesList.split(", ")[0]}"],
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
  ]
}

Make the activities specific to ${destination}, realistic for ${currentYear}, and aligned with the vibes: ${vibesList}.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`,
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
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
    }

    const geminiData = await geminiResponse.json();
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const refinedData = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ success: true, data: refinedData }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error refining itinerary:", error);
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
