export default function Footer() {
  return (
    <footer className="font-manrope w-full bg-[#1A1A1A] pt-20 pb-10 text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 md:grid-cols-4">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-6 text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">
            AlphaExplora
          </div>
          <p className="leading-relaxed text-slate-500 dark:text-slate-400">
            Setting the standard in high-end commercial engineering and
            architectural precision since 2004.
          </p>
        </div>
        <div>
          <h4 className="mb-6 font-bold text-slate-900 dark:text-slate-50">
            Company
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                className="text-slate-500 underline-offset-4 transition-opacity hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-slate-100"
                href="#"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                className="text-slate-500 underline-offset-4 transition-opacity hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-slate-100"
                href="#"
              >
                Our Mission
              </a>
            </li>
            <li>
              <a
                className="text-slate-500 underline-offset-4 transition-opacity hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-slate-100"
                href="#"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-bold text-slate-900 dark:text-slate-50">
            Legal
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                className="text-slate-500 underline-offset-4 transition-opacity hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-slate-100"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="text-slate-500 underline-offset-4 transition-opacity hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-slate-100"
                href="#"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                className="text-slate-500 underline-offset-4 transition-opacity hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-slate-100"
                href="#"
              >
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-bold text-slate-900 dark:text-slate-50">
            Office
          </h4>
          <address className="leading-relaxed text-slate-500 not-italic dark:text-slate-400">
            1200 Architecture Plaza
            <br />
            Suite 450
            <br />
            New York, NY 10001
          </address>
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-7xl border-t border-slate-200 px-8 pt-10 text-center md:text-left dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400">
          © 2024 AlphaExplora Engineering. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
