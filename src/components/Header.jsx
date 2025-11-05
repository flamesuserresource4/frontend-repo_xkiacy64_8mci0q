import { ShoppingCart, Leaf, Calendar } from "lucide-react";

export default function Header({ cartCount = 0, onBookClick }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-semibold text-neutral-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600 text-white">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-lg">GreenWell</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-700">
          <a href="#products" className="hover:text-neutral-900">Products</a>
          <button onClick={onBookClick} className="inline-flex items-center gap-2 hover:text-neutral-900">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </button>
          <a href="#about" className="hover:text-neutral-900">About</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cart"
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-md border border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:text-neutral-900"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded-full bg-emerald-600 text-white text-xs font-medium">
                {cartCount}
              </span>
            )}
          </a>
          <button
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            Book now
          </button>
        </div>
      </div>
    </header>
  );
}
