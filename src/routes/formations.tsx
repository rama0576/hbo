import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formations } from "@/data/mock";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/formations")({
  head: () => ({
    meta: [
      { title: "Formations et Enseignements — UMMISCO" },
      {
        name: "description",
        content:
          "Formations d'excellence de l'UMMISCO : Masters, doctorats académiques, formations professionnelles continues pour décideurs, ingénieurs et acteurs territoriaux du Sud.",
      },
    ],
  }),
  component: FormationsPage,
});

// Augmented list of formations to include vocational bootcamps targeted specifically at non-researchers (general public, territorial actors, decision makers)
type FormationItem = {
  id: number;
  intitule: string;
  niveau: string;
  duree: string;
  institution: string;
  description: string;
  publicCible?: string;
  places?: string[];
  placesExplanation?: string;
};

const formationsAugmented: FormationItem[] = [
  ...formations,
  {
    id: 4,
    intitule:
      "Certificat Pro : Modélisation d'aide à la décision pour gestion des risques",
    niveau: "Formation professionnelle (Non-Chercheurs)",
    duree: "4 semaines (Hybride)",
    institution: "UMMISCO — Enseignement Professionnel",
    description:
      "Cursus d'initiation intensif destiné aux décideurs publics, membres d'ONGs et coordinateurs de santé. Apprenez à interpréter et exploiter des modèles simulés de propagation de crises sans prérequis en programmation.",
    publicCible:
      "Décideurs, Urbanistes, Cadres de Santé, Coordinateurs humanitaires",
    places: [
      "Campus UCAD (Sénégal)",
      "Centres régionaux",
      "Plateforme e-Learning",
    ],
    placesExplanation:
      "Disponible en formule hybride avec ateliers pratiques en présentiel à l'UCAD Dakar et modules tutorisés en ligne.",
  },
  {
    id: 5,
    intitule:
      "Atelier Pratique : GAMA pour les acteurs de l'environnement et du climat",
    niveau: "Atelier technique (Professionnels)",
    duree: "1 semaine",
    institution: "IRD — Bondy / Co-tutelles régionales",
    description:
      "Atelier méthodologique d'intégration des Systèmes d'Information Géographiques (SIG) avec la plateforme de simulation GAMA. Conçu pour les ingénieurs territoriaux, cartographes et agronomes praticiens.",
    publicCible:
      "Cartographes, Agronomes, Ingénieurs environnementaux, Techniciens",
    places: ["Bondy (France)", "Yaoundé (Cameroun)", "Hybride"],
    placesExplanation:
      "Organisé simultanément en visioconférence internationale et en ateliers présentiels synchronisés pour favoriser la pratique directe.",
  },
];

// High fidelity details of research nodes / places of training
const locationsRegistry = [
  {
    code: "DAKAR",
    name: "UCAD — Dakar, Sénégal (Département d'Informatique, FST)",
    role: "Hub Majeur d'Afrique de l'Ouest",
    type: "Présentiel & Laboratoires de recherche",
    description:
      "Le quartier général ouest-africain. Équipé de clusters de calcul, de salles de modélisation simulation dédiées aux Masters et Doctorats. C'est l'épicentre d'apprentissage de la plateforme de simulation d'agents GAMA pour l'analyse des épidémies régionales.",
    impact: "Formations doctorales complètes, ateliers d'ingénierie publique.",
  },
  {
    code: "BONDY",
    name: "IRD — Bondy, Île-de-France",
    role: "Plateforme de Co-tutelle Européenne & Clusters",
    type: "Présentiel, Hybride & Stages d'échange",
    description:
      "Le pôle européen accueillant les chercheurs post-doctoraux du Sud inscrits en cotutelles de thèses. Assure des infrastructures technologiques de très haute performance et des cours de programmation spécialisés multi-agents pour chercheurs seniors.",
    impact:
      "Soutien logistique informatique, écoles thématiques internationales.",
  },
  {
    code: "ANTANANARIVO",
    name: "Université d'Antananarivo — Madagascar",
    role: "Pôle d'Épidémiologie & Biosecurité",
    type: "Ateliers de terrain & Écoles régionales",
    description:
      "Spécialisé dans la modélisation spatiale de la transmission biologique (peste, paludisme) et l'aide à la décision éco-épidémiologique au cœur de la faune unique de l'Océan Indien.",
    impact: "Modules d'études de terrain pour les écologues et vétérinaires.",
  },
  {
    code: "YAOUNDE",
    name: "Université de Yaoundé I — Cameroun",
    role: "Centre d'Informatique Environnementale & AgroClimat",
    type: "Présentiel & Classes virtuelles",
    description:
      "Met l'accent sur la gestion durable des massifs forestiers du bassin du Congo et les simulations de transition agro-environnementale de grande envergure.",
    impact: "Masters professionnels d'ingénierie logicielle et foresterie.",
  },
  {
    code: "OUAGADOUGOU",
    name: "Université Joseph Ki-Zerbo — Burkina Faso",
    role: "Laboratoire de Dynamique Urbaine",
    type: "Groupes de travail & Cursus territorial",
    description:
      "Focalisé sur la modélisation à base d'agents de la croissance urbaine accélérée au Sahel, de la gestion de l'eau et des simulations de mobilités des populations transfrontalières.",
    impact: "Recherche-action appliquée au développement des municipalités.",
  },
  {
    code: "ONLINE",
    name: "Plateforme e-Learning GAMA-GIS (Distanciel)",
    role: "Portail d'Éducation Ouverte sans frontières",
    type: "100% Virtuel / Auto-formation assistée",
    description:
      "Destiné au grand public, étudiants isolés ou consultants internationaux voulant monter en compétences sur la manipulation des données géographiques et de simulation écosystémique sans engager de déplacements.",
    impact:
      "Certificats d'aptitude en ligne, supports interactifs en libre accès.",
  },
];

