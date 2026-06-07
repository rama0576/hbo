import { Link } from "@tanstack/react-router";
import { SITE } from "@/data/mock";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/axes", label: "Axes" },
  { to: "/chercheurs", label: "Chercheurs" },
  { to: "/publications", label: "Publications" },
  { to: "/projets", label: "Projets" },
  { to: "/datasets", label: "Datasets" },
  { to: "/ressources", label: "Ressources" },
  { to: "/partenaires", label: "Partenaires" },
  { to: "/bailleurs", label: "Bailleurs" },
  { to: "/formations", label: "Formations" },
  { to: "/evenements", label: "Événements" },
  { to: "/actualites", label: "Actualités" },
] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "fr");
  const [session, setSession] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Sync language preference on client mount without causing hydration mismatch
    const storedLang = localStorage.getItem("ummisco-lang");
    if (storedLang) {
      if (storedLang !== i18n.language) {
        i18n.changeLanguage(storedLang);
      }
      setCurrentLang(storedLang);
    }
  }, [i18n]);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng || "fr");
    };
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("ummisco-lang", lng);
    setCurrentLang(lng);
  };

  useEffect(() => {
    // Read session on startup
    const checkSession = () => {
      const s = localStorage.getItem("user-session");
      if (s) {
        try {
          setSession(JSON.parse(s));
        } catch (e) {
          setSession(null);
        }
      } else {
        setSession(null);
      }
    };

    checkSession();
    // Also listen to storage changes
    window.addEventListener("storage", checkSession);

    // Custom trigger since same-document localStorage sets do not fire 'storage' event natively
    const interval = setInterval(checkSession, 800);

    return () => {
      window.removeEventListener("storage", checkSession);
      clearInterval(interval);
    };
  }, []);

  const handleHeaderLogout = () => {
    localStorage.removeItem("user-session");
    setSession(null);
    window.location.href = "/";
  };

  // Compute initials
  let initials = "U";
  if (session?.email) {
    const parts = session.email.split("@")[0].split(".");
    initials = parts
      .map((p) => p.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  }

  // Dynamic localization mapping for navbar labels
  const getNavLabel = (path: string, defaultLabel: string) => {
    switch (path) {
      case "/":
        return t("nav.home", { defaultValue: defaultLabel });
      case "/axes":
        return t("nav.axes", { defaultValue: defaultLabel });
      case "/chercheurs":
        return t("nav.chercheurs", { defaultValue: defaultLabel });
      case "/publications":
        return t("nav.publications", { defaultValue: defaultLabel });
      case "/projets":
        return t("nav.projets", { defaultValue: defaultLabel });
      case "/datasets":
        return t("nav.datasets", { defaultValue: defaultLabel });
      case "/ressources":
        return t("nav.ressources", { defaultValue: defaultLabel });
      case "/partenaires":
        return t("nav.partenaires", { defaultValue: defaultLabel });
      case "/bailleurs":
        return t("nav.bailleurs", { defaultValue: defaultLabel });
      case "/formations":
        return t("nav.formations", { defaultValue: defaultLabel });
      case "/evenements":
        return t("nav.evenements", { defaultValue: defaultLabel });
      case "/actualites":
        return t("nav.actualites", { defaultValue: defaultLabel });
      default:
        return defaultLabel;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.08)]">
      {/* Banner */}
      <div className="w-full overflow-hidden bg-primary-light">
        <Link to="/" className="block">
          <img
            src={SITE.banner}
            alt="Bannière UMMISCO"
            className="h-[110px] w-full object-cover md:h-[140px]"
            loading="eager"
          />
        </Link>
      </div>

      {/* Top identity strip */}
      <div className="border-y border-border bg-white">
        <div className="container-page flex items-center justify-between gap-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={SITE.logo} alt="UMMISCO" className="h-11 w-auto" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-base font-bold text-primary-dark">
                {SITE.siteName}
              </span>
              <span className="text-[0.7rem] text-muted-foreground">
                {SITE.tagline}
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {/* Language switch controls */}
            <div className="flex items-center gap-1 border-r border-border pr-3 h-7">
              <button
                type="button"
                onClick={() => changeLang("fr")}
                className={`px-2 py-1 text-[11px] font-bold rounded cursor-pointer transition-all ${
                  currentLang.startsWith("fr")
                    ? "bg-primary text-white scale-105"
                    : "text-primary hover:bg-secondary"
                }`}
                aria-label="Français"
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => changeLang("en")}
                className={`px-2 py-1 text-[11px] font-bold rounded cursor-pointer transition-all ${
                  currentLang.startsWith("en")
                    ? "bg-primary text-white scale-105"
                    : "text-primary hover:bg-secondary"
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {!session ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center rounded-md border border-border px-3.5 py-2 text-sm font-medium text-primary hover:bg-primary-light transition-colors"
                >
                  {t("header.connexion", { defaultValue: "Connexion" })}
                </Link>
                <Link
                  to="/profil"
                  className="inline-flex items-center rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-primary-dark hover:brightness-95 transition"
                >
                  {t("header.espace_membre", { defaultValue: "Espace membre" })}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/profil"
                  className="flex items-center gap-2 hover:opacity-90 transition"
                  title={session.email}
                >
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white font-display text-xs font-bold animate-pulse">
                    {initials}
                  </div>
                  <span className="hidden md:inline text-xs font-medium text-primary">
                    {session.email}
                  </span>
                </Link>
                <button
                  onClick={handleHeaderLogout}
                  className="rounded-md border border-destructive/20 hover:bg-destructive hover:text-white px-2.5 py-1.5 text-xs font-medium text-destructive transition cursor-pointer"
                >
                  {t("header.deconnexion", { defaultValue: "Déconnexion" })}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Primary nav (UMMISCO blue) */}
      <nav className="bg-primary">
        <div className="container-page">
          <ul className="flex flex-wrap items-center justify-center md:justify-start">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="block px-4 py-3.5 text-sm font-medium text-white/90 hover:bg-primary-dark transition-colors border-b-[3px] border-transparent hover:border-accent"
                  activeProps={{
                    className:
                      "bg-primary-dark text-white border-b-[3px] border-accent",
                  }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {getNavLabel(n.to, n.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 bg-primary-dark text-white/85">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={SITE.logo}
              alt="UMMISCO"
              className="h-12 w-auto bg-white rounded-md p-1"
            />
            <div>
              <p className="font-display text-lg font-bold text-white">
                {SITE.siteName}
              </p>
              <p className="text-xs text-white/70">{SITE.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/75 leading-relaxed">
            {t("home.welcome", { defaultValue: SITE.fullName })}. Un réseau
            international de recherche au service de la science de la
            durabilité, entre la France, le Sénégal et l'Afrique de l'Ouest.
          </p>
          <p className="mt-3 text-xs text-white/60">
            Tutelles : {SITE.tutelles}
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider text-accent mb-3">
            {t("footer.explore", { defaultValue: "Explorer" })}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/axes" className="hover:text-accent">
                {t("nav.axes", { defaultValue: "Axes de recherche" })}
              </Link>
            </li>
            <li>
              <Link to="/publications" className="hover:text-accent">
                {t("nav.publications", { defaultValue: "Publications" })}
              </Link>
            </li>
            <li>
              <Link to="/projets" className="hover:text-accent">
                {t("nav.projets", { defaultValue: "Projets" })}
              </Link>
            </li>
            <li>
              <Link to="/datasets" className="hover:text-accent">
                {t("nav.datasets", { defaultValue: "Datasets" })}
              </Link>
            </li>
            <li>
              <Link to="/ressources" className="hover:text-accent">
                {t("nav.ressources", { defaultValue: "Ressources" })}
              </Link>
            </li>
            <li>
              <Link to="/formations" className="hover:text-accent">
                {t("nav.formations", { defaultValue: "Formations" })}
              </Link>
            </li>
            <li>
              <Link to="/actualites" className="hover:text-accent">
                {t("nav.actualites", { defaultValue: "Actualités" })}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider text-accent mb-3">
            {t("nav.contact", { defaultValue: "Contact" })}
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>UMMISCO — UCAD Dakar</li>
            <li>Université Cheikh Anta Diop</li>
            <li>FST, BP 5005, Dakar, Sénégal</li>
            <li className="font-mono text-xs mt-3">contact@ummisco.ucad.sn</li>
            <li>
              <Link to="/contact" className="text-accent hover:underline">
                Nous écrire →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} UMMISCO — Unité Mixte Internationale
            UMI 209. Tous droits réservés.
          </p>
          <p>Modélisation des systèmes complexes pour le développement</p>
        </div>
      </div>
    </footer>
  );
}
