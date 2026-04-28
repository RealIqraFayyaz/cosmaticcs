import { Link } from "react-router-dom";
import { Page } from "../components/Page";

const cats = [
  {
    title: "Skincare",
    desc: "Barrier-first radiance, glass finish.",
    img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Makeup",
    desc: "Pigment that looks expensive.",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Haircare",
    desc: "Shine rituals with weightless slip.",
    img: "https://images.unsplash.com/photo-1526045431048-90d1b43b9c57?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Fragrance",
    desc: "Skin scents. Soft projection. All day.",
    img: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80",
  },
];

export function CategoriesPage() {
  return (
    <Page>
      <div className="glass rounded-[34px] p-8">
        <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">CATEGORIES</div>
        <h1 className="mt-2 font-display text-4xl text-[color:var(--heading)]">Shop by ritual</h1>
        <p className="mt-2 max-w-2xl text-sm text-[color:var(--text)]">
          Skincare, makeup, haircare, fragrance — curated like an editorial wardrobe.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {cats.map((c) => (
          <Link
            key={c.title}
            to={`/shop?category=${encodeURIComponent(c.title)}`}
            className="group relative overflow-hidden rounded-[34px] border border-[color:var(--border)] bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition hover:-translate-y-1 dark:bg-white/5"
          >
            <img src={c.img} alt={c.title} className="h-72 w-full object-cover opacity-90" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <div className="text-xs tracking-[0.28em] text-white/70">AURÉLIA</div>
              <div className="mt-2 font-display text-3xl">{c.title}</div>
              <div className="mt-2 text-sm text-white/80">{c.desc}</div>
              <div className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20">
                Explore →
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_10%,rgba(201,168,76,0.22),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(233,108,151,0.18),transparent_55%)]" />
            </div>
          </Link>
        ))}
      </div>
    </Page>
  );
}

