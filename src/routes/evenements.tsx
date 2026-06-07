import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { evenements } from "@/data/mock";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements — UMMISCO" },
      {
        name: "description",
        content: "Soutenances, séminaires, écoles d'été et ateliers UMMISCO.",
      },
    ],
  }),
  component: EvenementsPage,
});

type EvenementItem = (typeof evenements)[number];

function EvenementsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EvenementItem | null>(
    null,
  );

  // States for interactive registration form
  const [eventFormNom, setEventFormNom] = useState("");
  const [eventFormEmail, setEventFormEmail] = useState("");
  const [eventFormInstitution, setEventFormInstitution] = useState("");
  const [eventFormStatut, setEventFormStatut] = useState("Doctorant");
  const [eventFormSuccess, setEventFormSuccess] = useState(false);

  const handleEventFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEventFormSuccess(true);
    // Modal will stay open showing the ticket with a real local voucher download
  };

  return (
    <>
      <PageHeader
        eyebrow="Agenda scientifique"
        title="Événements"
        sub="Soutenances, séminaires, écoles d'été et ateliers organisés ou co-organisés par UMMISCO."
      />
      <section className="container-page py-12">
        <ul className="divide-y divide-border border-y border-border">
          {evenements.map((e) => {
            const d = new Date(e.date);
            return (
              <li
                key={e.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 hover:bg-slate-50/50 px-4 transition rounded-md"
              >
                <div className="rounded-md border border-border bg-secondary px-4 py-3 text-center min-w-[80px]">
                  <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {d.toLocaleString("fr", { month: "short" })}
                  </div>
                  <div className="font-display text-3xl leading-none font-bold text-primary">
                    {d.getDate()}
                  </div>
                  <div className="mt-1 font-mono text-[0.65rem] text-muted-foreground">
                    {d.getFullYear()}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="eyebrow inline-block bg-accent-light text-primary-dark font-semibold text-[10px] rounded px-1.5 py-0.5 uppercase tracking-wider">
                    {e.type}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl leading-snug font-bold text-primary-dark">
                    {e.titre}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    📍 {e.lieu} ·{" "}
                    {d.toLocaleTimeString("fr", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    ·{" "}
                    <span className="font-semibold text-emerald-700">
                      {e.capacite} places disponibles
                    </span>
                  </p>
                  <p className="mt-2 text-xs text-foreground/80 max-w-3xl line-clamp-2">
                    {e.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedEvent(e);
                    setEventFormSuccess(false);
                  }}
                  className="items-center rounded-md border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 text-sm font-semibold transition cursor-pointer"
                >
                  S'inscrire
                </button>
              </li>
            );
          })}
        </ul>
      </section>

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
              <div className="text-xs text-muted-foreground pb-2 border-b border-border leading-relaxed">
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

                  <div className="flex items-start gap-2 pt-1 font-sans">
                    <input
                      type="checkbox"
                      id="evt-page-confirm"
                      required
                      className="mt-0.5 cursor-pointer rounded border-border text-primary focus:ring-primary focus:ring-0 focus:ring-offset-0"
                    />
                    <label
                      htmlFor="evt-page-confirm"
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
