import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Page } from "../components/Page";
import { useAuth } from "../contexts/AuthContext";

export function AuthPage() {
  const [mode, setMode] = useState("login");
  const { login, register, status } = useAuth();
  const navigate = useNavigate();

  return (
    <Page>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-[34px] border border-[color:var(--border)] lg:col-span-6">
          <img
            alt="Beauty model"
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(201,168,76,0.35),transparent_55%),radial-gradient(circle_at_80%_40%,rgba(233,108,151,0.30),transparent_55%),linear-gradient(180deg,rgba(0,0,0,0.60),rgba(0,0,0,0.20),rgba(0,0,0,0.70))]" />
          <div className="absolute bottom-0 left-0 right-0 p-9 text-white">
            <div className="text-xs tracking-[0.28em] text-white/75">MEMBERSHIP</div>
            <div className="mt-2 font-display text-3xl">Save wishlists, track orders</div>
            <div className="mt-2 text-sm text-white/80">A premium dashboard experience — synced across devices.</div>
          </div>
        </div>

        <div className="glass rounded-[34px] p-8 lg:col-span-6">
          <div className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/10 p-1 dark:bg-white/5">
            {[
              { k: "login", label: "Login" },
              { k: "register", label: "Register" },
            ].map((t) => (
              <button
                key={t.k}
                type="button"
                onClick={() => setMode(t.k)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === t.k
                    ? "bg-[rgba(201,168,76,0.22)] text-[color:var(--heading)] ring-1 ring-[rgba(201,168,76,0.35)]"
                    : "text-[color:var(--text)] hover:bg-white/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <h1 className="mt-7 font-display text-4xl text-[color:var(--heading)]">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-[color:var(--text)]">
            {mode === "login" ? "Sign in to continue your ritual." : "Luxury perks, saved edits, and quick checkout."}
          </p>

          <form
            className="mt-7 grid gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const email = String(form.get("email") ?? "");
              const password = String(form.get("password") ?? "");
              const name = String(form.get("name") ?? "");
              try {
                if (mode === "login") await login({ email, password });
                else await register({ name, email, password });
                toast.success(mode === "login" ? "Welcome back." : "Account created.");
                navigate("/dashboard");
              } catch (err) {
                const msg = err?.response?.data?.message ?? "Something went wrong.";
                toast.error(msg);
              }
            }}
          >
            {mode === "register" ? (
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">Full name</span>
                <input
                  required
                  name="name"
                  className="rounded-[18px] border border-[color:var(--border)] bg-white/10 px-4 py-3 text-sm text-[color:var(--heading)] outline-none focus:ring-2 focus:ring-[rgba(201,168,76,0.35)] dark:bg-white/5"
                />
              </label>
            ) : null}

            <label className="grid gap-2">
              <span className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">Email</span>
              <input
                required
                type="email"
                name="email"
                className="rounded-[18px] border border-[color:var(--border)] bg-white/10 px-4 py-3 text-sm text-[color:var(--heading)] outline-none focus:ring-2 focus:ring-[rgba(201,168,76,0.35)] dark:bg-white/5"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">Password</span>
              <input
                required
                type="password"
                name="password"
                className="rounded-[18px] border border-[color:var(--border)] bg-white/10 px-4 py-3 text-sm text-[color:var(--heading)] outline-none focus:ring-2 focus:ring-[rgba(201,168,76,0.35)] dark:bg-white/5"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold tracking-wide text-black transition hover:brightness-110 active:scale-[0.99]"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}

