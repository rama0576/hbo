import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getChercheurDetail } from "@/lib/portal.functions";

export const Route = createFileRoute("/chercheurs/$id")({
  head: () => ({ meta: [{ title: "Chercheur — UMMISCO" }] }),
  component: ChercheurDetail,
});

function ChercheurDetail() {
  const { id } = Route.useParams();
  const fn = useServerFn(getChercheurDetail);
  const { data, isLoading } = useQuery({
    queryKey: ["chercheur", id],
    queryFn: () => fn({ data: { id: Number(id) } }),
  });

  if (isLoading)
    return <div className="container-page py-16">Chargement...</div>;
  if (!data?.chercheur)
    return (
      <div className="container-page py-16">
        Chercheur introuvable.{" "}
        <Link to="/chercheurs" className="text-primary underline">
          Retour
        </Link>
      </div>
    );

  const c = data.chercheur;
  return (
    <section className="container-page py-12">
      <Link
        to="/chercheurs"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ← Tous les chercheurs
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr]">
        <aside className="card-soft p-6 h-fit text-center">
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-primary text-white font-display text-4xl">
            {c.initiales}
          </div>
          <h1 className="mt-4 font-display text-2xl">{c.nom_complet}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{c.titre}</p>
          <p className="mt-2 text-xs font-mono text-primary">{c.email}</p>
          <div className="mt-4 rounded-md bg-secondary/50 p-3 text-xs">
            <p className="font-medium">{c.institution}</p>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="card-soft p-6">
            <h2 className="font-display text-lg">Spécialité</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.specialite}</p>
          </div>

          <div className="card-soft p-6">
            <h2 className="font-display text-lg">
              Axes de recherche ({data.axes.length})
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {data.axes.map(
                (a: {
                  id: number;
                  nom: string;
                  thematique?: string | null;
                }) => (
                  <li
                    key={a.id}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {a.nom}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="card-soft p-6">
            <h2 className="font-display text-lg">
              Publications ({data.publications.length})
            </h2>
            <ul className="mt-3 space-y-3">
              {data.publications.map(
                (p: {
                  id: number;
                  titre: string;
                  annee: number;
                  type: string;
                  revue?: string | null;
                  est_auteur_principal: boolean;
                }) => (
                  <li key={p.id} className="border-l-2 border-accent pl-3">
                    <p className="font-medium text-sm">
                      {p.titre}{" "}
                      {p.est_auteur_principal && (
                        <span className="ml-1 rounded bg-accent/30 px-1.5 text-[10px] font-semibold">
                          Auteur principal
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.type} · {p.annee} · {p.revue}
                    </p>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="card-soft p-6">
            <h2 className="font-display text-lg">
              Projets ({data.projets.length})
            </h2>
            <ul className="mt-3 space-y-3">
              {data.projets.map(
                (p: {
                  id: number;
                  titre: string;
                  statut: string;
                  role: string | null;
                }) => (
                  <li key={p.id} className="border-l-2 border-primary pl-3">
                    <p className="font-medium text-sm">{p.titre}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.role} · {p.statut}
                    </p>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
