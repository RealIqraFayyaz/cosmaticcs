import { toast } from "sonner";
import { Page } from "../components/Page";

export function ContactPage() {
  return (
    <Page>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="glass rounded-[34px] p-8 lg:col-span-5">
          <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">CONTACT</div>
          <h1 className="mt-2 font-display text-4xl text-[color:var(--heading)]">Let’s talk glow</h1>
          <p className="mt-3 text-sm text-[color:var(--text)]">
            Press, partnerships, order support — we answer quickly with concierge-level care.
          </p>

          <form
            className="mt-7 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent (mock).");
              e.currentTarget.reset();
            }}
          >
            {[
              { name: "name", label: "Name" },
              { name: "email", label: "Email" },
              { name: "subject", label: "Subject" },
            ].map((f) => (
              <label key={f.name} className="grid gap-2">
                <span className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">{f.label}</span>
                <input
                  required
                  name={f.name}
                  className="rounded-[18px] border border-[color:var(--border)] bg-white/10 px-4 py-3 text-sm text-[color:var(--heading)] outline-none placeholder:text-[color:var(--text)]/60 focus:ring-2 focus:ring-[rgba(201,168,76,0.35)] dark:bg-white/5"
                  placeholder={`Your ${f.label.toLowerCase()}…`}
                />
              </label>
            ))}

            <label className="grid gap-2">
              <span className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">Message</span>
              <textarea
                required
                name="message"
                rows={5}
                className="rounded-[18px] border border-[color:var(--border)] bg-white/10 px-4 py-3 text-sm text-[color:var(--heading)] outline-none placeholder:text-[color:var(--text)]/60 focus:ring-2 focus:ring-[rgba(201,168,76,0.35)] dark:bg-white/5"
                placeholder="Tell us what you need…"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold tracking-wide text-black transition hover:brightness-110 active:scale-[0.99]"
            >
              Send message
            </button>
          </form>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-[color:var(--border)] lg:col-span-7">
          <iframe
            title="Map"
            className="h-[520px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=New%20York%20City&output=embed"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,168,76,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(233,108,151,0.14),transparent_55%)]" />
        </div>
      </div>
    </Page>
  );
}

