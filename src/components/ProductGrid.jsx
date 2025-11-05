import { useMemo, useState } from "react";
import { Leaf, Star } from "lucide-react";

const sampleProducts = [
  {
    id: "1",
    name: "Balance Oil 10%",
    type: "CBD-dominant tincture",
    thc: "<1%",
    cbd: "10%",
    price: 49,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    description:
      "Daily-use sublingual oil designed to promote calm focus and reduce inflammation without intoxication.",
    efficacy: ["Anxiety relief", "Inflammation", "Daytime focus"],
    reviews: [
      { id: "r1", name: "Sofia R.", rating: 5, text: "Perfect for daytime anxiety. Clear head, calmer mood." },
      { id: "r2", name: "Mark T.", rating: 4, text: "Reduced joint pain within a week. Mild earthy taste." },
    ],
  },
  {
    id: "2",
    name: "Calm Dried Flower",
    type: "Balanced hybrid (dried flower)",
    thc: "14%",
    cbd: "2%",
    price: 29,
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=800&auto=format&fit=crop",
    description:
      "Smooth, balanced profile suitable for evening relaxation and sleep preparation.",
    efficacy: ["Stress reduction", "Sleep support", "Muscle relaxation"],
    reviews: [
      { id: "r3", name: "Amelia V.", rating: 5, text: "Best sleep I've had in months. Very mellow." },
      { id: "r4", name: "Jon P.", rating: 4, text: "Gentle body feel; helped my back spasm." },
    ],
  },
  {
    id: "3",
    name: "Relief Capsules",
    type: "THC-dominant softgels",
    thc: "10mg",
    cbd: "2mg",
    price: 39,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    description:
      "Precisely dosed capsules for chronic pain flares; consistent onset and longer duration.",
    efficacy: ["Chronic pain", "Migraine", "Neuropathic pain"],
    reviews: [
      { id: "r5", name: "Priya D.", rating: 5, text: "Reliable pain relief without overwhelming effects." },
      { id: "r6", name: "Omar K.", rating: 4, text: "Takes ~60 minutes to kick in, lasts the evening." },
    ],
  },
  {
    id: "4",
    name: "Sleep Tincture",
    type: "Indica-forward tincture",
    thc: "8%",
    cbd: "5%",
    price: 45,
    image: "https://images.unsplash.com/photo-1582719478250-04f4a1e4c62b?q=80&w=800&auto=format&fit=crop",
    description:
      "Nighttime formulation to help you fall asleep faster and stay asleep longer.",
    efficacy: ["Insomnia", "Racing thoughts", "Restless body"],
    reviews: [
      { id: "r7", name: "Helen G.", rating: 5, text: "Fell asleep in 20 minutes and felt rested." },
      { id: "r8", name: "Luke C.", rating: 4, text: "Gentle, not groggy. Subtle berry notes." },
    ],
  },
];

function Stars({ value }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < value ? "fill-amber-500" : "fill-transparent"}`} />
      ))}
    </div>
  );
}

export default function ProductGrid({ onAddToCart }) {
  const products = useMemo(() => sampleProducts, []);
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="products" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Featured products</h2>
            <p className="mt-2 text-neutral-600">Pharmacy-grade items curated by clinicians. Includes real patient feedback.</p>
          </div>
          <a href="#appointment" className="hidden sm:inline text-emerald-700 hover:text-emerald-800 font-medium">Need a prescription? Book now →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const avg = Math.round(
              p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length
            );
            return (
              <article
                key={p.id}
                className="group rounded-2xl border border-neutral-200 hover:border-neutral-300 bg-white overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900 group-hover:underline underline-offset-4">{p.name}</h3>
                    <Stars value={avg} />
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">{p.type}</p>
                  <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-700">
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">THC {p.thc}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">CBD {p.cbd}</span>
                    {p.efficacy.map((e) => (
                      <span key={e} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1">{e}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold">€{p.price}</span>
                    <button
                      onClick={() => onAddToCart?.(p)}
                      className="inline-flex items-center h-9 px-3 rounded-md bg-neutral-900 text-white hover:bg-neutral-800"
                    >
                      Add to cart
                    </button>
                  </div>

                  <button
                    onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    className="mt-3 text-sm text-emerald-700 hover:text-emerald-800"
                  >
                    {expanded === p.id ? "Hide reviews" : `Read ${p.reviews.length} reviews`}
                  </button>
                  {expanded === p.id && (
                    <div className="mt-3 space-y-3">
                      {p.reviews.map((r) => (
                        <div key={r.id} className="rounded-md border border-neutral-200 p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-900">{r.name}</span>
                            <Stars value={r.rating} />
                          </div>
                          <p className="mt-1 text-sm text-neutral-700">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Quick guidance banner */}
        <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 text-emerald-800">
          <Leaf className="h-5 w-5" />
          <p className="text-sm">Unsure what fits your needs? Book a short call with a clinician — they'll tailor products to your symptoms.</p>
        </div>
      </div>
    </section>
  );
}
