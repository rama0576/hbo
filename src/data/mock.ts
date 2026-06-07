// Mock data for UMMISCO portal (frontend-only)
// Inspiré de ummisco.fr et ummisco.ucad.sn

export const SITE = {
  logo: "https://ummisco.fr/wp-content/uploads/2026/05/UMMISCO.webp",
  banner: "https://ummisco.ucad.sn/sites/default/files/BanniereUMMISCO2.png",
  siteName: "UMMISCO",
  fullName:
    "Unité de Modélisation Mathématique et Informatique des Systèmes Complexes",
  tagline: "Unité Mixte Internationale (UMI 209)",
  tutelles: "IRD · UCAD · UGB · Sorbonne Université",
};

export type Axe = {
  id: number;
  nom: string;
  thematique: string;
  description: string;
  responsable: string;
  chercheurs_count: number;
  publications_count: number;
};

export const axes: Axe[] = [
  {
    id: 1,
    nom: "Modélisation mathématique et informatique à base d'agents",
    thematique: "Modélisation",
    description:
      "Modèles de simulation à base d'agents pour étudier les dynamiques des systèmes naturels, biologiques et sociaux.",
    responsable: "Dr. Moussa DIOP",
    chercheurs_count: 15,
    publications_count: 42,
  },
  {
    id: 2,
    nom: "Intelligence Artificielle et Apprentissage Profond",
    thematique: "IA",
    description:
      "Application du deep learning à la modélisation des systèmes complexes : algorithmes pour l'analyse et la prédiction.",
    responsable: "Dr. Cheikh GUEYE",
    chercheurs_count: 12,
    publications_count: 35,
  },
  {
    id: 3,
    nom: "Capteurs et collecte de données",
    thematique: "Données",
    description:
      "Systèmes de capteurs, IoT et méthodes de collecte pour l'analyse environnementale et la surveillance en temps réel.",
    responsable: "Dr. Aïssatou DIOP",
    chercheurs_count: 8,
    publications_count: 28,
  },
  {
    id: 4,
    nom: "Approches participatives et science citoyenne",
    thematique: "Société",
    description:
      "Plateformes collaboratives, outils d'engagement citoyen et co-construction de la connaissance scientifique.",
    responsable: "Pr. Ousmane SOW",
    chercheurs_count: 10,
    publications_count: 22,
  },
];

export type Chercheur = {
  id: number;
  nom_complet: string;
  email: string;
  titre: string;
  institution: string;
  initiales: string;
  axes: number[];
  specialite: string;
};

export const chercheurs: Chercheur[] = [
  {
    id: 1,
    nom_complet: "Dr. Moussa DIOP",
    email: "moussa.diop@ummisco.org",
    titre: "Directeur de l'unité",
    institution: "UCAD",
    initiales: "MD",
    axes: [1],
    specialite: "Modélisation à base d'agents, dynamique des populations",
  },
  {
    id: 2,
    nom_complet: "Pr. Fatoumata SALL",
    email: "fatoumata.sall@ucad.sn",
    titre: "Professeure",
    institution: "UCAD",
    initiales: "FS",
    axes: [1],
    specialite: "Épidémiologie mathématique, modèles compartimentaux",
  },
  {
    id: 3,
    nom_complet: "Dr. Cheikh GUEYE",
    email: "cheikh.gueye@ird.fr",
    titre: "Chargé de recherche",
    institution: "IRD",
    initiales: "CG",
    axes: [2],
    specialite: "IA, machine learning, réseaux de neurones",
  },
  {
    id: 4,
    nom_complet: "Dr. Aïssatou DIOP",
    email: "aissatou.diop@ummisco.org",
    titre: "Chargée de recherche",
    institution: "UMMISCO",
    initiales: "AD",
    axes: [3],
    specialite: "Capteurs, IoT, traitement du signal",
  },
  {
    id: 5,
    nom_complet: "Pr. Ousmane SOW",
    email: "ousmane.sow@ugb.sn",
    titre: "Directeur de recherche",
    institution: "UGB",
    initiales: "OS",
    axes: [4],
    specialite: "Sciences participatives, engagement citoyen",
  },
  {
    id: 6,
    nom_complet: "Dr. Marie THIAM",
    email: "marie.thiam@esp.sn",
    titre: "Maître-assistante",
    institution: "ESP",
    initiales: "MT",
    axes: [1],
    specialite: "Analyse de données, statistiques",
  },
  {
    id: 7,
    nom_complet: "Dr. Papa Alioune NDIAYE",
    email: "papa.ndiaye@ucad.sn",
    titre: "Maître de conférences",
    institution: "UCAD",
    initiales: "PN",
    axes: [1],
    specialite: "Systèmes dynamiques, théorie du chaos",
  },
  {
    id: 8,
    nom_complet: "Dr. Khadija DIALLO",
    email: "khadija.diallo@ird.fr",
    titre: "Chargée de recherche",
    institution: "IRD",
    initiales: "KD",
    axes: [2],
    specialite: "Écologie, modélisation environnementale",
  },
  {
    id: 9,
    nom_complet: "Dr. Ibrahima FALL",
    email: "ibrahima.fall@ummisco.org",
    titre: "Ingénieur de recherche",
    institution: "UMMISCO",
    initiales: "IF",
    axes: [1],
    specialite: "Simulation multi-agents, algorithmes distribués",
  },
  {
    id: 10,
    nom_complet: "Dr. Awa TOURE",
    email: "awa.toure@ugb.sn",
    titre: "Maître-assistante",
    institution: "UGB",
    initiales: "AT",
    axes: [2],
    specialite: "Apprentissage automatique, NLP, data mining",
  },
  {
    id: 11,
    nom_complet: "Pr. Amadou DIOUF",
    email: "amadou.diouf@ird.fr",
    titre: "Directeur de recherche",
    institution: "IRD",
    initiales: "AD",
    axes: [2, 3],
    specialite: "Modélisation climatique, changement climatique",
  },
  {
    id: 12,
    nom_complet: "Dr. Ndeye FATOU",
    email: "ndeye.fatou@ummisco.org",
    titre: "Post-doctorante",
    institution: "UMMISCO",
    initiales: "NF",
    axes: [4],
    specialite: "Science citoyenne, biodiversité",
  },
];

