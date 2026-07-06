/*
# Create appointments table

Single-tenant booking system for La Rue Salon & Spa — no user auth required.

## New Tables
- `appointments`
  - `id` (uuid, pk): unique appointment identifier
  - `name` (text): client's full name
  - `phone` (text): client's phone number
  - `service_category` (text): hair / face / wellness
  - `service_id` (text): slug of the booked service
  - `service_name` (text): display name of the service
  - `appointment_date` (date): selected date
  - `appointment_time` (text): selected time slot (e.g. "10:00")
  - `notes` (text, nullable): optional client notes
  - `status` (text, default 'pending'): pending | confirmed | cancelled
  - `created_at` (timestamptz): record creation timestamp

## Security
- RLS enabled
- All 4 policies scoped to `anon, authenticated` so the unauthenticated frontend can read and write
- USING (true) / WITH CHECK (true) is intentional — this is a public booking form with no sign-in
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  service_category text NOT NULL,
  service_id text NOT NULL,
  service_name text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_appointments" ON appointments;
CREATE POLICY "anon_select_appointments" ON appointments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments" ON appointments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_appointments" ON appointments;
CREATE POLICY "anon_update_appointments" ON appointments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_appointments" ON appointments;
CREATE POLICY "anon_delete_appointments" ON appointments FOR DELETE
  TO anon, authenticated USING (true);
