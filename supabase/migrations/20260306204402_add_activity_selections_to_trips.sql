/*
  # Add activity selections to trips table

  1. Changes
    - Add `selected_vibes` (text[]) column to store user's selected vibe preferences
    - Add `activity_selections` (jsonb) column to store user's chosen activity options per day
  
  2. Schema Details
    - `selected_vibes`: Array of vibe IDs (e.g., ['history', 'foodie', 'adventure'])
    - `activity_selections`: JSON object mapping day numbers to selected option IDs
      Example: {"1": "day1-option-a", "2": "day2-option-b"}
  
  3. Notes
    - Both columns are nullable since they may be populated after initial trip creation
    - This enables persistence of user preferences and activity choices
    - Data can be restored when user returns to view their saved trip
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'selected_vibes'
  ) THEN
    ALTER TABLE trips ADD COLUMN selected_vibes text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'activity_selections'
  ) THEN
    ALTER TABLE trips ADD COLUMN activity_selections jsonb;
  END IF;
END $$;