export type Publication = {
  id: number;
  titre: string;
  resume: string;
  type: string;
  annee: number;
  doi: string;
  axe_id: number;
  auteurs: number[];
  revue: string;
};

export const publications: Publication[] = [
  {
    id: 1,
    titre:
      "Modélisation à base d'agents pour la propagation des maladies infectieuses",
    resume:
      "Modèle multi-agents calibré sur 5 régions du Sénégal, identification des dynamiques épidémiques.",
    type: "Article",
    annee: 2024,
    doi: "10.1007/s11538-024-01234-5",
    axe_id: 1,
    auteurs: [1, 2],
    revue: "Journal of Mathematical Biology",
  },
  {
    id: 2,
    titre:
      "Application du deep learning à la classification d'images satellitaires",
    resume:
      "Méthode innovante de classification basée sur les CNN. Précision >95%.",
    type: "Article",
    annee: 2024,
    doi: "10.1109/TGRS.2024.5678901",
    axe_id: 2,
    auteurs: [3, 10],
    revue: "IEEE Transactions on Geoscience and Remote Sensing",
  },
  {
    id: 3,
    titre:
      "Réseau de capteurs IoT pour la surveillance environnementale en zones urbaines",
    resume:
      "Architecture distribuée de capteurs IoT pour la surveillance en temps réel.",
    type: "Conférence",
    annee: 2024,
    doi: "10.1109/IoT.2024.7890123",
    axe_id: 3,
    auteurs: [4, 11],
    revue: "IEEE IoT Conference",
  },
  {
    id: 4,
    titre: "Engagement citoyen dans la recherche scientifique",
    resume:
      "Analyse des bénéfices et défis de l'implication des citoyens — 500+ participants.",
    type: "Chapitre d'ouvrage",
    annee: 2023,
    doi: "10.1002/9781119876543.ch12",
    axe_id: 4,
    auteurs: [5, 6, 12],
    revue: "Citizen Science: Theory and Practice",
  },
  {
    id: 5,
    titre: "Simulation des comportements collectifs dans les systèmes sociaux",
    resume:
      "Émergences de comportements collectifs à partir de règles individuelles simples.",
    type: "Article",
    annee: 2023,
    doi: "10.1142/S0218127423500123",
    axe_id: 1,
    auteurs: [1, 2, 9],
    revue: "Complex Systems Journal",
  },
  {
    id: 6,
    titre:
      "Optimisation des réseaux de neurones pour la classification complexe",
    resume:
      "Méthode d'optimisation automatique de l'architecture des réseaux profonds.",
    type: "Article",
    annee: 2023,
    doi: "10.1162/neco_a_01234",
    axe_id: 2,
    auteurs: [3, 10],
    revue: "Neural Computation",
  },
  {
    id: 7,
    titre: "Modélisation de la propagation de la grippe saisonnière au Sénégal",
    resume: "Prédiction des pics épidémiques avec une marge d'erreur < 10%.",
    type: "Article",
    annee: 2023,
    doi: "10.1016/j.jtbi.2023.111678",
    axe_id: 1,
    auteurs: [2, 1],
    revue: "Journal of Theoretical Biology",
  },
  {
    id: 8,
    titre: "Application de l'IA à l'agriculture de précision",
    resume: "IA pour optimiser les rendements agricoles, testé sur 3 cultures.",
    type: "Conférence",
    annee: 2023,
    doi: "10.1109/AIA.2023.00045",
    axe_id: 2,
    auteurs: [3, 11],
    revue: "International Conference on AI in Agriculture",
  },
  {
    id: 9,
    titre: "Réseau de capteurs pour la qualité de l'air à Dakar",
    resume:
      "20 capteurs déployés pour la surveillance temps réel. Données en open data.",
    type: "Rapport technique",
    annee: 2023,
    doi: "UMMISCO-TR-2023-001",
    axe_id: 3,
    auteurs: [4, 7],
    revue: "UMMISCO Technical Reports",
  },
  {
    id: 10,
    titre: "Plateforme de science citoyenne pour la biodiversité : bilan 2 ans",
    resume: "Plus de 1000 observations collectées par les citoyens.",
    type: "Rapport",
    annee: 2023,
    doi: "UMMISCO-CSR-2023-001",
    axe_id: 4,
    auteurs: [5, 12],
    revue: "UMMISCO Citizen Science Reports",
  },
  {
    id: 11,
    titre:
      "Comparaison des méthodes de modélisation pour les systèmes complexes",
    resume:
      "Analyse comparée de 5 méthodes : forces, faiblesses, recommandations.",
    type: "Article",
    annee: 2023,
    doi: "10.1007/s12345-023-01234-5",
    axe_id: 1,
    auteurs: [1, 9],
    revue: "Complex Systems Modeling",
  },
  {
    id: 12,
    titre: "Réseaux de neurones pour la prédiction des précipitations",
    resume:
      "Précision améliorée de 20% par rapport aux méthodes traditionnelles.",
    type: "Article",
    annee: 2023,
    doi: "10.1002/wcm.1234",
    axe_id: 2,
    auteurs: [10, 3],
    revue: "Weather and Climate Modeling",
  },
];

