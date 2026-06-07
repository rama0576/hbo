import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { actualites } from "@/data/mock";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/actualites")({
  head: () => ({
    meta: [
      { title: "Actualités — UMMISCO" },
      {
        name: "description",
        content: "Les dernières actualités de l'unité UMMISCO.",
      },
    ],
  }),
  component: ActualitesPage,
});

type ActualiteItem = (typeof actualites)[number];

function ActualitesPage() {
  const sorted = [...actualites].sort((a, b) => b.date.localeCompare(a.date));
  const [selectedActualite, setSelectedActualite] =
    useState<ActualiteItem | null>(null);

  // States for interactive forms
  const [newsFormNom, setNewsFormNom] = useState("");
  const [newsFormEmail, setNewsFormEmail] = useState("");
  const [newsFormMessage, setNewsFormMessage] = useState("");
  const [newsFormSuccess, setNewsFormSuccess] = useState(false);

  // Generate enriched paragraphs for the selected news item to simulate full content
  const getEnrichedContent = (item: ActualiteItem) => {
    return [
      item.resume,
      "Cette initiative majeure s'inscrit au cœur des axes prioritaires de recherche de l'UMMISCO au Sénégal, visant à renforcer le transfert technologique et le développement d'outils collaboratifs innovants. Plusieurs groupes de travail menés par l'Université Cheikh Anta Diop (UCAD) et l'Université Gaston Berger (UGB) sont actuellement mobilisés.",
      "Le déploiement de ces nouveaux modèles complexes permettra aux décideurs locaux de mieux appréhender les risques environnementaux et d'accélérer les démarches d'adaptation climatique à l'échelle territoriale. Les sessions pratiques de formation se poursuivront dans les prochains mois.",
    ];
  };

  const handleNewsFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsFormSuccess(true);
    setTimeout(() => {
      setNewsFormSuccess(false);
      setNewsFormNom("");
      setNewsFormEmail("");
      setNewsFormMessage("");
    }, 5000);
  };

  return (
    <>
      <PageHeader
        eyebrow="Informations"
        title="Actualités"
        sub="Annonces, nouveaux projets, publications marquantes et événements du réseau UMMISCO."
      />

      <section className="container-page py-12">
        <ul className="divide-y divide-border border-t border-border">
          {sorted.map((a) => (
            <li key={a.id} className="py-7">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full bg-accent px-3 py-1 font-semibold text-primary-dark">
                  {a.categorie}
                </span>
                <span className="text-muted-foreground">
                  📅{" "}
                  {new Date(a.date).toLocaleDateString("fr", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl leading-snug text-primary-dark font-semibold">
                {a.titre}
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                {a.resume}
              </p>
              <button
                onClick={() => setSelectedActualite(a)}
                className="mt-3 inline-flex text-sm font-semibold text-primary hover:text-accent cursor-pointer transition-colors"
                id={`read-more-${a.id}`}
              >
                Lire la suite →
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Modern Dialog/Modal Overlay for news details */}
      {selectedActualite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-6 border-b border-border bg-secondary/20 flex justify-between items-start">
              <div>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-primary-dark mr-3">
                  {selectedActualite.categorie}
                </span>
                <span className="text-xs text-muted-foreground">
                  📅{" "}
                  {new Date(selectedActualite.date).toLocaleDateString("fr", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-primary-dark">
                  {selectedActualite.titre}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedActualite(null);
                  setNewsFormSuccess(false);
                }}
                className="text-muted-foreground hover:text-foreground text-3xl font-light leading-none p-1 cursor-pointer"
                title="Fermer"
              >
                &times;
              </button>
            </div>

            {/* Content area */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed text-foreground/90">
              <div className="space-y-4 border-b border-border pb-6">
                {getEnrichedContent(selectedActualite).map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "font-medium text-base text-primary-dark"
                        : "text-muted-foreground"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Inquiry Form */}
              <div className="bg-secondary/20 p-5 rounded-lg border border-border/35 text-xs">
                <h4 className="font-display text-sm font-bold text-primary-dark mb-1">
                  ✉️ Poser une question sur cette actualité
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Remplissez ce formulaire pour contacter l'équipe de l'UMMISCO
                  en charge de ce sujet.
                </p>

                {newsFormSuccess ? (
                  <div className="bg-teal-50 border border-teal-200 text-teal-800 p-4 rounded-md text-xs font-medium animate-fade-in">
                    🎯 Votre demande d'information concernant «{" "}
                    <strong>{selectedActualite.titre}</strong> » a bien été
                    transmise de manière sécurisée aux comités de l'UMMISCO.
                    Nous vous répondrons par e-mail sous 48h.
                  </div>
                ) : (
                  <form onSubmit={handleNewsFormSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={newsFormNom}
                          onChange={(e) => setNewsFormNom(e.target.value)}
                          placeholder="Ex: Dr. Diallo"
                          className="w-full text-xs p-2 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                          Adresse Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={newsFormEmail}
                          onChange={(e) => setNewsFormEmail(e.target.value)}
                          placeholder="Ex: diallo@institution.org"
                          className="w-full text-xs p-2 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                        Votre message / Question *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newsFormMessage}
                        onChange={(e) => setNewsFormMessage(e.target.value)}
                        placeholder="Quelles informations souhaitez-vous obtenir concernant ce sujet ?"
                        className="w-full text-xs p-2 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-bold py-2 px-4 rounded text-xs hover:bg-primary-dark transition cursor-pointer"
                    >
                      Envoyer ma question
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-secondary/10 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedActualite(null);
                  setNewsFormSuccess(false);
                }}
                className="rounded-md border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground/80 hover:bg-slate-100 transition cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setSelectedActualite(null);
                  setNewsFormSuccess(false);
                }}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
