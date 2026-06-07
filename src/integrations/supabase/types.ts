export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      affiliation: {
        Row: {
          axe_id: number;
          chercheur_id: number;
        };
        Insert: {
          axe_id: number;
          chercheur_id: number;
        };
        Update: {
          axe_id?: number;
          chercheur_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "affiliation_axe_id_fkey";
            columns: ["axe_id"];
            isOneToOne: false;
            referencedRelation: "axe";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "affiliation_chercheur_id_fkey";
            columns: ["chercheur_id"];
            isOneToOne: false;
            referencedRelation: "chercheur";
            referencedColumns: ["id"];
          },
        ];
      };
      axe: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          nom: string;
          thematique: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          nom: string;
          thematique?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          nom?: string;
          thematique?: string | null;
        };
        Relationships: [];
      };
      bailleur: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          nom: string;
          pays: string | null;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          nom: string;
          pays?: string | null;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          nom?: string;
          pays?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
      chercheur: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          initiales: string | null;
          institution: string | null;
          nom_complet: string;
          photo: string | null;
          specialite: string | null;
          titre: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          initiales?: string | null;
          institution?: string | null;
          nom_complet: string;
          photo?: string | null;
          specialite?: string | null;
          titre?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          initiales?: string | null;
          institution?: string | null;
          nom_complet?: string;
          photo?: string | null;
          specialite?: string | null;
          titre?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      dataset: {
        Row: {
          axe_id: number | null;
          created_at: string;
          description: string | null;
          downloads: number;
          format: string | null;
          id: number;
          is_public: boolean;
          licence: string | null;
          nom: string;
          url_acces: string | null;
        };
        Insert: {
          axe_id?: number | null;
          created_at?: string;
          description?: string | null;
          downloads?: number;
          format?: string | null;
          id?: number;
          is_public?: boolean;
          licence?: string | null;
          nom: string;
          url_acces?: string | null;
        };
        Update: {
          axe_id?: number | null;
          created_at?: string;
          description?: string | null;
          downloads?: number;
          format?: string | null;
          id?: number;
          is_public?: boolean;
          licence?: string | null;
          nom?: string;
          url_acces?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "dataset_axe_id_fkey";
            columns: ["axe_id"];
            isOneToOne: false;
            referencedRelation: "axe";
            referencedColumns: ["id"];
          },
        ];
      };
      directeur: {
        Row: {
          id: number;
          scope: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          scope?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          scope?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      evenement: {
        Row: {
          capacite: number | null;
          created_at: string;
          date: string;
          description: string | null;
          id: number;
          lieu: string | null;
          titre: string;
          type: string | null;
        };
        Insert: {
          capacite?: number | null;
          created_at?: string;
          date: string;
          description?: string | null;
          id?: number;
          lieu?: string | null;
          titre: string;
          type?: string | null;
        };
        Update: {
          capacite?: number | null;
          created_at?: string;
          date?: string;
          description?: string | null;
          id?: number;
          lieu?: string | null;
          titre?: string;
          type?: string | null;
        };
        Relationships: [];
      };
      financer: {
        Row: {
          bailleur_id: number;
          devise: string | null;
          montant: number | null;
          projet_id: number;
        };
        Insert: {
          bailleur_id: number;
          devise?: string | null;
          montant?: number | null;
          projet_id: number;
        };
        Update: {
          bailleur_id?: number;
          devise?: string | null;
          montant?: number | null;
          projet_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "financer_bailleur_id_fkey";
            columns: ["bailleur_id"];
            isOneToOne: false;
            referencedRelation: "bailleur";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "financer_projet_id_fkey";
            columns: ["projet_id"];
            isOneToOne: false;
            referencedRelation: "projet";
            referencedColumns: ["id"];
          },
        ];
      };
      inscription: {
        Row: {
          date_inscription: string;
          evenement_id: number;
          statut: string | null;
          user_id: string;
        };
        Insert: {
          date_inscription?: string;
          evenement_id: number;
          statut?: string | null;
          user_id: string;
        };
        Update: {
          date_inscription?: string;
          evenement_id?: number;
          statut?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inscription_evenement_id_fkey";
            columns: ["evenement_id"];
            isOneToOne: false;
            referencedRelation: "evenement";
            referencedColumns: ["id"];
          },
        ];
      };
      partenaire: {
        Row: {
          created_at: string;
          description: string | null;
          domaine_expertise: string | null;
          id: number;
          nom: string;
          organisation: string | null;
          pays: string | null;
          type: string | null;
          user_id: string | null;
          ville: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          domaine_expertise?: string | null;
          id?: number;
          nom: string;
          organisation?: string | null;
          pays?: string | null;
          type?: string | null;
          user_id?: string | null;
          ville?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          domaine_expertise?: string | null;
          id?: number;
          nom?: string;
          organisation?: string | null;
          pays?: string | null;
          type?: string | null;
          user_id?: string | null;
          ville?: string | null;
        };
        Relationships: [];
      };
      partenariat_projet: {
        Row: {
          partenaire_id: number;
          projet_id: number;
        };
        Insert: {
          partenaire_id: number;
          projet_id: number;
        };
        Update: {
          partenaire_id?: number;
          projet_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "partenariat_projet_partenaire_id_fkey";
            columns: ["partenaire_id"];
            isOneToOne: false;
            referencedRelation: "partenaire";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "partenariat_projet_projet_id_fkey";
            columns: ["projet_id"];
            isOneToOne: false;
            referencedRelation: "projet";
            referencedColumns: ["id"];
          },
        ];
      };
      participer_projet: {
        Row: {
          chercheur_id: number;
          projet_id: number;
          role_projet: string | null;
        };
        Insert: {
          chercheur_id: number;
          projet_id: number;
          role_projet?: string | null;
        };
        Update: {
          chercheur_id?: number;
          projet_id?: number;
          role_projet?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "participer_projet_chercheur_id_fkey";
            columns: ["chercheur_id"];
            isOneToOne: false;
            referencedRelation: "chercheur";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "participer_projet_projet_id_fkey";
            columns: ["projet_id"];
            isOneToOne: false;
            referencedRelation: "projet";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          is_active: boolean;
          last_login: string | null;
          nom_complet: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          is_active?: boolean;
          last_login?: string | null;
          nom_complet?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          is_active?: boolean;
          last_login?: string | null;
          nom_complet?: string | null;
        };
        Relationships: [];
      };
      projet: {
        Row: {
          axe_id: number | null;
          budget: string | null;
          created_at: string;
          date_debut: string | null;
          date_fin: string | null;
          description: string | null;
          id: number;
          responsable: string | null;
          statut: Database["public"]["Enums"]["projet_statut"] | null;
          thematique: string | null;
          titre: string;
        };
        Insert: {
          axe_id?: number | null;
          budget?: string | null;
          created_at?: string;
          date_debut?: string | null;
          date_fin?: string | null;
          description?: string | null;
          id?: number;
          responsable?: string | null;
          statut?: Database["public"]["Enums"]["projet_statut"] | null;
          thematique?: string | null;
          titre: string;
        };
        Update: {
          axe_id?: number | null;
          budget?: string | null;
          created_at?: string;
          date_debut?: string | null;
          date_fin?: string | null;
          description?: string | null;
          id?: number;
          responsable?: string | null;
          statut?: Database["public"]["Enums"]["projet_statut"] | null;
          thematique?: string | null;
          titre?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projet_axe_id_fkey";
            columns: ["axe_id"];
            isOneToOne: false;
            referencedRelation: "axe";
            referencedColumns: ["id"];
          },
        ];
      };
      publication: {
        Row: {
          annee: number | null;
          axe_id: number;
          created_at: string;
          doi: string | null;
          fichier_url: string | null;
          id: number;
          resume: string | null;
          revue: string | null;
          titre: string;
          type: string | null;
        };
        Insert: {
          annee?: number | null;
          axe_id: number;
          created_at?: string;
          doi?: string | null;
          fichier_url?: string | null;
          id?: number;
          resume?: string | null;
          revue?: string | null;
          titre: string;
          type?: string | null;
        };
        Update: {
          annee?: number | null;
          axe_id?: number;
          created_at?: string;
          doi?: string | null;
          fichier_url?: string | null;
          id?: number;
          resume?: string | null;
          revue?: string | null;
          titre?: string;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "publication_axe_id_fkey";
            columns: ["axe_id"];
            isOneToOne: false;
            referencedRelation: "axe";
            referencedColumns: ["id"];
          },
        ];
      };
      publication_dataset: {
        Row: {
          dataset_id: number;
          publication_id: number;
        };
        Insert: {
          dataset_id: number;
          publication_id: number;
        };
        Update: {
          dataset_id?: number;
          publication_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "publication_dataset_dataset_id_fkey";
            columns: ["dataset_id"];
            isOneToOne: false;
            referencedRelation: "dataset";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "publication_dataset_publication_id_fkey";
            columns: ["publication_id"];
            isOneToOne: false;
            referencedRelation: "publication";
            referencedColumns: ["id"];
          },
        ];
      };
      rediger: {
        Row: {
          chercheur_id: number;
          est_auteur_principal: boolean;
          ordre_auteur: number | null;
          publication_id: number;
        };
        Insert: {
          chercheur_id: number;
          est_auteur_principal?: boolean;
          ordre_auteur?: number | null;
          publication_id: number;
        };
        Update: {
          chercheur_id?: number;
          est_auteur_principal?: boolean;
          ordre_auteur?: number | null;
          publication_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "rediger_chercheur_id_fkey";
            columns: ["chercheur_id"];
            isOneToOne: false;
            referencedRelation: "chercheur";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rediger_publication_id_fkey";
            columns: ["publication_id"];
            isOneToOne: false;
            referencedRelation: "publication";
            referencedColumns: ["id"];
          },
        ];
      };
      responsable_axe: {
        Row: {
          axe_id: number;
          chercheur_id: number;
        };
        Insert: {
          axe_id: number;
          chercheur_id: number;
        };
        Update: {
          axe_id?: number;
          chercheur_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "responsable_axe_axe_id_fkey";
            columns: ["axe_id"];
            isOneToOne: true;
            referencedRelation: "axe";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "responsable_axe_chercheur_id_fkey";
            columns: ["chercheur_id"];
            isOneToOne: true;
            referencedRelation: "chercheur";
            referencedColumns: ["id"];
          },
        ];
      };
      simulation: {
        Row: {
          date_execution: string;
          id: number;
          parametres: Json | null;
          resultats: string | null;
          type: string | null;
          user_id: string;
        };
        Insert: {
          date_execution?: string;
          id?: number;
          parametres?: Json | null;
          resultats?: string | null;
          type?: string | null;
          user_id: string;
        };
        Update: {
          date_execution?: string;
          id?: number;
          parametres?: Json | null;
          resultats?: string | null;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      telechargement: {
        Row: {
          dataset_id: number;
          date_dl: string;
          id: number;
          user_id: string;
        };
        Insert: {
          dataset_id: number;
          date_dl?: string;
          id?: number;
          user_id: string;
        };
        Update: {
          dataset_id?: number;
          date_dl?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "telechargement_dataset_id_fkey";
            columns: ["dataset_id"];
            isOneToOne: false;
            referencedRelation: "dataset";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_my_role: {
        Args: never;
        Returns: Database["public"]["Enums"]["app_role"];
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "chercheur" | "directeur" | "partenaire";
      projet_statut: "en_cours" | "termine" | "suspendu" | "planifie";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["chercheur", "directeur", "partenaire"],
      projet_statut: ["en_cours", "termine", "suspendu", "planifie"],
    },
  },
} as const;
