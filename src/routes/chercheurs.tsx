import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { chercheurs, axes, publications, projets } from "@/data/mock";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/chercheurs")({
  head: () => ({
    meta: [
      { title: "Chercheurs — UMMISCO" },
      {
        name: "description",
        content: "Annuaire des chercheurs et doctorants du réseau UMMISCO.",
      },
    ],
  }),
  component: ChercheursPage,
});

type ChercheurItem = (typeof chercheurs)[number];

// Helper to generate realistic deterministic contact information for researchers
function getPhoneForResearcher(id: number, institution: string): string {
  const baseNum = 338250000 + ((id * 147) % 8999);
  const standardSenegal = `+221 ${baseNum.toString().slice(0, 2)} ${baseNum.toString().slice(2, 5)} ${baseNum.toString().slice(5, 7)} ${baseNum.toString().slice(7, 9)}`;

  if (institution === "IRD" || institution === "Sorbonne") {
    const baseFrNum = 144274000 + ((id * 111) % 5999);
    return `+33 (0)1 ${baseFrNum.toString().slice(1, 3)} ${baseFrNum.toString().slice(3, 5)} ${baseFrNum.toString().slice(5, 7)} ${baseFrNum.toString().slice(7, 9)}`;
  }
  return standardSenegal;
}

function getDetailedInstitution(institution: string): {
  name: string;
  location: string;
} {
  switch (institution) {
    case "UCAD":
      return {
        name: "Université Cheikh Anta Diop (UCAD)",
        location: "Dakar, Sénégal",
      };
    case "UGB":
      return {
        name: "Université Gaston Berger (UGB)",
        location: "Saint-Louis, Sénégal",
      };
    case "ESP":
      return {
        name: "École Supérieure Polytechnique (ESP)",
        location: "Dakar, Sénégal",
      };
    case "IRD":
      return {
        name: "Institut de Recherche pour le Développement (IRD)",
        location: "Marseille / Dakar, Sénégal",
      };
    case "UMMISCO":
      return {
        name: "Unité de Modélisation Mathématique et Informatique des Systèmes Complexes",
        location: "Dakar, Sénégal / Paris, France",
      };
    default:
      return {
        name: institution,
        location: "Réseau Académique UMMISCO",
      };
  }
}

