export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      flavours: {
        Row: {
          badges: string[] | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_double: number
          price_single: number
          price_tub: number
          stock_count: number | null
        }
        Insert: {
          badges?: string[] | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_double?: number
          price_single?: number
          price_tub?: number
          stock_count?: number | null
        }
        Update: {
          badges?: string[] | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_double?: number
          price_single?: number
          price_tub?: number
          stock_count?: number | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          customer_address: string | null
          customer_name: string
          customer_phone: string
          gst: number
          id: string
          items: Json
          status: string | null
          subtotal: number
          total: number
        }
        Insert: {
          created_at?: string | null
          customer_address?: string | null
          customer_name: string
          customer_phone: string
          gst?: number
          id?: string
          items?: Json
          status?: string | null
          subtotal?: number
          total?: number
        }
        Update: {
          created_at?: string | null
          customer_address?: string | null
          customer_name?: string
          customer_phone?: string
          gst?: number
          id?: string
          items?: Json
          status?: string | null
          subtotal?: number
          total?: number
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string | null
          id: string
          name: string
          phone: string | null
          role: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          phone?: string | null
          role?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
          status?: string | null
        }
        Relationships: []
      }
      staff_applications: {
        Row: {
          applied_at: string | null
          available_shifts: string | null
          customer_id: string
          experience: string | null
          full_name: string
          id: number
          phone: string
          prior_experience: string | null
          status: string | null
          why_join: string | null
        }
        Insert: {
          applied_at?: string | null
          available_shifts?: string | null
          customer_id: string
          experience?: string | null
          full_name: string
          id?: number
          phone: string
          prior_experience?: string | null
          status?: string | null
          why_join?: string | null
        }
        Update: {
          applied_at?: string | null
          available_shifts?: string | null
          customer_id?: string
          experience?: string | null
          full_name?: string
          id?: number
          phone?: string
          prior_experience?: string | null
          status?: string | null
          why_join?: string | null
        }
        Relationships: []
      }
      staff_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          sender_role: string
          staff_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          sender_role: string
          staff_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          sender_role?: string
          staff_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_messages_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          staff_id: string | null
          status: string | null
          task_title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          staff_id?: string | null
          status?: string | null
          task_title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          staff_id?: string | null
          status?: string | null
          task_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_tasks_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          allowed_apps: Json | null
          apps: Json
          id: number
          instagram_id: string | null
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          allowed_apps?: Json | null
          apps?: Json
          id?: number
          instagram_id?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          allowed_apps?: Json | null
          apps?: Json
          id?: number
          instagram_id?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "owner" | "manager" | "staff" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["owner", "manager", "staff", "customer"],
    },
  },
} as const
