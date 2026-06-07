import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { projets, statutLabel, chercheurs, axes } from "@/data/mock";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/projets")({
  head: () => ({
    meta: [
      { title: "Projets de Recherche — UMMISCO" },
      {
        name: "description",
        content:
          "Programmes scientifiques financés, partenariats académiques et avancement des projets UMMISCO.",
      },
    ],
  }),
  component: ProjetsPage,
});

const statutClass: Record<string, string> = {
  en_cours: "bg-emerald-100 text-emerald-800 border-emerald-200",
  termine: "bg-slate-100 text-slate-700 border-slate-200",
  suspendu: "bg-rose-100 text-rose-800 border-rose-200",
  planifie: "bg-amber-100 text-amber-800 border-amber-200",
};

// Map projects to realistic progress percentages
function getProjectProgress(
  status: string,
  id: number,
): { percent: number; label: string } {
  if (status === "termine")
    return { percent: 100, label: "Finalisé & Rapports déposés" };
  if (status === "planifie")
    return { percent: 5, label: "Initialisation & Lancement administratif" };
  if (status === "suspendu")
    return { percent: 45, label: "Suspendu temporairement" };

  // Custom milestones for "en_cours" projects based on their database IDs
  switch (id) {
    case 2:
      return {
        percent: 85,
        label: "Phase de test clinique & Calibration des capteurs finie",
      };
    case 3:
      return {
        percent: 60,
        label: "Collecte de données participatives active",
      };
    case 4:
      return {
        percent: 90,
        label: "Rédaction de l'algorithme d'optimisation final",
      };
    case 5:
      return {
        percent: 70,
        label: "Validation des modèles prédictifs auprès de l'OMS",
      };
    case 7:
      return {
        percent: 40,
        label: "Collecte de carottages & Simulations agro-climatiques",
      };
    default:
      return { percent: 50, label: "Milestones intermédiaires atteints" };
  }
}

interface ActionModalInfo {
  isOpen: boolean;
  type: "finance" | "join";
  projectTitle: string;
  projectId: number;
}

function ProjetsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modal, setModal] = useState<ActionModalInfo>({
    isOpen: false,
    type: "finance",
    projectTitle: "",
    projectId: 0,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    institution: "",
    message: "",
  });

  const filteredProjets = projets.filter((p) => {
    const matchesFilter = filter === "all" || p.statut === filter;
    const matchesSearch =
      p.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.thematique.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openActionModal = (
    type: "finance" | "join",
    projectTitle: string,
    projectId: number,
  ) => {
    setModal({
      isOpen: true,
      type,
      projectTitle,
      projectId,
    });
    setFormSubmitted(false);
    setFormData({ nom: "", email: "", institution: "", message: "" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Financements & Partenariats"
        title="Projets de recherche"
        sub="Programmes scientifiques menés en consortium par l'UMMISCO, alliant rigueur académique de modélisation, financements internationaux et impact direct de terrain."
      />

      <section
        className="container-page py-12 space-y-10"
        id="projects-section"
      >
        {/* Dynamic Toolbar: Filtration and quick lookup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-border/60 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-primary-dark uppercase mr-2 block sm:inline">
              Filtrer par statut :
            </span>
            {[
              { val: "all", label: "Tous les projets" },
              { val: "en_cours", label: "En cours ⏳" },
              { val: "termine", label: "Terminés ✅" },
              { val: "planifie", label: "Planifiés 🗺️" },
            ].map((btn) => (
              <button
                key={btn.val}
                onClick={() => setFilter(btn.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 ${
                  filter === btn.val
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white border border-border/80 text-muted-foreground hover:bg-slate-100"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Rechercher par thématique, nom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3.5 py-2 rounded-lg border border-border bg-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Projects Listing Grid */}
        <ul className="grid gap-8 md:grid-cols-2">
          {filteredProjets.map((p) => {
            const progress = getProjectProgress(p.statut, p.id);
            const ax = axes.find((axe) => axe.id === p.axe_id);

            // Link researchers related to this project
            // 1. Principal investigator matching p.responsable
            const principalInvestigator = chercheurs.find(
              (c) =>
                c.nom_complet.toLowerCase() === p.responsable.toLowerCase(),
            );

            // 2. Co-investigator research staff associated with the same axe_id (limit to 3 for visual cleanliness)
            const coInvestigators = chercheurs
              .filter(
                (c) =>
                  c.axes &&
                  c.axes.includes(p.axe_id) &&
                  c.nom_complet !== p.responsable,
              )
              .slice(0, 3);

            return (
              <li
                key={p.id}
                className="card-soft p-8 flex flex-col justify-between h-full border border-border bg-white hover:shadow-md hover:border-primary/30 transition-all duration-300 rounded-2xl text-left"
                id={`project-card-${p.id}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-2">
                      <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase text-primary-dark">
                        {p.thematique}
                      </span>
                      {ax && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.65rem] font-medium text-slate-600">
                          {ax.thematique}
                        </span>
                      )}
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold ${statutClass[p.statut]}`}
                    >
                      {statutLabel(p.statut)}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-primary-dark">
                    {p.titre}
                  </h3>

                  <p className="mt-3 text-sm text-foreground/80 leading-relaxed font-accent">
                    {p.description}
                  </p>

                  {/* 📊 Beautiful Progress Bar Section */}
                  <div className="mt-6 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-primary">
                        Avancement du projet
                      </span>
                      <span className="font-mono font-bold bg-primary-light text-primary px-2 py-0.5 rounded-md">
                        {progress.percent}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground italic leading-none">
                      📌 Statut d'étape : {progress.label}
                    </p>
                  </div>

                  {/* 👥 Dynamic Affiliated Researchers */}
                  <div className="mt-6 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Équipe Projet & Chercheurs Affiliés
                    </h4>
                    <div className="flex flex-col gap-2.5">
                      {/* Principal investigator */}
                      {principalInvestigator ? (
                        <Link
                          to="/chercheurs/$id"
                          params={{ id: String(principalInvestigator.id) }}
                          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors group/resp cursor-pointer"
                        >
                          <div className="h-7 w-7 rounded-full bg-accent/30 text-primary-dark flex items-center justify-center font-bold text-xs uppercase shrink-0">
                            {principalInvestigator.initiales}
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-primary-dark group-hover/resp:text-primary transition-colors flex items-center gap-1.5 leading-tight">
                              {principalInvestigator.nom_complet}
                              <span className="text-[9px] bg-accent/20 text-accent font-extrabold px-1.5 rounded uppercase">
                                Porteur principal
                              </span>
                            </span>
                            <span className="text-[10px] text-muted-foreground block font-mono leading-none">
                              {principalInvestigator.titre} ·{" "}
                              {principalInvestigator.institution}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-sm bg-slate-100 text-slate-500 flex items-center justify-center text-xs">
                            👤
                          </div>
                          <div>
                            <span className="text-xs font-bold text-primary-dark leading-tight">
                              {p.responsable}
                            </span>
                            <span className="text-[10px] text-muted-foreground block leading-none">
                              Porteur principal
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Co-investigators staff list */}
                      {coInvestigators.length > 0 && (
                        <div className="mt-1 pt-1.5 border-t border-dashed border-border/50">
                          <p className="text-[10px] text-muted-foreground font-medium mb-1">
                            Co-chercheurs de l'axe :
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {coInvestigators.map((co) => (
                              <Link
                                key={co.id}
                                to="/chercheurs/$id"
                                params={{ id: String(co.id) }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-primary/40 rounded-full text-xs font-medium text-primary-dark cursor-pointer transition-all"
                              >
                                <span className="h-4 w-4 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[8px] uppercase">
                                  {co.initiales}
                                </span>
                                <span>
                                  {co.nom_complet.split(" ").slice(-1)[0]}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Financial metadata details & Bailleurs */}
                  <dl className="mt-6 pt-4 border-t border-border/40 grid grid-cols-2 gap-y-3.5 text-xs">
                    <div>
                      <dt className="text-muted-foreground font-medium flex items-center gap-1">
                        🏦 Bailleur Principal
                      </dt>
                      <dd className="font-bold text-primary-dark mt-0.5">
                        {p.bailleur}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground font-medium flex items-center gap-1">
                        💰 Budget global
                      </dt>
                      <dd className="font-mono font-bold text-primary mt-0.5">
                        {p.budget}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-muted-foreground font-medium flex items-center gap-1">
                        🤝 Partenaires Associés
                      </dt>
                      <dd className="text-foreground/90 mt-1 flex flex-wrap gap-1">
                        {p.partenaires.map((part, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold text-[10px] transition-colors"
                          >
                            {part}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* 🎯 Interactive Calls to Action (Contact & Funding support buttons) */}
                <div className="mt-8 pt-4 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <button
                    onClick={() => openActionModal("finance", p.titre, p.id)}
                    className="w-full text-center py-2.5 px-3 bg-accent text-primary-dark font-extrabold hover:bg-accent-dark transition-all rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-xs border border-accent"
                    id={`finance-btn-${p.id}`}
                  >
                    🪙 Financer ce projet & Join us
                  </button>
                  <button
                    onClick={() => openActionModal("join", p.titre, p.id)}
                    className="w-full text-center py-2.5 px-3 bg-primary text-white font-semibold hover:bg-primary-dark transition-all rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5"
                    id={`join-btn-${p.id}`}
                  >
                    🤝 Rejoindre l'équipe & Contact us
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {filteredProjets.length === 0 && (
          <div className="text-center py-12 bg-slate-50 border border-dashed rounded-2xl">
            <p className="text-sm text-muted-foreground italic">
              Aucun projet ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </section>

      {/* 📧 IMMERSIVE DIRECT-ACTION MODAL */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-up text-left border border-border"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div
              className={`p-6 border-b border-border/60 flex justify-between items-start ${
                modal.type === "finance" ? "bg-accent/10" : "bg-primary/5"
              }`}
            >
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    modal.type === "finance"
                      ? "bg-accent text-primary-dark"
                      : "bg-primary text-white"
                  }`}
                >
                  {modal.type === "finance"
                    ? "Soutien Financier & Co-Partenariat"
                    : "Candidature & Co-Travail"}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold leading-tight text-primary-dark">
                  {modal.type === "finance"
                    ? "Investir / Financer ce projet"
                    : "Participer au programme de recherche"}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-accent line-clamp-1">
                  Projet : {modal.projectTitle}
                </p>
              </div>
              <button
                onClick={() => setModal({ ...modal, isOpen: false })}
                className="text-muted-foreground hover:text-foreground text-2xl font-bold leading-none p-1 cursor-pointer"
                title="Clore"
              >
                &times;
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h4 className="font-display text-xl font-bold text-primary-dark">
                    Inquiétude enregistrée !
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed font-accent max-w-sm mx-auto">
                    {modal.type === "finance"
                      ? "Merci pour votre intérêt financier. Votre proposition a été transmise à la direction de l'unité UMMISCO (Dakar/Bondy) et au responsable scientifique du projet. Une convention d'accord vous sera adressée sous peu."
                      : "Votre demande d'intégration de recherche a été notifiée avec succès au porteur du projet. Nous analyserons votre profil (académique, doctorat, ou professionnel externe) rapidement."}
                  </p>
                  <button
                    onClick={() => setModal({ ...modal, isOpen: false })}
                    className="mt-4 px-5 py-2 bg-slate-900 hover:bg-primary text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Continuer la navigation
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-4 text-xs font-sans"
                >
                  <div>
                    <label className="block text-primary-dark font-bold mb-1">
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nom}
                      onChange={(e) =>
                        setFormData({ ...formData, nom: e.target.value })
                      }
                      placeholder="Ex : Pr. Jean-Marc LENOIR / Mme Awa DIOP"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-primary-dark font-bold mb-1">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="nom@organisme.org"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-primary-dark font-bold mb-1">
                        Organisme / Institution *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.institution}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            institution: e.target.value,
                          })
                        }
                        placeholder="Ex : AFD, CNRS, Université, Banque Mondiale"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-primary-dark font-bold mb-1">
                      {modal.type === "finance"
                        ? "Détails financiers & Conditions d'attribution *"
                        : "Lettre de motivation succincte & Thème de compétences *"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={
                        modal.type === "finance"
                          ? "Précisez l'enveloppe budgétaire estimée, les modalités contractuelles ou co-financements souhaités."
                          : "Décrivez brièvement vos expériences antérieures, vos publications ou votre niveau d'études (Master, PhD, Ingénieur) pour postuler."
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-xs leading-relaxed"
                    />
                  </div>

                  <p className="text-[10px] text-muted-foreground leading-normal">
                    * En soumettant ce formulaire, vos coordonnées seront
                    transmises de manière sécurisée aux comités de l'UMMISCO
                    conformément aux règles de co-tutelles IRD/UCAD.
                  </p>

                  <div className="pt-4 border-t border-border flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setModal({ ...modal, isOpen: false })}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-muted-foreground font-bold rounded-lg cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className={`px-5 py-2 font-bold text-white rounded-lg transition-colors cursor-pointer ${
                        modal.type === "finance"
                          ? "bg-accent text-primary-dark hover:bg-accent/80"
                          : "bg-primary hover:bg-primary-dark"
                      }`}
                    >
                      {modal.type === "finance"
                        ? "Soumettre l'accord financier"
                        : "Envoyer ma candidature directe"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
