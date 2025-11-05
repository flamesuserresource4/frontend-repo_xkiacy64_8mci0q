export default function Hero({ onBookClick }) {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background gradient (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_500px_at_10%_-10%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(800px_400px_at_90%_10%,rgba(59,130,246,0.14),transparent_50%)]" />

      {/* Foreground content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="backdrop-blur-[2px] bg-white/30 rounded-2xl p-6 md:p-8 border border-white/40">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-medium">
              Clinically guided access
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900">
              Modern medical cannabis, delivered with care
            </h1>
            <p className="mt-4 text-neutral-700 text-lg leading-relaxed">
              Explore pharmacist-approved products and book a secure online consultation to get your prescription quickly and safely.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-900 px-5 text-white hover:bg-neutral-800"
              >
                Shop products
              </a>
              <button
                onClick={onBookClick}
                className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-300 bg-white/70 backdrop-blur px-5 text-neutral-800 hover:bg-white"
              >
                Book consultation
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-neutral-700">
              <div>
                <span className="font-semibold text-neutral-900">Licensed doctors</span>
                <span className="mx-2">•</span>
                Over secure video
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-neutral-900">Fast delivery</span>
                <span className="mx-2">•</span>
                Discreet packaging
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100 via-white to-sky-100 border border-neutral-200 p-1">
              <div className="h-full w-full rounded-xl bg-white/70 backdrop-blur flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-emerald-600">
                      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="mt-4 text-neutral-700 font-medium">Your wellness, professionally guided</p>
                  <p className="text-neutral-500 text-sm">Evidence-based strains and formats</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
