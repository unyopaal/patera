// User Types
export interface User {
  id: string;
  name: string;
  created_at: string;
}

// Meeting Types
export type MeetingType = 'thursday' | 'sunday';

export interface Meeting {
  id: string;
  type: MeetingType;
  date: string;
  start: string;
  end: string;
  created_at: string;
}

// Registration Status
export type RegistrationStatus = 'confirmed' | 'waitingA' | 'waitingB' | 'cancelled' | 'maybe';

export interface Registration {
  id: string;
  meeting_id: string;
  user_id: string;
  status: RegistrationStatus;
  created_at: string;
}

// Attendance Log
export type AttendanceAction = 'participated' | 'cancelled' | 'promoted' | 'no_show';

export interface AttendanceLog {
  id: string;
  meeting_id: string;
  user_id: string;
  action: AttendanceAction;
  created_at: string;
}

// Extended Types
export interface RegistrationWithUser extends Registration {
  user: User;
}

export interface MeetingWithRegistrations extends Meeting {
  registrations: RegistrationWithUser[];
}