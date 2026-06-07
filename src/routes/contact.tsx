import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./publications";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — UMMISCO" },
      { name: "description", content: "Contacter l'unité UMMISCO." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nous écrire"
        title="Contact"
        sub="Une question, une proposition de collaboration ou de partenariat ? Écrivez-nous."
      />
      <section className="container-page grid gap-12 py-12 md:grid-cols-[1fr_1fr]">
        <form
          className="card-soft space-y-5 p-8"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message envoyé (démo)");
          }}
        >
          <div>
            <label className="eyebrow">Nom</label>
            <input
              className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
              required
            />
          </div>
          <div>
            <label className="eyebrow">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
              required
            />
          </div>
          <div>
            <label className="eyebrow">Sujet</label>
            <input className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm" />
          </div>
          <div>
            <label className="eyebrow">Message</label>
            <textarea
              rows={5}
              className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
              required
            />
          </div>
          <button className="inline-flex items-center rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-ink/85">
            Envoyer →
          </button>
        </form>

        <aside className="space-y-8">
          <div>
            <p className="eyebrow">Adresse Principale (Sénégal)</p>
            <p className="mt-2 font-display text-xl text-primary-dark font-bold">
              UMMISCO — UCAD
            </p>
            <p className="text-sm text-muted-foreground">
              Département d'Informatique, Faculté des Sciences et Techniques
              (FST)
              <br />
              Université Cheikh Anta Diop (UCAD), BP 5005, Dakar, Sénégal
            </p>
          </div>
          <div>
            <p className="eyebrow">Bureau Europe & Autres Antennes</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>UMMISCO — IRD (France) :</strong> 32 avenue Henri
                Varagnat, 93143 Bondy Cedex, France
              </li>
              <li>
                <strong>Antenne Madagascar :</strong> Université d'Antananarivo
              </li>
              <li>
                <strong>Antenne Burkina Faso :</strong> Université Joseph
                Ki-Zerbo, Ouagadougou
              </li>
              <li>
                <strong>Antenne Cameroun :</strong> Université de Yaoundé I
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Email de contact</p>
            <p className="mt-2 font-mono text-sm text-primary font-bold">
              <a
                href="mailto:contact@ummisco.ucad.sn"
                className="hover:underline"
              >
                contact@ummisco.ucad.sn
              </a>
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
