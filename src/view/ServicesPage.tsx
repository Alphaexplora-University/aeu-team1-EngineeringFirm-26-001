import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Leaf,
  LayoutDashboard,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { Card } from "@/components/ui/card" // Assuming shadcn/ui or similar

const services = [
  {
    id: 1,
    title: "Carbon Strategy",
    description:
      "Developing comprehensive decarbonization roadmaps and net-zero strategies to future-proof your business against evolving climate regulations.",
    icon: Building2,
  },
  {
    id: 2,
    title: "ESG Reporting",
    description:
      "Streamlined data collection and transparent reporting frameworks aligned with GRI, SASB, and TCFD global standards.",
    icon: LayoutDashboard,
  },
  {
    id: 3,
    title: "Sustainability Consulting",
    description:
      "LEED-certified strategies to minimize environmental impact while optimizing lifecycle costs and energy efficiency for modern builds.",
    icon: Leaf,
  },
  {
    id: 4,
    title: "Circular Economy",
    description:
      "Advanced modeling to eliminate waste through closed-loop systems, resource recovery, and sustainable material lifecycle management.",
    icon: RefreshCw,
  },
  {
    id: 5,
    title: "Supply Chain Audit",
    description:
      "Curating ethical supply chains that prioritize social responsibility while maximizing transparency and logistical resilience.",
    icon: ShieldCheck,
  },
]

// Added a smooth spring configuration for premium-feeling animations
const springConfig = { type: "spring", stiffness: 300, damping: 30 }

export default function SustainabilityGrid() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <section className="bg-slate-50 px-8 py-24 md:px-64">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon
          const isActive = activeId === service.id

          return (
            <motion.div
              key={service.id}
              layout
              transition={springConfig}
              onClick={() => setActiveId(isActive ? null : service.id)}
              className="cursor-pointer"
            >
              <Card
                className={`group relative flex h-72 flex-col overflow-hidden rounded-[2rem] border p-8 transition-all duration-500 ${
                  isActive
                    ? "border-slate-800 bg-slate-900 text-white shadow-2xl shadow-slate-900/20"
                    : "border-slate-100 bg-white text-slate-900 shadow-sm hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50"
                }`}
              >
                <motion.div
                  layout
                  transition={springConfig}
                  className="z-10 flex h-full flex-col"
                >
                  {/* Icon and Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`rounded-2xl p-3 transition-colors duration-500 ${
                        isActive
                          ? "bg-slate-800 shadow-inner"
                          : "bg-slate-50 group-hover:bg-slate-100"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 transition-colors duration-500 ${
                          isActive
                            ? "text-green-400"
                            : "text-slate-600 group-hover:text-slate-900"
                        }`}
                      />
                    </div>
                    {/* Modernized Arrow Interaction */}
                    <div
                      className={`rounded-full p-2 transition-colors duration-300 ${isActive ? "bg-white/5" : "bg-transparent group-hover:bg-slate-50"}`}
                    >
                      <ArrowRight
                        className={`h-5 w-5 transition-all duration-500 ${
                          isActive
                            ? "rotate-90 text-green-400"
                            : "text-slate-300 group-hover:-rotate-45 group-hover:text-slate-600"
                        }`}
                      />
                    </div>
                  </div>

                  <motion.h3
                    layout="position"
                    transition={springConfig}
                    className={`mt-auto mb-2 font-bold tracking-tight transition-all duration-500 ${
                      isActive ? "text-xl" : "text-2xl"
                    }`}
                  >
                    {service.title}
                  </motion.h3>

                  {/* Description - Revealed on click */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mt-2"
                      >
                        <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Upgraded Aesthetic background element - Smoother glow */}
                <div
                  className={`absolute -right-8 -bottom-8 h-40 w-40 rounded-full blur-[3rem] transition-all duration-700 ease-in-out ${
                    isActive
                      ? "scale-150 bg-green-500/15"
                      : "scale-100 bg-slate-200/40 group-hover:bg-slate-300/40"
                  }`}
                />
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