export type Projet = {
  id: number;
  titre: string;
  description: string;
  thematique: string;
  date_debut: string;
  date_fin: string;
  statut: "en_cours" | "termine" | "suspendu" | "planifie";
  partenaires: string[];
  bailleur: string;
  budget: string;
  responsable: string;
  axe_id: number;
};

export const projets: Projet[] = [
  {
    id: 1,
    titre: "COVID-SEN — Modélisation de la propagation du COVID-19 au Sénégal",
    description:
      "Modèle prédictif pour anticiper la propagation. Collaboration avec le Ministère de la Santé.",
    thematique: "Santé",
    date_debut: "2020-03-01",
    date_fin: "2022-12-31",
    statut: "termine",
    partenaires: ["IRD", "UCAD", "Ministère Santé"],
    bailleur: "IRD / UCAD",
    budget: "500 000 €",
    responsable: "Dr. Moussa DIOP",
    axe_id: 1,
  },
  {
    id: 2,
    titre: "ENVI-SENS — Surveillance environnementale par capteurs",
    description:
      "Déploiement d'un réseau de capteurs pour la qualité de l'air.",
    thematique: "Environnement",
    date_debut: "2022-01-15",
    date_fin: "2024-06-30",
    statut: "en_cours",
    partenaires: ["ANR", "IRD", "UCAD"],
    bailleur: "ANR",
    budget: "800 000 €",
    responsable: "Dr. Aïssatou DIOP",
    axe_id: 3,
  },
  {
    id: 3,
    titre: "BIODIV-CITIZEN — Plateforme de science citoyenne biodiversité",
    description: "Plateforme web et mobile pour les contributions citoyennes.",
    thematique: "Société",
    date_debut: "2023-02-01",
    date_fin: "2025-01-31",
    statut: "en_cours",
    partenaires: ["UE", "IRD", "Fondation Biodiversité"],
    bailleur: "Union Européenne",
    budget: "1 200 000 €",
    responsable: "Pr. Ousmane SOW",
    axe_id: 4,
  },
  {
    id: 4,
    titre: "MULTI-OPT — Optimisation des modèles multi-agents",
    description: "Techniques d'optimisation pour grands systèmes complexes.",
    thematique: "Modélisation",
    date_debut: "2023-03-15",
    date_fin: "2024-09-30",
    statut: "en_cours",
    partenaires: ["CNRS", "IRD"],
    bailleur: "CNRS",
    budget: "600 000 €",
    responsable: "Dr. Ibrahima FALL",
    axe_id: 1,
  },
  {
    id: 5,
    titre: "AI-EPIDEM — IA pour la prédiction des épidémies",
    description:
      "Techniques d'IA pour prédire les épidémies émergentes. Partenariat OMS.",
    thematique: "Santé",
    date_debut: "2023-01-10",
    date_fin: "2024-12-31",
    statut: "en_cours",
    partenaires: ["OMS", "IRD", "UCAD"],
    bailleur: "OMS",
    budget: "1 000 000 €",
    responsable: "Dr. Cheikh GUEYE",
    axe_id: 2,
  },
  {
    id: 6,
    titre: "MAS-LIB — Logiciel open source de simulation multi-agents",
    description: "Bibliothèque Python et R pour la recherche académique.",
    thematique: "Méthodes",
    date_debut: "2021-06-01",
    date_fin: "2023-05-31",
    statut: "termine",
    partenaires: ["ANR", "IRD"],
    bailleur: "ANR",
    budget: "450 000 €",
    responsable: "Dr. Moussa DIOP",
    axe_id: 1,
  },
  {
    id: 7,
    titre: "CLIM-AGRI — Impact du changement climatique sur l'agriculture",
    description: "Modèles climatiques régionaux et adaptation des cultures.",
    thematique: "Climat",
    date_debut: "2024-01-01",
    date_fin: "2026-12-31",
    statut: "en_cours",
    partenaires: ["AFD", "CIRAD", "UCAD"],
    bailleur: "AFD",
    budget: "1 500 000 €",
    responsable: "Pr. Amadou DIOUF",
    axe_id: 2,
  },
  {
    id: 8,
    titre: "SAHEL-DATA — Plateforme données géospatiales Sahel",
    description:
      "Infrastructure de données ouvertes pour la recherche au Sahel.",
    thematique: "Données",
    date_debut: "2025-04-01",
    date_fin: "2027-03-31",
    statut: "planifie",
    partenaires: ["CNES", "IRD"],
    bailleur: "AFD",
    budget: "900 000 €",
    responsable: "Dr. Aïssatou DIOP",
    axe_id: 3,
  },
];

