import { motion } from "framer-motion";
import { Moon, Search, ShoppingBag, Sparkles, Sun } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { cn } from "../lib/cn";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { count } = useCart();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const suggestions = useMemo(() => {
    const s = ["Soft-matte lipstick", "Glow serum", "Blush veil", "Satin foundation", "Vanilla musk fragrance"];
    const trimmed = q.trim().toLowerCase();
    if (!trimmed) return [];
    return s.filter((x) => x.toLowerCase().includes(trimmed)).slice(0, 5);
  }, [q]);

  return (
    <div className="sticky top-0 z-50">
      <div className="glass border-x-0 border-t-0">
        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" className="group inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-[color:var(--border)] bg-[rgba(255,255,255,0.20)] shadow-[0_10px_30px_rgba(0,0,0,0.18)] dark:bg-[rgba(23,20,30,0.30)]">
              <Sparkles className="h-4 w-4 text-[color:var(--gold)]" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-[13px] tracking-[0.24em] text-[color:var(--heading)]">AURÉLIA</div>
              <div className="text-[11px] tracking-wide text-[color:var(--text)]/80">Beauty Atelier</div>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-3 py-2 text-sm tracking-wide text-[color:var(--text)] transition",
                    "hover:text-[color:var(--heading)]",
                    isActive && "text-[color:var(--heading)]"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{l.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-[rgba(201,168,76,0.16)] ring-1 ring-[rgba(201,168,76,0.26)]"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden w-[320px] md:block">
              <div className="glass-2 flex items-center gap-2 rounded-2xl px-3 py-2">
                <Search className="h-4 w-4 text-[color:var(--text)]/70" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/shop?q=${encodeURIComponent(q)}`);
                  }}
                  placeholder="Search (shade, product, texture)…"
                  className="w-full bg-transparent text-sm text-[color:var(--heading)] placeholder:text-[color:var(--text)]/60 outline-none"
                />
              </div>
              {suggestions.length ? (
                <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[rgba(10,8,14,0.35)] backdrop-blur-[18px]">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setQ(s);
                        navigate(`/shop?q=${encodeURIComponent(s)}`);
                      }}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white/90 hover:bg-white/5"
                    >
                      <span className="truncate">{s}</span>
                      <span className="text-[11px] text-[color:var(--gold)]/90">suggestion</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="group relative grid h-10 w-10 place-items-center rounded-2xl border border-[color:var(--border)] bg-[rgba(255,255,255,0.22)] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition hover:scale-[1.03] active:scale-[0.99] dark:bg-[rgba(23,20,30,0.32)]"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4 text-[color:var(--heading)] group-hover:text-[color:var(--gold)]" />
              {count ? (
                <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--blush)] px-1 text-[10px] font-bold text-white ring-2 ring-[rgba(0,0,0,0.16)]">
                  {count > 99 ? "99+" : count}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={toggle}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-[color:var(--border)] bg-[rgba(255,255,255,0.22)] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition hover:scale-[1.03] active:scale-[0.99] dark:bg-[rgba(23,20,30,0.32)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-[color:var(--gold)]" />
              ) : (
                <Moon className="h-4 w-4 text-[color:var(--heading)]" />
              )}
            </button>
          </div>
        </div>

        {location.pathname !== "/" ? (
          <div className="mx-auto h-px w-full max-w-[1240px] bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.22)] to-transparent" />
        ) : null}
      </div>
    </div>
  );
}

