import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { Page } from "../components/Page";
import { getProduct } from "../services/productApi";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

function Stars({ value = 4.7 }) {
  const full = Math.floor(value);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < full ? "fill-[color:var(--gold)] text-[color:var(--gold)]" : "text-white/30"}`}
        />
      ))}
      <span className="ml-2 text-sm text-white/80">{value.toFixed(1)}</span>
    </div>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const { status } = useAuth();
  const { add } = useCart();
  const { toggle } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(null);
  const [shade, setShade] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProduct(id)
      .then((res) => {
        if (cancelled) return;
        setProduct(res.item);
        setImg(res.item.images?.[0] ?? null);
        setShade(res.item.shades?.[0] ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        setProduct(null);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const safeProduct = useMemo(
    () =>
      product ?? {
        _id: id,
        name: "Product unavailable",
        brand: "AURÉLIA",
        category: "Makeup",
        price: 0,
        images: [],
        shades: [],
      },
    [product, id]
  );

  return (
    <Page>
      <div className="mb-6 text-sm text-[color:var(--text)]">
        <Link className="hover:text-[color:var(--gold)]" to="/shop">
          Shop
        </Link>{" "}
        <span className="text-[color:var(--text)]/60">/</span>{" "}
        <span className="text-[color:var(--heading)]">{safeProduct.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-[34px] border border-[color:var(--border)] bg-white/15 backdrop-blur-[18px] dark:bg-[rgba(23,20,30,0.34)]">
            {img ? (
              <motion.img
                key={img}
                src={img}
                alt={safeProduct.name}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 22 }}
                className="h-[520px] w-full object-cover"
                whileHover={{ scale: 1.05 }}
              />
            ) : (
              <div className="h-[520px] w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.16),rgba(255,255,255,0.08))] bg-[length:200%_100%] animate-shimmer" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-xs tracking-[0.22em] text-white/80">{safeProduct.brand}</div>
              <div className="font-display text-3xl text-white">{safeProduct.name}</div>
              <div className="mt-2">
                <Stars />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {(safeProduct.images ?? []).slice(0, 6).map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setImg(src)}
                className={`overflow-hidden rounded-[22px] border ${
                  img === src ? "border-[rgba(201,168,76,0.55)]" : "border-[color:var(--border)]"
                }`}
              >
                <img src={src} alt="Preview" className="h-28 w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass rounded-[34px] p-7">
            <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">{safeProduct.category}</div>
            <h1 className="mt-2 font-display text-4xl text-[color:var(--heading)]">{safeProduct.name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text)]">
              {loading
                ? "Loading the product story…"
                : safeProduct.description || "Weightless, buildable, and intentionally luminous."}
            </p>

            <div className="mt-6 rounded-[26px] border border-[color:var(--border)] bg-white/10 p-5 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-[color:var(--heading)]">Shade</div>
                <div className="text-sm text-[color:var(--text)]">{shade ?? "—"}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(safeProduct.shades ?? []).length ? (
                  safeProduct.shades.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShade(s)}
                      className={`rounded-full px-3 py-2 text-xs transition ${
                        shade === s
                          ? "bg-[rgba(201,168,76,0.22)] text-[color:var(--heading)] ring-1 ring-[rgba(201,168,76,0.35)]"
                          : "bg-white/10 text-[color:var(--text)] hover:bg-white/15 dark:bg-white/5"
                      }`}
                    >
                      {s}
                    </button>
                  ))
                ) : (
                  <button
                    type="button"
                    className="rounded-full bg-white/10 px-3 py-2 text-xs text-[color:var(--text)] dark:bg-white/5"
                  >
                    Universal
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <div className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">PRICE</div>
                <div className="mt-1 text-2xl font-semibold text-[color:var(--heading)]">${safeProduct.price}</div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/10 px-3 py-2 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="w-8 text-center text-sm font-medium text-[color:var(--heading)]">{qty}</div>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={async () => {
                  if (status !== "authed") {
                    toast("Login required", { description: "Sign in to add items to cart." });
                    return;
                  }
                  try {
                    await add({ productId: safeProduct._id, qty, shade });
                    toast.success("Added to cart.");
                  } catch (err) {
                    const msg = err?.response?.data?.message ?? "Couldn’t add to cart.";
                    toast.error(msg);
                  }
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold tracking-wide text-black transition hover:brightness-110 active:scale-[0.99]"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to cart
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (status !== "authed") {
                    toast("Login required", { description: "Sign in to save a wishlist." });
                    return;
                  }
                  try {
                    await toggle(safeProduct._id);
                    toast("Wishlist updated.", { description: safeProduct.name });
                  } catch (err) {
                    const msg = err?.response?.data?.message ?? "Couldn’t update wishlist.";
                    toast.error(msg);
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-white/10 px-6 py-3 text-sm font-semibold text-[color:var(--heading)] transition hover:bg-white/15 dark:bg-white/5"
              >
                <Heart className="h-4 w-4 text-[color:var(--blush)]" />
                Wishlist
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {[
              { t: "Reviews", d: "“So smooth. Looks filtered IRL.” — verified buyer" },
              { t: "Finish", d: "Soft-focus satin with breathable wear." },
              { t: "Pro tip", d: "Tap on high points for editorial dimension." },
            ].map((x) => (
              <div key={x.t} className="glass-2 rounded-[26px] p-5">
                <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">{x.t}</div>
                <div className="mt-2 text-sm text-[color:var(--heading)]">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

