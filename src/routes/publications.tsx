import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { publications, chercheurs, axes } from "@/data/mock";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — UMMISCO" },
      {
        name: "description",
        content:
          "Articles, conférences et travaux scientifiques de l'unité UMMISCO.",
      },
    ],
  }),
  component: PublicationsPage,
});

function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="container-page py-16 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}

function PublicationsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("all");
  const [axe, setAxe] = useState<number | "all">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const types = useMemo(
    () => Array.from(new Set(publications.map((p) => p.type))),
    [],
  );

  const filtered = publications.filter((p) => {
    if (type !== "all" && p.type !== type) return false;
    if (axe !== "all" && p.axe_id !== axe) return false;
    if (q && !p.titre.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        eyebrow="Production scientifique"
        title="Publications"
        sub="Articles, communications et chapitres d'ouvrage publiés par les membres du réseau UMMISCO."
      />
      <section className="container-page py-12">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un titre, un mot-clé…"
            className="w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-md border border-input bg-card px-3 py-2.5 text-sm"
          >
            <option value="all">Tous les types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={axe}
            onChange={(e) =>
              setAxe(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="rounded-md border border-input bg-card px-3 py-2.5 text-sm"
          >
            <option value="all">Tous les axes</option>
            {axes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nom}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-6 eyebrow">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </p>

        <ul className="mt-4 divide-y divide-border border-t border-border">
          {filtered.map((p) => {
            const auteursListFull = p.auteurs
              .map((id) => chercheurs.find((c) => c.id === id)?.nom_complet)
              .filter(Boolean);
            const auteurs = auteursListFull.join(", ");
            const ax = axes.find((a) => a.id === p.axe_id);
            const isExpanded = expandedId === p.id;

            // Generate BibTeX Citation
            const authorShort = auteursListFull[0]
              ? auteursListFull[0].split(" ").pop()
              : "Author";
            const bibtexId = `${authorShort.toLowerCase()}${p.annee}${p.type.toLowerCase()}`;
            const bibtexText = `@article{${bibtexId},
  author = {${auteursListFull.join(" and ")}},
  title = {${p.titre}},
  journal = {${p.revue || "UMMISCO Science Archive"}},
  year = {${p.annee}},
  doi = {${p.doi || "n/a"}},
  url = {https://doi.org/${p.doi || ""}}
}`;

            return (
              <li key={p.id} className="group py-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="rounded-full bg-sand px-2.5 py-1 font-medium text-ink">
                    {p.type}
                  </span>
                  <span className="text-muted-foreground">{p.annee}</span>
                  {ax && (
                    <span className="text-muted-foreground">· {ax.nom}</span>
                  )}
                </div>
                <h3
                  onClick={() => setExpandedId(isExpanded ? null : p.id)}
                  className="mt-3 font-display text-2xl leading-snug group-hover:text-primary transition-colors cursor-pointer text-primary-dark font-semibold"
                >
                  {p.titre}
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-muted-foreground leading-relaxed">
                  {p.resume}
                </p>

                {/* Expanded High-Fidelity Presentation/Documents Drawer */}
                {isExpanded && (
                  <div className="mt-5 p-5 bg-slate-50 border border-border/80 rounded-xl space-y-6 animate-fade-in text-sm">
                    {/* Abstract & Scientific Content Section */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                        Résumé de la Recherche & Objectif
                      </h4>
                      <p className="text-foreground/90 font-accent leading-relaxed text-sm">
                        Cette recheche étudie les dynamiques complexes au sein
                        de l'UMMISCO dans l'axe « {ax?.nom} ». Le modèle
                        développé permet d'appréhender les variations
                        comportementales, d'optimiser l'organisation
                        structurelle et de fournir des outils d'aide à la
                        décision pour le développement durable en Afrique
                        sub-saharienne.
                      </p>
                    </div>

                    {/* Accompanying Documents section */}
                    <div className="pt-2 border-t border-border/60">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                        Documents présentés & Livrables scientifiques (PDF /
                        PPT)
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {/* Doc 1 - Article */}
                        <a
                          href={
                            p.doi
                              ? `https://doi.org/${p.doi}`
                              : "https://arxiv.org/"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 p-3 rounded-lg border bg-white hover:border-primary/50 transition-colors cursor-pointer group/doc"
                        >
                          <span className="text-xl">📄</span>
                          <div>
                            <span className="font-semibold block text-xs group-hover/doc:text-primary">
                              Article Complet (Preprint)
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              PDF · 1.8 Mo
                            </span>
                          </div>
                        </a>
                        {/* Doc 2 - Slides */}
                        <a
                          href="https://scholar.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 p-3 rounded-lg border bg-white hover:border-primary/50 transition-colors cursor-pointer group/doc"
                        >
                          <span className="text-xl">📊</span>
                          <div>
                            <span className="font-semibold block text-xs group-hover/doc:text-primary">
                              Slides de Présentation
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              PowerPoint / PDF · 3.4 Mo
                            </span>
                          </div>
                        </a>
                        {/* Doc 3 - Poster inside */}
                        <a
                          href="https://scholar.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 p-3 rounded-lg border bg-white hover:border-primary/50 transition-colors cursor-pointer group/doc"
                        >
                          <span className="text-xl">📌</span>
                          <div>
                            <span className="font-semibold block text-xs group-hover/doc:text-primary">
                              Poster Scientifique A0
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              Image haute résolution
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* BibTeX Export Panel */}
                    <div className="pt-2 border-t border-border/60">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                        Référence de citation (BibTeX)
                      </h4>
                      <pre className="font-mono text-[11px] bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto whitespace-pre leading-relaxed select-all">
                        {bibtextText}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-foreground/90 font-medium">
                      ✏️ {auteurs}
                    </span>
                    <span className="font-mono text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded">
                      doi:{p.doi}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : p.id)}
                      className="font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded
                        ? "Masquer les détails ▲"
                        : "Détails & Documents (Slides, Poster) ▼"}
                    </button>
                    <a
                      className="font-medium text-foreground hover:text-ochre hover:underline transition-colors flex items-center gap-1"
                      href={
                        p.doi
                          ? `https://doi.org/${p.doi}`
                          : "https://arxiv.org/"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Télécharger l'Article →
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Aucune publication ne correspond aux filtres.
          </p>
        )}
      </section>
    </>
  );
}

export { PageHeader };
