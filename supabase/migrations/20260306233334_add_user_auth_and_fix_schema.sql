/*
  # Add User Authentication and Fix Schema

  1. Schema Changes
    - Add user_id column to trips table (foreign key to auth.users)
    - Ensure budget_limit and duration_days columns exist
    - Add origin_lat, origin_lng, destination_lat, destination_lng for coordinates
    - Add market_note column for dynamic pricing information
    - Add RLS policies for user-specific data access

  2. Security
    - Enable RLS on trips table
    - Add policies for authenticated users to:
      - Read only their own trips
      - Insert trips with their own user_id
      - Update only their own trips
      - Delete only their own trips
*/

-- Add user_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE trips ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Rename budget to budget_limit if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'budget'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'budget_limit'
  ) THEN
    ALTER TABLE trips RENAME COLUMN budget TO budget_limit;
  END IF;
END $$;

-- Rename days to duration_days if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'days'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'duration_days'
  ) THEN
    ALTER TABLE trips RENAME COLUMN days TO duration_days;
  END IF;
END $$;

-- Add coordinate columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'origin_lat'
  ) THEN
    ALTER TABLE trips ADD COLUMN origin_lat double precision;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'origin_lng'
  ) THEN
    ALTER TABLE trips ADD COLUMN origin_lng double precision;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'destination_lat'
  ) THEN
    ALTER TABLE trips ADD COLUMN destination_lat double precision;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'destination_lng'
  ) THEN
    ALTER TABLE trips ADD COLUMN destination_lng double precision;
  END IF;
END $$;

-- Add market_note column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trips' AND column_name = 'market_note'
  ) THEN
    ALTER TABLE trips ADD COLUMN market_note text;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own trips" ON trips;
DROP POLICY IF EXISTS "Users can insert own trips" ON trips;
DROP POLICY IF EXISTS "Users can update own trips" ON trips;
DROP POLICY IF EXISTS "Users can delete own trips" ON trips;

-- Create policies for authenticated users
CREATE POLICY "Users can view own trips"
  ON trips FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trips"
  ON trips FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips"
  ON trips FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips"
  ON trips FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);