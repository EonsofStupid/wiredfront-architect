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
      activity_log: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_assistant_models: {
        Row: {
          api_key: string | null
          config: Json | null
          created_at: string | null
          id: string
          name: string
          provider: string
          updated_at: string | null
        }
        Insert: {
          api_key?: string | null
          config?: Json | null
          created_at?: string | null
          id?: string
          name: string
          provider: string
          updated_at?: string | null
        }
        Update: {
          api_key?: string | null
          config?: Json | null
          created_at?: string | null
          id?: string
          name?: string
          provider?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          model_id: string | null
          role: string
          tokens_used: number | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          model_id?: string | null
          role: string
          tokens_used?: number | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          model_id?: string | null
          role?: string
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_messages_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_assistant_models"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_models: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          parameters: Json
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          parameters?: Json
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          parameters?: Json
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_training_data: {
        Row: {
          created_at: string | null
          id: string
          input: string
          metadata: Json | null
          model_id: string
          output: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          input: string
          metadata?: Json | null
          model_id: string
          output: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          input?: string
          metadata?: Json | null
          model_id?: string
          output?: string
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_training_data_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_assistant_models"
            referencedColumns: ["id"]
          },
        ]
      }
      api_calls: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          method: string
          response_time: number
          status_code: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          method: string
          response_time: number
          status_code: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          method?: string
          response_time?: number
          status_code?: number
          user_id?: string
        }
        Relationships: []
      }
      bot_interactions: {
        Row: {
          created_at: string | null
          id: string
          input: string
          metadata: Json | null
          model_id: string
          output: string | null
          platform: string
          response_time: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          input: string
          metadata?: Json | null
          model_id: string
          output?: string | null
          platform: string
          response_time?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          input?: string
          metadata?: Json | null
          model_id?: string
          output?: string | null
          platform?: string
          response_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_interactions_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_providers: {
        Row: {
          created_at: string | null
          id: string
          key: string
          models: Json | null
          name: string
          requires_assistant: boolean | null
          updated_at: string | null
          user_id: string
          validation_config: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          models?: Json | null
          name: string
          requires_assistant?: boolean | null
          updated_at?: string | null
          user_id: string
          validation_config?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          models?: Json | null
          name?: string
          requires_assistant?: boolean | null
          updated_at?: string | null
          user_id?: string
          validation_config?: Json | null
        }
        Relationships: []
      }
      document_chunks: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          source: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      github_repositories: {
        Row: {
          created_at: string | null
          id: string
          last_synced: string | null
          project_id: string
          repo_name: string
          repo_owner: string
          sync_status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_synced?: string | null
          project_id: string
          repo_name: string
          repo_owner: string
          sync_status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_synced?: string | null
          project_id?: string
          repo_name?: string
          repo_owner?: string
          sync_status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "github_repositories_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ml_metrics: {
        Row: {
          accuracy: number
          batch_size: number
          created_at: string | null
          epoch: number
          epoch_time: number
          id: string
          learning_rate: number
          loss: number
          model_id: string
          run_id: string
          validation_accuracy: number | null
          validation_loss: number | null
        }
        Insert: {
          accuracy: number
          batch_size: number
          created_at?: string | null
          epoch: number
          epoch_time: number
          id?: string
          learning_rate: number
          loss: number
          model_id: string
          run_id: string
          validation_accuracy?: number | null
          validation_loss?: number | null
        }
        Update: {
          accuracy?: number
          batch_size?: number
          created_at?: string | null
          epoch?: number
          epoch_time?: number
          id?: string
          learning_rate?: number
          loss?: number
          model_id?: string
          run_id?: string
          validation_accuracy?: number | null
          validation_loss?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ml_metrics_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string
          full_name: string | null
          id: string
          last_active: string | null
          preferences: Json | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          full_name?: string | null
          id: string
          last_active?: string | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_active?: string | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_files: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          last_modified: string | null
          name: string
          path: string
          project_id: string
          size: number
          type: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          last_modified?: string | null
          name: string
          path: string
          project_id: string
          size?: number
          type: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          last_modified?: string | null
          name?: string
          path?: string
          project_id?: string
          size?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          path: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          path: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          path?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      prompt_templates: {
        Row: {
          created_at: string | null
          description: string | null
          draft_content: string | null
          id: string
          is_public: boolean | null
          last_auto_save: string | null
          metadata: Json | null
          name: string
          prompt_body: string
          provider_type: Database["public"]["Enums"]["prompt_provider_type"]
          updated_at: string | null
          user_id: string
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          draft_content?: string | null
          id?: string
          is_public?: boolean | null
          last_auto_save?: string | null
          metadata?: Json | null
          name: string
          prompt_body: string
          provider_type: Database["public"]["Enums"]["prompt_provider_type"]
          updated_at?: string | null
          user_id: string
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          draft_content?: string | null
          id?: string
          is_public?: boolean | null
          last_auto_save?: string | null
          metadata?: Json | null
          name?: string
          prompt_body?: string
          provider_type?: Database["public"]["Enums"]["prompt_provider_type"]
          updated_at?: string | null
          user_id?: string
          variables?: Json | null
        }
        Relationships: []
      }
      prompt_usage: {
        Row: {
          created_at: string | null
          id: string
          input_variables: Json | null
          response_metadata: Json | null
          template_id: string | null
          user_id: string | null
          version_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          input_variables?: Json | null
          response_metadata?: Json | null
          template_id?: string | null
          user_id?: string | null
          version_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          input_variables?: Json | null
          response_metadata?: Json | null
          template_id?: string | null
          user_id?: string | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_usage_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "prompt_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompt_usage_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "prompt_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_versions: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          metadata: Json | null
          prompt_body: string
          status: string | null
          template_id: string | null
          variables: Json | null
          version_number: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          prompt_body: string
          status?: string | null
          template_id?: string | null
          variables?: Json | null
          version_number: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          prompt_body?: string
          status?: string | null
          template_id?: string | null
          variables?: Json | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "prompt_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_configs: {
        Row: {
          api_key: string
          assistant_id: string | null
          capabilities: Json | null
          created_at: string | null
          endpoint_url: string | null
          id: string
          is_default: boolean | null
          is_valid: boolean | null
          model: string | null
          name: string
          provider: string
          provider_type: Database["public"]["Enums"]["provider_type"] | null
          updated_at: string | null
          user_id: string
          validation_timestamp: string | null
        }
        Insert: {
          api_key: string
          assistant_id?: string | null
          capabilities?: Json | null
          created_at?: string | null
          endpoint_url?: string | null
          id?: string
          is_default?: boolean | null
          is_valid?: boolean | null
          model?: string | null
          name: string
          provider: string
          provider_type?: Database["public"]["Enums"]["provider_type"] | null
          updated_at?: string | null
          user_id: string
          validation_timestamp?: string | null
        }
        Update: {
          api_key?: string
          assistant_id?: string | null
          capabilities?: Json | null
          created_at?: string | null
          endpoint_url?: string | null
          id?: string
          is_default?: boolean | null
          is_valid?: boolean | null
          model?: string | null
          name?: string
          provider?: string
          provider_type?: Database["public"]["Enums"]["provider_type"] | null
          updated_at?: string | null
          user_id?: string
          validation_timestamp?: string | null
        }
        Relationships: []
      }
      status_history: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          model_id: string
          progress: number | null
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          model_id: string
          progress?: number | null
          status: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          model_id?: string
          progress?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "status_history_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      theme_audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          metadata: Json | null
          new_state: Json | null
          previous_state: Json | null
          theme_id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          theme_id: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          theme_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "theme_audit_logs_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      theme_versions: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          notes: string | null
          status: Database["public"]["Enums"]["theme_status"]
          theme_config: Json
          theme_id: string
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          status?: Database["public"]["Enums"]["theme_status"]
          theme_config: Json
          theme_id: string
          version: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          status?: Database["public"]["Enums"]["theme_status"]
          theme_config?: Json
          theme_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "theme_versions_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_default: boolean | null
          is_public: boolean
          name: string
          parent_theme_id: string | null
          preview_image: string | null
          status: Database["public"]["Enums"]["theme_status"]
          theme_config: Json
          updated_at: string | null
          validation_status: Json | null
          version: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean
          name: string
          parent_theme_id?: string | null
          preview_image?: string | null
          status?: Database["public"]["Enums"]["theme_status"]
          theme_config: Json
          updated_at?: string | null
          validation_status?: Json | null
          version?: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean
          name?: string
          parent_theme_id?: string | null
          preview_image?: string | null
          status?: Database["public"]["Enums"]["theme_status"]
          theme_config?: Json
          updated_at?: string | null
          validation_status?: Json | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "themes_parent_theme_id_fkey"
            columns: ["parent_theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      training_examples: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          input: string
          model_id: string
          output: string
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          input: string
          model_id: string
          output: string
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          input?: string
          model_id?: string
          output?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_examples_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      training_runs: {
        Row: {
          best_accuracy: number | null
          config: Json
          current_epoch: number | null
          end_time: string | null
          error_message: string | null
          final_loss: number | null
          id: string
          model_id: string
          start_time: string | null
          status: string
          total_epochs: number
        }
        Insert: {
          best_accuracy?: number | null
          config?: Json
          current_epoch?: number | null
          end_time?: string | null
          error_message?: string | null
          final_loss?: number | null
          id?: string
          model_id: string
          start_time?: string | null
          status?: string
          total_epochs: number
        }
        Update: {
          best_accuracy?: number | null
          config?: Json
          current_epoch?: number | null
          end_time?: string | null
          error_message?: string | null
          final_loss?: number | null
          id?: string
          model_id?: string
          start_time?: string | null
          status?: string
          total_epochs?: number
        }
        Relationships: [
          {
            foreignKeyName: "training_runs_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          ai_config: Json | null
          api_keys: Json | null
          created_at: string | null
          discord_config: Json | null
          github_settings: Json | null
          github_token: string | null
          github_username: string | null
          id: string
          interface_settings: Json | null
          notification_preferences: Json | null
          onboarding_state: Json | null
          theme_preferences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_config?: Json | null
          api_keys?: Json | null
          created_at?: string | null
          discord_config?: Json | null
          github_settings?: Json | null
          github_token?: string | null
          github_username?: string | null
          id?: string
          interface_settings?: Json | null
          notification_preferences?: Json | null
          onboarding_state?: Json | null
          theme_preferences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_config?: Json | null
          api_keys?: Json | null
          created_at?: string | null
          discord_config?: Json | null
          github_settings?: Json | null
          github_token?: string | null
          github_username?: string | null
          id?: string
          interface_settings?: Json | null
          notification_preferences?: Json | null
          onboarding_state?: Json | null
          theme_preferences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_theme_preferences: {
        Row: {
          mode: string
          theme_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          mode?: string
          theme_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          mode?: string
          theme_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_theme_preferences_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_provider_config: {
        Args: {
          p_provider: string
          p_name: string
          p_api_key: string
          p_assistant_id?: string
          p_model?: string
          p_is_default?: boolean
        }
        Returns: string
      }
      apply_theme_version: {
        Args: {
          p_theme_id: string
          p_version?: number
        }
        Returns: Json
      }
      auto_save_prompt_template: {
        Args: {
          p_template_id: string
          p_draft_content: string
        }
        Returns: undefined
      }
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      calculate_similarity: {
        Args: {
          text1: string
          text2: string
        }
        Returns: number
      }
      create_replicate_prediction: {
        Args: {
          p_model: string
          p_prompt: string
          p_config_id: string
        }
        Returns: Json
      }
      create_user_profile: {
        Args: {
          user_id: string
          user_email: string
          user_role?: string
        }
        Returns: Json
      }
      get_ai_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          avg_inference_time: number
          success_rate: number
          total_inferences: number
        }[]
      }
      get_api_key: {
        Args: {
          p_provider: string
        }
        Returns: string
      }
      get_bot_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          avg_response_time: number
          success_rate: number
          total_commands: number
        }[]
      }
      get_daily_api_stats: {
        Args: {
          days_ago: number
        }
        Returns: {
          date: string
          count: number
          avg_response_time: number
          success_rate: number
        }[]
      }
      get_default_theme_id: {
        Args: {
          p_role?: string
        }
        Returns: string
      }
      get_discord_config: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_endpoint_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          endpoint: string
          avg_response_time: number
          success_rate: number
          total_calls: number
        }[]
      }
      get_model_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          accuracy: number
          avg_loss: number
          total_training_time: number
          successful_predictions: number
        }[]
      }
      get_or_create_system_user: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_project_file_count: {
        Args: {
          project_id: string
        }
        Returns: number
      }
      get_project_files: {
        Args: {
          p_project_id: string
        }
        Returns: {
          id: string
          name: string
          path: string
          type: string
          size: number
          last_modified: string
        }[]
      }
      get_project_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total: number
          active: number
          archived: number
        }[]
      }
      get_provider_config: {
        Args: {
          p_config_id: string
        }
        Returns: Json
      }
      get_provider_configs: {
        Args: {
          p_provider: string
        }
        Returns: {
          id: string
          name: string
          model: string
          is_default: boolean
          has_assistant: boolean
        }[]
      }
      get_recent_activity: {
        Args: {
          p_limit?: number
        }
        Returns: {
          id: string
          activity_type: string
          description: string
          metadata: Json
          created_at: string
        }[]
      }
      get_replicate_models: {
        Args: {
          p_config_id: string
        }
        Returns: {
          model_id: string
          model_name: string
          model_description: string
        }[]
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      handle_assistant_command: {
        Args: {
          p_command: string
          p_args: string
          p_config_id: string
        }
        Returns: Json
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      log_activity_secure: {
        Args: {
          p_activity_type: string
          p_description: string
          p_metadata?: Json
          p_user_id?: string
        }
        Returns: string
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_similar_response: {
        Args: {
          p_message: string
          p_limit?: number
          p_threshold?: number
        }
        Returns: {
          input: string
          output: string
          similarity: number
          metadata: Json
        }[]
      }
      search_training_data: {
        Args: {
          p_query: string
          p_limit?: number
        }
        Returns: {
          input: string
          output: string
          similarity: number
        }[]
      }
      set_default_provider_config: {
        Args: {
          p_config_id: string
        }
        Returns: undefined
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      store_api_key: {
        Args: {
          p_provider: string
          p_key: string
          p_name?: string
        }
        Returns: Json
      }
      store_provider_config: {
        Args: {
          p_provider: string
          p_name: string
          p_api_key: string
          p_assistant_id?: string
          p_model?: string
          p_is_default?: boolean
        }
        Returns: Json
      }
      sync_github_repository: {
        Args: {
          p_repo_url: string
          p_project_id?: string
        }
        Returns: Json
      }
      update_ai_config: {
        Args: {
          p_config: Json
        }
        Returns: Json
      }
      update_api_key: {
        Args: {
          p_provider: string
          p_key: string
        }
        Returns: Json
      }
      update_discord_config: {
        Args: {
          p_config: Json
        }
        Returns: Json
      }
      update_github_settings: {
        Args: {
          p_github_token: string
          p_github_username: string
        }
        Returns: Json
      }
      update_ml_config: {
        Args: {
          config: Json
        }
        Returns: Json
      }
      update_provider_config: {
        Args: {
          p_provider: string
          p_config: Json
        }
        Returns: Json
      }
      upsert_provider_config: {
        Args: {
          p_provider: string
          p_name: string
          p_api_key: string
          p_assistant_id?: string
          p_model?: string
          p_is_default?: boolean
        }
        Returns: Json
      }
      validate_provider_key: {
        Args: {
          p_provider: string
          p_api_key: string
        }
        Returns: Json
      }
      validate_replicate_key: {
        Args: {
          p_api_key: string
        }
        Returns: Json
      }
      validate_theme_config: {
        Args: {
          theme_config: Json
        }
        Returns: Json
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      prompt_provider_type:
        | "openai"
        | "replicate"
        | "anthropic"
        | "gemini"
        | "huggingface"
        | "custom"
        | "azure_openai"
        | "azure_cognitive"
        | "mistral"
        | "perplexity"
        | "together"
        | "cohere"
        | "stability"
        | "ollama"
        | "bedrock"
      provider_type:
        | "openai"
        | "anthropic"
        | "gemini"
        | "replicate"
        | "cohere"
        | "stability"
        | "huggingface"
        | "azure_openai"
        | "azure_cognitive"
        | "mistral"
        | "perplexity"
        | "together"
        | "palm"
        | "bedrock"
        | "ollama"
      theme_status: "active" | "draft" | "archived" | "pending_approval"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
