import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Page } from "../components/Page";
import { mockFeatured, mockGallery } from "../services/mockCatalog";

function FeaturedCard({ p, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 180, damping: 22, delay: idx * 0.05 }}
      className="group relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.22)] shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur-[18px] dark:bg-[rgba(23,20,30,0.30)]"
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_0%,rgba(201,168,76,0.26),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(233,108,151,0.22),transparent_55%)]" />
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={p.images[0]}
          alt={p.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs tracking-[0.22em] text-white/80">{p.brand}</div>
            <div className="font-display text-xl text-white">{p.name}</div>
          </div>
          <div className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90 ring-1 ring-white/20">
            ${p.price}
          </div>
        </div>
      </div>

      <div className="relative p-5">
        <div className="flex flex-wrap gap-2">
          {p.shades.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(10,8,14,0.35)] px-3 py-1 text-xs text-white/90"
            >
              {s}
            </span>
          ))}
          {p.shades.length > 3 ? (
            <span className="rounded-full border border-[color:var(--border)] bg-white/10 px-3 py-1 text-xs text-white/80">
              +{p.shades.length - 3} more
            </span>
          ) : null}
        </div>

        <Link
          to={`/product/${encodeURIComponent(p.id)}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[color:var(--heading)] hover:text-[color:var(--gold)]"
        >
          View details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <Page>
      <section className="relative overflow-hidden rounded-[34px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.24)] shadow-[var(--shadow)] backdrop-blur-[18px] dark:bg-[rgba(23,20,30,0.34)]">
        <div className="absolute inset-0">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              alt="Luxury beauty editorial"
              src="https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=2400&q=80"
              className="h-full w-full object-cover opacity-70"
              loading="eager"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(201,168,76,0.40),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(233,108,151,0.38),transparent_52%),linear-gradient(180deg,rgba(0,0,0,0.50),rgba(0,0,0,0.35),rgba(0,0,0,0.62))]" />
        </div>

        <div className="relative px-6 py-16 sm:px-10 md:px-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 170, damping: 22 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs tracking-[0.26em] text-white/90 backdrop-blur-[18px]">
              <Sparkles className="h-4 w-4 text-[color:var(--gold)]" />
              LUXE • CLEAN • HIGH PERFORMANCE
            </div>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
              Billion‑dollar glow.
              <span className="block text-white/90">Skin-first color made to obsess over.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
              Discover ultra-fine pigments, cloud-soft textures, and glassy finishes designed for every undertone.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold tracking-wide text-black shadow-[0_20px_60px_rgba(201,168,76,0.30)] transition hover:brightness-110 active:scale-[0.99]"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Shop the collection <ArrowRight className="h-4 w-4" />
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <span className="absolute -inset-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.65),transparent_55%)]" />
                </span>
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur-[18px] transition hover:bg-white/15"
              >
                Explore categories
              </Link>
            </div>
          </motion.div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              { k: "New", v: "Soft‑matte lip & blush drops" },
              { k: "Viral", v: "Glass‑skin serum + primer duo" },
              { k: "Editor’s pick", v: "Satin foundation — 40 undertones" },
            ].map((x) => (
              <div key={x.k} className="glass-2 rounded-[26px] p-5 text-white">
                <div className="text-xs tracking-[0.22em] text-white/75">{x.k}</div>
                <div className="mt-2 font-display text-xl">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">FEATURED</div>
            <h2 className="mt-2 font-display text-3xl text-[color:var(--heading)]">Best-sellers with runway finish</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-[color:var(--text)] hover:text-[color:var(--gold)] sm:inline">
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {mockFeatured.map((p, idx) => (
            <FeaturedCard key={p.id} p={p} idx={idx} />
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-12">
        <div className="glass rounded-[30px] p-8 lg:col-span-7">
          <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">THE EXPERIENCE</div>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--heading)]">Micro-interactions you can feel</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--text)]">
            Touch-friendly hover states, scroll reveals, and subtle light-play build a luxury rhythm. The UI is designed
            to convert — minimal, elegant, and obsessively polished.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { t: "AI suggestions", d: "Mock logic recommends shades & textures." },
              { t: "Wishlist", d: "Save products, sync to your profile." },
              { t: "Skeleton loading", d: "Shimmer placeholders while data loads." },
              { t: "Premium checkout", d: "Fast, clear forms with order summary." },
            ].map((x) => (
              <div key={x.t} className="rounded-[24px] border border-[color:var(--border)] bg-white/10 p-4 dark:bg-white/5">
                <div className="font-medium text-[color:var(--heading)]">{x.t}</div>
                <div className="mt-1 text-sm text-[color:var(--text)]">{x.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[30px] border border-[color:var(--border)] lg:col-span-5">
          <img
            alt="Beauty lifestyle"
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
            <div className="text-xs tracking-[0.28em] text-white/75">TEXTURE • LIGHT • SKIN</div>
            <div className="mt-2 font-display text-2xl">A modern luxury ritual</div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">GALLERY</div>
            <h2 className="mt-2 font-display text-3xl text-[color:var(--heading)]">Instagram-style edits</h2>
          </div>
          <div className="text-sm text-[color:var(--text)]">#AureliaGlow</div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {mockGallery.map((src, idx) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.04 }}
              className="group relative overflow-hidden rounded-[26px] border border-[color:var(--border)]"
            >
              <img src={src} alt="Beauty gallery" className="h-56 w-full object-cover md:h-64" loading="lazy" />
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Page>
  );
}

