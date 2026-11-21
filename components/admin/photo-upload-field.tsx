"use client";

import { useState, type ChangeEvent } from "react";

type SignResponse = {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
};

export function PhotoUploadField({
  name,
  label,
  defaultValue,
  folder,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder: "team" | "content";
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [preview, setPreview] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    try {
      const signRes = await fetch("/api/admin/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      if (!signRes.ok) throw new Error("Could not sign upload.");
      const sign = (await signRes.json()) as SignResponse;

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sign.apiKey);
      form.append("timestamp", String(sign.timestamp));
      form.append("signature", sign.signature);
      form.append("folder", sign.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
        { method: "POST", body: form },
      );
      if (!uploadRes.ok) throw new Error("Upload failed.");
      const uploaded = (await uploadRes.json()) as { secure_url: string };
      setUrl(uploaded.secure_url);
    } catch {
      setError("Upload failed — try a smaller image (max 10MB) or a different file.");
    } finally {
      setUploading(false);
      // Allow choosing the same file again after a removal or retry.
      input.value = "";
    }
  }

  return (
    <div>
      <span className="text-xs uppercase tracking-[0.2em] text-mute">{label}</span>
      <input type="hidden" name={name} value={url} />
      <div className="mt-2 flex items-center gap-4">
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-20 w-20 rounded-sm object-cover" />
        )}
        <label className="cursor-pointer rounded-full border border-ink/30 px-5 py-2 text-sm hover:border-gold">
          {uploading ? "Uploading…" : preview ? "Change image" : "Choose image"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={onChange}
            className="hidden"
          />
        </label>
        {preview && (
          <button
            type="button"
            onClick={() => {
              setUrl("");
              setPreview("");
              setError("");
            }}
            className="rounded-full border border-ink/20 px-5 py-2 text-sm text-mute transition-colors hover:border-red-400 hover:text-red-600"
          >
            Remove image
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
