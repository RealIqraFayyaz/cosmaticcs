import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-[color:var(--border)]">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-sm tracking-[0.34em] text-[color:var(--heading)]">AURÉLIA</div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--text)]">
              Luxury cosmetics engineered for skin-first radiance — high performance pigments, weightless textures, and
              an editorial finish that looks expensive in every light.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <div className="text-xs font-medium tracking-widest text-[color:var(--heading)]">Explore</div>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <NavLink className="text-[color:var(--text)] hover:text-[color:var(--gold)]" to="/shop">
                  Shop
                </NavLink>
                <NavLink className="text-[color:var(--text)] hover:text-[color:var(--gold)]" to="/categories">
                  Categories
                </NavLink>
                <NavLink className="text-[color:var(--text)] hover:text-[color:var(--gold)]" to="/about">
                  About
                </NavLink>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium tracking-widest text-[color:var(--heading)]">Account</div>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <NavLink className="text-[color:var(--text)] hover:text-[color:var(--gold)]" to="/auth">
                  Login / Register
                </NavLink>
                <NavLink className="text-[color:var(--text)] hover:text-[color:var(--gold)]" to="/dashboard">
                  Dashboard
                </NavLink>
                <NavLink className="text-[color:var(--text)] hover:text-[color:var(--gold)]" to="/cart">
                  Cart
                </NavLink>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium tracking-widest text-[color:var(--heading)]">Support</div>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <NavLink className="text-[color:var(--text)] hover:text-[color:var(--gold)]" to="/contact">
                  Contact
                </NavLink>
                <a className="text-[color:var(--text)] hover:text-[color:var(--gold)]" href="#">
                  Shipping & Returns
                </a>
                <a className="text-[color:var(--text)] hover:text-[color:var(--gold)]" href="#">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[color:var(--border)] pt-6 text-xs text-[color:var(--text)] sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} AURÉLIA Beauty Atelier. All rights reserved.</div>
          <div className="tracking-wide">Made with glass, gold, and glow.</div>
        </div>
      </div>
    </footer>
  );
}

