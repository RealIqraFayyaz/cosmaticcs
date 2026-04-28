import { Page } from "../components/Page";

export function AboutPage() {
  return (
    <Page>
      <section className="grid gap-8 lg:grid-cols-12">
        <div className="glass rounded-[34px] p-9 lg:col-span-7">
          <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">ABOUT</div>
          <h1 className="mt-2 font-display text-4xl text-[color:var(--heading)]">A modern luxury atelier</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--text)]">
            AURÉLIA is inspired by backstage artistry and skin-first minimalism — where pigment floats, light sculpts,
            and texture is intentionally soft. We design cosmetics like couture: precise, wearable, and unforgettable.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Mission", v: "Radiance for every undertone." },
              { k: "Formula", v: "Clean, high-performance textures." },
              { k: "Design", v: "Glass + gold, always tactile." },
            ].map((x) => (
              <div key={x.k} className="rounded-[26px] border border-[color:var(--border)] bg-white/10 p-5 dark:bg-white/5">
                <div className="text-xs tracking-[0.22em] text-[color:var(--text)]/75">{x.k}</div>
                <div className="mt-2 font-display text-lg text-[color:var(--heading)]">{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-[color:var(--border)] lg:col-span-5">
          <img
            alt="Brand story visual"
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="text-xs tracking-[0.28em] text-white/70">CRAFT • LIGHT • SKIN</div>
            <div className="mt-2 font-display text-2xl">Designed to be obsessed over</div>
          </div>
        </div>
      </section>
    </Page>
  );
}