export type Dataset = {
  id: number;
  nom: string;
  description: string;
  licence: string;
  format: string;
  is_public: boolean;
  downloads: number;
  axe_id: number;
};

export const datasets: Dataset[] = [
  {
    id: 1,
    nom: "Cas COVID-19 Sénégal 2020–2022",
    description: "Cas quotidiens agrégés par région sanitaire.",
    licence: "CC-BY-4.0",
    format: "CSV",
    is_public: true,
    downloads: 2845,
    axe_id: 1,
  },
  {
    id: 2,
    nom: "Qualité de l'air Dakar (temps réel)",
    description: "Mesures PM2.5, PM10, NO2 du réseau de 20 capteurs.",
    licence: "CC-BY-4.0",
    format: "JSON / API",
    is_public: true,
    downloads: 1284,
    axe_id: 3,
  },
  {
    id: 3,
    nom: "Imagerie satellitaire Sénégal annotée",
    description: "10 000 tuiles Sentinel-2 annotées pour l'apprentissage.",
    licence: "CC-BY-NC-4.0",
    format: "GeoTIFF",
    is_public: true,
    downloads: 642,
    axe_id: 2,
  },
  {
    id: 4,
    nom: "Observations biodiversité citoyennes",
    description:
      "1000+ observations collectées via la plateforme participative.",
    licence: "CC-BY-SA-4.0",
    format: "CSV / GeoJSON",
    is_public: true,
    downloads: 418,
    axe_id: 4,
  },
  {
    id: 5,
    nom: "Modèles climatiques régionalisés Sahel",
    description: "Sorties RCM à 12 km de résolution sur 1980–2050.",
    licence: "CC-BY-4.0",
    format: "NetCDF",
    is_public: true,
    downloads: 318,
    axe_id: 2,
  },
  {
    id: 6,
    nom: "Traces de mobilité urbaine Ouagadougou",
    description: "Traces anonymisées issues d'une enquête participative.",
    licence: "Restricted",
    format: "Parquet",
    is_public: false,
    downloads: 47,
    axe_id: 4,
  },
];

