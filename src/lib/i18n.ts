import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        axes: "Axes",
        chercheurs: "Chercheurs",
        publications: "Publications",
        projets: "Projets",
        datasets: "Datasets",
        ressources: "Ressources",
        partenaires: "Partenaires",
        bailleurs: "Bailleurs",
        formations: "Formations",
        evenements: "Événements",
        actualites: "Actualités",
        contact: "Contact",
      },
      header: {
        connexion: "Connexion",
        espace_membre: "Espace membre",
        deconnexion: "Déconnexion",
      },
      home: {
        welcome:
          "Unité de Modélisation Mathématique et Informatique des Systèmes Complexes",
        tagline:
          "Recherche d'excellence au service du développement durable et de la santé publique.",
        discover_more: "Découvrir l'unité →",
        key_figures: "Chiffres clés",
        researchers: "Chercheurs actifs",
        publications: "Publications de haut niveau",
        projects: "Projets subventionnés",
        latest_news: "Actualités marquantes",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        axes: "Axes",
        chercheurs: "Researchers",
        publications: "Publications",
        projets: "Projects",
        datasets: "Datasets",
        ressources: "Resources",
        partenaires: "Partners",
        bailleurs: "Funders",
        formations: "Courses",
        evenements: "Events",
        actualites: "News",
        contact: "Contact",
      },
      header: {
        connexion: "Login",
        espace_membre: "Member Area",
        deconnexion: "Logout",
      },
      home: {
        welcome: "Mathematical and Computer Modeling of Complex Systems Unit",
        tagline:
          "Research of excellence in service of sustainable development and public health.",
        discover_more: "Discover the unit →",
        key_figures: "Key Figures",
        researchers: "Active Researchers",
        publications: "High-level Publications",
        projects: "Funded Projects",
        latest_news: "Featured News",
      },
    },
  },
};

// Auto-detect is delayed to client-side mount to avoid hydration mismatch
const defaultLang = "fr";

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
