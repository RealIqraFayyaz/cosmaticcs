import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Page } from "../components/Page";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export function CartPage() {
  const { status } = useAuth();
  const { cart, loading, update, remove } = useCart();

  const items = cart.map((it) => ({
    productId: it.product?._id ?? it.product,
    name: it.product?.name ?? "Product",
    brand: it.product?.brand ?? "AURÉLIA",
    price: it.product?.price ?? 0,
    image: it.product?.images?.[0],
    qty: it.qty ?? 1,
  }));

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <Page>
      <div className="glass rounded-[34px] p-8">
        <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">CART</div>
        <h1 className="mt-2 font-display text-4xl text-[color:var(--heading)]">Your edit</h1>
        <p className="mt-2 text-sm text-[color:var(--text)]">Refine quantities, then glide to checkout.</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="grid gap-4 lg:col-span-8">
          {status !== "authed" ? (
            <div className="glass-2 rounded-[30px] p-6">
              <div className="font-display text-2xl text-[color:var(--heading)]">Sign in to view your cart</div>
              <div className="mt-2 text-sm text-[color:var(--text)]">
                Cart and checkout are linked to your account for a premium experience.
              </div>
              <Link
                to="/auth"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold tracking-wide text-black"
              >
                Login / Register
              </Link>
            </div>
          ) : loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-2 rounded-[30px] p-5">
                <div className="h-24 w-full rounded-[22px] bg-white/10" />
              </div>
            ))
          ) : items.length ? (
            items.map((it) => (
            <div key={it.productId} className="glass-2 flex flex-col gap-4 rounded-[30px] p-5 sm:flex-row sm:items-center">
              {it.image ? (
                <img src={it.image} alt={it.name} className="h-24 w-full rounded-[22px] object-cover sm:h-24 sm:w-32" />
              ) : (
                <div className="h-24 w-full rounded-[22px] bg-white/10 sm:w-32" />
              )}
              <div className="flex-1">
                <div className="text-xs tracking-[0.22em] text-[color:var(--gold)]">{it.brand}</div>
                <div className="font-display text-xl text-[color:var(--heading)]">{it.name}</div>
                <div className="mt-1 text-sm text-[color:var(--text)]">${it.price}</div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/10 px-2 py-2 dark:bg-white/5">
                  <button
                    type="button"
                    className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                    onClick={() => update(it.productId, { qty: Math.max(1, it.qty - 1) }).catch(() => toast.error("Update failed"))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-8 text-center text-sm font-medium text-[color:var(--heading)]">{it.qty}</div>
                  <button
                    type="button"
                    className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                    onClick={() => update(it.productId, { qty: Math.min(20, it.qty + 1) }).catch(() => toast.error("Update failed"))}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(it.productId).then(() => toast("Removed", { description: it.name })).catch(() => toast.error("Remove failed"))}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--border)] bg-white/10 hover:bg-white/15 dark:bg-white/5"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4 text-[color:var(--blush)]" />
                </button>
              </div>
            </div>
          ))
          ) : (
            <div className="glass-2 rounded-[30px] p-6">
              <div className="font-display text-2xl text-[color:var(--heading)]">Your cart is empty</div>
              <div className="mt-2 text-sm text-[color:var(--text)]">Start with best-sellers and build your ritual.</div>
              <Link
                to="/shop"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold tracking-wide text-black"
              >
                Shop now
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="glass rounded-[34px] p-7">
            <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">SUMMARY</div>
            <div className="mt-4 grid gap-2 text-sm text-[color:var(--text)]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[color:var(--heading)]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-medium text-[color:var(--heading)]">$8.00</span>
              </div>
              <div className="my-2 h-px bg-[color:var(--border)]" />
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--heading)]">Total</span>
                <span className="text-lg font-semibold text-[color:var(--heading)]">${(subtotal + 8).toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold tracking-wide text-black transition hover:brightness-110 active:scale-[0.99]"
            >
              Checkout
            </Link>
            <Link
              to="/shop"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[color:var(--border)] bg-white/10 px-6 py-3 text-sm font-semibold text-[color:var(--heading)] hover:bg-white/15 dark:bg-white/5"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}

