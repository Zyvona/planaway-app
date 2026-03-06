/*
  # Create trips table

  1. New Tables
    - `trips`
      - `id` (uuid, primary key)
      - `origin` (text, city of departure)
      - `destination` (text, destination city)
      - `origin_lat` (numeric, origin latitude)
      - `origin_lng` (numeric, origin longitude)
      - `destination_lat` (numeric, destination latitude)
      - `destination_lng` (numeric, destination longitude)
      - `budget` (numeric, total budget)
      - `budget_level` (text, budget tier: Economy, Standard, Luxury)
      - `days` (integer, number of days)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `trips` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public insert access (for demo purposes)
*/

CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origin text NOT NULL,
  destination text NOT NULL,
  origin_lat numeric,
  origin_lng numeric,
  destination_lat numeric,
  destination_lng numeric,
  budget numeric NOT NULL,
  budget_level text NOT NULL DEFAULT 'Standard',
  days integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to trips"
  ON trips
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to trips"
  ON trips
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to trips"
  ON trips
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to trips"
  ON trips
  FOR DELETE
  TO public
  USING (true);
