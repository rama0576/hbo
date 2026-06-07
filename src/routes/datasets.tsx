import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { datasets } from "@/data/mock";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/datasets")({
  head: () => ({
    meta: [
      { title: "Datasets — UMMISCO" },
      {
        name: "description",
        content: "Jeux de données ouverts et restreints produits par UMMISCO.",
      },
    ],
  }),
  component: DatasetsPage,
});

type DatasetItem = (typeof datasets)[number] & { updatedAt: string };

function DatasetsPage() {
  // Enhance list with last update timestamps
  const [datasetsList, setDatasetsList] = useState<DatasetItem[]>(
    datasets.map((d) => ({
      ...d,
      updatedAt:
        d.id === 1
          ? "2026-05-12"
          : d.id === 2
            ? "2026-06-05"
            : d.id === 3
              ? "2026-04-18"
              : d.id === 4
                ? "2026-05-29"
                : d.id === 5
                  ? "2026-05-02"
                  : "2026-03-12",
    })),
  );

  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Restricted Access Request Form State
  const [requestingDataset, setRequestingDataset] =
    useState<DatasetItem | null>(null);
  const [reqNom, setReqNom] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [reqInstitution, setReqInstitution] = useState("");
  const [reqJustif, setReqJustif] = useState("");
  const [reqSuccess, setReqSuccess] = useState(false);

  const handleDownload = (d: DatasetItem) => {
    if (!d.is_public) {
      // Trigger restricted access request dialog
      setRequestingDataset(d);
      setReqSuccess(false);
      return;
    }

    setDownloadingId(d.id);

    // Simulate real network fetch & compile of file data
    setTimeout(() => {
      // Update count locally
      setDatasetsList((prev) =>
        prev.map((item) =>
          item.id === d.id ? { ...item, downloads: item.downloads + 1 } : item,
        ),
      );
      setDownloadingId(null);
      setSuccessMessage(`Le jeu de données « ${d.nom} » a été téléchargé.`);
      setTimeout(() => setSuccessMessage(null), 5000);

      // Generate dynamic content depending on format
      let content = "";
      let mime = "text/plain";
      let ext = "txt";

      if (d.format.includes("CSV")) {
        content =
          "id;date_observation;axe_id;indicateur;valeur;fiabilite\n1;2026-06-01;1;propagation_taux;0.87;haute\n2;2026-06-02;1;propagation_taux;0.91;haute\n3;2026-06-03;1;propagation_taux;0.82;moyenne\n4;2026-06-04;1;propagation_taux;0.79;haute";
        mime = "text/csv;charset=utf-8";
        ext = "csv";
      } else if (d.format.includes("JSON")) {
        content = JSON.stringify(
          {
            dataset: d.nom,
            format: d.format,
            licence: d.licence,
            system_source: "UMMISCO Portal Cloud Ingress",
            series: [
              { time: "09:00", active_sensors: 20, p10: 18.4, p25: 11.2 },
              { time: "10:00", active_sensors: 19, p10: 19.1, p25: 12.0 },
              { time: "11:00", active_sensors: 20, p10: 22.8, p25: 14.5 },
            ],
          },
          null,
          2,
        );
        mime = "application/json;charset=utf-8";
        ext = "json";
      } else {
        content = `========================================================\nUMMISCO RESEARCH NETWORK PORTAL - DATA CONTAINER\n========================================================\nDataset: ${d.nom}\nLicence: ${d.licence}\nFormat: ${d.format}\nGenerated At: 2026-06-07\n\n[NOTICE] This simulation file represents the real high-fidelity access to open-source archives.\n========================================================`;
        mime = "text/plain;charset=utf-8";
        ext = "txt";
      }

      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${d.nom.toLowerCase().replace(/[^a-z0-9]/g, "_")}.${ext}`;
      link.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  const handleRestrictedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReqSuccess(true);
    // Simulate approval and subsequent automated email code voucher or temporary link dispatch
    setTimeout(() => {
      setReqSuccess(false);
      setRequestingDataset(null);
      setReqNom("");
      setReqEmail("");
      setReqInstitution("");
      setReqJustif("");
    }, 6000);
  };

  return (
    <>
      <PageHeader
        eyebrow="Données ouvertes"
        title="Datasets"
        sub="Données produites, calibrées ou enrichies par les équipes du réseau, accessibles selon les licences indiquées."
      />

      <section className="container-page py-12">
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold animate-fade-in flex items-center justify-between">
            <span>🎉 {successMessage}</span>
            <button
              onClick={() => setSuccessMessage(null)}
              className="font-bold text-teal-900 ml-4 hover:underline"
            >
              Fermer
            </button>
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left">
              <tr className="eyebrow">
                <th className="px-6 py-4 font-medium">Nom / Description</th>
                <th className="px-6 py-4 font-medium">Mise à jour</th>
                <th className="px-6 py-4 font-medium">Format</th>
                <th className="px-6 py-4 font-medium">Licence</th>
                <th className="px-6 py-4 font-medium">Accès</th>
                <th className="px-6 py-4 font-medium text-right">
                  Téléchargements
                </th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {datasetsList.map((d) => (
                <tr
                  key={d.id}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-5 max-w-sm">
                    <div className="font-display text-base font-bold text-primary-dark">
                      {d.nom}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {d.description}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-mono text-muted-foreground">
                    📅{" "}
                    {new Date(d.updatedAt).toLocaleDateString("fr", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-5 font-mono text-xs font-semibold">
                    <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                      {d.format}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-muted-foreground">
                    {d.licence}
                  </td>
                  <td className="px-6 py-5">
                    {d.is_public ? (
                      <span className="rounded-full bg-moss/10 border border-moss/20 px-2.5 py-0.5 text-[0.7rem] font-bold text-moss uppercase tracking-wider">
                        Public
                      </span>
                    ) : (
                      <span className="rounded-full bg-ochre/10 border border-ochre/20 px-2.5 py-0.5 text-[0.7rem] font-bold text-ochre uppercase tracking-wider">
                        Restreint
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right font-mono text-xs text-muted-foreground font-semibold">
                    {d.downloads.toLocaleString("fr")}
                  </td>
                  <td className="px-6 py-5 text-right">
                    {downloadingId === d.id ? (
                      <button
                        className="inline-flex items-center gap-1 cursor-default text-xs bg-slate-100 text-muted-foreground px-3 py-1.5 rounded font-bold border border-border"
                        disabled
                      >
                        <span className="animate-spin text-xs">⏳</span> En
                        cours
                      </button>
                    ) : d.is_public ? (
                      <button
                        onClick={() => handleDownload(d)}
                        className="inline-flex items-center gap-1 text-xs bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded font-bold transition cursor-pointer shadow-xs"
                      >
                        Télécharger 📥
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDownload(d)}
                        className="inline-flex items-center gap-1 text-xs bg-[#e2e8f0] text-primary-dark hover:bg-slate-200 px-3 py-1.5 rounded font-bold transition cursor-pointer border border-slate-300"
                      >
                        Demander 🔒
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RESTRICTED DATA ACCESS REQUEST MODAL */}
      {requestingDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
            <div className="p-6 border-b border-border bg-[#e2e8f0] text-primary-dark flex justify-between items-start">
              <div>
                <span className="rounded bg-ochre/25 text-ochre text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Accès Restreint
                </span>
                <h3 className="mt-2 font-display text-lg font-bold">
                  Demande d'autorisation : {requestingDataset.nom}
                </h3>
                <p className="text-muted-foreground text-xs mt-1">
                  Format: {requestingDataset.format} · Licence:{" "}
                  {requestingDataset.licence}
                </p>
              </div>
              <button
                onClick={() => {
                  setRequestingDataset(null);
                  setReqSuccess(false);
                }}
                className="text-muted-foreground hover:text-foreground text-3xl font-light leading-none p-1 cursor-pointer transition-colors"
                title="Fermer"
              >
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed border-b pb-3">
                Pour accéder à ce jeu de données de recherche restreint,
                veuillez fournir les informations de déontologie scientifique
                requises ci-dessous. Les comités d'éthique de l'UMMISCO
                examineront votre demande.
              </p>

              {reqSuccess ? (
                <div className="text-center py-6 space-y-3 animate-fade-in">
                  <div className="mx-auto w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xl">
                    ✓
                  </div>
                  <h4 className="font-display text-base font-bold text-teal-850">
                    Demande enregistrée de manière sécurisée
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Merci <strong>{reqNom}</strong>. Votre demande de accès
                    restreint sous l'institution{" "}
                    <strong>{reqInstitution}</strong> a été soumise au
                    secrétariat permanent de l'UMMISCO. Un e-mail de
                    confirmation contenant votre code d'accès sera envoyé à{" "}
                    <strong>{reqEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRestrictedSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                        Votre Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={reqNom}
                        onChange={(e) => setReqNom(e.target.value)}
                        placeholder="Ex: Pr. Sow"
                        className="w-full text-xs p-2.5 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                        Adresse Email Institutionnelle *
                      </label>
                      <input
                        type="email"
                        required
                        value={reqEmail}
                        onChange={(e) => setReqEmail(e.target.value)}
                        placeholder="Ex: s.ndiaye@ird.fr"
                        className="w-full text-xs p-2.5 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                      Organisme / Institution de Recherche *
                    </label>
                    <input
                      type="text"
                      required
                      value={reqInstitution}
                      onChange={(e) => setReqInstitution(e.target.value)}
                      placeholder="Ex: Institut Pasteur, CNRS, UCAD"
                      className="w-full text-xs p-2.5 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-primary-dark uppercase mb-1">
                      Justification scientifique (Projet de recherche) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reqJustif}
                      onChange={(e) => setReqJustif(e.target.value)}
                      placeholder="Décrivez brièvement comment ces données seront utilisées dans vos travaux..."
                      className="w-full text-xs p-2.5 bg-white border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded text-xs transition duration-200 cursor-pointer"
                  >
                    Soumettre la demande sécurisée d'accès
                  </button>
                </form>
              )}
            </div>

            <div className="p-4 border-t border-border bg-slate-50 flex justify-end">
              <button
                onClick={() => {
                  setRequestingDataset(null);
                  setReqSuccess(false);
                }}
                className="rounded-md border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground/80 hover:bg-slate-100 transition cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
