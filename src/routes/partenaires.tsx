import { createFileRoute } from "@tanstack/react-router";
import { partenaires } from "@/data/mock";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Partenaires — UMMISCO" },
      {
        name: "description",
        content:
          "Le réseau international de partenaires académiques et institutionnels de l'UMMISCO.",
      },
    ],
  }),
  component: PartenairesPage,
});

function getPartnerLink(id: number): string {
  switch (id) {
    case 1:
      return "https://www.sorbonne-universite.fr";
    case 2:
      return "https://www.ucad.sn";
    case 3:
      return "https://www.ugb.sn";
    case 4:
      return "https://www.univ-antananarivo.mg";
    case 5:
      return "https://www.ujkz.bf";
    case 6:
      return "https://www.uy1.uninet.cm";
    case 7:
      return "https://www.pasteur.sn";
    case 8:
      return "https://www.cirad.fr";
    default:
      return "https://www.ucad.sn";
  }
}

function PartenairesPage() {
  const parPays = partenaires.reduce<Record<string, typeof partenaires>>(
    (acc, p) => {
      (acc[p.pays] ||= []).push(p);
      return acc;
    },
    {},
  );

  return (
    <>
      <PageHeader
        eyebrow="Réseau"
        title="Partenaires"
        sub="Un réseau de partenaires académiques et institutionnels au Nord comme au Sud, structuré autour de l'IRD, de l'UCAD et de Sorbonne Université."
      />
      <section className="container-page py-12 space-y-10">
        {Object.entries(parPays).map(([pays, list]) => (
          <div key={pays}>
            <h2 className="font-display text-xl text-primary-dark border-b-2 border-accent inline-block pb-1 mb-5">
              🌍 {pays}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => {
                const partnerUrl = getPartnerLink(p.id);
                return (
                  <a
                    key={p.id}
                    href={partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-soft p-5 flex flex-col justify-between h-full border border-border/50 hover:border-primary/40 hover:shadow-md transition-all duration-200 group cursor-pointer text-left"
                    id={`partner-card-${p.id}`}
                  >
                    <div>
                      <span className="inline-block rounded-full bg-accent/20 px-2.5 py-1 text-[0.7rem] font-bold text-primary-dark">
                        {p.type}
                      </span>
                      <h3 className="mt-3 font-display text-base font-semibold text-primary-dark group-hover:text-primary transition-colors leading-tight">
                        {p.nom}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        📍 {p.ville}, {p.pays}
                      </p>
                      <p className="mt-3 text-sm text-foreground/85 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-border/30 flex justify-end">
                      <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                        Aller vers le site universitaire →
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
