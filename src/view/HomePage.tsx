import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import {
  DraftingCompass,
  HardHat,
  ClipboardList,
  CheckCircle,
  ShieldCheck,
  Globe,
  Award,
  FileText,
} from "lucide-react"
import { Link } from "react-router"

const services = [
  {
    title: "Architectural Design",
    description:
      "Creating iconic landmarks that define skylines and maximize functional efficiency for multi-use commercial spaces.",
    icon: <DraftingCompass className="h-8 w-8" />,
    features: ["Sustainable Urban Planning", "3D Conceptual Modeling"],
    color: "text-smart-blue",
  },
  {
    title: "Structural Engineering",
    description:
      "Rigorous analysis and engineering precision ensuring stability and longevity for high-rise developments.",
    icon: <HardHat className="h-8 w-8" />,
    features: ["Seismic Resilience Design", "Advanced Material Science"],
    color: "text-smart-blue",
  },
  {
    title: "Project Management",
    description:
      "End-to-end oversight ensuring timeline adherence and fiscal responsibility on complex, large-scale builds.",
    icon: <ClipboardList className="h-8 w-8" />,
    features: ["Cost Control & Optimization", "Strategic Procurement"],
    color: "text-smart-blue",
  },
]

export default function App() {
  return (
    <div className="text-on-surface font-body selection:text-on-tertiary-fixed min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center pt-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10 lg:col-span-7"
            >
              <h1 className="font-headline text-on-surface mb-8 text-6xl leading-[1.1] font-extrabold tracking-tight md:text-8xl">
                Precision in{" "}
                <span className="bg-clip-text text-smart-blue">Motion.</span>
              </h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="border-tertiary-fixed -container-low flex items-center gap-4 border-l-4 py-6 pl-6"
              >
                <p className="text-xl font-medium italic">
                  "Precision is not an act, it is a habit of the mind."
                </p>
              </motion.div>
              <div className="mt-8 flex flex-col gap-6 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="text-on-primary font-headline hover:bg-primary-container rounded-lg bg-primary px-10 py-8 text-lg font-bold text-accent shadow-xl transition-all"
                >
                  <Link to="/projects">View Our Work</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="-container-high text-on-surface font-headline hover:-variant rounded-lg border-none bg-card px-10 py-8 text-lg font-bold transition-all hover:bg-card/70"
                >
                  <Link to="/contact">Consultation</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:col-span-5"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-xl shadow-2xl">
                <img
                  alt="Commercial skyscraper architecture"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcLz5um82j3kGJTgZjcMFcRDQNq-RK9WDIx-mfG-GbL8CH_7aIDs_xKPrhhpsQ-QVPYr8KPuZA_lNftlPaEACmQAwCZWW-peNqpqGW1FFBoHS0wHlsp45ATaO9bLfRh03tJRg2bKSrC6iV0vW0-zrDsR4_FCd8RaqPm7z44JBZDcxDmUojbR6wI1YIzb31K-B4ekUA6Pdy9_i0IG4dq0vS5_8ORgx_DvK20-4h3GLPv44UypVM1mxRn80Fv6vj7QXH0IGdpKdO3FIn"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent"></div>
              </div>
              {/* Decorative Elements */}
              <div className="bg-tertiary-fixed absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-20 blur-3xl"></div>
              <div className="bg-secondary-fixed absolute -top-10 -right-10 h-64 w-64 rounded-full opacity-10 blur-3xl"></div>
            </motion.div>
          </div>
        </section>

        {/* About Brief Section */}
        <section>
          <div className="mx-auto max-w-7xl px-8">
            <div className="flex flex-col justify-between gap-12 md:flex-row md:items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <h2 className="font-headline text-on-surface mb-8 text-4xl font-bold tracking-tight md:text-5xl">
                  Legacy of Innovation.
                </h2>
                <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">
                  AlphaExplora Engineering combines decades of technical
                  expertise with cutting-edge design technology. We don't just
                  build structures; we architect the foundations of the future,
                  ensuring every commercial project exceeds global standards for
                  safety and design.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-outline-variant/30 border-l pl-12 md:w-1/3"
              >
                <div className="space-y-8">
                  {[
                    {
                      label: "Projects Delivered",
                      value: "450+",
                      icon: ShieldCheck,
                      color: "text-smart-blue",
                    },
                    {
                      label: "Global Patents",
                      value: "18",
                      icon: Globe,
                      color: "text-smart-blue",
                    },
                    {
                      label: "Engineering Awards",
                      value: "32",
                      icon: Award,
                      color: "text-smart-blue",
                    },
                    {
                      label: "Safety Rating",
                      value: "99.9%",
                      icon: FileText,
                      color: "text-smart-blue",
                    },
                  ].map((stat, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {stat.icon && (
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        )}
                        <div className="font-headline text-4xl font-extrabold">
                          {stat.value}
                        </div>
                      </div>
                      <div className="font-label text-on-surface-variant mt-2 text-sm tracking-widest uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="py-32">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-20 text-center">
              <h2 className="font-headline mt-4 text-4xl font-bold">
                Core Disciplines
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group-container-lowest border-outline-variant/10 rounded-xl border bg-card p-10 shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* UPDATED: Added items-center, mb-4 to the wrapper, and color class to the icon */}
                  <div className="mb-4 flex flex-row items-center gap-2">
                    <div className={service.color}>{service.icon}</div>
                    <h3 className="font-headline text-xl font-bold">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="text-on-surface-variant space-y-3 text-sm font-medium">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <CheckCircle className="text-tertiary mr-2 h-4 w-4 text-navy-electric" />{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