export type Bailleur = {
  id: number;
  nom: string;
  type: string;
  pays: string;
  budget_total: string;
  projets_count: number;
  description: string;
};

export const bailleurs: Bailleur[] = [
  {
    id: 1,
    nom: "IRD — Institut de Recherche pour le Développement",
    type: "Public",
    pays: "France",
    budget_total: "2 500 000 €",
    projets_count: 6,
    description: "Tutelle principale et financeur historique de l'unité.",
  },
  {
    id: 2,
    nom: "Union Européenne",
    type: "Supranational",
    pays: "Europe",
    budget_total: "1 800 000 €",
    projets_count: 3,
    description: "Programme Horizon Europe et Erasmus+.",
  },
  {
    id: 3,
    nom: "ANR — Agence Nationale de la Recherche",
    type: "Public",
    pays: "France",
    budget_total: "1 250 000 €",
    projets_count: 4,
    description: "Financement de projets de recherche fondamentale.",
  },
  {
    id: 4,
    nom: "AFD — Agence Française de Développement",
    type: "Public",
    pays: "France",
    budget_total: "1 500 000 €",
    projets_count: 2,
    description: "Projets de développement en Afrique de l'Ouest.",
  },
  {
    id: 5,
    nom: "OMS — Organisation Mondiale de la Santé",
    type: "International",
    pays: "Suisse",
    budget_total: "1 000 000 €",
    projets_count: 1,
    description: "Programmes de santé publique et épidémiologie.",
  },
  {
    id: 6,
    nom: "CNRS",
    type: "Public",
    pays: "France",
    budget_total: "600 000 €",
    projets_count: 1,
    description: "Centre National de la Recherche Scientifique.",
  },
  {
    id: 7,
    nom: "Fondation pour la Biodiversité",
    type: "Privé",
    pays: "France",
    budget_total: "400 000 €",
    projets_count: 1,
    description: "Soutien aux projets de biodiversité.",
  },
  {
    id: 8,
    nom: "UCAD — Université Cheikh Anta Diop",
    type: "Académique",
    pays: "Sénégal",
    budget_total: "350 000 €",
    projets_count: 5,
    description: "Tutelle académique sénégalaise.",
  },
];

export type Partenaire = {
  id: number;
  nom: string;
  type: string;
  pays: string;
  ville: string;
  description: string;
};

export const partenaires: Partenaire[] = [
  {
    id: 1,
    nom: "Sorbonne Université",
    type: "Université",
    pays: "France",
    ville: "Paris",
    description: "Tutelle académique française, laboratoire LIP6.",
  },
  {
    id: 2,
    nom: "UCAD — Université Cheikh Anta Diop",
    type: "Université",
    pays: "Sénégal",
    ville: "Dakar",
    description: "Tutelle hôte de l'unité au Sénégal.",
  },
  {
    id: 3,
    nom: "UGB — Université Gaston Berger",
    type: "Université",
    pays: "Sénégal",
    ville: "Saint-Louis",
    description: "Partenaire académique pour les approches participatives.",
  },
  {
    id: 4,
    nom: "Université d'Antananarivo",
    type: "Université",
    pays: "Madagascar",
    ville: "Antananarivo",
    description: "Antenne Sud-Ouest de l'océan Indien.",
  },
  {
    id: 5,
    nom: "Université Joseph Ki-Zerbo",
    type: "Université",
    pays: "Burkina Faso",
    ville: "Ouagadougou",
    description: "Modélisation des mobilités et urbanisation.",
  },
  {
    id: 6,
    nom: "Université de Yaoundé I",
    type: "Université",
    pays: "Cameroun",
    ville: "Yaoundé",
    description: "Antenne Afrique centrale.",
  },
  {
    id: 7,
    nom: "Institut Pasteur de Dakar",
    type: "Institut",
    pays: "Sénégal",
    ville: "Dakar",
    description: "Collaboration en épidémiologie et modélisation des maladies.",
  },
  {
    id: 8,
    nom: "CIRAD",
    type: "Institut",
    pays: "France",
    ville: "Montpellier",
    description: "Recherche agronomique pour le développement.",
  },
];

export type Evenement = {
  id: number;
  titre: string;
  description: string;
  date: string;
  lieu: string;
  type: string;
  capacite: number;
};

