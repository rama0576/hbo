import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — UMMISCO" },
      { name: "description", content: "Espace membre du portail UMMISCO." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pwd) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    // Capture specific demo configuration for Sénégal/musco domains
    const lowerEmail = email.toLowerCase();
    const isAllowedDomain =
      lowerEmail.endsWith("@musco.e4.sn") ||
      lowerEmail.endsWith("@ummisco.e4.sn") ||
      lowerEmail.endsWith("@ummisco.ucad.sn") ||
      lowerEmail.endsWith("@ummisco.sn") ||
      lowerEmail.endsWith("@ucad.sn") ||
      lowerEmail.endsWith("@esp.sn") ||
      lowerEmail.includes("directeur") ||
      lowerEmail.includes("chercheur") ||
      lowerEmail.includes("partenaire");

    if (!isAllowedDomain) {
      toast.warning(
        "Email non enregistré dans l'annuaire institutionnel, mais session simulée avec succès pour le test.",
      );
    }

    // Save interactive session so /profil can extract and map it
    localStorage.setItem(
      "user-session",
      JSON.stringify({
        email: email,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      }),
    );

    toast.success(
      "Authentification réussie ! Bienvenue sur votre espace membre.",
    );

    // Redirect
    navigate({ to: "/profil" });
  };

  return (
    <section className="container-page grid min-h-[calc(100vh-4rem)] items-center py-16">
      <div className="mx-auto w-full max-w-md">
        <p className="eyebrow">Espace membre</p>
        <h1 className="mt-3 font-display text-4xl">Connexion</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Accès réservé aux chercheurs, directeurs et partenaires UMMISCO.
        </p>

        <form
          onSubmit={handleLoginSubmit}
          className="card-soft mt-8 space-y-5 p-7"
        >
          <div>
            <label className="eyebrow">Email institutionnel</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre_nom@musco.e4.sn"
              className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
              required
            />
          </div>
          <div>
            <label className="eyebrow">Mot de passe</label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
              required
            />
          </div>
          <button className="w-full rounded-md bg-ink px-4 py-3 text-sm font-medium text-paper hover:bg-ink/85 transition-colors cursor-pointer">
            Se connecter
          </button>

          <div className="rounded-md border border-dashed border-border bg-secondary/50 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1.5">
              Comptes de démonstration configurés :
            </p>
            <ul className="space-y-1 font-mono text-[10px] text-primary">
              <li>• chercheur@musco.e4.sn (Sénégal)</li>
              <li>• directeur@ummisco.ucad.sn (Sénégal)</li>
              <li>• membre@ummisco.e4.sn (Sénégal)</li>
              <li>• chercheur@ummisco.sn (Générique)</li>
            </ul>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link
            to="/contact"
            className="font-medium text-foreground hover:text-ochre"
          >
            Demander un accès
          </Link>
        </p>
      </div>
    </section>
  );
}
