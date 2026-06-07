import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { axes, publications, chercheurs } from "@/data/mock";
import { PageHeader } from "./publications";
import {
  Search,
  Mail,
  ArrowRight,
  BookOpen,
  User,
  Tag,
  Landmark,
  FileText,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/axes")({
  head: () => ({
    meta: [
      { title: "Axes de recherche — UMMISCO" },
      {
        name: "description",
        content:
          "Les quatre axes de recherche de l'UMMISCO : modélisation à base d'agents, IA, capteurs, science citoyenne.",
      },
    ],
  }),
  component: AxesPage,
});

function AxesPage() {
  const { t } = useTranslation();
  const [selectedAxeId, setSelectedAxeId] = useState<number>(1);
  const [pubSearch, setPubSearch] = useState("");
  const [pubTypeFilter, setPubTypeFilter] = useState("All");

  const activeAxe = useMemo(() => {
    return axes.find((a) => a.id === selectedAxeId) || axes[0];
  }, [selectedAxeId]);

  // Filter publications details belonging to the selected axe
  const axePublications = useMemo(() => {
    return publications.filter((p) => p.axe_id === selectedAxeId);
  }, [selectedAxeId]);

  // Filter researchers associated with the selected axe
  const axeResearchers = useMemo(() => {
    return chercheurs.filter((c) => c.axes && c.axes.includes(selectedAxeId));
  }, [selectedAxeId]);

  // Selected types for filter dropdown
  const pubTypes = useMemo(() => {
    return ["All", ...Array.from(new Set(axePublications.map((p) => p.type)))];
  }, [axePublications]);

  // Advanced search/filtration on publications
  const filteredPublications = useMemo(() => {
    return axePublications.filter((p) => {
      // Type Filter
      if (pubTypeFilter !== "All" && p.type !== pubTypeFilter) {
        return false;
      }

      // Keyword Search (title, abstract, journal, authors)
      if (pubSearch.trim() === "") {
        return true;
      }

      const query = pubSearch.toLowerCase();
      const auteursJoined = p.auteurs
        .map((id) =>
          chercheurs.find((c) => c.id === id)?.nom_complet?.toLowerCase(),
        )
        .filter(Boolean)
        .join(" ");

      return (
        p.titre.toLowerCase().includes(query) ||
        p.resume.toLowerCase().includes(query) ||
        p.revue.toLowerCase().includes(query) ||
        auteursJoined.includes(query)
      );
    });
  }, [axePublications, pubSearch, pubTypeFilter]);

  return (
    <>
      <PageHeader
        eyebrow={t("nav.axes", { defaultValue: "Axes de recherche" })}
        title={t("nav.axes", { defaultValue: "Axes de recherche" })}
        sub={t("axes.tagline", {
          defaultValue:
            "Quatre axes structurent la production scientifique de l'unité, autour de la modélisation des systèmes complexes d'intérêt environnemental ou sociétal.",
        })}
      />

      <section className="container-page py-12 space-y-12">
        {/* Interactive Axes Selection Cards */}
        <div>
          <h2 className="font-display text-2xl font-bold text-primary-dark mb-6 text-left flex items-center gap-2">
            <span>🔬</span>
            {t("research.select_axis", {
              defaultValue:
                "Sélectionnez un axe de recherche pour voir ses détails :",
            })}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {axes.map((a, i) => {
              const isActive = a.id === selectedAxeId;
              return (
                <button
                  key={a.id}
                  onClick={() => {
                    setSelectedAxeId(a.id);
                    setPubSearch("");
                    setPubTypeFilter("All");
                  }}
                  type="button"
                  id={`axe-select-btn-${a.id}`}
                  className={`relative overflow-hidden card-soft p-6 text-left transition-all duration-300 cursor-pointer border-t-4 flex flex-col justify-between group h-full ${
                    isActive
                      ? "border-accent bg-accent/[0.04] ring-2 ring-accent/30 shadow-md scale-[1.02]"
                      : "border-primary hover:border-accent hover:shadow-md hover:scale-[1.01]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-accent tracking-wider">
                        AXE {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        {a.thematique}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold leading-snug text-primary-dark group-hover:text-primary transition-colors duration-200">
                      {a.nom}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {a.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-border/55 flex justify-between text-[11px] font-medium text-muted-foreground w-full">
                    <span className="flex items-center gap-1">
                      👥 {a.chercheurs_count}{" "}
                      {t("research.researchers_count", {
                        defaultValue: "chers.",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      📚 {a.publications_count}{" "}
                      {t("research.pubs_count", { defaultValue: "pubs" })}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Panel: Publications & Researchers split */}
        {activeAxe && (
          <div className="p-6 md:p-8 bg-slate-50 border border-border/80 rounded-2xl space-y-8 animate-fade-in shadow-sm text-left">
            {/* Active Axe Overview Banner */}
            <div className="border-b border-border/60 pb-6 relative">
              <div className="absolute top-0 right-0 hidden md:block bg-accent/15 text-accent text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {activeAxe.thematique}
              </div>
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                {t("research.active_axe", { defaultValue: "Axe Actif" })}
              </span>
              <h1 className="font-display text-2xl md:text-3xl font-extrabold text-primary-dark mt-1 leading-tight max-w-3xl">
                {activeAxe.nom}
              </h1>
              <p className="mt-3 text-sm text-foreground/85 leading-relaxed max-w-4xl">
                {activeAxe.description}
              </p>
              <div className="mt-5 text-xs text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="flex items-center gap-1.5 font-medium text-primary-dark">
                  <User className="h-4 w-4 text-accent shrink-0" />
                  {t("research.responsable_by", {
                    defaultValue: "Responsable de l'axe :",
                  })}{" "}
                  <strong className="semibold">{activeAxe.responsable}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Landmark className="h-4 w-4 shrink-0" />
                  {t("research.academic_unit", { defaultValue: "UMMISCO" })}
                </span>
              </div>
            </div>

            {/* Split layout: Main Publications vs "In the Corner" Researchers sidebar */}
            <div className="grid gap-10 lg:grid-cols-[2.4fr_1.1fr]">
              {/* Left Column: Publications with advanced dynamic filters */}
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                  <h2 className="font-display text-xl font-bold text-primary-dark flex flex-wrap items-center gap-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <span>
                      {t("research.associated_publications", {
                        defaultValue: "Publications rattachées",
                      })}
                    </span>
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-normal">
                      {filteredPublications.length}{" "}
                      {t("research.documents_count", {
                        defaultValue:
                          filteredPublications.length > 1
                            ? "documents"
                            : "document",
                      })}
                    </span>
                  </h2>

                  {/* Document Type Filtration Buttons */}
                  {pubTypes.length > 2 && (
                    <div className="flex flex-wrap gap-1.5 shrink-0">
                      {pubTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setPubTypeFilter(type)}
                          type="button"
                          className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-all ${
                            pubTypeFilter === type
                              ? "bg-primary text-white"
                              : "bg-white border border-border hover:bg-slate-100 text-muted-foreground"
                          }`}
                        >
                          {type === "All"
                            ? t("research.filter_all", { defaultValue: "Tous" })
                            : type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Publications Filter Search Bar */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <input
                    type="text"
                    value={pubSearch}
                    onChange={(e) => setPubSearch(e.target.value)}
                    placeholder={t("research.search_publications_placeholder", {
                      defaultValue:
                        "Rechercher par titre, auteur, résumé, revue...",
                    })}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-border rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-hidden transition-all shadow-2xs placeholder:text-muted-foreground"
                  />
                  {pubSearch && (
                    <button
                      onClick={() => setPubSearch("")}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 font-semibold text-xs text-muted-foreground hover:text-primary cursor-pointer"
                      type="button"
                    >
                      {t("research.clear", { defaultValue: "Effacer" })}
                    </button>
                  )}
                </div>

                {/* Filtered Publications list */}
                {filteredPublications.length > 0 ? (
                  <ul className="divide-y divide-border/60 space-y-1">
                    {filteredPublications.map((p) => {
                      const auteurs = p.auteurs
                        .map(
                          (id) =>
                            chercheurs.find((c) => c.id === id)?.nom_complet,
                        )
                        .filter(Boolean)
                        .join(", ");
                      return (
                        <li
                          key={p.id}
                          className="py-5 hover:bg-white/60 px-4 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-100 group text-left"
                        >
                          <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground font-medium">
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-accent font-semibold">
                              <FileText className="h-3 w-3" />
                              {p.type}
                            </span>
                            <span>·</span>
                            <span>{p.annee}</span>
                            {p.revue && (
                              <>
                                <span>·</span>
                                <span className="italic text-primary/80">
                                  {p.revue}
                                </span>
                              </>
                            )}
                          </div>
                          <h3 className="mt-2.5 font-display text-base font-bold text-primary-dark group-hover:text-primary transition-colors leading-snug">
                            {p.titre}
                          </h3>
                          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                            {p.resume}
                          </p>
                          <div className="mt-4 pt-3 border-t border-dashed border-border/40 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <span className="text-accent/80 font-bold">
                                ✏️
                              </span>{" "}
                              {auteurs}
                            </span>
                            <div className="flex items-center gap-4">
                              {p.doi && (
                                <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded">
                                  DOI: {p.doi}
                                </span>
                              )}
                              <Link
                                to="/publications"
                                className="font-bold text-primary group-hover:text-accent flex items-center gap-0.5 hover:underline cursor-pointer"
                              >
                                {t("research.read_more", {
                                  defaultValue: "Consulter",
                                })}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="text-sm text-muted-foreground italic py-10 text-center bg-white border border-dashed rounded-2xl">
                    <p className="font-medium text-slate-400">
                      {t("research.no_pub_found", {
                        defaultValue:
                          "Aucune publication ne correspond aux critères filtrés.",
                      })}
                    </p>
                    <button
                      onClick={() => {
                        setPubSearch("");
                        setPubTypeFilter("All");
                      }}
                      className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
                      type="button"
                    >
                      {t("research.reset_filters", {
                        defaultValue: "Réinitialiser les filtres",
                      })}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column / Sidebar: Researchers Grid & quick card tools */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="font-display text-xl font-bold text-primary-dark flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    <span>
                      {t("research.researchers_of_axis", {
                        defaultValue: "Membres de l'axe",
                      })}
                    </span>
                    <span className="text-xs bg-accent/20 text-primary-dark px-2.5 py-0.5 rounded-full font-bold">
                      {axeResearchers.length}
                    </span>
                  </h2>
                </div>

                {axeResearchers.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {axeResearchers.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 bg-white border border-border/80 rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm uppercase shrink-0">
                            {c.initiales}
                          </div>
                          <div className="min-w-0 space-y-1">
                            <Link
                              to="/chercheurs/$id"
                              params={{ id: String(c.id) }}
                              className="font-bold text-sm text-primary-dark hover:text-primary transition-colors block cursor-pointer"
                            >
                              {c.nom_complet}
                            </Link>
                            <p className="text-xs text-muted-foreground leading-tight">
                              {c.titre}
                            </p>
                            <div className="flex flex-wrap gap-1 text-[10px]">
                              <span className="inline-flex items-center gap-0.5 bg-slate-100 text-muted-foreground px-1.5 py-0.5 rounded-md font-mono">
                                <Landmark className="h-2.5 w-2.5 shrink-0" />
                                {c.institution}
                              </span>
                            </div>
                          </div>
                        </div>

                        {c.specialite && (
                          <p className="mt-3 text-[11px] text-muted-foreground bg-slate-50 p-2 rounded-lg leading-relaxed flex items-start gap-1">
                            <Tag className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{c.specialite}</span>
                          </p>
                        )}

                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                          <Link
                            to="/chercheurs/$id"
                            params={{ id: String(c.id) }}
                            className="inline-flex items-center gap-0.5 text-xs text-primary font-bold group-hover:text-accent hover:underline cursor-pointer"
                          >
                            {t("research.view_profile", {
                              defaultValue: "Profil",
                            })}
                            <ArrowRight className="h-3 w-3" />
                          </Link>

                          {c.email && (
                            <a
                              href={`mailto:${c.email}`}
                              title={t("research.send_email", {
                                defaultValue: "Envoyer un message",
                              })}
                              className="h-7 w-7 rounded-full bg-slate-50 hover:bg-accent/10 text-muted-foreground hover:text-accent flex items-center justify-center transition-colors shadow-2xs border border-border/40 cursor-pointer"
                            >
                              <Mail className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic py-6 text-center bg-white border border-dashed rounded-xl">
                    {t("research.no_researcher_assigned", {
                      defaultValue:
                        "Aucun chercheur affecté directement à cet axe pour le moment.",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
