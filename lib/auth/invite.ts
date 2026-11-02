import "server-only";
import { prisma } from "@/lib/prisma";
import { generateToken, hashToken } from "./tokens";
import { hashPassword } from "./password";

const INVITE_DAYS = 7;

export async function createInvite(invitedByAdminId: string, email?: string) {
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + INVITE_DAYS * 24 * 60 * 60 * 1000);

  await prisma.adminInvite.create({
    data: { tokenHash, invitedByAdminId, email: email || null, expiresAt },
  });

  // Returned once — the caller shows it to the inviting admin; it is never
  // stored or retrievable again.
  return token;
}

export async function getInviteByToken(token: string) {
  const tokenHash = hashToken(token);
  const invite = await prisma.adminInvite.findUnique({ where: { tokenHash } });
  if (!invite) return null;
  if (invite.usedAt || invite.revokedAt) return null;
  if (invite.expiresAt < new Date()) return null;
  return invite;
}

// Claims the invite and creates the admin in one transaction: the conditional
// updateMany only succeeds for the first caller, so two near-simultaneous
// submits of the same link can't both create an account.
export async function claimInvite(
  token: string,
  data: { name: string; email: string; password: string },
) {
  const tokenHash = hashToken(token);
  const passwordHash = await hashPassword(data.password);

  return prisma.$transaction(async (tx) => {
    const result = await tx.adminInvite.updateMany({
      where: { tokenHash, usedAt: null, revokedAt: null, expiresAt: { gt: new Date() } },
      data: { usedAt: new Date() },
    });

    if (result.count !== 1) {
      throw new Error("This invite link has already been used or has expired.");
    }

    return tx.admin.create({
      data: { email: data.email, name: data.name, passwordHash },
    });
  });
}
