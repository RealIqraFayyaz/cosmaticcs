import { toast } from "sonner";
import { Page } from "../components/Page";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { checkout } from "../services/orderApi";

export function CheckoutPage() {
  const { status } = useAuth();
  const { cart, refresh } = useCart();

  return (
    <Page>
      <div className="glass rounded-[34px] p-8">
        <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">CHECKOUT</div>
        <h1 className="mt-2 font-display text-4xl text-[color:var(--heading)]">Polished & fast</h1>
        <p className="mt-2 text-sm text-[color:var(--text)]">Checkout creates an order and clears your cart.</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="glass rounded-[34px] p-7 lg:col-span-7">
          <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">SHIPPING</div>
          <form
            className="mt-5 grid gap-3 sm:grid-cols-2"
            onSubmit={async (e) => {
              e.preventDefault();
              if (status !== "authed") {
                toast("Login required", { description: "Sign in to place an order." });
                return;
              }
              const form = new FormData(e.currentTarget);
              const shippingAddress = {
                firstName: String(form.get("firstName") ?? ""),
                lastName: String(form.get("lastName") ?? ""),
                email: String(form.get("email") ?? ""),
                address: String(form.get("address") ?? ""),
                city: String(form.get("city") ?? ""),
                zip: String(form.get("zip") ?? ""),
              };
              try {
                const res = await checkout({ shippingAddress });
                toast.success("Order placed.", { description: res.order?._id });
                await refresh();
              } catch (err) {
                const msg = err?.response?.data?.message ?? "Checkout failed.";
                toast.error(msg);
              }
            }}
          >
            {[
              { name: "firstName", label: "First name" },
              { name: "lastName", label: "Last name" },
              { name: "email", label: "Email", span: 2 },
              { name: "address", label: "Address", span: 2 },
              { name: "city", label: "City" },
              { name: "zip", label: "ZIP" },
            ].map((f) => (
              <label key={f.name} className={`grid gap-2 ${f.span === 2 ? "sm:col-span-2" : ""}`}>
                <span className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">{f.label}</span>
                <input
                  required
                  name={f.name}
                  className="rounded-[18px] border border-[color:var(--border)] bg-white/10 px-4 py-3 text-sm text-[color:var(--heading)] outline-none placeholder:text-[color:var(--text)]/60 focus:ring-2 focus:ring-[rgba(201,168,76,0.35)] dark:bg-white/5"
                />
              </label>
            ))}

            <div className="sm:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-semibold tracking-wide text-black transition hover:brightness-110 active:scale-[0.99]"
              >
                Place order
              </button>
              <button
                type="button"
                onClick={() => toast("AI suggestion (mock)", { description: "Add Glass-Skin Serum for a radiant base." })}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white/10 px-6 py-3 text-sm font-semibold text-[color:var(--heading)] hover:bg-white/15 dark:bg-white/5"
              >
                AI suggestions
              </button>
            </div>
          </form>
        </div>

        <div className="glass rounded-[34px] p-7 lg:col-span-5">
          <div className="text-xs tracking-[0.28em] text-[color:var(--gold)]">ORDER</div>
          <div className="mt-4 rounded-[26px] border border-[color:var(--border)] bg-white/10 p-5 text-sm text-[color:var(--text)] dark:bg-white/5">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[color:var(--heading)]">
                $
                {cart
                  .reduce((s, it) => s + (it.product?.price ?? 0) * (it.qty ?? 0), 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium text-[color:var(--heading)]">$8.00</span>
            </div>
            <div className="my-3 h-px bg-[color:var(--border)]" />
            <div className="flex items-center justify-between">
              <span className="text-[color:var(--heading)]">Total</span>
              <span className="text-lg font-semibold text-[color:var(--heading)]">
                $
                {(
                  cart.reduce((s, it) => s + (it.product?.price ?? 0) * (it.qty ?? 0), 0) + 8
                ).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-[26px] border border-[color:var(--border)] bg-white/10 p-5 dark:bg-white/5">
            <div className="text-xs tracking-[0.22em] text-[color:var(--text)]/70">PAYMENT</div>
            <div className="mt-2 text-sm text-[color:var(--heading)]">Card (mock)</div>
            <div className="mt-3 h-10 rounded-[16px] bg-[linear-gradient(90deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06),rgba(255,255,255,0.10))] bg-[length:200%_100%] animate-shimmer" />
          </div>
        </div>
      </div>
    </Page>
  );
}