function FormationsPage() {
  const [selectedFormation, setSelectedFormation] =
    useState<FormationItem | null>(null);
  const [activeAudience, setActiveAudience] = useState<
    "all" | "academic" | "professional"
  >("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("DAKAR");

  const activeLocInfo =
    locationsRegistry.find((l) => l.code === selectedLocation) ||
    locationsRegistry[0];

  const getSyllabusDetails = (item: FormationItem) => {
    const isMaster = item.niveau.toLowerCase().includes("master");
    const isDoctorate = item.niveau.toLowerCase().includes("doctorat");
    const isProfessional =
      item.niveau.toLowerCase().includes("professionnelle") || item.id >= 4;

    let prerequisites =
      "Licence en Informatique ou domaine scientifique équivalent.";
    let modules = [
      "Introduction aux systèmes complexes",
      "Prise en main de GAMA",
      "Modélisation participative",
    ];
    let audience = "Étudiants en informatique et modélisation complexe.";

    if (isMaster) {
      prerequisites =
        "Licence (Bac+3) en Informatique, Mathématiques Appliquées, ou domaine scientifique équivalent.";
      modules = [
        "Modélisation et simulation à base d'agents (initiation et perfectionnement sur GAMA)",
        "Analyse statistique de données massives (Big Data) & Machine Learning",
        "Épidémiologie mathématique et modélisation de la dynamique des populations",
        "Calcul distribué et optimisation des simulations complexes de grande échelle",
      ];
      audience =
        "Futurs chercheurs, ingénieurs d'études climatiques et sanitaires.";
    } else if (isDoctorate) {
      prerequisites =
        "Master de Recherche en Informatique, IA, Modélisation, ou Mathématiques.";
      modules = [
        "Méthodologies avancées de la recherche scientifique et rédaction d'articles indexés",
        "Analyse mathématique des systèmes dynamiques et des théories du chaos",
        "Soutenances de pré-thèses, revues de littérature exhaustives",
        "Participation active aux projets de recherche nationaux et internationaux de l’UMMISCO",
      ];
      audience =
        "Futurs docteurs universitaires, directeurs de recherche, consultants de haut niveau.";
    } else if (isProfessional) {
      prerequisites =
        "Aucun prérequis technique ou de programmation nécessaire. Connaissances de base des tableurs (Excel) appréciées.";
      modules = [
        "Concepts clés des simulations d'aide à la décision publique",
        "Lecture et interprétation critique des indicateurs de propagation de crise",
        "Ateliers d'élaboration de scenarii d'urgence (Climat, Épidémies, Transports)",
        "Co-construction d'outils interactifs de dashboarding pour l'administration publique",
      ];
      audience =
        "Décideurs, cadres territoriaux, urbanistes municipaux, membres d'ONGs.";
    }

    return {
      prerequisites,
      modules,
      contact: "formations@ummisco.ucad.sn",
      location:
        item.institution.includes("Dakar") || item.id === 4
          ? "Campus de l'UCAD (Dakar, Sénégal) / Faculté des Sciences (FST)"
          : item.id === 5
            ? "IRD Bondy (France) & Antenne Yaoundé (Cameroun) simultanément"
            : "Centres de Recherche UMMISCO (Dakar, Bondy, Antananarivo, Yaoundé, Ouagadougou)",
      audience,
    };
  };

  const filteredFormations = formationsAugmented.filter((f) => {
    if (activeAudience === "academic") {
      return (
        f.niveau.toLowerCase().includes("master") ||
        f.niveau.toLowerCase().includes("doctorat")
      );
    }
    if (activeAudience === "professional") {
      return (
        f.niveau.toLowerCase().includes("professionnelle") ||
        f.niveau.toLowerCase().includes("continue") ||
        f.niveau.toLowerCase().includes("atelier")
      );
    }
    return true;
  });

  return (
    <>
      <PageHeader
        eyebrow="Transmettre le savoir scientifique"
        title="Formations & Enseignement"
        sub="L'UMMISCO accompagne la montée en compétences des universitaires du Sud ainsi que la professionnalisation des décideurs et cadres de terrain non-chercheurs."
      />

      {/* Main Formations Section */}
      <section className="container-page py-12 space-y-12">
        {/* Course Target Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 border rounded-xl text-left">
          <div>
            <h3 className="font-display font-bold text-primary-dark text-sm">
              Target Audience / Choisissez votre profil d'études :
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Parcourez les offres académiques avancées ou les certificats
              décideurs publics.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: "all", name: "Tous les cursus" },
              { id: "academic", name: "Voie Académique (Masters, Ph.D) 🎓" },
              {
                id: "professional",
                name: "Voie Pro & Non-Chercheurs (Décideurs, Agents) 👔",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveAudience(
                    tab.id as "all" | "academic" | "professional",
                  )
                }
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                  activeAudience === tab.id
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white border text-muted-foreground hover:bg-slate-100"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Formations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFormations.map((f) => {
            const isProfessional =
              f.niveau.toLowerCase().includes("professionnelle") || f.id >= 4;
            return (
              <article
                key={f.id}
                className={`card-soft p-6 flex flex-col justify-between h-full border-t-4 transition-all duration-300 hover:shadow-md ${
                  isProfessional
                    ? "border-t-accent bg-amber-50/10"
                    : "border-t-primary"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        isProfessional
                          ? "bg-accent/30 text-primary-dark"
                          : "bg-primary text-white"
                      }`}
                    >
                      {f.niveau}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono font-semibold">
                      ⏱ Duration: {f.duree}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-extrabold leading-tight text-primary-dark">
                    {f.intitule}
                  </h3>

                  <p className="mt-1 text-xs text-primary font-medium flex items-center gap-1">
                    🏛️ {f.institution}
                  </p>

                  <p className="mt-4 text-xs text-foreground/80 leading-relaxed font-accent">
                    {f.description}
                  </p>

                  {f.publicCible && (
                    <div className="mt-4 p-2 bg-slate-50 border border-border/40 rounded text-[11px]">
                      <span className="font-bold text-primary-dark block text-[10px] uppercase">
                        Public visé :
                      </span>
                      <span className="text-foreground/80">
                        {f.publicCible}
                      </span>
                    </div>
                  )}

                  {f.places && (
                    <div className="mt-3 flex items-center flex-wrap gap-1">
                      <span className="text-[10px] text-muted-foreground font-bold mr-1">
                        Lieux d'enseignement :
                      </span>
                      {f.places.map((p, idx) => (
                        <span
                          key={idx}
                          className="bg-white border rounded px-1.5 py-0.5 text-[9px] font-bold text-primary-dark"
                        >
                          📍 {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-border/40 flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground italic">
                    {isProfessional
                      ? "Formation Grand Public"
                      : "Formation Académique"}
                  </span>
                  <button
                    onClick={() => setSelectedFormation(f)}
                    className="inline-flex items-center text-xs font-bold text-primary hover:text-accent cursor-pointer transition-colors"
                  >
                    Programme détaillé & Syllabus →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 🗺️ INTERACTIVE PLACES EXPLORER SECTION */}
      <section className="bg-slate-100/75 py-16 border-t border-b border-border/60 text-left">
        <div className="container-page">
          <p className="eyebrow text-accent font-bold uppercase">
            Maillage Territorial International
          </p>
          <h2 className="font-display text-3xl font-extrabold text-primary-dark mt-2 leading-tight">
            Les Lieux d'Apprentissage & Antennes UMMISCO
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
            L'UMMISCO n'est pas un laboratoire centralisé, mais une unité mixte
            internationale partagée entre l'Afrique sub-saharienne et l'Europe.
            Découvrez la signification et les spécialités enseignées par antenne
            territoriale :
          </p>

          <div className="grid gap-8 mt-10 lg:grid-cols-[1.2fr_2fr]">
            {/* Left Button Rail */}
            <div className="flex flex-col gap-2">
              {locationsRegistry.map((loc) => {
                const isSelected = selectedLocation === loc.code;
                return (
                  <button
                    key={loc.code}
                    onClick={() => setSelectedLocation(loc.code)}
                    className={`p-4 rounded-xl text-left transition-all duration-150 cursor-pointer border flex justify-between items-center ${
                      isSelected
                        ? "bg-white border-primary shadow-xs ring-1 ring-primary/20"
                        : "bg-white/65 hover:bg-white border-transparent text-muted-foreground"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono tracking-widest font-extrabold block text-accent uppercase leading-none mb-1">
                        {loc.role}
                      </span>
                      <span className="font-semibold text-xs text-primary-dark leading-tight block">
                        📍 {loc.name.split(" — ")[0]}
                      </span>
                    </div>
                    <span className="text-sm">➜</span>
                  </button>
                );
              })}
            </div>

            {/* Right details card panel */}
            <div className="bg-white border p-8 rounded-2xl shadow-xs space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                      Antenne de co-tutelle officielle
                    </span>
                    <h3 className="font-display text-xl font-bold text-primary-dark mt-1 leading-tight">
                      📍 {activeLocInfo.name}
                    </h3>
                  </div>
                  <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none">
                    {activeLocInfo.type}
                  </span>
                </div>

                <div className="space-y-4 justify-start text-xs mt-6">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-primary tracking-widest mb-1.5">
                      Mission d'Enseignement & Recherche :
                    </h4>
                    <p className="text-foreground/80 text-sm leading-relaxed font-accent">
                      {activeLocInfo.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/30">
                    <h4 className="text-[10px] font-bold uppercase text-primary tracking-widest mb-1.5">
                      Impact sur les étudiants & Apprenants :
                    </h4>
                    <p className="text-foreground/90 font-medium text-xs">
                      ⚡ {activeLocInfo.impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informative footer for places */}
              <div className="bg-slate-50 border p-3.5 rounded-lg text-[11px] mt-6 leading-relaxed">
                ℹ️ <strong>Que signifie ce maillage ?</strong> Cette
                délocalisation permet aux étudiants d'obtenir des diplômes de
                niveau européen (Co-tutelles Sorbonne Université) tout en menant
                leurs thèses, collectes de capteurs de qualité de l'air ou
                applications épidémiologiques au plus près des besoins réels des
                populations sénégalaises, burkinabés, malgaches ou
                camerounaises.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive program detail modal overlay */}
      {selectedFormation &&
        (() => {
          const specs = getSyllabusDetails(selectedFormation);
          const isProfessional = selectedFormation.id >= 4;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in text-left">
              <div
                className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up border"
                role="dialog"
                aria-modal="true"
              >
                {/* Header */}
                <div
                  className={`p-6 border-b border-border bg-slate-50 flex justify-between items-start ${
                    isProfessional ? "bg-accent/5" : "bg-primary/5"
                  }`}
                >
                  <div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white mr-3 ${
                        isProfessional
                          ? "bg-accent text-primary-dark"
                          : "bg-primary"
                      }`}
                    >
                      {selectedFormation.niveau}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight text-primary-dark">
                      {selectedFormation.intitule}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Organisme d'Attribution : {selectedFormation.institution}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFormation(null)}
                    className="text-muted-foreground hover:text-foreground text-2xl font-semibold leading-none p-1 cursor-pointer"
                    title="Fermer"
                  >
                    &times;
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto space-y-5 text-sm">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                      Description du Programme
                    </h4>
                    <p className="text-foreground/80 leading-relaxed font-accent text-sm">
                      {selectedFormation.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                      Profil du Public cible
                    </h4>
                    <p className="text-foreground/90 font-medium leading-relaxed bg-slate-50 border-l-4 border-primary p-3 rounded-r text-xs">
                      {specs.audience}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                      Conditions d'accès & Prérequis
                    </h4>
                    <p className="text-foreground/80 leading-relaxed bg-slate-50 border-l-4 border-accent p-3 rounded-r text-xs">
                      {specs.prerequisites}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                      Modules clés étudiés durant le cursus
                    </h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-foreground/80 text-xs">
                      {specs.modules.map((mod, i) => (
                        <li key={i}>{mod}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="font-semibold text-muted-foreground block">
                        Lieux physiques rattachés :
                      </span>
                      <span className="text-foreground font-medium">
                        {specs.location}
                      </span>
                      {selectedFormation.placesExplanation && (
                        <span className="block text-[10px] text-muted-foreground mt-1 leading-normal">
                          💡 {selectedFormation.placesExplanation}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-muted-foreground block">
                        Durée d'exécution globale :
                      </span>
                      <span className="text-foreground font-medium">
                        {selectedFormation.duree}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-slate-50 flex flex-wrap gap-2 justify-between items-center text-xs">
                  <div>
                    <span className="text-muted-foreground block">
                      Besoin d’informations pour s’inscrire ou auditer ?
                    </span>
                    <a
                      href={`mailto:${specs.contact}`}
                      className="text-primary font-bold hover:underline"
                    >
                      {specs.contact}
                    </a>
                  </div>
                  <button
                    onClick={() => setSelectedFormation(null)}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition cursor-pointer"
                  >
                    Fermer le syllabus
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
