import { createFileRoute } from "@tanstack/react-router";
import { bailleurs } from "@/data/mock";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/bailleurs")({
  head: () => ({
    meta: [
      { title: "Bailleurs — UMMISCO" },
      {
        name: "description",
        content:
          "Les bailleurs et financeurs des projets de recherche UMMISCO.",
      },
    ],
  }),
  component: BailleursPage,
});

function BailleursPage() {
  const top = [...bailleurs]
    .sort((a, b) => b.projets_count - a.projets_count)
    .slice(0, 3);
  return (
    <>
      <PageHeader
        eyebrow="Financement"
        title="Bailleurs de fonds"
        sub="Les institutions publiques, internationales et privées qui financent nos travaux de recherche."
      />
      <section className="container-page py-12">
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {top.map((b) => (
            <div
              key={b.id}
              className="card-soft p-5 bg-primary text-white border-0"
            >
              <p className="text-xs uppercase tracking-wider opacity-80">
                Top bailleur
              </p>
              <h3 className="mt-2 font-display text-lg text-white leading-tight">
                {b.nom}
              </h3>
              <p className="mt-2 font-display text-3xl text-accent">
                {b.budget_total}
              </p>
              <p className="text-xs opacity-80">
                {b.projets_count} projets financés
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {bailleurs.map((b) => (
            <article key={b.id} className="card-soft p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg leading-tight">{b.nom}</h3>
                <span className="shrink-0 rounded-full bg-primary-light px-2.5 py-1 text-[0.7rem] font-semibold text-primary">
                  {b.type}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">📍 {b.pays}</p>
              <p className="mt-3 text-sm text-foreground/80">{b.description}</p>
              <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
                <span>
                  <span className="text-muted-foreground">Budget : </span>
                  <span className="font-semibold text-primary">
                    {b.budget_total}
                  </span>
                </span>
                <span>
                  <span className="text-muted-foreground">Projets : </span>
                  <span className="font-semibold">{b.projets_count}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
