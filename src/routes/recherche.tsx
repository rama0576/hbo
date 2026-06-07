import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { searchAll } from "@/lib/portal.functions";
import { formations } from "@/data/mock";

export const Route = createFileRoute("/recherche")({
  head: () => ({
    meta: [
      { title: "Recherche — UMMISCO" },
      {
        name: "description",
        content:
          "Recherchez parmi publications, projets, chercheurs, datasets, formations et événements UMMISCO.",
      },
    ],
  }),
  component: RecherchePage,
});

function RecherchePage() {
  const [q, setQ] = useState("");
  const fn = useServerFn(searchAll);

  const { data, isFetching } = useQuery({
    queryKey: ["search", q],
    queryFn: () => fn({ data: { q } }),
    enabled: q.length >= 2,
  });

  // Client-side search for Masters and Doctorates to augment search results flawlessly
  const matchedFormations =
    q.length >= 2
      ? formations.filter(
          (f) =>
            f.intitule.toLowerCase().includes(q.toLowerCase()) ||
            f.description.toLowerCase().includes(q.toLowerCase()) ||
            f.niveau.toLowerCase().includes(q.toLowerCase()) ||
            f.institution.toLowerCase().includes(q.toLowerCase()),
        )
      : [];

  const total =
    (data
      ? data.publications.length +
        data.projets.length +
        data.chercheurs.length +
        data.datasets.length +
        data.evenements.length
      : 0) + matchedFormations.length;

  return (
    <section className="container-page py-12">
      <p className="eyebrow">Recherche transverse</p>
      <h1 className="mt-3 font-display text-4xl">Explorer le portail</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Cherchez parmi publications, projets, chercheurs, formations (Masters &
        Doctorats), datasets et événements.
      </p>

      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ex : Master, Doctorat, modélisation, GAMA, santé, climat..."
        className="mt-8 w-full max-w-2xl rounded-md border-2 border-border bg-background px-5 py-4 text-base shadow-sm focus:border-primary focus:outline-none"
      />

      {q.length >= 2 && (
        <p className="mt-3 text-xs text-muted-foreground">
          {isFetching
            ? "Recherche..."
            : `${total} résultat${total > 1 ? "s" : ""} pour « ${q} »`}
        </p>
      )}

      {(data || matchedFormations.length > 0) && (
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Formations (Masters & Doctorats) first or prominent */}
          <Group
            title="Formations (Masters, Doctorats & Cursus)"
            count={matchedFormations.length}
          >
            {matchedFormations.map((f) => (
              <Link
                key={f.id}
                to="/formations"
                className="block rounded border border-border p-3.5 hover:border-accent bg-accent/5 hover:bg-accent/10 transition-all cursor-pointer text-left"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-primary">{f.intitule}</p>
                  <span className="text-[9px] uppercase tracking-wider font-bold bg-primary text-white px-2 py-0.5 rounded shrink-0">
                    {f.niveau}
                  </span>
                </div>
                <p className="text-xs text-foreground/80 mt-1 line-clamp-2">
                  {f.description}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-2">
                  <span>🏛️ {f.institution}</span>
                  <span>⏱ {f.duree}</span>
                </p>
              </Link>
            ))}
          </Group>

          {data && (
            <>
              <Group title="Publications" count={data.publications.length}>
                {data.publications.map((p) => (
                  <Link
                    key={p.id}
                    to="/publications"
                    className="block rounded border border-border p-3 hover:border-primary text-left"
                  >
                    <p className="font-medium">{p.titre}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.type} · {p.annee}
                    </p>
                  </Link>
                ))}
              </Group>
              <Group title="Chercheurs" count={data.chercheurs.length}>
                {data.chercheurs.map((c) => (
                  <Link
                    key={c.id}
                    to="/chercheurs/$id"
                    params={{ id: String(c.id) }}
                    className="block rounded border border-border p-3 hover:border-primary text-left"
                  >
                    <p className="font-medium">{c.nom_complet}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.titre} · {c.institution}
                    </p>
                  </Link>
                ))}
              </Group>
              <Group title="Projets" count={data.projets.length}>
                {data.projets.map((p) => (
                  <Link
                    key={p.id}
                    to="/projets"
                    className="block rounded border border-border p-3 hover:border-primary text-left"
                  >
                    <p className="font-medium">{p.titre}</p>
                    <p className="text-xs text-muted-foreground">{p.statut}</p>
                  </Link>
                ))}
              </Group>
              <Group title="Datasets" count={data.datasets.length}>
                {data.datasets.map((d) => (
                  <Link
                    key={d.id}
                    to="/datasets"
                    className="block rounded border border-border p-3 hover:border-primary text-left"
                  >
                    <p className="font-medium">{d.nom}</p>
                    <p className="text-xs text-muted-foreground">{d.format}</p>
                  </Link>
                ))}
              </Group>
              <Group title="Événements" count={data.evenements.length}>
                {data.evenements.map((e) => (
                  <Link
                    key={e.id}
                    to="/evenements"
                    className="block rounded border border-border p-3 hover:border-primary text-left"
                  >
                    <p className="font-medium">{e.titre}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.type} · {e.lieu}
                    </p>
                  </Link>
                ))}
              </Group>
            </>
          )}
        </div>
      )}
    </section>
  );
}

function Group({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  if (count === 0) return null;
  return (
    <div>
      <h2 className="mb-3 font-display text-lg text-primary-dark border-b pb-1">
        {title} <span className="text-xs text-muted-foreground">({count})</span>
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
