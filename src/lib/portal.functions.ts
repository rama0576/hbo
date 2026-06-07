import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Public-read server functions (use admin client to bypass RLS for public columns;
// every policy already allows public read on these tables — we keep this pattern
// uniform so loaders work whether or not the user is signed in).

export const searchAll = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ q: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } =
      await import("@/integrations/supabase/client.server");
    const q = `%${data.q}%`;
    const [pubs, projs, chers, dsets, evts] = await Promise.all([
      supabaseAdmin
        .from("publication")
        .select("id, titre, annee, type, axe_id")
        .or(`titre.ilike.${q},resume.ilike.${q}`)
        .limit(20),
      supabaseAdmin
        .from("projet")
        .select("id, titre, statut, axe_id")
        .or(`titre.ilike.${q},description.ilike.${q}`)
        .limit(20),
      supabaseAdmin
        .from("chercheur")
        .select("id, nom_complet, titre, institution, specialite")
        .or(
          `nom_complet.ilike.${q},specialite.ilike.${q},institution.ilike.${q}`,
        )
        .limit(20),
      supabaseAdmin
        .from("dataset")
        .select("id, nom, format, axe_id")
        .eq("is_public", true)
        .or(`nom.ilike.${q},description.ilike.${q}`)
        .limit(20),
      supabaseAdmin
        .from("evenement")
        .select("id, titre, date, lieu, type")
        .or(`titre.ilike.${q},description.ilike.${q}`)
        .limit(20),
    ]);
    return {
      publications: pubs.data ?? [],
      projets: projs.data ?? [],
      chercheurs: chers.data ?? [],
      datasets: dsets.data ?? [],
      evenements: evts.data ?? [],
    };
  });

export const getChercheurDetail = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ id: z.number().int().positive() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } =
      await import("@/integrations/supabase/client.server");
    const [ch, axes, pubs, projs] = await Promise.all([
      supabaseAdmin
        .from("chercheur")
        .select("*")
        .eq("id", data.id)
        .maybeSingle(),
      supabaseAdmin
        .from("affiliation")
        .select("axe:axe_id(id, nom, thematique)")
        .eq("chercheur_id", data.id),
      supabaseAdmin
        .from("rediger")
        .select(
          "est_auteur_principal, ordre_auteur, publication:publication_id(id, titre, annee, type, revue, axe_id)",
        )
        .eq("chercheur_id", data.id),
      supabaseAdmin
        .from("participer_projet")
        .select("role_projet, projet:projet_id(id, titre, statut, axe_id)")
        .eq("chercheur_id", data.id),
    ]);
    return {
      chercheur: ch.data,
      axes: (axes.data ?? []).map((r) => r.axe).filter(Boolean),
      publications: (pubs.data ?? [])
        .map((r) => ({
          ...r.publication,
          est_auteur_principal: r.est_auteur_principal,
        }))
        .filter(Boolean),
      projets: (projs.data ?? [])
        .map((r) => ({ ...r.projet, role: r.role_projet }))
        .filter(Boolean),
    };
  });

export const listChercheurs = createServerFn({ method: "GET" }).handler(
  async () => {
    const { supabaseAdmin } =
      await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("chercheur")
      .select("id, nom_complet, titre, institution, specialite, initiales")
      .order("nom_complet");
    return data ?? [];
  },
);

export const listAxes = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } =
    await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("axe").select("*").order("id");
  return data ?? [];
});

export const getMyProfile = createServerFn({ method: "GET" }).handler(
  async () => {
    const { requireSupabaseAuth } =
      await import("@/integrations/supabase/auth-middleware");
    void requireSupabaseAuth; // keep import; real auth via middleware on caller
    return null;
  },
);
