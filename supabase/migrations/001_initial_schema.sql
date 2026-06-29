-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meetings Table
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('thursday', 'sunday')),
  date DATE NOT NULL,
  start TIME NOT NULL,
  end TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Registrations Table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'waitingA', 'waitingB', 'cancelled', 'maybe')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(meeting_id, user_id)
);

-- Attendance Logs Table
CREATE TABLE attendance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_meetings_date ON meetings(date);
CREATE INDEX idx_meetings_type ON meetings(type);
CREATE INDEX idx_registrations_meeting ON registrations(meeting_id);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_attendance_meeting ON attendance_logs(meeting_id);
CREATE INDEX idx_attendance_user ON attendance_logs(user_id);

-- Enable Realtime
ALTER TABLE registrations REPLICA IDENTITY FULL;
ALTER TABLE attendance_logs REPLICA IDENTITY FULL;

-- Set up RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow all for now - adjust based on auth requirements)
CREATE POLICY "Allow all access to users" ON users
  FOR ALL USING (true);

CREATE POLICY "Allow all access to meetings" ON meetings
  FOR ALL USING (true);

CREATE POLICY "Allow all access to registrations" ON registrations
  FOR ALL USING (true);

CREATE POLICY "Allow all access to attendance_logs" ON attendance_logs
  FOR ALL USING (true);
