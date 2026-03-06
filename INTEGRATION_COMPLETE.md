# Supabase & Gemini Integration Complete

## Database Schema

All trips are stored in Supabase with the following columns:
- `user_id` (uuid) - Foreign key to auth.users, enforced by RLS
- `origin` (text) - Starting location
- `destination` (text) - Target location
- `budget_limit` (numeric) - Total budget in dollars
- `duration_days` (integer) - Number of days for the trip
- `origin_lat`, `origin_lng` (double precision) - Origin coordinates
- `destination_lat`, `destination_lng` (double precision) - Destination coordinates
- `itinerary_data` (jsonb) - AI-generated daily itinerary with activities
- `budget_data` (jsonb) - Budget breakdown with Value Optimizer tiers
- `safety_data` (jsonb) - Safety score, tips, and emergency contacts
- `selected_vibes` (text[]) - User-selected vibe preferences
- `activity_selections` (jsonb) - User's activity choices per day
- `market_note` (text) - Dynamic pricing information
- `created_at` (timestamptz) - Timestamp of creation

## Authentication Flow

1. **Unauthenticated Users**: Redirected to `/auth` page with Google sign-in
2. **Authenticated Users**: Full access to:
   - Trip planning form (Index page)
   - Results viewing and refinement
   - Past expeditions gallery

## Data Flow

### Creating a New Trip
1. User fills out OnboardingForm with origin, destination, budget_limit, duration_days
2. Form submits to Index page handler
3. Navigates to Results page with form data
4. ResultsTabs calls Gemini edge function to generate trip data
5. Trip is saved to Supabase using `saveTrip()` with authenticated user_id

### Loading Past Trips
1. PastExpeditions component calls `getTrips()`
2. Supabase query filters by authenticated user_id
3. Results displayed with proper JSONB hydration
4. Clicking a trip navigates to Results page with pre-loaded data

### Viewing Trip Details
1. Results page receives either new form data or loadedTripData
2. If loadedTripData exists, skip AI generation and use stored JSONB
3. Itinerary_data, budget_data, and safety_data render from database
4. User can refine with vibes or change activity selections

## Security (RLS Policies)

All database operations are secured with Row Level Security:
- **SELECT**: Users can only view their own trips
- **INSERT**: New trips automatically tagged with user_id
- **UPDATE**: Users can only modify their own trips
- **DELETE**: Users can only delete their own trips

## AI Integration (Gemini 2.5 Flash)

Edge function at `/functions/v1/generate-trip`:
- Accepts: origin, destination, budget, days
- Returns: Complete trip object with itinerary_data, budget_data, safety_data
- Includes Value Optimizer tiers (budget/standard/luxury)
- Dynamic emergency contacts and safety score

## Design Theme

Colors applied throughout:
- **Antique Cream (#FDFBF7)**: Card backgrounds (bg-card)
- **Deep Navy (#1A3A5C)**: Primary brand color (bg-primary)
- **Terracotta (#D9653B)**: Secondary accent (bg-secondary)
- **Warm Gold (#D9A511)**: Highlights (bg-accent)
- **Forest Green (#396952)**: Success states (bg-success)

## Key Files

- `/src/lib/supabase.ts` - Database client, auth functions, saveTrip/getTrips
- `/src/components/OnboardingForm.tsx` - Main trip input form
- `/src/components/ResultsTabs.tsx` - AI-generated results display
- `/src/components/PastExpeditions.tsx` - User's trip history
- `/src/pages/Auth.tsx` - Google OAuth landing page
- `/src/App.tsx` - Auth state management and route protection
- `/supabase/functions/generate-trip/index.ts` - Gemini AI edge function

## No Mock Data

All localStorage and in-memory mock data has been removed. The application exclusively uses:
- Supabase for data persistence
- Supabase Auth for authentication
- Gemini AI for trip generation
