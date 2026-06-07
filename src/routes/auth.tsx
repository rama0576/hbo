import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion — UMMISCO" },
      {
        name: "description",
        content: "Connexion et inscription au portail UMMISCO.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [role, setRole] = useState<"chercheur" | "partenaire">("chercheur");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/profil", replace: true });
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user && event === "SIGNED_IN")
        navigate({ to: "/profil", replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { nom_complet: nom, role },
          },
        });
        if (error) throw error;
        toast.success(
          "Compte créé. Vérifiez votre email si la confirmation est activée.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Erreur d'authentification",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Connexion Google impossible");
      setLoading(false);
    }
  }

  async function handleForgot() {
    if (!email) return toast.error("Saisissez votre email d'abord");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Email de réinitialisation envoyé");
  }

  return (
    <section className="container-page grid min-h-[calc(100vh-200px)] items-center py-12">
      <div className="mx-auto w-full max-w-md">
        <p className="eyebrow">Portail UMMISCO</p>
        <h1 className="mt-3 font-display text-4xl">
          {mode === "signin" ? "Connexion" : "Créer un compte"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Accès chercheurs, directeurs et partenaires."
            : "Rejoignez la communauté UMMISCO."}
        </p>

        <div className="card-soft mt-8 p-7">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium hover:bg-secondary transition disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.56 2.69-3.87 2.69-6.63Z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.46-.8 5.95-2.18l-2.9-2.26c-.81.54-1.83.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18Z"
              />
              <path
                fill="#FBBC05"
                d="M3.96 10.71A5.42 5.42 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3-2.33Z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58Z"
              />
            </svg>
            Continuer avec Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> OU{" "}
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <label className="eyebrow">Nom complet</label>
                  <input
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="eyebrow">Rôle</label>
                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as "chercheur" | "partenaire")
                    }
                    className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
                  >
                    <option value="chercheur">Chercheur</option>
                    <option value="partenaire">Partenaire</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="eyebrow">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="exemple@ummisco.sn"
                className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="eyebrow">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-50"
            >
              {loading
                ? "..."
                : mode === "signin"
                  ? "Se connecter"
                  : "Créer mon compte"}
            </button>
            {mode === "signin" && (
              <button
                type="button"
                onClick={handleForgot}
                className="block w-full text-xs text-muted-foreground hover:text-primary"
              >
                Mot de passe oublié ?
              </button>
            )}
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signin" ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-medium text-primary hover:underline"
          >
            {mode === "signin" ? "Créer un compte" : "Se connecter"}
          </button>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            ← Retour à l'accueil
          </Link>
        </p>
      </div>
    </section>
  );
}
