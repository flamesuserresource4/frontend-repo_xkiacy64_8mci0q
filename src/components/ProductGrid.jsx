import { useMemo } from "react";
import { Leaf } from "lucide-react";

const sampleProducts = [
  {
    id: "1",
    name: "Balance Oil 10%",
    type: "CBD-dominant",
    thc: "<1%",
    cbd: "10%",
    price: 49,
  },
  {
    id: "2",
    name: "Calm Dried Flower",
    type: "Hybrid",
    thc: "14%",
    cbd: "2%",
    price: 29,
  },
  {
    id: "3",
    name: "Relief Capsules",
    type: "THC-dominant",
    thc: "10mg",
    cbd: "2mg",
    price: 39,
  },
  {
    id: "4",
    name: "Sleep Tincture",
    type: "Indica",
    thc: "8%",
    cbd: "5%",
    price: 45,
  },
];

export default function ProductGrid({ onAddToCart }) {
  const products = useMemo(() => sampleProducts, []);

  return (
    <section id="products" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Featured products</h2>
            <p className="mt-2 text-neutral-600">Pharmacy-grade items curated by clinicians.</p>
          </div>
          <a href="#appointment" className="hidden sm:inline text-emerald-700 hover:text-emerald-800 font-medium">Need a prescription? Book now →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <article
              key={p.id}
              className="group rounded-2xl border border-neutral-200 hover:border-neutral-300 bg-white overflow-hidden"
            >
              <div className="aspect-square bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex items-center justify-center">
                <div className="h-16 w-16 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-emerald-600">
                  <Leaf className="h-7 w-7" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 group-hover:underline underline-offset-4">{p.name}</h3>
                <p className="mt-1 text-sm text-neutral-600">{p.type}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-neutral-600">
                  <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">THC {p.thc}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">CBD {p.cbd}</span>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
