import { useEffect, useMemo, useState } from "react";
import { Calendar, User, Clock, FileText, AlertCircle, CheckCircle2, ChevronRight, Phone } from "lucide-react";

// Enhanced clinician roster (realistic dummy data)
const DOCTORS = [
  {
    id: "d1",
    name: "Dr. Maya Jensen, MD",
    specialty: "Pain Medicine",
    years: 12,
    avatar:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=800&auto=format&fit=crop",
    bio: "Board-certified in anesthesiology and pain management, specializing in cannabinoid therapy for neuropathic pain and migraines.",
    languages: ["English", "Danish"],
    rating: 4.9,
  },
  {
    id: "d2",
    name: "Dr. Luca Romano, DO",
    specialty: "Sleep & Anxiety",
    years: 9,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    bio: "Focuses on insomnia, PTSD-related sleep issues, and anxiety using evidence-based cannabis formulations.",
    languages: ["English", "Italian"],
    rating: 4.8,
  },
  {
    id: "d3",
    name: "Dr. Aisha Khan, MBBS",
    specialty: "Oncology Support",
    years: 15,
    avatar:
      "https://images.unsplash.com/photo-1523246123-1f4aeec7f28f?q=80&w=800&auto=format&fit=crop",
    bio: "Supports patients managing treatment-related nausea, appetite changes, and pain.",
    languages: ["English", "Urdu"],
    rating: 4.9,
  },
];

// Sample test data to aid QA
const SAMPLE_APPOINTMENTS = [
  { id: "a1", doctor: "Dr. Maya Jensen", date: "2025-11-12", time: "09:30", status: "Confirmed" },
  { id: "a2", doctor: "Dr. Luca Romano", date: "2025-11-13", time: "14:00", status: "Pending" },
  { id: "a3", doctor: "Dr. Aisha Khan", date: "2025-11-15", time: "18:00", status: "Cancelled" },
];

const SAMPLE_PRESCRIPTIONS = [
  { id: "p1", product: "Balance Oil 10%", dose: "0.5ml AM, 0.5ml PM", refills: 2 },
  { id: "p2", product: "Relief Capsules 10mg", dose: "1 cap at onset; max 2/day", refills: 1 },
];