export const evenements: Evenement[] = [
  {
    id: 1,
    titre: "Conférence Internationale MODD 2026",
    description:
      "Conférence internationale sur la modélisation et la simulation des systèmes complexes.",
    date: "2026-06-15T09:00:00",
    lieu: "UCAD — Dakar",
    type: "Conférence",
    capacite: 250,
  },
  {
    id: 2,
    titre: "Atelier sur la modélisation à base d'agents",
    description:
      "Atelier pratique sur les techniques avancées de modélisation multi-agents.",
    date: "2026-07-10T09:00:00",
    lieu: "IRD — Bondy",
    type: "Atelier",
    capacite: 40,
  },
  {
    id: 3,
    titre: "Séminaire UMMISCO-IRD — Durabilité",
    description:
      "Séminaire conjoint sur les projets en cours et perspectives de collaboration.",
    date: "2026-05-20T14:00:00",
    lieu: "En ligne",
    type: "Séminaire",
    capacite: 200,
  },
  {
    id: 4,
    titre: "École d'été UMMISCO 2026 — Simulation multi-agents",
    description:
      "Formation intensive de 2 semaines sur GAMA, NetLogo et Python.",
    date: "2026-07-06T09:00:00",
    lieu: "Bondy — IRD",
    type: "École d'été",
    capacite: 40,
  },
  {
    id: 5,
    titre: "Soutenance — Modélisation des épidémies en milieu tropical",
    description: "Soutenance de thèse de doctorat.",
    date: "2026-06-18T14:00:00",
    lieu: "UCAD, Amphi A — Dakar",
    type: "Soutenance",
    capacite: 120,
  },
];

export type Formation = {
  id: number;
  intitule: string;
  niveau: string;
  duree: string;
  institution: string;
  description: string;
};

export const formations: Formation[] = [
  {
    id: 1,
    intitule: "Master Modélisation des Systèmes Complexes",
    niveau: "Master",
    duree: "2 ans",
    institution: "UCAD / Sorbonne Université",
    description:
      "Formation pluridisciplinaire en mathématiques appliquées, informatique et modélisation.",
  },
  {
    id: 2,
    intitule: "Doctorat en Informatique appliquée",
    niveau: "Doctorat",
    duree: "3 ans",
    institution: "UCAD — École Doctorale Math-Info",
    description:
      "Encadrement par les chercheurs UMMISCO sur les 4 axes de l'unité.",
  },
  {
    id: 3,
    intitule: "École d'été — Simulation multi-agents avec GAMA",
    niveau: "Formation continue",
    duree: "2 semaines",
    institution: "IRD — Bondy",
    description:
      "Formation intensive ouverte aux chercheurs, ingénieurs et doctorants du Sud.",
  },
];

export type Actualite = {
  id: number;
  titre: string;
  date: string;
  categorie: string;
  resume: string;
};

export const actualites: Actualite[] = [
  {
    id: 1,
    titre: "Lancement du projet AI-EPIDEM avec l'OMS",
    date: "2026-05-12",
    categorie: "Projet",
    resume:
      "Démarrage officiel du projet IA pour la prédiction des épidémies, financé par l'OMS.",
  },
  {
    id: 2,
    titre: "Publication dans Nature Communications",
    date: "2026-04-28",
    categorie: "Publication",
    resume:
      "Une étude UMMISCO sur la modélisation de la dengue retenue par Nature Communications.",
  },
  {
    id: 3,
    titre: "Ouverture des inscriptions — École d'été 2026",
    date: "2026-04-10",
    categorie: "Formation",
    resume:
      "Inscriptions ouvertes pour l'école d'été annuelle de simulation multi-agents.",
  },
  {
    id: 4,
    titre: "Nouveau partenariat avec le CIRAD",
    date: "2026-03-22",
    categorie: "Partenariat",
    resume:
      "Signature d'un accord-cadre pour le développement de modèles agro-climatiques.",
  },
  {
    id: 5,
    titre: "Bilan annuel 2025 disponible",
    date: "2026-02-15",
    categorie: "Institutionnel",
    resume: "Le rapport d'activité 2025 de l'unité est désormais public.",
  },
];

export const stats = {
  publications: 412,
  chercheurs: 87,
  projets: projets.filter((p) => p.statut === "en_cours").length + 16,
  pays: 12,
  bailleurs: bailleurs.length,
  partenaires: partenaires.length,
};

export function statutLabel(s: Projet["statut"]) {
  return {
    en_cours: "En cours",
    termine: "Terminé",
    suspendu: "Suspendu",
    planifie: "Planifié",
  }[s];
}
