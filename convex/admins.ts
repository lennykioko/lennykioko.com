import { query } from "./_generated/server";

export const SUPER_ADMIN_EMAILS = ["lennykmutua@gmail.com"];

export function isSuperAdmin(email?: string): boolean {
  return !!email && SUPER_ADMIN_EMAILS.includes(email.toLowerCase());
}

export const getMyApprovalStatus = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return { isSuperAdmin: isSuperAdmin(identity.email) };
  },
});