function StepBadge({ index, active, done, label }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold border ${
          done ? "bg-emerald-600 text-white border-emerald-600" : active ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white text-neutral-700 border-neutral-300"
        }`}
      >
        {done ? <CheckCircle2 className="h-4 w-4" /> : index}
      </div>
      <span className={`text-sm ${active ? "text-neutral-900" : "text-neutral-600"}`}>{label}</span>
    </div>
  );
}

export default function AppointmentForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    condition: "",
    date: "",
    time: "",
    doctorId: DOCTORS[0]?.id || "",
    consent: false,
  });

  const [errors, setErrors] = useState({});

  const selectedDoctor = useMemo(() => DOCTORS.find((d) => d.id === form.doctorId), [form.doctorId]);

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate(currentStep = step) {
    const e = {};

    if (currentStep >= 1) {
      if (!form.fullName.trim()) e.fullName = "Enter your full legal name (e.g., Jane A. Doe).";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email (example@domain.com).";
      if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number (e.g., +1 555 123 4567).";
      if (!form.condition.trim()) e.condition = "Describe your symptoms, diagnosis, or treatment goals.";
    }

    if (currentStep >= 2) {
      if (!form.date) e.date = "Select a preferred date.";
      if (!form.time) e.time = "Choose a time slot.";
      if (!form.doctorId) e.doctorId = "Pick a clinician.";
      if (!form.consent) e.consent = "You must consent to telehealth treatment to proceed.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  useEffect(() => {
    // Real-time validation as user types/selects
    validate(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.fullName, form.email, form.phone, form.condition, form.date, form.time, form.doctorId, form.consent]);

  function next() {
    if (validate(step)) setStep((s) => Math.min(3, s + 1));
  }

  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit() {
    if (!validate(3)) return;
    setShowConfirm(true);
  }

  async function confirmSubmit() {
    setShowConfirm(false);
    setLoading(true);

    // Simulate server request
    setTimeout(() => {
      setLoading(false);
      setStatus({ type: "success", message: "Appointment request sent. We will email confirmation shortly." });
      setStep(1);
      setForm({ fullName: "", email: "", phone: "", condition: "", date: "", time: "", doctorId: DOCTORS[0]?.id || "", consent: false });
      setErrors({});
    }, 900);
  }

  return (
    <section id="appointment" className="py-16 sm:py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: info and doctors */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-medium">
              <Calendar className="h-3.5 w-3.5" /> Secure telehealth
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Book a doctor consultation</h2>
            <p className="mt-3 text-neutral-600">
              Licensed physicians will review your case and, if appropriate, issue a prescription for medical cannabis.
              Consultations are conducted over encrypted video at a time that suits you.
            </p>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Our clinicians</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {DOCTORS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => updateField("doctorId", d.id)}
                    className={`text-left rounded-xl border p-4 hover:border-neutral-300 transition ${
                      form.doctorId === d.id ? "border-emerald-400 ring-1 ring-emerald-300" : "border-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={d.avatar} alt={d.name} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-neutral-900">{d.name}</p>
                        <p className="text-xs text-neutral-600">{d.specialty} • {d.years} yrs • ⭐ {d.rating}</p>
                        <p className="text-xs text-neutral-600">{d.languages.join(" • ")}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{d.bio}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* QA helper data */}
            <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-neutral-900">Sample data for testing</h3>
              <div className="mt-3 grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-neutral-800 mb-2">Upcoming appointments</p>
                  <ul className="space-y-2">
                    {SAMPLE_APPOINTMENTS.map((a) => (
                      <li key={a.id} className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-neutral-500" />
                        <span className="text-neutral-700">{a.date} • {a.time} • {a.doctor}</span>
                        <span className={`ml-auto text-xs rounded-full px-2 py-0.5 border ${
                          a.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : a.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}>{a.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-neutral-800 mb-2">Recent prescriptions</p>
                  <ul className="space-y-2">
                    {SAMPLE_PRESCRIPTIONS.map((p) => (
                      <li key={p.id} className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-neutral-500" />
                        <span className="text-neutral-700">{p.product} — {p.dose}</span>
                        <span className="ml-auto text-xs text-neutral-500">{p.refills} refills</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: multi-step form */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <StepBadge index={1} label="Your details" active={step === 1} done={step > 1} />
                <StepBadge index={2} label="Appointment" active={step === 2} done={step > 2} />
                <StepBadge index={3} label="Review" active={step === 3} done={false} />
              </div>
              <div className="mt-3 h-2 w-full rounded bg-neutral-100">
                <div className={`h-full rounded bg-emerald-600 transition-all`} style={{ width: `${step * 33.33}%` }} />
              </div>
            </div>

            {status && (
              <div className={`mb-4 rounded-md px-4 py-3 text-sm ${
                status.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}>
                {status.message}
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Full name</label>
                  <div className="mt-1 relative">
                    <input
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={`w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 ${
                        errors.fullName ? "border-red-300 focus:ring-red-400" : "border-neutral-300 focus:ring-emerald-500"
                      }`}
                      placeholder="Jane A. Doe"
                    />
                    <User className="h-4 w-4 text-neutral-400 absolute right-3 top-3" />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={`mt-1 w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-300 focus:ring-red-400" : "border-neutral-300 focus:ring-emerald-500"
                    }`}
                    placeholder="jane@domain.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Phone</label>
                  <div className="mt-1 relative">
                    <input
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={`w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 ${
                        errors.phone ? "border-red-300 focus:ring-red-400" : "border-neutral-300 focus:ring-emerald-500"
                      }`}
                      placeholder="+1 555 123 4567"
                    />
                    <Phone className="h-4 w-4 text-neutral-400 absolute right-3 top-3" />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Reason for visit</label>
                  <textarea
                    rows={4}
                    value={form.condition}
                    onChange={(e) => updateField("condition", e.target.value)}
                    className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                      errors.condition ? "border-red-300 focus:ring-red-400" : "border-neutral-300 focus:ring-emerald-500"
                    }`}
                    placeholder="Describe symptoms, previous treatments, goals..."
                  />
                  {errors.condition && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.condition}</p>
                  )}
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button type="button" onClick={next} className="inline-flex items-center h-11 px-5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800">
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={`mt-1 w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 ${
                      errors.date ? "border-red-300 focus:ring-red-400" : "border-neutral-300 focus:ring-emerald-500"
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    className={`mt-1 w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 ${
                      errors.time ? "border-red-300 focus:ring-red-400" : "border-neutral-300 focus:ring-emerald-500"
                    }`}
                  />
                  {errors.time && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.time}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700">Selected clinician</label>
                  <div className={`mt-1 rounded-md border p-3 flex items-center gap-3 ${
                    errors.doctorId ? "border-red-300" : "border-neutral-300"
                  }`}>
                    <img src={selectedDoctor?.avatar} alt={selectedDoctor?.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="text-sm">
                      <p className="font-medium text-neutral-900">{selectedDoctor?.name}</p>
                      <p className="text-neutral-600">{selectedDoctor?.specialty} • {selectedDoctor?.years} yrs • ⭐ {selectedDoctor?.rating}</p>
                    </div>
                  </div>
                  {errors.doctorId && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.doctorId}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => updateField("consent", e.target.checked)}
                    />
                    I consent to telehealth treatment and agree to GreenWell's privacy policy.
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {errors.consent}</p>
                  )}
                </div>
                <div className="sm:col-span-2 flex items-center justify-between gap-3">
                  <button type="button" onClick={prev} className="inline-flex items-center h-11 px-5 rounded-md border border-neutral-300 bg-white hover:bg-neutral-50">Back</button>
                  <button type="button" onClick={next} className="inline-flex items-center h-11 px-5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800">Review</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-md border border-neutral-200 p-4">
                  <p className="text-sm text-neutral-600">You're booking an appointment with</p>
                  <p className="mt-1 font-medium">{selectedDoctor?.name}</p>
                  <p className="text-sm text-neutral-700 mt-1">{form.date} at {form.time}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-md border border-neutral-200 p-4">
                    <p className="font-medium text-neutral-900 mb-1">Your details</p>
                    <p className="text-sm text-neutral-700">{form.fullName}</p>
                    <p className="text-sm text-neutral-700">{form.email}</p>
                    <p className="text-sm text-neutral-700">{form.phone}</p>
                  </div>
                  <div className="rounded-md border border-neutral-200 p-4">
                    <p className="font-medium text-neutral-900 mb-1">Reason</p>
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">{form.condition}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={prev} className="inline-flex items-center h-11 px-5 rounded-md border border-neutral-300 bg-white hover:bg-neutral-50">Back</button>
                  <button type="button" disabled={loading} onClick={submit} className="inline-flex items-center h-11 px-5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
                    {loading ? "Submitting..." : "Confirm & submit"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h4 className="text-lg font-semibold text-neutral-900">Send appointment request?</h4>
            <p className="mt-2 text-sm text-neutral-700">We will notify you by email with next steps. You can reschedule later if needed.</p>
            <div className="mt-4 rounded-md border border-neutral-200 p-3 text-sm">
              <p><span className="font-medium">Doctor:</span> {selectedDoctor?.name}</p>
              <p><span className="font-medium">When:</span> {form.date} at {form.time}</p>
              <p className="truncate"><span className="font-medium">Reason:</span> {form.condition}</p>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setShowConfirm(false)} className="h-10 px-4 rounded-md border border-neutral-300 bg-white hover:bg-neutral-50">Cancel</button>
              <button onClick={confirmSubmit} className="h-10 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Yes, send</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
