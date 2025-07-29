export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      access_codes: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          department_code: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          login_attempts: number | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          department_code?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          login_attempts?: number | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          department_code?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          login_attempts?: number | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_codes_department_code_fkey"
            columns: ["department_code"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["code"]
          },
        ]
      }
      ai_insights: {
        Row: {
          action_required: boolean
          ai_model_used: string | null
          category: string
          confidence: number
          created_at: string
          data: Json
          description: string
          expires_at: string | null
          id: string
          impact: string
          suggested_actions: string[] | null
          title: string
          type: string
        }
        Insert: {
          action_required?: boolean
          ai_model_used?: string | null
          category: string
          confidence: number
          created_at?: string
          data?: Json
          description: string
          expires_at?: string | null
          id?: string
          impact: string
          suggested_actions?: string[] | null
          title: string
          type: string
        }
        Update: {
          action_required?: boolean
          ai_model_used?: string | null
          category?: string
          confidence?: number
          created_at?: string
          data?: Json
          description?: string
          expires_at?: string | null
          id?: string
          impact?: string
          suggested_actions?: string[] | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_insights_ai_model_used_fkey"
            columns: ["ai_model_used"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_models: {
        Row: {
          api_key: string | null
          capabilities: string[]
          category: string
          configuration: Json
          cost_per_request: number
          created_at: string
          endpoint: string
          id: string
          is_active: boolean
          model_type: string
          name: string
          provider: string
          rate_limit: Json
          supported_languages: string[]
          updated_at: string
          usage: Json
        }
        Insert: {
          api_key?: string | null
          capabilities?: string[]
          category: string
          configuration?: Json
          cost_per_request?: number
          created_at?: string
          endpoint: string
          id: string
          is_active?: boolean
          model_type: string
          name: string
          provider: string
          rate_limit?: Json
          supported_languages?: string[]
          updated_at?: string
          usage?: Json
        }
        Update: {
          api_key?: string | null
          capabilities?: string[]
          category?: string
          configuration?: Json
          cost_per_request?: number
          created_at?: string
          endpoint?: string
          id?: string
          is_active?: boolean
          model_type?: string
          name?: string
          provider?: string
          rate_limit?: Json
          supported_languages?: string[]
          updated_at?: string
          usage?: Json
        }
        Relationships: []
      }
      ai_risk_analysis: {
        Row: {
          ai_suggested_category: string | null
          analysis_result: Json | null
          analysis_status: string | null
          category_mismatch: boolean | null
          confidence_score: number | null
          created_at: string | null
          id: string
          incident_id: string | null
          original_category: string
          processed_at: string | null
          recommendations: Json | null
          risk_factors: Json | null
        }
        Insert: {
          ai_suggested_category?: string | null
          analysis_result?: Json | null
          analysis_status?: string | null
          category_mismatch?: boolean | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          incident_id?: string | null
          original_category: string
          processed_at?: string | null
          recommendations?: Json | null
          risk_factors?: Json | null
        }
        Update: {
          ai_suggested_category?: string | null
          analysis_result?: Json | null
          analysis_status?: string | null
          category_mismatch?: boolean | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          incident_id?: string | null
          original_category?: string
          processed_at?: string | null
          recommendations?: Json | null
          risk_factors?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_risk_analysis_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          author_access_code_id: string | null
          author_name: string
          content: string
          created_at: string
          department_code: string | null
          expires_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_public: boolean | null
          priority: number | null
          title: string
          updated_at: string
        }
        Insert: {
          author_access_code_id?: string | null
          author_name: string
          content: string
          created_at?: string
          department_code?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_public?: boolean | null
          priority?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          author_access_code_id?: string | null
          author_name?: string
          content?: string
          created_at?: string
          department_code?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_public?: boolean | null
          priority?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      announcements_sidebar: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          display_order: number
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean
          link_url: string | null
          show_on_dashboard: boolean
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          display_order?: number
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          link_url?: string | null
          show_on_dashboard?: boolean
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          display_order?: number
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          link_url?: string | null
          show_on_dashboard?: boolean
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      api_endpoints: {
        Row: {
          active: boolean
          ai_model_id: string | null
          created_at: string
          error_rate: number | null
          headers: Json
          health_status: string | null
          id: string
          last_health_check: string | null
          method: string
          n8n_workflow_id: string | null
          name: string
          response_time: number | null
          timeout: number
          updated_at: string
          url: string
        }
        Insert: {
          active?: boolean
          ai_model_id?: string | null
          created_at?: string
          error_rate?: number | null
          headers?: Json
          health_status?: string | null
          id?: string
          last_health_check?: string | null
          method: string
          n8n_workflow_id?: string | null
          name: string
          response_time?: number | null
          timeout?: number
          updated_at?: string
          url: string
        }
        Update: {
          active?: boolean
          ai_model_id?: string | null
          created_at?: string
          error_rate?: number | null
          headers?: Json
          health_status?: string | null
          id?: string
          last_health_check?: string | null
          method?: string
          n8n_workflow_id?: string | null
          name?: string
          response_time?: number | null
          timeout?: number
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_endpoints_ai_model_id_fkey"
            columns: ["ai_model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_endpoints_n8n_workflow_id_fkey"
            columns: ["n8n_workflow_id"]
            isOneToOne: false
            referencedRelation: "n8n_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      automated_reports: {
        Row: {
          created_at: string
          created_by_access_code_id: string | null
          department_code: string
          filters: Json | null
          format: string
          id: string
          is_active: boolean | null
          recipient_emails: string[]
          report_name: string
          report_type: string
          schedule_day: number | null
          schedule_frequency: string
          schedule_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_access_code_id?: string | null
          department_code: string
          filters?: Json | null
          format?: string
          id?: string
          is_active?: boolean | null
          recipient_emails: string[]
          report_name: string
          report_type?: string
          schedule_day?: number | null
          schedule_frequency: string
          schedule_time?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_access_code_id?: string | null
          department_code?: string
          filters?: Json | null
          format?: string
          id?: string
          is_active?: boolean | null
          recipient_emails?: string[]
          report_name?: string
          report_type?: string
          schedule_day?: number | null
          schedule_frequency?: string
          schedule_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      automation_workflows: {
        Row: {
          actions: Json
          ai_models_used: string[] | null
          created_at: string
          description: string
          execution_count: number
          id: string
          is_active: boolean
          last_execution: string | null
          n8n_workflow_id: string | null
          name: string
          trigger: Json
        }
        Insert: {
          actions: Json
          ai_models_used?: string[] | null
          created_at?: string
          description: string
          execution_count?: number
          id?: string
          is_active?: boolean
          last_execution?: string | null
          n8n_workflow_id?: string | null
          name: string
          trigger: Json
        }
        Update: {
          actions?: Json
          ai_models_used?: string[] | null
          created_at?: string
          description?: string
          execution_count?: number
          id?: string
          is_active?: boolean
          last_execution?: string | null
          n8n_workflow_id?: string | null
          name?: string
          trigger?: Json
        }
        Relationships: [
          {
            foreignKeyName: "automation_workflows_n8n_workflow_id_fkey"
            columns: ["n8n_workflow_id"]
            isOneToOne: false
            referencedRelation: "n8n_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      brokers: {
        Row: {
          ai_insights: Json | null
          certification_level: number
          commission_rate: number
          created_at: string
          drivers_referred: number
          id: string
          is_active: boolean
          level: Database["public"]["Enums"]["broker_level"]
          parent_broker_id: string | null
          performance_score: number
          territory: string[]
          total_earnings: number
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_insights?: Json | null
          certification_level?: number
          commission_rate?: number
          created_at?: string
          drivers_referred?: number
          id?: string
          is_active?: boolean
          level: Database["public"]["Enums"]["broker_level"]
          parent_broker_id?: string | null
          performance_score?: number
          territory: string[]
          total_earnings?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_insights?: Json | null
          certification_level?: number
          commission_rate?: number
          created_at?: string
          drivers_referred?: number
          id?: string
          is_active?: boolean
          level?: Database["public"]["Enums"]["broker_level"]
          parent_broker_id?: string | null
          performance_score?: number
          territory?: string[]
          total_earnings?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brokers_parent_broker_id_fkey"
            columns: ["parent_broker_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brokers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      config_rules: {
        Row: {
          active: boolean
          ai_model_config: Json | null
          conditions: Json
          created_at: string
          created_by: string
          description: string
          id: string
          name: string
          priority: number
          region: string | null
          scope: string
          type: string
          updated_at: string
          user_type: string[] | null
          value: Json
        }
        Insert: {
          active?: boolean
          ai_model_config?: Json | null
          conditions?: Json
          created_at?: string
          created_by: string
          description: string
          id?: string
          name: string
          priority?: number
          region?: string | null
          scope: string
          type: string
          updated_at?: string
          user_type?: string[] | null
          value: Json
        }
        Update: {
          active?: boolean
          ai_model_config?: Json | null
          conditions?: Json
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          name?: string
          priority?: number
          region?: string | null
          scope?: string
          type?: string
          updated_at?: string
          user_type?: string[] | null
          value?: Json
        }
        Relationships: []
      }
      contacts: {
        Row: {
          address: string | null
          age: number | null
          created_at: string
          created_by: string
          id: string
          name: string
          note: string | null
          patient_id: string
          phone: string | null
          relationship: string | null
          result: string | null
          screening_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          age?: number | null
          created_at?: string
          created_by: string
          id?: string
          name: string
          note?: string | null
          patient_id: string
          phone?: string | null
          relationship?: string | null
          result?: string | null
          screening_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          age?: number | null
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          note?: string | null
          patient_id?: string
          phone?: string | null
          relationship?: string | null
          result?: string | null
          screening_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          code: string
          created_at: string | null
          group_category: string
          id: number
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          group_category: string
          id?: number
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          group_category?: string
          id?: number
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      disease_investigations: {
        Row: {
          ai_generated_report: string | null
          created_at: string
          disease_type: string
          form_data: Json
          hospital_code: string
          id: string
          investigation_date: string
          investigation_number: string
          investigator_name: string
          onset_date: string | null
          patient_address: string | null
          patient_age: number | null
          patient_gender: string | null
          patient_name: string
          status: string
          symptoms: Json | null
          updated_at: string
        }
        Insert: {
          ai_generated_report?: string | null
          created_at?: string
          disease_type: string
          form_data?: Json
          hospital_code: string
          id?: string
          investigation_date?: string
          investigation_number: string
          investigator_name: string
          onset_date?: string | null
          patient_address?: string | null
          patient_age?: number | null
          patient_gender?: string | null
          patient_name: string
          status?: string
          symptoms?: Json | null
          updated_at?: string
        }
        Update: {
          ai_generated_report?: string | null
          created_at?: string
          disease_type?: string
          form_data?: Json
          hospital_code?: string
          id?: string
          investigation_date?: string
          investigation_number?: string
          investigator_name?: string
          onset_date?: string | null
          patient_address?: string | null
          patient_age?: number | null
          patient_gender?: string | null
          patient_name?: string
          status?: string
          symptoms?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      driver_safety: {
        Row: {
          ai_analysis: Json
          alertness_score: number
          created_at: string
          driver_id: string
          emergency_events: Json
          fatigue_level: number
          id: string
          ride_id: string | null
          route_deviations: number
          speed_violations: number
        }
        Insert: {
          ai_analysis?: Json
          alertness_score?: number
          created_at?: string
          driver_id: string
          emergency_events?: Json
          fatigue_level?: number
          id?: string
          ride_id?: string | null
          route_deviations?: number
          speed_violations?: number
        }
        Update: {
          ai_analysis?: Json
          alertness_score?: number
          created_at?: string
          driver_id?: string
          emergency_events?: Json
          fatigue_level?: number
          id?: string
          ride_id?: string | null
          route_deviations?: number
          speed_violations?: number
        }
        Relationships: [
          {
            foreignKeyName: "driver_safety_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_safety_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      epidemiology_forms: {
        Row: {
          created_at: string
          created_by: string | null
          form_data: Json
          form_name: string
          form_type: string
          hospital_code: string | null
          id: string
          is_active: boolean
          is_template: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          form_data?: Json
          form_name: string
          form_type: string
          hospital_code?: string | null
          id?: string
          is_active?: boolean
          is_template?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          form_data?: Json
          form_name?: string
          form_type?: string
          hospital_code?: string | null
          id?: string
          is_active?: boolean
          is_template?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      file_uploads: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          is_public: boolean
          original_name: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          is_public?: boolean
          original_name: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          is_public?: boolean
          original_name?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      incident_logs: {
        Row: {
          action: string
          id: string
          incident_id: string | null
          new_values: Json | null
          old_values: Json | null
          performed_at: string | null
          performed_by: string | null
        }
        Insert: {
          action: string
          id?: string
          incident_id?: string | null
          new_values?: Json | null
          old_values?: Json | null
          performed_at?: string | null
          performed_by?: string | null
        }
        Update: {
          action?: string
          id?: string
          incident_id?: string | null
          new_values?: Json | null
          old_values?: Json | null
          performed_at?: string | null
          performed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incident_logs_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          affected_persons: number | null
          corrective_actions: string | null
          created_at: string | null
          department_code: string
          department_name: string
          google_sheets_row: number | null
          id: string
          image_urls: string[] | null
          immediate_actions_taken: string | null
          incident_description: string
          incident_number: string
          incident_type: string
          investigation_notes: string | null
          location_details: string | null
          reported_by: string | null
          reporter_contact: string | null
          reporter_name: string
          risk_level: string
          status: string | null
          sync_to_sheets: boolean | null
          updated_at: string | null
        }
        Insert: {
          affected_persons?: number | null
          corrective_actions?: string | null
          created_at?: string | null
          department_code: string
          department_name: string
          google_sheets_row?: number | null
          id?: string
          image_urls?: string[] | null
          immediate_actions_taken?: string | null
          incident_description: string
          incident_number: string
          incident_type: string
          investigation_notes?: string | null
          location_details?: string | null
          reported_by?: string | null
          reporter_contact?: string | null
          reporter_name: string
          risk_level: string
          status?: string | null
          sync_to_sheets?: boolean | null
          updated_at?: string | null
        }
        Update: {
          affected_persons?: number | null
          corrective_actions?: string | null
          created_at?: string | null
          department_code?: string
          department_name?: string
          google_sheets_row?: number | null
          id?: string
          image_urls?: string[] | null
          immediate_actions_taken?: string | null
          incident_description?: string
          incident_number?: string
          incident_type?: string
          investigation_notes?: string | null
          location_details?: string | null
          reported_by?: string | null
          reporter_contact?: string | null
          reporter_name?: string
          risk_level?: string
          status?: string | null
          sync_to_sheets?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incidents_department_code_fkey"
            columns: ["department_code"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["code"]
          },
        ]
      }
      line_users: {
        Row: {
          access_code_id: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          line_user_id: string
          picture_url: string | null
          updated_at: string | null
        }
        Insert: {
          access_code_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          line_user_id: string
          picture_url?: string | null
          updated_at?: string | null
        }
        Update: {
          access_code_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          line_user_id?: string
          picture_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "line_users_access_code_id_fkey"
            columns: ["access_code_id"]
            isOneToOne: false
            referencedRelation: "access_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      make_scenarios: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          trigger_conditions: Json
          updated_at: string
          webhook_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          trigger_conditions?: Json
          updated_at?: string
          webhook_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          trigger_conditions?: Json
          updated_at?: string
          webhook_url?: string
        }
        Relationships: []
      }
      messaging_platforms: {
        Row: {
          ai_chatbot_config: Json | null
          analytics: Json
          configuration: Json
          created_at: string
          display_name: string
          features: string[]
          id: string
          is_active: boolean
          last_sync: string | null
          n8n_workflow_id: string | null
          name: string
          regions: string[]
          updated_at: string
        }
        Insert: {
          ai_chatbot_config?: Json | null
          analytics?: Json
          configuration?: Json
          created_at?: string
          display_name: string
          features?: string[]
          id?: string
          is_active?: boolean
          last_sync?: string | null
          n8n_workflow_id?: string | null
          name: string
          regions?: string[]
          updated_at?: string
        }
        Update: {
          ai_chatbot_config?: Json | null
          analytics?: Json
          configuration?: Json
          created_at?: string
          display_name?: string
          features?: string[]
          id?: string
          is_active?: boolean
          last_sync?: string | null
          n8n_workflow_id?: string | null
          name?: string
          regions?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messaging_platforms_n8n_workflow_id_fkey"
            columns: ["n8n_workflow_id"]
            isOneToOne: false
            referencedRelation: "n8n_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      my_spatial_data: {
        Row: {
          description: string | null
          geom: unknown | null
          id: number
        }
        Insert: {
          description?: string | null
          geom?: unknown | null
          id?: never
        }
        Update: {
          description?: string | null
          geom?: unknown | null
          id?: never
        }
        Relationships: []
      }
      n8n_workflows: {
        Row: {
          ai_models_used: string[]
          average_execution_time: number
          connected_systems: string[]
          created_at: string
          description: string
          error_count: number
          execution_count: number
          id: string
          is_active: boolean
          last_execution: string | null
          name: string
          success_rate: number
          trigger_config: Json
          trigger_type: string
          updated_at: string
          webhook_url: string
          workflow_id: string
        }
        Insert: {
          ai_models_used?: string[]
          average_execution_time?: number
          connected_systems?: string[]
          created_at?: string
          description: string
          error_count?: number
          execution_count?: number
          id?: string
          is_active?: boolean
          last_execution?: string | null
          name: string
          success_rate?: number
          trigger_config?: Json
          trigger_type: string
          updated_at?: string
          webhook_url: string
          workflow_id: string
        }
        Update: {
          ai_models_used?: string[]
          average_execution_time?: number
          connected_systems?: string[]
          created_at?: string
          description?: string
          error_count?: number
          execution_count?: number
          id?: string
          is_active?: boolean
          last_execution?: string | null
          name?: string
          success_rate?: number
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string
          webhook_url?: string
          workflow_id?: string
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          created_at: string | null
          created_by: string | null
          expiry_days: number | null
          expiry_enabled: boolean | null
          id: string
          low_stock_enabled: boolean | null
          telegram_chat_id: string | null
          telegram_enabled: boolean | null
          telegram_webhook: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          expiry_days?: number | null
          expiry_enabled?: boolean | null
          id?: string
          low_stock_enabled?: boolean | null
          telegram_chat_id?: string | null
          telegram_enabled?: boolean | null
          telegram_webhook?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          expiry_days?: number | null
          expiry_enabled?: boolean | null
          id?: string
          low_stock_enabled?: boolean | null
          telegram_chat_id?: string | null
          telegram_enabled?: boolean | null
          telegram_webhook?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          customer_phone: string
          id: string
          is_read: boolean | null
          message: string
          taxi_id: string
          taxi_request_id: string
        }
        Insert: {
          created_at?: string
          customer_phone: string
          id?: string
          is_read?: boolean | null
          message: string
          taxi_id: string
          taxi_request_id: string
        }
        Update: {
          created_at?: string
          customer_phone?: string
          id?: string
          is_read?: boolean | null
          message?: string
          taxi_id?: string
          taxi_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_taxi_id_fkey"
            columns: ["taxi_id"]
            isOneToOne: false
            referencedRelation: "taxis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_taxi_request_id_fkey"
            columns: ["taxi_request_id"]
            isOneToOne: false
            referencedRelation: "taxi_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_registrations: {
        Row: {
          birth_date: string
          citizen_id: string
          created_at: string
          gender: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          birth_date: string
          citizen_id: string
          created_at?: string
          gender: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          birth_date?: string
          citizen_id?: string
          created_at?: string
          gender?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          barcode: string | null
          category: string
          cost: number | null
          created_at: string | null
          created_by: string | null
          current_stock: number
          expiry_date: string | null
          id: string
          last_updated: string | null
          location: string | null
          name: string
          price: number | null
          reorder_point: number
          supplier: string | null
          updated_at: string | null
        }
        Insert: {
          barcode?: string | null
          category: string
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          current_stock?: number
          expiry_date?: string | null
          id?: string
          last_updated?: string | null
          location?: string | null
          name: string
          price?: number | null
          reorder_point?: number
          supplier?: string | null
          updated_at?: string | null
        }
        Update: {
          barcode?: string | null
          category?: string
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          current_stock?: number
          expiry_date?: string | null
          id?: string
          last_updated?: string | null
          location?: string | null
          name?: string
          price?: number | null
          reorder_point?: number
          supplier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      rides: {
        Row: {
          ai_analysis: Json | null
          broker_id: string | null
          created_at: string
          destination: Json
          distance: number
          driver_id: string | null
          duration: number
          estimated_arrival: string | null
          fare: number
          id: string
          is_recurring: boolean
          passenger_id: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["payment_status"]
          pickup_location: Json
          rating: number | null
          review: string | null
          scheduled_time: string | null
          status: Database["public"]["Enums"]["ride_status"]
          updated_at: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          voice_commands: Json | null
        }
        Insert: {
          ai_analysis?: Json | null
          broker_id?: string | null
          created_at?: string
          destination: Json
          distance: number
          driver_id?: string | null
          duration: number
          estimated_arrival?: string | null
          fare: number
          id?: string
          is_recurring?: boolean
          passenger_id: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"]
          pickup_location: Json
          rating?: number | null
          review?: string | null
          scheduled_time?: string | null
          status?: Database["public"]["Enums"]["ride_status"]
          updated_at?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
          voice_commands?: Json | null
        }
        Update: {
          ai_analysis?: Json | null
          broker_id?: string | null
          created_at?: string
          destination?: Json
          distance?: number
          driver_id?: string | null
          duration?: number
          estimated_arrival?: string | null
          fare?: number
          id?: string
          is_recurring?: boolean
          passenger_id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"]
          pickup_location?: Json
          rating?: number | null
          review?: string | null
          scheduled_time?: string | null
          status?: Database["public"]["Enums"]["ride_status"]
          updated_at?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
          voice_commands?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "rides_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_passenger_id_fkey"
            columns: ["passenger_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rm_committee_members: {
        Row: {
          access_code_id: string | null
          appointed_at: string | null
          appointed_by: string | null
          created_at: string | null
          department_codes: string[] | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          access_code_id?: string | null
          appointed_at?: string | null
          appointed_by?: string | null
          created_at?: string | null
          department_codes?: string[] | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          access_code_id?: string | null
          appointed_at?: string | null
          appointed_by?: string | null
          created_at?: string | null
          department_codes?: string[] | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rm_committee_members_access_code_id_fkey"
            columns: ["access_code_id"]
            isOneToOne: false
            referencedRelation: "access_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rm_committee_members_appointed_by_fkey"
            columns: ["appointed_by"]
            isOneToOne: false
            referencedRelation: "access_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rm_committee_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "line_users"
            referencedColumns: ["id"]
          },
        ]
      }
      security_events: {
        Row: {
          action_taken: string
          ai_model_used: string | null
          confidence: number
          created_at: string
          description: string
          id: string
          resolved: boolean
          ride_id: string | null
          severity: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_taken: string
          ai_model_used?: string | null
          confidence: number
          created_at?: string
          description: string
          id?: string
          resolved?: boolean
          ride_id?: string | null
          severity: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_taken?: string
          ai_model_used?: string | null
          confidence?: number
          created_at?: string
          description?: string
          id?: string
          resolved?: boolean
          ride_id?: string | null
          severity?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_events_ai_model_used_fkey"
            columns: ["ai_model_used"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "security_events_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "security_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      stock_movements: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          movement_type: string
          notes: string | null
          product_id: string | null
          quantity: number
          reference_number: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          movement_type: string
          notes?: string | null
          product_id?: string | null
          quantity: number
          reference_number?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          movement_type?: string
          notes?: string | null
          product_id?: string | null
          quantity?: number
          reference_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      system_features: {
        Row: {
          config: Json | null
          created_at: string | null
          description: string | null
          feature_name: string
          id: string
          is_enabled: boolean | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          feature_name: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          feature_name?: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_features_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "access_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          description: string | null
          id: number
          setting_key: string
          setting_value: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          setting_key: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          setting_key?: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      system_tokens: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          token_description: string | null
          token_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          token_description?: string | null
          token_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          token_description?: string | null
          token_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      taxi_requests: {
        Row: {
          appointment_time: string | null
          assigned_taxi_id: string | null
          created_at: string
          customer_name: string
          customer_phone: string
          destination: string | null
          destination_coordinates: Json | null
          district: string
          id: string
          notes: string | null
          pickup_coordinates: Json | null
          pickup_location: string
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_time?: string | null
          assigned_taxi_id?: string | null
          created_at?: string
          customer_name: string
          customer_phone: string
          destination?: string | null
          destination_coordinates?: Json | null
          district: string
          id?: string
          notes?: string | null
          pickup_coordinates?: Json | null
          pickup_location: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_time?: string | null
          assigned_taxi_id?: string | null
          created_at?: string
          customer_name?: string
          customer_phone?: string
          destination?: string | null
          destination_coordinates?: Json | null
          district?: string
          id?: string
          notes?: string | null
          pickup_coordinates?: Json | null
          pickup_location?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "taxi_requests_assigned_taxi_id_fkey"
            columns: ["assigned_taxi_id"]
            isOneToOne: false
            referencedRelation: "taxis"
            referencedColumns: ["id"]
          },
        ]
      }
      taxis: {
        Row: {
          car_color: string | null
          car_model: string | null
          car_photo_url: string | null
          created_at: string
          district: string
          driver_name: string
          driver_phone: string
          driver_photo_url: string | null
          id: string
          is_available: boolean | null
          lat: number | null
          license_plate: string
          lng: number | null
          rating: number | null
          updated_at: string
        }
        Insert: {
          car_color?: string | null
          car_model?: string | null
          car_photo_url?: string | null
          created_at?: string
          district: string
          driver_name: string
          driver_phone: string
          driver_photo_url?: string | null
          id?: string
          is_available?: boolean | null
          lat?: number | null
          license_plate: string
          lng?: number | null
          rating?: number | null
          updated_at?: string
        }
        Update: {
          car_color?: string | null
          car_model?: string | null
          car_photo_url?: string | null
          created_at?: string
          district?: string
          driver_name?: string
          driver_phone?: string
          driver_photo_url?: string | null
          id?: string
          is_available?: boolean | null
          lat?: number | null
          license_plate?: string
          lng?: number | null
          rating?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      telegram_groups: {
        Row: {
          chat_id: string
          created_at: string | null
          description: string | null
          group_name: string
          group_type: string
          id: string
          incident_types: string[] | null
          is_active: boolean | null
          risk_levels: string[] | null
          updated_at: string | null
        }
        Insert: {
          chat_id: string
          created_at?: string | null
          description?: string | null
          group_name: string
          group_type: string
          id?: string
          incident_types?: string[] | null
          is_active?: boolean | null
          risk_levels?: string[] | null
          updated_at?: string | null
        }
        Update: {
          chat_id?: string
          created_at?: string | null
          description?: string | null
          group_name?: string
          group_type?: string
          id?: string
          incident_types?: string[] | null
          is_active?: boolean | null
          risk_levels?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          ai_profile: Json | null
          biometric_data: Json | null
          created_at: string
          email: string | null
          id: string
          is_verified: boolean
          language: Database["public"]["Enums"]["user_language"]
          location: Json | null
          name: string
          phone: string
          profile_image: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          ai_profile?: Json | null
          biometric_data?: Json | null
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean
          language?: Database["public"]["Enums"]["user_language"]
          location?: Json | null
          name: string
          phone: string
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          ai_profile?: Json | null
          biometric_data?: Json | null
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean
          language?: Database["public"]["Enums"]["user_language"]
          location?: Json | null
          name?: string
          phone?: string
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      voice_ai_sessions: {
        Row: {
          ai_model_used: string | null
          context: Json
          conversation: Json
          created_at: string
          id: string
          is_active: boolean
          language: Database["public"]["Enums"]["user_language"]
          processing_time: number
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_model_used?: string | null
          context?: Json
          conversation?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          language?: Database["public"]["Enums"]["user_language"]
          processing_time?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_model_used?: string | null
          context?: Json
          conversation?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          language?: Database["public"]["Enums"]["user_language"]
          processing_time?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_ai_sessions_ai_model_used_fkey"
            columns: ["ai_model_used"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voice_ai_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { oldname: string; newname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { tbl: unknown; col: string }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: { tbl: unknown; att_name: string; geom: unknown; mode?: string }
        Returns: number
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: { "": unknown }
        Returns: number
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: { geom: unknown }
        Returns: number
      }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      addauth: {
        Args: { "": string }
        Returns: boolean
      }
      addgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
        Returns: string
      }
      box: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box3d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3dtobox: {
        Args: { "": unknown }
        Returns: unknown
      }
      bytea: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
          | { schema_name: string; table_name: string; column_name: string }
          | { table_name: string; column_name: string }
        Returns: string
      }
      dropgeometrytable: {
        Args:
          | { catalog_name: string; schema_name: string; table_name: string }
          | { schema_name: string; table_name: string }
          | { table_name: string }
        Returns: string
      }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geography: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      geography_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_send: {
        Args: { "": unknown }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geography_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry: {
        Args:
          | { "": string }
          | { "": string }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
        Returns: unknown
      }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_hash: {
        Args: { "": unknown }
        Returns: number
      }
      geometry_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_send: {
        Args: { "": unknown }
        Returns: string
      }
      geometry_sortsupport: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geometry_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometrytype: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      get_proj4_from_srid: {
        Args: { "": number }
        Returns: string
      }
      get_telegram_groups_for_incident: {
        Args: { p_risk_level: string; p_incident_type: string }
        Returns: {
          group_name: string
          chat_id: string
          group_type: string
        }[]
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gidx_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      json: {
        Args: { "": unknown }
        Returns: Json
      }
      jsonb: {
        Args: { "": unknown }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      point: {
        Args: { "": unknown }
        Returns: unknown
      }
      polygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      populate_geometry_columns: {
        Args:
          | { tbl_oid: unknown; use_typmod?: boolean }
          | { use_typmod?: boolean }
        Returns: number
      }
      postgis_addbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: string
      }
      postgis_dropbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: { "": unknown }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_type: {
        Args: { "": number }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      spheroid_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlength: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dperimeter: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle: {
        Args:
          | { line1: unknown; line2: unknown }
          | { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
        Returns: number
      }
      st_area: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_area2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_asbinary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asewkt: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asgeojson: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; options?: number }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
        Returns: string
      }
      st_asgml: {
        Args:
          | { "": string }
          | {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
        Returns: string
      }
      st_ashexewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_askml: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
          | { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
        Returns: string
      }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: {
        Args: { geom: unknown; format?: string }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg: {
        Args:
          | { "": string }
          | { geog: unknown; rel?: number; maxdecimaldigits?: number }
          | { geom: unknown; rel?: number; maxdecimaldigits?: number }
        Returns: string
      }
      st_astext: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_astwkb: {
        Args:
          | {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
          | {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
        Returns: string
      }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_boundary: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: { geom: unknown; fits?: boolean }
        Returns: unknown
      }
      st_buffer: {
        Args:
          | { geom: unknown; radius: number; options?: string }
          | { geom: unknown; radius: number; quadsegs: number }
        Returns: unknown
      }
      st_buildarea: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_centroid: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      st_cleangeometry: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: { geom: unknown; box: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: { "": unknown[] }
        Returns: unknown[]
      }
      st_collect: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collectionextract: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_convexhull: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_coorddim: {
        Args: { geometry: unknown }
        Returns: number
      }
      st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_curvetoline: {
        Args: { geom: unknown; tol?: number; toltype?: number; flags?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { g1: unknown; tolerance?: number; flags?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_dimension: {
        Args: { "": unknown }
        Returns: number
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance: {
        Args:
          | { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distancesphere: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; radius: number }
        Returns: number
      }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dump: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_envelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_expand: {
        Args:
          | { box: unknown; dx: number; dy: number }
          | { box: unknown; dx: number; dy: number; dz?: number }
          | { geom: unknown; dx: number; dy: number; dz?: number; dm?: number }
        Returns: unknown
      }
      st_exteriorring: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force3d: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; zvalue?: number; mvalue?: number }
        Returns: unknown
      }
      st_forcecollection: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcecurve: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcerhr: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcesfs: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_generatepoints: {
        Args:
          | { area: unknown; npoints: number }
          | { area: unknown; npoints: number; seed: number }
        Returns: unknown
      }
      st_geogfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geohash: {
        Args:
          | { geog: unknown; maxchars?: number }
          | { geom: unknown; maxchars?: number }
        Returns: string
      }
      st_geomcollfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometrytype: {
        Args: { "": unknown }
        Returns: string
      }
      st_geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromgeojson: {
        Args: { "": Json } | { "": Json } | { "": string }
        Returns: unknown
      }
      st_geomfromgml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: { marc21xml: string }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_gmltosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_hasarc: {
        Args: { geometry: unknown }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_isclosed: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscollection: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isempty: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isring: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_issimple: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvalid: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: { geom: unknown; flags?: number }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: { "": unknown }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_length: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_length2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_letters: {
        Args: { letters: string; font?: Json }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { txtin: string; nprecision?: number }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linemerge: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linetocurve: {
        Args: { geometry: unknown }
        Returns: unknown
      }
      st_locatealong: {
        Args: { geometry: unknown; measure: number; leftrightoffset?: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { geometry: unknown; fromelevation: number; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_m: {
        Args: { "": unknown }
        Returns: number
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makepolygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { "": unknown } | { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multi: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_ndims: {
        Args: { "": unknown }
        Returns: number
      }
      st_node: {
        Args: { g: unknown }
        Returns: unknown
      }
      st_normalize: {
        Args: { geom: unknown }
        Returns: unknown
      }
      st_npoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_nrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numgeometries: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorring: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpatches: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_offsetcurve: {
        Args: { line: unknown; distance: number; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { "": unknown } | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_perimeter2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_pointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_points: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonize: {
        Args: { "": unknown[] }
        Returns: unknown
      }
      st_project: {
        Args: { geog: unknown; distance: number; azimuth: number }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_reverse: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid: {
        Args: { geog: unknown; srid: number } | { geom: unknown; srid: number }
        Returns: unknown
      }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; vertex_fraction: number; is_outer?: boolean }
        Returns: unknown
      }
      st_split: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_square: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_srid: {
        Args: { geog: unknown } | { geom: unknown }
        Returns: number
      }
      st_startpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_subdivide: {
        Args: { geom: unknown; maxvertices?: number; gridsize?: number }
        Returns: unknown[]
      }
      st_summary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_transform: {
        Args:
          | { geom: unknown; from_proj: string; to_proj: string }
          | { geom: unknown; from_proj: string; to_srid: number }
          | { geom: unknown; to_proj: string }
        Returns: unknown
      }
      st_triangulatepolygon: {
        Args: { g1: unknown }
        Returns: unknown
      }
      st_union: {
        Args:
          | { "": unknown[] }
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_voronoilines: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: { wkb: string }
        Returns: unknown
      }
      st_wkttosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_wrapx: {
        Args: { geom: unknown; wrap: number; move: number }
        Returns: unknown
      }
      st_x: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmin: {
        Args: { "": unknown }
        Returns: number
      }
      st_y: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymax: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymin: {
        Args: { "": unknown }
        Returns: number
      }
      st_z: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmflag: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmin: {
        Args: { "": unknown }
        Returns: number
      }
      text: {
        Args: { "": unknown }
        Returns: string
      }
      unlockrows: {
        Args: { "": string }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
    }
    Enums: {
      broker_level: "regional" | "district" | "community"
      payment_method: "cash" | "promptpay" | "card" | "wallet"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      ride_status:
        | "pending"
        | "accepted"
        | "in_progress"
        | "completed"
        | "cancelled"
      user_language: "th" | "en" | "isaan"
      user_role: "passenger" | "driver" | "broker" | "admin"
      vehicle_type: "motorcycle" | "car" | "van"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      broker_level: ["regional", "district", "community"],
      payment_method: ["cash", "promptpay", "card", "wallet"],
      payment_status: ["pending", "paid", "failed", "refunded"],
      ride_status: [
        "pending",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      user_language: ["th", "en", "isaan"],
      user_role: ["passenger", "driver", "broker", "admin"],
      vehicle_type: ["motorcycle", "car", "van"],
    },
  },
} as const