function ChercheursPage() {
  const [selectedChercheur, setSelectedChercheur] =
    useState<ChercheurItem | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Annuaire"
        title="Chercheurs & doctorants"
        sub="Un réseau international de modélisatrices et modélisateurs des systèmes complexes."
      />
      <section className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {chercheurs.map((c) => (
            <article
              key={c.id}
              onClick={() => setSelectedChercheur(c)}
              className="bg-card p-6 rounded-xl border border-border/60 hover:border-primary/45 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              id={`chercheur-card-${c.id}`}
            >
              <div>
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-lg font-bold"
                    style={{
                      background: "var(--color-sand)",
                      color: "var(--color-ink)",
                    }}
                  >
                    {c.initiales}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold leading-snug text-primary-dark">
                      {c.nom_complet}
                    </h3>
                    <p className="text-xs text-muted-foreground">{c.titre}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <p className="text-xs text-foreground/80 flex items-center gap-1.5">
                    🏛️ <span className="font-medium">{c.institution}</span>
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground line-clamp-1">
                    ✉️ {c.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border/40 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1">
                  {c.axes.map((aid) => {
                    const a = axes.find((x) => x.id === aid);
                    return (
                      <span
                        key={aid}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] text-secondary-foreground font-medium"
                      >
                        {a?.thematique}
                      </span>
                    );
                  })}
                </div>
                <span className="text-xs font-semibold text-primary group-hover:text-accent flex items-center gap-1 self-end mt-1">
                  Voir la fiche →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* High-Fidelity Modal Overlay */}
      {selectedChercheur &&
        (() => {
          const c = selectedChercheur;
          const phone = getPhoneForResearcher(c.id, c.institution);
          const detailedInst = getDetailedInstitution(c.institution);

          // Fetch associated publications
          const associatedPubs = publications.filter((p) =>
            p.auteurs.includes(c.id),
          );

          // Fetch led projects
          const associatedProjects = projets.filter((p) =>
            p.responsable.toLowerCase().includes(c.nom_complet.toLowerCase()),
          );

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-fade-in">
              <div
                className="w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up border border-border"
                role="dialog"
                aria-modal="true"
              >
                {/* Header Box */}
                <div className="p-6 border-b border-border bg-slate-50 flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div
                      className="grid h-16 w-16 place-items-center rounded-full font-display text-2xl font-bold border border-border shrink-0"
                      style={{
                        background: "var(--color-sand)",
                        color: "var(--color-ink)",
                      }}
                    >
                      {c.initiales}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold leading-tight text-primary-dark">
                        {c.nom_complet}
                      </h2>
                      <p className="text-sm font-medium text-accent-dark">
                        {c.titre} — {detailedInst.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedChercheur(null)}
                    className="text-muted-foreground hover:text-foreground text-3xl font-semibold leading-none p-1 cursor-pointer transition-colors"
                    title="Fermer"
                  >
                    &times;
                  </button>
                </div>

                {/* Scrollable Main Info */}
                <div className="p-6 overflow-y-auto space-y-6 text-sm">
                  {/* Visual Bio Box / Contact details */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="card-soft p-4 border bg-secondary/15 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                        Coordonnées de l'annuaire
                      </h4>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-base">📧</span>
                          <a
                            href={`mailto:${c.email}`}
                            className="font-mono text-primary font-semibold hover:underline break-all"
                          >
                            {c.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-base">📞</span>
                          <a
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className="font-mono text-primary font-semibold hover:underline"
                          >
                            {phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-normal">📍</span>
                          <span className="text-muted-foreground leading-tight">
                            {detailedInst.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="card-soft p-4 border bg-secondary/15 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                        Spécialité Scientifique
                      </h4>
                      <p className="text-foreground/90 leading-relaxed font-accent text-sm">
                        {c.specialite}
                      </p>
                    </div>
                  </div>

                  {/* Axes of affiliation */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Axes Scientifiques Fondateurs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {c.axes.map((aid) => {
                        const a = axes.find((x) => x.id === aid);
                        return (
                          <div
                            key={aid}
                            className="rounded-lg border border-primary/20 bg-primary-light/35 p-2.5 flex-1 min-w-[200px]"
                          >
                            <span className="text-xs font-bold text-primary block mb-0.5">
                              Axe {a?.id} : {a?.thematique}
                            </span>
                            <span className="text-[11px] text-muted-foreground leading-snug block">
                              {a?.nom}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Research Projects */}
                  {associatedProjects.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                        Projet(s) sous la responsabilité de {c.nom_complet}
                      </h4>
                      <ul className="space-y-2.5">
                        {associatedProjects.map((proj) => (
                          <li
                            key={proj.id}
                            className="border-l-4 border-accent bg-accent/5 p-3 rounded-r-md flex items-start justify-between gap-4"
                          >
                            <div>
                              <span className="font-bold text-sm text-primary-dark">
                                {proj.titre}
                              </span>
                              <span className="text-[11px] text-muted-foreground block mt-1">
                                Thématique : {proj.thematique} · Financement :{" "}
                                {proj.bailleur}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold bg-white border px-2 py-0.5 rounded capitalize shrink-0 shadow-sm">
                              {proj.statut}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Academic Publications list */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                      Publications scientifiques associées (
                      {associatedPubs.length})
                    </h4>
                    {associatedPubs.length > 0 ? (
                      <ul className="divide-y divide-border border rounded-md overflow-hidden bg-white">
                        {associatedPubs.map((pub) => (
                          <li
                            key={pub.id}
                            className="p-3.5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="max-w-xl">
                              <span className="font-semibold text-primary-dark block mb-0.5 text-sm">
                                {pub.titre}
                              </span>
                              <span className="text-muted-foreground text-[11px]">
                                Revue :{" "}
                                <span className="italic">{pub.revue}</span> ·{" "}
                                {pub.annee}
                              </span>
                            </div>
                            <a
                              href={
                                pub.doi
                                  ? `https://doi.org/${pub.doi}`
                                  : "https://arxiv.org/"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-md border border-primary/20 bg-primary/5 hover:bg-primary hover:text-white px-3 py-1.5 text-xs text-primary font-medium transition text-center shrink-0 self-start sm:self-center cursor-pointer"
                            >
                              PDF & DOI →
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-muted-foreground italic bg-slate-50 border p-3 rounded text-center">
                        Pas de publications enregistrées pour l'année courante
                        au sein du portail.
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-slate-50 flex justify-end">
                  <button
                    onClick={() => setSelectedChercheur(null)}
                    className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition cursor-pointer"
                  >
                    Fermer la fiche
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
