import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Nouveau mot de passe — UMMISCO" }] }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pwd });
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Mot de passe mis à jour");
      navigate({ to: "/profil" });
    }
  }

  return (
    <section className="container-page grid min-h-[calc(100vh-200px)] items-center py-12">
      <form
        onSubmit={submit}
        className="card-soft mx-auto w-full max-w-md p-7 space-y-5"
      >
        <h1 className="font-display text-3xl">Nouveau mot de passe</h1>
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
          minLength={6}
          placeholder="Nouveau mot de passe"
          className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm"
        />
        <button
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
        >
          {loading ? "..." : "Mettre à jour"}
        </button>
      </form>
    </section>
  );
}
