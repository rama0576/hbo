import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { chercheurs } from "@/data/mock";
import { PageHeader } from "./publications";
import { toast } from "sonner";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon profil — UMMISCO" },
      { name: "description", content: "Espace membre UMMISCO." },
    ],
  }),
  component: ProfilPage,
});

function ProfilPage() {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState<{ email: string } | null>(
    null,
  );

  useEffect(() => {
    const sessionStr = localStorage.getItem("user-session");
    if (sessionStr) {
      try {
        const parsed = JSON.parse(sessionStr);
        setUserSession(parsed);
      } catch (e) {
        console.error("Format de session invalide", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-session");
    toast.success("Vous avez été déconnecté avec succès.");
    navigate({ to: "/" });
  };

  // Determine user identity
  let me = chercheurs[0]; // fallback
  if (userSession?.email) {
    const emailLower = userSession.email.toLowerCase();

    // Check if it matches an existing researcher email
    const foundResearcher = chercheurs.find(
      (c) => c.email.toLowerCase() === emailLower,
    );
    if (foundResearcher) {
      me = foundResearcher;
    } else if (emailLower.endsWith("@musco.e4.sn")) {
      me = {
        id: 991,
        nom_complet: "Chercheur Musco",
        email: userSession.email,
        titre: "Ingénieur de Recherche",
        institution: "MUSCO Sénégal / UCAD",
        initiales: "CM",
        axes: [1, 2],
        specialite:
          "Epidémiologie mathématique, modélisation des systèmes complexes",
      };
    } else if (emailLower.endsWith("@ummisco.ucad.sn")) {
      me = {
        id: 992,
        nom_complet: "Directeur Sénégal UMMISCO",
        email: userSession.email,
        titre: "Directeur de Recherche",
        institution: "UMMISCO Sénégal / UCAD",
        initiales: "DS",
        axes: [1, 4],
        specialite: "Modélisation des épidémies et systèmes dynamiques",
      };
    } else if (emailLower.endsWith("@ummisco.e4.sn")) {
      me = {
        id: 993,
        nom_complet: "Membre UMMISCO Sénégal",
        email: userSession.email,
        titre: "Enseignant-Chercheur",
        institution: "UMMISCO Sénégal / ESP de Dakar",
        initiales: "MS",
        axes: [3],
        specialite: "Systèmes de capteurs IoT et collecte environnementale",
      };
    } else {
      // General dynamic user
      const parts = emailLower.split("@");
      const computedName = parts[0]
        .split(".")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
      const computedInitials = parts[0]
        .split(".")
        .map((p) => p.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2);

      me = {
        id: 999,
        nom_complet: computedName || "Chercheur Connecté",
        email: userSession.email,
        titre: "Membre UMMISCO",
        institution: "UCAD (Dakar, Sénégal)",
        initiales: computedInitials || "CC",
        axes: [1],
        specialite: "Modélisation mathématique et informatique appliquée",
      };
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Espace membre"
        title="Mon profil"
        sub="Gérez vos informations et vos contributions au sein du portail UMMISCO."
      />
      <section className="container-page py-12 grid gap-8 md:grid-cols-[280px_1fr]">
        <aside className="card-soft p-6 text-center h-fit">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-primary text-white font-display text-3xl">
            {me.initiales}
          </div>
          <h2 className="mt-4 font-display text-xl">{me.nom_complet}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{me.titre}</p>
          <p className="mt-3 text-xs font-mono text-primary break-all">
            {me.email}
          </p>
          <button
            onClick={handleLogout}
            className="mt-6 inline-flex items-center justify-center w-full rounded-md border border-destructive px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive hover:text-white transition cursor-pointer"
          >
            Se déconnecter
          </button>
        </aside>

        <div className="space-y-6">
          <div className="card-soft p-6">
            <h3 className="font-display text-lg">Informations</h3>
            <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
              <dt className="text-muted-foreground">Institution</dt>
              <dd className="font-medium">{me.institution}</dd>
              <dt className="text-muted-foreground">Spécialité</dt>
              <dd>{me.specialite}</dd>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-mono text-xs break-all">{me.email}</dd>
            </dl>
          </div>
          <div className="card-soft p-6">
            <h3 className="font-display text-lg">Mes contributions</h3>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-2xl text-primary">12</p>
                <p className="text-xs text-muted-foreground">Publications</p>
              </div>
              <div>
                <p className="font-display text-2xl text-primary">4</p>
                <p className="text-xs text-muted-foreground">Projets</p>
              </div>
              <div>
                <p className="font-display text-2xl text-primary">3</p>
                <p className="text-xs text-muted-foreground">Datasets</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
