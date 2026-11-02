import { randomBytes, createHash } from "crypto";

// Raw tokens are shown to the user once (in a cookie or a copyable link) and
// never stored — only their hash is persisted, so a DB leak doesn't expose
// usable sessions or invites.
export function generateToken() {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
