import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  Leaf,
  LayoutDashboard,
  RefreshCw,
  ShieldCheck,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function SustainabilityGrid() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="mx-72 mt-8 px-4 md:px-8 md:pt-24 lg:px-16">
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => {
          const Icon = service.icon
          const isActive = activeId === service.id
          const isHovered = hoveredId === service.id

          return (
            <motion.div
              key={service.id}
              layout
              transition={springConfig}
              variants={itemVariants}
              onClick={() => setActiveId(isActive ? null : service.id)}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              <Card
                className={`h-auto border-2 bg-card transition-all duration-300 hover:border-primary hover:shadow-lg ${
                  isActive ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex flex-col items-center p-6 text-center">
                  {/* Icon */}
                  <motion.div
                    className="mb-4 rounded-full bg-primary/10 p-4"
                    whileHover={{ scale: 1.1 }}
                    transition={springConfig}
                  >
                    <Icon className="h-8 w-8 text-primary" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    layout="position"
                    transition={springConfig}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      transition: springConfig,
                    }}
                    className="mb-4 text-xl font-semibold"
                  >
                    {service.title}
                  </motion.h3>

                  {/* Description */}
                  <p
                    className={`text-lg leading-relaxed transition-opacity duration-300 ${
                      isActive || isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
