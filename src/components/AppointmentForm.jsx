import { useState } from "react";
import { Calendar } from "lucide-react";

export default function AppointmentForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    if (!payload.fullName || !payload.email || !payload.date || !payload.time) {
      setStatus({ type: "error", message: "Please complete all required fields." });
      return;
    }

    setLoading(true);

    // In a full app, this would POST to the backend. For now we confirm locally.
    setTimeout(() => {
      setStatus({ type: "success", message: "Appointment request sent. We will email confirmation shortly." });
      setLoading(false);
      e.currentTarget.reset();
    }, 800);
  }

  return (
    <section id="appointment" className="py-16 sm:py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-medium">
              <Calendar className="h-3.5 w-3.5" /> Secure telehealth
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Book a doctor consultation</h2>
            <p className="mt-3 text-neutral-600">
              Licensed physicians will review your case and, if appropriate, issue a prescription for medical cannabis.
              Consultations are conducted over encrypted video at a time that suits you.
            </p>
            <ul className="mt-6 space-y-2 text-neutral-700 text-sm list-disc list-inside">
              <li>Evidence-based assessment</li>
              <li>Private, judgment-free care</li>
              <li>Prescription sent to partner pharmacies</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Full name</label>
                <input name="fullName" className="mt-1 w-full h-11 rounded-md border border-neutral-300 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Email</label>
                <input type="email" name="email" className="mt-1 w-full h-11 rounded-md border border-neutral-300 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="jane@domain.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Date</label>
                <input type="date" name="date" className="mt-1 w-full h-11 rounded-md border border-neutral-300 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Time</label>
                <input type="time" name="time" className="mt-1 w-full h-11 rounded-md border border-neutral-300 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700">Reason for visit</label>
                <textarea name="reason" rows={4} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Share symptoms, previous treatments, goals, etc." />
              </div>
            </div>

            {status && (
              <div
                className={`mt-4 rounded-md px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="mt-6 flex items-center justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-600 px-5 text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Request appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
