import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact | Pius & Noble LP",
  robots: { index: false, follow: false },
};

const FIRM_EMAIL = "piusowho@piusandnoblelp.com";
const FIRM_PHONE = "+234-8080638471";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="bg-paper pt-24">
        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          {/* Intro */}
          <div className="max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold-deep">Contact</p>
            <h1 className="font-display text-5xl font-normal leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              Start the conversation.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-mute">
              Tell us what you&apos;re working on. We&apos;ll reply with next steps and a clear
              timeline.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            {/* Contact details */}
            <div className="min-w-0 space-y-8">
              <div className="flex items-start gap-4">
                <MapPinIcon />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-mute">Office</p>
                  <p className="mt-2 max-w-sm text-lg leading-relaxed text-ink">
                    Suite E3, UYK HexaHub Nig. Ltd
                    <br />
                    Plot 1077A, Balanga Crescent
                    <br />
                    Area 11, Garki, Abuja
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-ink/10 pt-8">
                <MailIcon />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-mute">Email</p>
                  <a
                    href={`mailto:${FIRM_EMAIL}`}
                    className="mt-2 block break-words text-lg text-ink transition-colors hover:text-gold-deep"
                  >
                    {FIRM_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-ink/10 pt-8">
                <PhoneIcon />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-mute">Phone</p>
                  <a
                    href={`tel:${FIRM_PHONE.replace(/-/g, "")}`}
                    className="mt-2 block text-lg text-ink transition-colors hover:text-gold-deep"
                  >
                    {FIRM_PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="min-w-0">
              <div className="rounded-sm border border-ink/10 bg-paper-deep p-6 md:p-9">
                <p className="font-display text-2xl font-normal md:text-3xl">Send us a message</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  Fill in the form and it lands straight in our inbox.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-5 w-5 shrink-0 text-gold-deep" aria-hidden>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-5 w-5 shrink-0 text-gold-deep" aria-hidden>
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-5 w-5 shrink-0 text-gold-deep" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
