export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      meetings: {
        Row: {
          id: string
          type: 'thursday' | 'sunday'
          date: string
          start: string
          end: string
          created_at: string
        }
        Insert: {
          id?: string
          type: 'thursday' | 'sunday'
          date: string
          start: string
          end: string
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'thursday' | 'sunday'
          date?: string
          start?: string
          end?: string
          created_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          meeting_id: string
          user_id: string
          status: 'confirmed' | 'waitingA' | 'waitingB' | 'cancelled' | 'maybe'
          created_at: string
        }
        Insert: {
          id?: string
          meeting_id: string
          user_id: string
          status: 'confirmed' | 'waitingA' | 'waitingB' | 'cancelled' | 'maybe'
          created_at?: string
        }
        Update: {
          id?: string
          meeting_id?: string
          user_id?: string
          status?: 'confirmed' | 'waitingA' | 'waitingB' | 'cancelled' | 'maybe'
          created_at?: string
        }
      }
      attendance_logs: {
        Row: {
          id: string
          meeting_id: string
          user_id: string
          action: string
          created_at: string
        }
        Insert: {
          id?: string
          meeting_id: string
          user_id: string
          action: string
          created_at?: string
        }
        Update: {
          id?: string
          meeting_id?: string
          user_id?: string
          action?: string
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
