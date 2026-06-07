import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./publications";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ressources")({
  head: () => ({
    meta: [
      { title: "Ressources & Logiciels — UMMISCO" },
      {
        name: "description",
        content:
          "Découvrez les plateformes de modélisation, simulateurs et bibliothèques logicielles open-source conçus par l'UMMISCO.",
      },
    ],
  }),
  component: RessourcesPage,
});

type Software = {
  id: number;
  name: string;
  category: string;
  version: string;
  licence: string;
  developers: string[];
  description: string;
  languages: string[];
  websiteUrl: string;
  githubUrl?: string;
  targetLinkTitle: string;
};

const softwares: Software[] = [
  {
    id: 1,
    name: "GAMA Platform",
    category: "Simulation Multi-Agents",
    version: "v1.9.3",
    licence: "GPL-3.0",
    developers: [
      "Pr. Alexis Drogoul (UMMISCO / IRD)",
      "Dr. Patrick Taillandier (INRAE)",
      "Dr. Benoit Gaudou (Sorbonne University)",
    ],
    description:
      "Une plate-forme de simulation de développement intégrée permettant de concevoir, d'expérimenter et de visualiser des modèles à base d'agents avec des données spatiales SIG complexes.",
    languages: ["Java", "GAML (GAMA Modeling Language)"],
    websiteUrl: "https://gama-platform.org",
    githubUrl: "https://github.com/gama-platform/gama",
    targetLinkTitle: "Visiter gama-platform.org",
  },
  {
    id: 2,
    name: "COMOKIT (Covid-19 Modeling Kit)",
    category: "Épidémiologie Spatiale",
    version: "v2.1",
    licence: "GPL-3.0",
    developers: [
      "Pr. Alexis Drogoul (UMMISCO)",
      "Dr. Damien Philippon (IRD)",
      "Dr. Tri Nguyen Huu (IRD)",
    ],
    description:
      "Une boîte à outils générique de modélisation multi-agents pour simuler et évaluer l'impact des différentes interventions d'atténuation (quarantaines, distanciation, masques) de la COVID-19 à l'échelle d'une ville.",
    languages: ["GAML", "GAMA"],
    websiteUrl: "https://gama-platform.org/covid19",
    githubUrl: "https://github.com/gama-platform/comokit",
    targetLinkTitle: "Voir sur GitHub",
  },
  {
    id: 3,
    name: "SIMID",
    category: "Données & Épidémiologie",
    version: "v1.0.2",
    licence: "MIT",
    developers: [
      "Dr. Moussa Diop (UCAD / UMMISCO)",
      "Pr. Fatoumata Sall (UCAD)",
    ],
    description:
      "Outil d'analyse statistique et de prédiction épidémiologique pour la modélisation compartimentale de la dengue et de la grippe saisonnière au Sénégal (Dakar, Saint-Louis, Kaolack).",
    languages: ["R", "Python", "C++"],
    websiteUrl: "https://ummisco.ucad.sn/simid",
    targetLinkTitle: "Accéder au portail SIMID",
  },
  {
    id: 4,
    name: "PÉRISCOPE",
    category: "Gestion des Risques",
    version: "v1.5",
    licence: "CeCILL",
    developers: ["Pr. Ousmane Sow (UGB / UMMISCO)", "Dr. Marie Thiam (ESP)"],
    description:
      "Système intégré d'aide à la décision pour la simulation multi-risques (inondations et pollution estuarienne) et l'aide à l'aménagement territorial de la région côtière de de Saint-Louis du Sénégal.",
    languages: ["JavaScript", "Python", "GIS API"],
    websiteUrl: "https://ummisco.ugb.sn/periscope",
    targetLinkTitle: "Consulter la documentation",
  },
  {
    id: 5,
    name: "DengueMAS",
    category: "Maladies Vectorielles",
    version: "v1.1.0",
    licence: "GPL-3.0",
    developers: [
      "Dr. Cheikh Gueye (IRD / UMMISCO)",
      "Dr. Khadija Diallo (IRD)",
    ],
    description:
      "Modèle de simulation intégrant l'environnement, les dynamiques saisonnières de population du vecteur Aedes aegypti et le comportement des populations humaines de Dakar pour l'évaluation des interventions de lutte vectorielle.",
    languages: ["Java", "GAMA", "R"],
    websiteUrl: "https://github.com/ummisco/denguemas",
    githubUrl: "https://github.com/ummisco/denguemas",
    targetLinkTitle: "Voir les sources",
  },
];

function RessourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Logiciels & Outils"
        title="Ressources UMMISCO"
        sub="Les solutions logicielles de simulation, de modélisation mathématique et informatique des systèmes complexes développées par nos chercheurs."
      />

      <section className="container-page py-12">
        {/* Intro */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-display text-2xl text-primary-dark mb-4">
            🔬 Science ouverte et transfert technologique
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Conformément à nos engagements pour une science ouverte et durable,
            nos équipes développent et distribuent de façon transparente
            l'intégralité de nos innovations computationnelles. Ces simulateurs
            et outils fournissent à nos partenaires au Sénégal (UCAD, UGB, ESP)
            et à l'international des infrastructures puissantes d'aide à la
            décision territoriale et sanitaire.
          </p>
        </div>

        {/* Software Cards list */}
        <div className="grid gap-8 lg:grid-cols-2">
          {softwares.map((sw) => (
            <div
              key={sw.id}
              className="card-soft p-6 flex flex-col justify-between border-t-4 border-primary hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                    {sw.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      {sw.version}
                    </span>
                    <span className="font-mono text-[10px] text-primary bg-accent/20 px-2 py-0.5 rounded font-bold">
                      {sw.licence}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-2xl text-primary-dark font-bold leading-tight mb-3">
                  {sw.name}
                </h3>

                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  {sw.description}
                </p>

                {/* Micro tech specs */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {sw.languages.map((l) => (
                      <span
                        key={l}
                        className="font-mono text-[11px] bg-secondary px-2 py-0.5 text-secondary-foreground rounded"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Authors / Developers */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Auteurs & Développeurs
                  </h4>
                  <ul className="text-xs space-y-1 text-foreground/70">
                    {sw.developers.map((dev) => (
                      <li key={dev}>• {dev}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                <a
                  href={sw.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm text-primary hover:text-accent hover:underline flex items-center gap-1"
                >
                  🌐 {sw.targetLinkTitle}
                </a>

                {sw.githubUrl && (
                  <a
                    href={sw.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted-foreground hover:text-primary leading-none"
                  >
                    📂 Code source (GitHub) →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner to redirect to contributors */}
        <div className="mt-16 card-soft p-8 bg-gradient-to-r from-primary to-primary-dark text-white border-0 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-display text-xl text-white font-bold mb-2">
              Vous souhaitez contribuer ou intégrer ces outils ?
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Nos chercheurs organisent régulièrement des séminaires de prise en
              main au Sénégal, notamment à l'UCAD ou au sein de l'école
              supérieure polytechnique (ESP). Contactez-nous pour organiser des
              ateliers de formation ou introduire de nouveaux modèles dans notre
              bibliothèque.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-primary-dark hover:brightness-95 transition"
          >
            Contacter nos développeurs
          </Link>
        </div>
      </section>
    </>
  );
}
