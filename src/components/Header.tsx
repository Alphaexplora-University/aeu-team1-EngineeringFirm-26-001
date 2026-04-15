import { Link, useLocation } from "react-router"
import { Button } from "@/components/ui/button"

export default function Header() {
  const location = useLocation()

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full bg-card shadow-sm">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <div className="font-headline text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50">
          AlphaExplora
        </div>

        {/* Navigation */}
        <div className="hidden items-center space-x-10 md:flex">
          {links.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`pb-1 transition-colors duration-300 ${
                  isActive
                    ? "border-b-2 border-slate-900 font-bold text-slate-900 dark:border-slate-50 dark:text-slate-50"
                    : "font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* CTA Button */}
        <Button className="to-primary-container text-on-primary font-headline scale-95 rounded-full bg-linear-to-r from-primary px-6 py-2.5 text-sm font-bold tracking-wider text-accent uppercase shadow-lg duration-200 ease-in-out hover:scale-100">
          Admin Login
          <Link to="/login" className="absolute inset-0" />
        </Button>
      </nav>
    </header>
  )
}
