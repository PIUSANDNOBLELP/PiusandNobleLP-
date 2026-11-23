# Production setup — accounts & credentials

Moving the Pius & Noble LP website from the development environment to the
firm's own production accounts. Each service below needs an account created
**by the firm** (or transferred to it), and the listed values shared with the
developer.

---

## 1. GitHub — source control

- Sign up / create an organisation for the firm at github.com.
- Create a **private** repository, e.g. `pius-noble-website`.
- Give the developer access (collaborator, or an organisation member).

**Deliver:** repository URL + developer access.

---

## 2. Vercel — hosting & deployment

- Sign up at vercel.com using **“Continue with GitHub”** (the firm's GitHub).
- Import the repository above.
- Add the environment variables (see table at the bottom).
- Point the production domain to this project.

Plan: the free Hobby tier works for testing, but a commercial firm site should
use the **Pro** plan.

**Deliver:** project access (add the developer to the team).

---

## 3. Neon — PostgreSQL database

- Sign up at neon.tech.
- Create a project (e.g. `pius-noble`) in the region closest to the firm/users.
- Copy the **pooled** connection string from the dashboard.

**Deliver:** `DATABASE_URL` (the full `postgresql://…` string).

---

## 4. Cloudinary — image uploads

Used for team photos and insight cover images uploaded from the admin.

- Sign up at cloudinary.com.
- Create a product environment (your "cloud name" is created with it).
- From the dashboard, copy the Cloud name, API Key and API Secret.

**Deliver:** `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

---

## 5. Resend — contact-form email delivery

Used to deliver website enquiries to the firm's inbox.

- Sign up at resend.com (use the firm's email address).
- Create an API key.
- Add the firm's sending domain (e.g. `piusandnoblelp.com`) and add the DNS
  records Resend gives you (SPF + DKIM) at the domain registrar, then verify it.
  - Until the domain is verified, Resend's test sender `onboarding@resend.dev`
    can **only** deliver to the address the Resend account was created with.

**Deliver:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`,
`CONTACT_FROM_NAME`.

---

## 6. Domain & DNS

- The production domain (e.g. `piusandnoblelp.com`) stays in the firm's
  registrar account.
- Point it at Vercel (Vercel gives the exact nameservers or A/CNAME records).
- The same domain is used to verify the Resend sending domain.

**Deliver:** registrar/DNS access, or the DNS records added on the firm's side.

---

## Environment variables (Vercel → Settings → Environment Variables)

| Variable | Where it comes from | Example |
|---|---|---|
| `DATABASE_URL` | Neon (pooled connection string) | `postgresql://user:pass@host/db?sslmode=require` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard | `pius-noble` |
| `CLOUDINARY_API_KEY` | Cloudinary dashboard | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary dashboard | `••••••••` |
| `RESEND_API_KEY` | Resend → API Keys | `re_••••••••` |
| `CONTACT_TO_EMAIL` | Firm inbox that receives enquiries | `info@piusandnoblelp.com` |
| `CONTACT_FROM_EMAIL` | Verified sender in Resend | `website@piusandnoblelp.com` |
| `CONTACT_FROM_NAME` | Display name on the email | `Pius & Noble LP` |
| `APP_URL` | Production site URL (server-side only) | `https://piusandnoblelp.com` |
| `ADMIN_SEED_EMAIL` | First admin login (change after) | `admin@piusandnoblelp.com` |
| `ADMIN_SEED_PASSWORD` | First admin password (change after) | a strong password |
| `ADMIN_SEED_NAME` | Display name | `Admin` |

---

## Optional (recommended later)

- **Google Search Console** — submit the sitemap so the site gets indexed.
- **Analytics** (e.g. Plausible or Google Analytics) — traffic reporting.
- **Uptime monitor** (e.g. UptimeRobot) — alerts if the site goes down.

---

## Go-live checklist

1. Firm creates the accounts above and hands over the keys.
2. Developer adds all environment variables to Vercel.
3. Run the database migrations + seeds against the production Neon database.
4. First admin login with `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`, then change
   the password.
5. Point the domain at Vercel; verify the Resend sending domain.
6. Submit the contact form on the live site and confirm the enquiry email arrives.
