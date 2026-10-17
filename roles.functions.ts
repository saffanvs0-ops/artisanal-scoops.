import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const APP_ROLES = ["owner", "manager", "staff", "customer"] as const;
type AppRole = (typeof APP_ROLES)[number];

async function requireOwner(supabase: any, userId: string) {
  const { data: isOwner } = await supabase.rpc("has_role", { _user_id: userId, _role: "owner" });
  if (!isOwner) throw new Error("Forbidden: only the owner can manage roles");
}

export const listUsersWithRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context as any;
    // Owners and managers may view the role list
    const { data: canView } = await supabase.rpc("has_role", { _user_id: userId, _role: "owner" });
    const { data: isManager } = await supabase.rpc("has_role", { _user_id: userId, _role: "manager" });
    if (!canView && !isManager) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rolesRows } = await supabaseAdmin.from("user_roles").select("user_id, role");
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
    const rolesByUser = new Map<string, string[]>();
    for (const r of rolesRows ?? []) {
      rolesByUser.set(r.user_id, [...(rolesByUser.get(r.user_id) ?? []), r.role]);
    }
    return (usersData?.users ?? []).map((u) => ({
      id: u.id,
      email: u.email ?? "",
      roles: rolesByUser.get(u.id) ?? [],
    }));
  });

export const assignRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { email: string; role: string }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    await requireOwner(supabase, userId);
    if (!APP_ROLES.includes(data.role as AppRole)) throw new Error("Invalid role");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const target = usersData?.users.find((u) => u.email?.toLowerCase() === data.email.toLowerCase());
    if (!target) throw new Error("No account found with that email");

    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: target.id, role: data.role as AppRole }, { onConflict: "user_id,role" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const removeRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string; role: string }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    await requireOwner(supabase, userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.userId)
      .eq("role", data.role as AppRole);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
