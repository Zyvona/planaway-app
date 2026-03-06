/*
  # Add JSON data columns to trips table

  1. Changes
    - Add `itinerary_data` (jsonb) column to store daily itinerary information
    - Add `budget_data` (jsonb) column to store budget breakdown details
    - Add `safety_data` (jsonb) column to store safety tips and recommendations
  
  2. Notes
    - Using JSONB for efficient querying and indexing
    - All columns are nullable since they may be populated after trip creation
    - Data will be stored as JSON objects from the AI-generated content
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'itinerary_data'
  ) THEN
    ALTER TABLE trips ADD COLUMN itinerary_data jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'budget_data'
  ) THEN
    ALTER TABLE trips ADD COLUMN budget_data jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'safety_data'
  ) THEN
    ALTER TABLE trips ADD COLUMN safety_data jsonb;
  END IF;
END $$;