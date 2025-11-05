import { useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import AppointmentForm from "./components/AppointmentForm";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const appointmentRef = useRef(null);

  const handleAddToCart = () => setCartCount((c) => c + 1);
  const handleBookClick = () => {
    const el = document.getElementById("appointment");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header cartCount={cartCount} onBookClick={handleBookClick} />
      <main>
        <Hero onBookClick={handleBookClick} />
        <ProductGrid onAddToCart={handleAddToCart} />
        <div ref={appointmentRef}>
          <AppointmentForm />
        </div>
      </main>
    </div>
  );
}
