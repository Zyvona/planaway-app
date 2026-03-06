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
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { currentItinerary, selectedVibes, budget, destination }: RefineRequest = await req.json();

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const vibesList = selectedVibes.join(", ");
    const prompt = `You are a travel planning assistant. The user wants to prioritize these vibes: ${vibesList}.

Current itinerary for ${destination}:
${JSON.stringify(currentItinerary, null, 2)}

Budget: $${budget}

Update the existing itinerary to match these preferences while staying within the budget. For each day, provide TWO activity options so the user can choose their path:
- Option A should focus on the selected vibes
- Option B should offer an alternative that still aligns with at least one of the vibes

Return a JSON object with this exact structure:
{
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "id": "day1-option-a",
          "title": "Activity name",
          "description": "Brief description",
          "duration": "2-3 hours",
          "cost": "$20-40"
        },
        {
          "id": "day1-option-b",
          "title": "Alternative activity",
          "description": "Brief description",
          "duration": "2-3 hours",
          "cost": "$15-30"
        }
      ]
    }
  ]
}

Make the activities specific to ${destination} and realistic for a solo traveler.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
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

    const refinedItinerary = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ success: true, itinerary: refinedItinerary }), {
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
