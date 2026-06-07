import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  axes,
  publications,
  evenements,
  actualites,
  stats,
  SITE,
} from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UMMISCO — Unité de Modélisation des Systèmes Complexes" },
      {
        name: "description",
        content:
          "Portail officiel UMMISCO : modélisation mathématique et informatique des systèmes complexes. Publications, projets, chercheurs, datasets et événements.",
      },
    ],
  }),
  component: Home,
});

type ActualiteItem = (typeof actualites)[number];
type EvenementItem = (typeof evenements)[number];

function Home() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "fr");
  const [mounted, setMounted] = useState(false);
  const [selectedActualite, setSelectedActualite] =
    useState<ActualiteItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EvenementItem | null>(
    null,
  );

  // States for interactive forms
  const [newsFormNom, setNewsFormNom] = useState("");
  const [newsFormEmail, setNewsFormEmail] = useState("");
  const [newsFormMessage, setNewsFormMessage] = useState("");
  const [newsFormSuccess, setNewsFormSuccess] = useState(false);

  const [eventFormNom, setEventFormNom] = useState("");
  const [eventFormEmail, setEventFormEmail] = useState("");
  const [eventFormInstitution, setEventFormInstitution] = useState("");
  const [eventFormStatut, setEventFormStatut] = useState("Doctorant");
  const [eventFormSuccess, setEventFormSuccess] = useState(false);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng || "fr");
    };
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getEnrichedNewsContent = (item: ActualiteItem) => {
    return [
      item.resume,
      "Cette initiative majeure s'inscrit au cœur des axes prioritaires de recherche de l'UMMISCO, visant à renforcer le transfert technologique et le développement d'outils collaboratifs innovants. Plusieurs groupes de travail menés par les universités partenaires (UCAD, UGB) sont actuellement mobilisés.",
      "Le déploiement de ces nouveaux modèles complexes permettra aux décideurs locaux de mieux appréhender les risques environnementaux et d'accélérer les démarches d'adaptation climatique à l'échelle territoriale. Les sessions pratiques de formation se poursuivront dans les prochains mois.",
    ];
  };

  const handleNewsFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsFormSuccess(true);
    setTimeout(() => {
      setNewsFormSuccess(false);
      setNewsFormNom("");
      setNewsFormEmail("");
      setNewsFormMessage("");
    }, 5000);
  };

  const handleEventFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEventFormSuccess(true);
    // Simulate generation of a real voucher/PDF download
    setTimeout(() => {
      setEventFormSuccess(false);
      setEventFormNom("");
      setEventFormEmail("");
      setEventFormInstitution("");
      setEventFormStatut("Doctorant");
      setSelectedEvent(null);
    }, 6000);
  };

  const latest = [...publications]
    .sort((a, b) => b.annee - a.annee)
    .slice(0, 3);
  const upcoming = [...evenements]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const news = actualites.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-light to-secondary py-16 md:py-24">
        <div className="container-page text-center max-w-3xl mx-auto">
          <p className="eyebrow">
            {SITE.tagline} · {SITE.tutelles}
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight">
            UMMISCO
          </h1>
          <p className="mt-5 font-accent text-xl md:text-2xl text-primary font-semibold">
            {mounted
              ? t("home.welcome", { defaultValue: SITE.fullName })
              : SITE.fullName}
          </p>
          <div className="mt-7 space-y-3 text-base md:text-lg text-foreground/80 leading-relaxed">
            <p>
              {mounted
                ? t("home.tagline", {
                    defaultValue:
                      "Recherche d'excellence au service du développement durable et de la santé publique.",
                  })
                : "Recherche d'excellence au service du développement durable et de la santé publique."}
            </p>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/axes" className="btn-primary">
              {mounted
                ? t("nav.axes", { defaultValue: "Explorer nos recherches" })
                : "Explorer nos recherches"}
            </Link>
            <Link to="/chercheurs" className="btn-secondary">
              {mounted
                ? t("nav.chercheurs", {
                    defaultValue: "Découvrir notre équipe",
                  })
                : "Découvrir notre équipe"}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-border bg-white">
        <div className="container-page grid grid-cols-2 md:grid-cols-4">
          {[
            {
              k: stats.publications,
              l: mounted
                ? t("nav.publications", { defaultValue: "Publications" })
                : "Publications",
            },
            {
              k: stats.chercheurs,
              l: mounted
                ? t("nav.chercheurs", { defaultValue: "Chercheurs" })
                : "Chercheurs",
            },
            {
              k: stats.projets,
              l: mounted
                ? t("nav.projets", { defaultValue: "Projets" })
                : "Projets",
            },
            {
              k: stats.pays,
              l: mounted
                ? t("home.key_figures", { defaultValue: "Pays partenaires" })
                : "Pays partenaires",
            },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`py-8 text-center ${i > 0 ? "md:border-l border-border" : ""} ${i === 1 ? "border-l border-border" : ""} ${i === 2 ? "border-t md:border-t-0 border-border" : ""} ${i === 3 ? "border-t md:border-t-0 border-l border-border" : ""}`}
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">
                {s.k}
              </div>
              <div className="mt-1 font-accent text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="py-16">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-primary-dark">
              📰 Actualités
            </h2>
            <p className="mt-2 text-muted-foreground">
              Les dernières nouvelles de l'UMMISCO
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((n) => (
              <article
                key={n.id}
                onClick={() => setSelectedActualite(n)}
                className="card-soft p-6 hover:shadow-[var(--shadow-hover)] transition-shadow cursor-pointer border border-transparent hover:border-primary/20 duration-250 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                    {n.categorie}
                  </span>
                  <p className="mt-3 text-xs text-muted-foreground">
                    📅 {new Date(n.date).toLocaleDateString("fr")}
                  </p>
                  <h3 className="mt-3 font-display text-lg leading-snug font-semibold text-primary-dark hover:text-primary transition-colors">
                    {n.titre}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {n.resume}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedActualite(n);
                  }}
                  className="mt-4 text-left text-sm font-semibold text-primary hover:text-accent cursor-pointer group flex items-center gap-1"
                >
                  Lire la suite{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AXES DE RECHERCHE */}
      <section className="py-16 bg-secondary">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-primary-dark">
              🔬 Axes de Recherche
            </h2>
            <p className="mt-2 text-muted-foreground">
              Nos quatre domaines d'expertise
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {axes.map((a, i) => (
              <article
                key={a.id}
                className="card-soft p-6 border-t-4 border-primary hover:border-accent transition-colors"
              >
                <span className="font-mono text-xs text-accent font-bold">
                  AXE {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg leading-tight">
                  {a.nom}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs text-muted-foreground">
                  <span>👥 {a.chercheurs_count} chercheurs</span>
                  <span>📚 {a.publications_count} pubs</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS + ÉVÉNEMENTS */}
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex items-end justify-between border-b border-border pb-4">
            <h2 className="font-display text-2xl md:text-3xl">
              📚 Publications récentes
            </h2>
            <Link
              to="/publications"
              className="text-sm font-semibold text-primary hover:text-accent"
            >
              Tout voir →
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {latest.map((p) => (
              <li key={p.id} className="py-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="rounded-full bg-primary px-2.5 py-1 font-semibold text-white">
                    {p.type}
                  </span>
                  <span className="text-muted-foreground">{p.annee}</span>
                  <span className="italic text-muted-foreground">
                    {p.revue}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg leading-snug">
                  {p.titre}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.resume}</p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  doi:{p.doi}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <aside>
          <div className="flex items-end justify-between border-b border-border pb-4">
            <h2 className="font-display text-2xl md:text-3xl">📅 Agenda</h2>
            <Link
              to="/evenements"
              className="text-sm font-semibold text-primary hover:text-accent"
            >
              Voir tout →
            </Link>
          </div>
          <ul className="mt-4 space-y-4">
            {upcoming.map((e) => {
              const d = new Date(e.date);
              return (
                <li
                  key={e.id}
                  onClick={() => setSelectedEvent(e)}
                  className="card-soft p-4 flex items-start gap-4 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-200 group relative"
                  id={`home-event-${e.id}`}
                >
                  <div className="shrink-0 rounded-md bg-primary text-white text-center px-3 py-2 min-w-[60px] group-hover:bg-primary-dark transition-colors">
                    <div className="text-[0.65rem] uppercase tracking-wider opacity-80">
                      {d.toLocaleString("fr", { month: "short" })}
                    </div>
                    <div className="font-display text-xl leading-none font-bold">
                      {d.getDate()}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-accent text-xs">
                      {e.type}
                    </p>
                    <h3 className="mt-1 font-display text-sm leading-snug font-semibold text-primary-dark group-hover:text-primary transition-colors">
                      {e.titre}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      📍 {e.lieu}
                    </p>
                  </div>
                  <div className="self-center shrink-0">
                    <span className="text-[10px] uppercase font-bold text-primary border border-primary/25 rounded px-2.5 py-1 group-hover:bg-primary group-hover:text-white transition-all">
                      S'inscrire
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </section>

      {/* MODAL ACTUALITE DETAILS & FORM */}
      {selectedActualite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
            <div className="p-6 border-b border-border bg-slate-50 flex justify-between items-start">
              <div>
                <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-primary-dark mr-3 uppercase">
                  {selectedActualite.categorie}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  📅{" "}
                  {new Date(selectedActualite.date).toLocaleDateString("fr", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <h3 className="mt-2 font-display text-xl md:text-2xl font-bold leading-tight text-primary-dark">
                  {selectedActualite.titre}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedActualite(null);
                  setNewsFormSuccess(false);
                }}
                className="text-muted-foreground hover:text-foreground text-3xl font-light leading-none p-1 cursor-pointer transition-colors"
                title="Fermer"
              >
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* News Text */}
              <div className="text-sm leading-relaxed text-foreground/90 space-y-4 border-b border-border pb-6">
                {getEnrichedNewsContent(selectedActualite).map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "font-medium text-base text-primary-dark"
                        : "text-muted-foreground"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Inquiry Form */}
              <div className="bg-secondary/20 p-5 rounded-lg border border-border/30">
                <h4 className="font-display text-sm font-bold text-primary-dark mb-1">
                  ✉️ Poser une question sur cette actualité
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Remplissez ce formulaire pour contacter l'équipe de l'UMMISCO
                  en charge de ce sujet.
                </p>

                {newsFormSuccess ? (
                  <div className="bg-teal-50 border border-teal-200 text-teal-800 p-4 rounded-md text-xs font-medium animate-fade-in">
                    🎯 Votre demande d'information concernant «{" "}
                    <strong>{selectedActualite.titre}</strong> » a bien été
                    transmise de manière sécurisée aux comités de l'UMMISCO.
                    Nous vous répondrons par e-mail sous 48h.
                  </div>
                ) : (
                  <form onSubmit={handleNewsFormSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={newsFormNom}
                          onChange={(e) => setNewsFormNom(e.target.value)}
                          placeholder="Ex: Dr. Diallo"
                          className="w-full text-xs p-2 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                          Adresse Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={newsFormEmail}
                          onChange={(e) => setNewsFormEmail(e.target.value)}
                          placeholder="Ex: diallo@institution.org"
                          className="w-full text-xs p-2 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                        Votre message / Question *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newsFormMessage}
                        onChange={(e) => setNewsFormMessage(e.target.value)}
                        placeholder="Quelles informations souhaitez-vous obtenir concernant ce sujet ?"
                        className="w-full text-xs p-2 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-bold py-2 px-4 rounded text-xs hover:bg-primary-dark transition cursor-pointer"
                    >
                      Envoyer ma question
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-border bg-slate-50 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedActualite(null);
                  setNewsFormSuccess(false);
                }}
                className="rounded-md border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground/80 hover:bg-slate-100 transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EVENT REGISTRATION & TICKET */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
            <div className="p-6 border-b border-border bg-primary text-white flex justify-between items-start">
              <div>
                <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-bold text-primary-dark uppercase">
                  {selectedEvent.type}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold leading-tight">
                  S'inscrire : {selectedEvent.titre}
                </h3>
                <p className="text-white/80 text-xs mt-1">
                  📍 {selectedEvent.lieu} · 📅{" "}
                  {new Date(selectedEvent.date).toLocaleDateString("fr", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setEventFormSuccess(false);
                }}
                className="text-white/70 hover:text-white text-3xl font-light leading-none p-1 cursor-pointer transition-colors"
                title="Fermer"
              >
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="text-xs text-muted-foreground pb-2 border-b border-border">
                {selectedEvent.description}
              </div>

              {eventFormSuccess ? (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl">
                    ✓
                  </div>
                  <h4 className="font-display text-lg font-bold text-emerald-800">
                    Inscription validée !
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Félicitations, <strong>{eventFormNom}</strong>. Votre badge
                    d'accès pour l'événement{" "}
                    <strong>{selectedEvent.titre}</strong> a été généré de
                    manière sécurisée par notre secrétariat d'UMMISCO.
                  </p>

                  <div className="bg-slate-50 border p-4 rounded-lg text-left max-w-md mx-auto space-y-2 text-xs font-mono">
                    <div className="font-bold text-primary border-b pb-1 text-[10px] uppercase">
                      🎟️ BADGE D'ENTRÉE INDIVIDUEL
                    </div>
                    <div>
                      <strong>Événement:</strong> {selectedEvent.titre}
                    </div>
                    <div>
                      <strong>Participant:</strong> {eventFormNom}
                    </div>
                    <div>
                      <strong>Email:</strong> {eventFormEmail}
                    </div>
                    <div>
                      <strong>Institution:</strong> {eventFormInstitution}
                    </div>
                    <div>
                      <strong>Statut:</strong> {eventFormStatut}
                    </div>
                    <div className="pt-2 text-center">
                      <button
                        onClick={() => {
                          const ticketData = `--- BILLET D'INSCRIPTION UMMISCO ---\n\nÉvénement : ${selectedEvent.titre}\nType : ${selectedEvent.type}\nDate : ${selectedEvent.date ? new Date(selectedEvent.date).toLocaleString("fr") : ""}\nLieu : ${selectedEvent.lieu}\n\nParticipant : ${eventFormNom}\nEmail : ${eventFormEmail}\nInstitution : ${eventFormInstitution}\nStatut : ${eventFormStatut}\n\nNuméro d'enregistrement : UMM-${Math.floor(100000 + Math.random() * 900000)}\n---------------------------------------`;
                          const blob = new Blob([ticketData], {
                            type: "text/plain;charset=utf-8",
                          });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = `ticket-${selectedEvent.id}.txt`;
                          link.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded text-[10px] cursor-pointer transition-all"
                      >
                        📥 Télécharger mon ticket
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEventFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                        Votre Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventFormNom}
                        onChange={(e) => setEventFormNom(e.target.value)}
                        placeholder="Ex: Dr. Fatoumata Sall"
                        className="w-full text-xs p-2.5 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={eventFormEmail}
                        onChange={(e) => setEventFormEmail(e.target.value)}
                        placeholder="Ex: f.sall@ucad.sn"
                        className="w-full text-xs p-2.5 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                        Organisme / Institution *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventFormInstitution}
                        onChange={(e) =>
                          setEventFormInstitution(e.target.value)
                        }
                        placeholder="Ex: UCAD, Sorbonne Université"
                        className="w-full text-xs p-2.5 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                        Votre statut *
                      </label>
                      <select
                        value={eventFormStatut}
                        onChange={(e) => setEventFormStatut(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="Chercheur">
                          Chercheur / Enseignant-Chercheur
                        </option>
                        <option value="Doctorant">
                          Doctorant / Post-doctorant
                        </option>
                        <option value="Etudiant">
                          Étudiant Master/Licence
                        </option>
                        <option value="Professionnel">
                          Professionnel indépendant
                        </option>
                        <option value="Autre">Autre statut</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="event-confirm-presence"
                      required
                      className="mt-0.5 cursor-pointer rounded border-border text-primary focus:ring-primary focus:ring-0 focus:ring-offset-0"
                    />
                    <label
                      htmlFor="event-confirm-presence"
                      className="text-[10px] text-muted-foreground leading-snug cursor-pointer select-none"
                    >
                      Je confirme que je participerai activement à cet événement
                      scientifique de l'UMMISCO dans la limite des places
                      disponibles ({selectedEvent.capacite} places).
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded text-xs transition duration-200 cursor-pointer"
                  >
                    Confirmer mon inscription à l'événement
                  </button>
                </form>
              )}
            </div>

            <div className="p-4 border-t border-border bg-slate-50 flex justify-end">
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setEventFormSuccess(false);
                }}
                className="rounded-md border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground/80 hover:bg-slate-100 transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
