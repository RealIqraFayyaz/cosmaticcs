import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Page } from "../components/Page";
import { listProducts } from "../services/productApi";

function ProductTile({ p }) {
  return (
    <Link
      to={`/product/${encodeURIComponent(p._id)}`}
      className="group relative overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white/20 backdrop-blur-[18px] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)] dark:bg-[rgba(23,20,30,0.30)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={p.images[0]}
          alt={p.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-xs tracking-[0.22em] text-white/80">{p.brand}</div>
          <div className="font-display text-xl text-white">{p.name}</div>
          <div className="mt-1 text-sm text-white/90">${p.price}</div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs tracking-[0.18em] text-[color:var(--gold)]">{p.category}</div>
        <div className="mt-2 text-sm text-[color:var(--text)]">
          Silky texture, editorial finish. Tap to explore shades & reviews.
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_0%,rgba(201,168,76,0.22),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(233,108,151,0.18),transparent_55%)]" />
      </div>
    </Link>
  );
}

function SkeletonTile() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white/15 backdrop-blur-[18px] dark:bg-white/5">
      <div className="aspect-[4/5] bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.16),rgba(255,255,255,0.08))] bg-[length:200%_100%] animate-shimmer" />
      <div className="p-4">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="mt-3 h-4 w-44 rounded bg-white/10" />
        <div className="mt-2 h-3 w-36 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function ShopPage() {
  const [params] = useSearchParams();
  const q = params.get("q");
  const category = params.get("category");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listProducts({ q: q || undefined, category: category || undefined })
      .then((res) => {
        if (cancelled) return;
        setItems(res.items ?? []);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Couldn’t load products. Start the backend + seed to view the catalog.");
        setItems([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [q, category]);

  return (
    <Page>
      <div className="flex flex-col gap-8">
        <div className="glass rounded-[30px] p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">SHOP</div>
              <h1 className="mt-2 font-display text-4xl text-[color:var(--heading)]">Luxury essentials</h1>
              <p className="mt-2 text-sm text-[color:var(--text)]">
                {q ? (
                  <>
                    Searching for <span className="font-medium text-[color:var(--heading)]">“{q}”</span>
                  </>
                ) : (
                  <>Curated textures, shades, and rituals — designed to look expensive.</>
                )}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--border)] bg-white/10 px-5 py-3 text-sm font-medium text-[color:var(--heading)] transition hover:bg-white/15 dark:bg-white/5"
            >
              <SlidersHorizontal className="h-4 w-4 text-[color:var(--gold)]" />
              Filters (mock)
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { k: "Category", v: "Makeup / Skincare / Fragrance" },
              { k: "Price", v: "$20 – $80" },
              { k: "Brand", v: "AURÉLIA / Dior-inspired" },
            ].map((x) => (
              <div key={x.k} className="rounded-[22px] border border-[color:var(--border)] bg-white/10 p-4 dark:bg-white/5">
                <div className="text-xs tracking-[0.22em] text-[color:var(--text)]/80">{x.k}</div>
                <div className="mt-1 text-sm font-medium text-[color:var(--heading)]">{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 9 }).map((_, i) => <SkeletonTile key={i} />)
          ) : error ? (
            <div className="glass-2 rounded-[30px] p-6 sm:col-span-2 lg:col-span-3">
              <div className="font-display text-2xl text-[color:var(--heading)]">Catalog offline</div>
              <div className="mt-2 text-sm text-[color:var(--text)]">{error}</div>
            </div>
          ) : (
            items.map((p) => <ProductTile key={p._id} p={p} />)
          )}
        </div>
      </div>
    </Page>
  );
}

