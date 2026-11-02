import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/dal";
import { cloudinary } from "@/lib/cloudinary";

// Signs an upload request so the browser can go straight to Cloudinary
// without the server ever touching the file. Gated behind requireAdmin() —
// anyone with a valid signature could otherwise upload to this account.
export async function POST(request: Request): Promise<NextResponse> {
  await requireAdmin();

  const { folder } = (await request.json()) as { folder?: string };
  const safeFolder = folder === "team" || folder === "content" ? folder : "content";

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder: safeFolder };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return NextResponse.json({
    signature,
    timestamp,
    folder: safeFolder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
