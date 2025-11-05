export default function Footer() {
  return (
    <footer id="about" className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold text-neutral-900">GreenWell</h3>
            <p className="mt-2 text-neutral-600">Clinically guided access to medical cannabis across Germany.</p>
          </div>
          <div>
            <h4 className="font-medium text-neutral-900">Resources</h4>
            <ul className="mt-2 space-y-2 text-neutral-600">
              <li><a className="hover:text-neutral-900" href="#products">Products</a></li>
              <li><a className="hover:text-neutral-900" href="#appointment">Appointments</a></li>
              <li><a className="hover:text-neutral-900" href="#">Patient FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-neutral-900">Legal</h4>
            <ul className="mt-2 space-y-2 text-neutral-600">
              <li><a className="hover:text-neutral-900" href="#">Impressum</a></li>
              <li><a className="hover:text-neutral-900" href="#">Datenschutz</a></li>
              <li><a className="hover:text-neutral-900" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} GreenWell GmbH. All rights reserved.</p>
          <p>For medical use only. Consult a licensed physician.</p>
        </div>
      </div>
    </footer>
  );
}
