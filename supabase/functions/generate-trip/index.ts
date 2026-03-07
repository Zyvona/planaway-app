import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Hardened CORS headers for Supabase Edge Functions
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface GenerateTripRequest {
  origin: string;
  destination: string;
  budget: string;
  days: string;
}

Deno.serve(async (req) => {
  // Fix the Resource Loading Error by handling preflight correctly
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      status: 200, // Explicitly return 200
      headers: corsHeaders 
    });
  }

  try {
    const { origin, destination, budget, days }: GenerateTripRequest = await req.json();
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

    if (!geminiApiKey) throw new Error("GEMINI_API_KEY not configured");

    const currentYear = 2026; // Locked to current project year
    const duration_days = parseInt(days);

    // Optimized prompt for Gemini 3 Flash
    const prompt = `Generate a structured JSON travel itinerary from ${origin} to ${destination} for ${duration_days} days with a total budget of $${budget}. 
    Return ONLY raw JSON following the schema: {
      "itinerary_data": [{"day": number, "activities": [{"id": string, "title": string, "desc": string, "vibe_chips": string[]}]}],
      "budget_data": {"flight_estimate": number, "tier_comparison": {"economy": {"total": number}, "balanced": {"total": number}, "luxury": {"total": number}}},
      "safety_data": {"score": number, "emergency_contacts": [{"service": string, "number": string}]}
    }`;

    // Updated to Gemini 3 Flash for speed and reliability
    const geminiResponse = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { 
        response_mime_type: "application/json", // This is the key feature of Gemini 3 Flash
        temperature: 0.7 
      }
    }),
  }
);


    if (!geminiResponse.ok) throw new Error(`Gemini Error: ${geminiResponse.statusText}`);

    const geminiData = await geminiResponse.json();
    const tripData = JSON.parse(geminiData.candidates[0].content.parts[0].text);

    return new Response(JSON.stringify({ success: true, data: tripData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Function Error:", error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});