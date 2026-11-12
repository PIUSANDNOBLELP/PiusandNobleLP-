// One-off migration: converts existing INSIGHT bodies from Markdown to HTML,
// matching the new rich-text editor's storage format. Update bodies are left
// untouched (short notices, never rendered publicly).
// Run with: npx tsx scripts/migrate-insights-to-html.ts
import { config } from "dotenv";
config({ path: ".env.local" });

import MarkdownIt from "markdown-it";
import { Client } from "pg";

const md = new MarkdownIt({ html: false, linkify: true });

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Missing DATABASE_URL");

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const { rows } = await client.query(
    `select id, title, body from "Content" where kind = 'INSIGHT'`,
  );

  let converted = 0;
  let skipped = 0;
  for (const row of rows) {
    const body: string = row.body ?? "";
    // Already HTML (starts with a tag) — leave it alone so the script is idempotent.
    if (/^\s*</.test(body)) {
      skipped++;
      continue;
    }
    const html = md.render(body);
    await client.query(`update "Content" set body = $1 where id = $2`, [html, row.id]);
    converted++;
  }

  console.log(`Converted ${converted} insight(s) to HTML; skipped ${skipped} already-HTML row(s).`);
  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
