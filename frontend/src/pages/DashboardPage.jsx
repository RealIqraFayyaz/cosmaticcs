import { Heart, Package, User } from "lucide-react";
import { Page } from "../components/Page";
import { mockFeatured } from "../services/mockCatalog";

export function DashboardPage() {
  return (
    <Page>
      <div className="glass rounded-[34px] p-8">
        <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">DASHBOARD</div>
        <h1 className="mt-2 font-display text-4xl text-[color:var(--heading)]">Your atelier</h1>
        <p className="mt-2 text-sm text-[color:var(--text)]">Orders, profile, and wishlist — wired to JWT next.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="glass rounded-[34px] p-7 lg:col-span-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[color:var(--border)] bg-white/10 dark:bg-white/5">
              <User className="h-5 w-5 text-[color:var(--gold)]" />
            </div>
            <div>
              <div className="font-display text-xl text-[color:var(--heading)]">Lenovo User</div>
              <div className="text-sm text-[color:var(--text)]">member • glow tier</div>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              { t: "Shipping", d: "Saved addresses & preferences" },
              { t: "Security", d: "JWT sessions & password" },
              { t: "Beauty profile", d: "Undertone + finish preferences" },
            ].map((x) => (
              <div key={x.t} className="rounded-[26px] border border-[color:var(--border)] bg-white/10 p-5 dark:bg-white/5">
                <div className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">{x.t}</div>
                <div className="mt-1 text-sm font-medium text-[color:var(--heading)]">{x.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:col-span-8">
          <div className="glass rounded-[34px] p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-[color:var(--gold)]" />
                <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">ORDERS</div>
              </div>
              <div className="text-sm text-[color:var(--text)]">2 recent</div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                { id: "AUR-4021", status: "Delivered", total: "$84.00" },
                { id: "AUR-4058", status: "Processing", total: "$54.00" },
              ].map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-[26px] border border-[color:var(--border)] bg-white/10 px-5 py-4 dark:bg-white/5">
                  <div>
                    <div className="font-medium text-[color:var(--heading)]">{o.id}</div>
                    <div className="text-sm text-[color:var(--text)]">{o.status}</div>
                  </div>
                  <div className="text-sm font-semibold text-[color:var(--heading)]">{o.total}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[34px] p-7">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-[color:var(--blush)]" />
              <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">WISHLIST</div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {mockFeatured.slice(0, 2).map((p) => (
                <div key={p.id} className="overflow-hidden rounded-[26px] border border-[color:var(--border)] bg-white/10 dark:bg-white/5">
                  <img src={p.images[0]} alt={p.name} className="h-40 w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <div className="font-display text-lg text-[color:var(--heading)]">{p.name}</div>
                    <div className="mt-1 text-sm text-[color:var(--text)]">${p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

