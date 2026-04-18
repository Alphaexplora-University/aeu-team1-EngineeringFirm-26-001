import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Project {
  id: string
  title: string
  location: string
  category: string
  image: string
  description: string
  featured?: boolean
}

const CATEGORIES = [
  "All Works",
  "Commercial",
  "Infrastructure",
  "Residential",
  "Industrial",
]

const PROJECTS: Project[] = [
  {
    id: "obsidian-tower",
    title: "The Obsidian Tower",
    location: "Dubai, UAE",
    category: "Commercial",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMnNblbRhTDFDvSXgha7LJJtFxQ-GNPdvTYvOI1pUk4PERmxDjLeBU9MStClweIoJTTd24qojPjIqdC4lZB158P8qSUgpW0R8dWgGYEmh562jGOjhBPukgVK6dirBNbWTQ8elRrxj60ezRwq07qs72DwT4QTsChjMtkcKOswFlXF-jqnhTaBE5iJGmxD3zxZZzK538_W9Z2fMZZyHe5mUVujLsohlbHJYzlbD_AbyC5SJM7zZKR8EGB1qLkLUoQ9oK8-WQV9i5PTSa",
    description:
      "A stunning 80-story commercial skyscraper featuring cutting-edge sustainable design and panoramic city views. This architectural marvel incorporates smart building technology and eco-friendly materials.",
  },
  {
    id: "quantum-bridge",
    title: "Quantum Bridge",
    location: "Seattle, USA",
    category: "Infrastructure",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgL8gGYs-CoE_zKz79KyguA46egsASkd5amGxxJV_wYIS3V2-tj5taREWKanPAiQOdRQV9UZ2q76UEgSUSSg4793WU1GsOV4gpJDh-IGe0UJBb25ezfifK_BVvelLSSKglnwB8CZi8tIsHWLRqWl1f3-D5qhUxTlnSss4VDkcBzOD7-25DQKvDIXbsJ0ZKnVbqksMFWQoWDoUu0ojiWAt9ndK_v2UysPLJkxF8IjGK104n3JCyLXCapcfxI1_BpNcj3q-kJoc4vWrN",
    description:
      "An innovative suspension bridge design connecting urban districts with advanced structural engineering. Features pedestrian walkways, bicycle lanes, and integrated public art installations.",
  },
  {
    id: "helix-headquarters",
    title: "Helix Headquarters",
    location: "Berlin, DE",
    category: "Commercial",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEL_qA79tV1IN2gUvvyquTRifhDV4Ny7gXQd529v1dU5tzdZSsvwxN9AO1jMsOaj2O93eZ-J6bHcpQaGmkP1h4NZRVaT-ZNDfs-HZw6E6wSjPv_UDxByRmVxIk8AoYFqjCuA0xW05FtWfw1HfVB5GLrtBF6dNT1VIasQDNz9gDBi8dmgIXWBLqvDANUsG4TSLWI7mkhY5YVFi0PQj99BPg-B0VWhvQZ52N3FBVtshm0uMpLJVbLsEulmA0Mg_YOt2nTcGWcsraQzZu",
    description:
      "A modern corporate headquarters with a distinctive helical design, incorporating green spaces and collaborative work environments. Winner of multiple architectural awards for innovative workspace design.",
  },
  {
    id: "vertigo-terraces",
    title: "Vertigo Terraces",
    location: "Singapore",
    category: "Residential",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABzhHRwA0JGRKiLxEkeZSF4sZgBL3DWcNkgQvLL2k5B7IPiwDCK2vD0xRimqFydjmKDawn9ZggKTCiG5J8z7FXe7OC3huGBj86wgsgZV6vbcAETb-4fcSmW6pFPraTVsOeH81qRqdlba0QHE3PjAt0gkpSyhvH5kpKgSBgT6m7ch1HYNBZ9Do96chfbt3tT9NFxTQw8CPxAVEwucWcy4y7uxaXvW2chlQTlzvZbKGAkKBlC2fmTrX-4NSkEDXBqZbLeG6OeVAZpOJh",
    description:
      "Luxury residential complex featuring sky-high terraces with breathtaking views. Each unit includes private gardens, infinity pools, and state-of-the-art smart home technology.",
  },
  {
    id: "monolith-museum",
    title: "Monolith Museum",
    location: "Oslo, NO",
    category: "Public Works",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCQ-aamKNaMik3MZnthz6isiZaJtawYU26XRiBoE-UENz41bdluZ7Jc1iCdN0rHcWHCWeSepg_qlmaOZcp2ByDd346Z6UPA8LjulWQjcmwtHVM2Y-_zvDpPUivdEY7KRkXA9doqS8S-3Ia8CNjsnS6tWUFhSm2IbgAIklB0PM8UEEd74EtocFbMnhhoYd4J4E2OJJ9VtIgJKyNZ3rnDtJ4cLVG5lwKZbBHHCQuvSyyxxXP_WgS8UF6PsbgEQTZcj-TL8CXYf-qq1Cb",
    featured: true,
    description:
      "A contemporary art museum designed as a monolithic structure with minimalist aesthetics. Houses rotating exhibitions of modern and contemporary art in a space that challenges traditional museum design.",
  },
]

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All Works")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      activeCategory === "All Works" || project.category === activeCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      <main className="pt-32 pb-64">
        {" "}
        {/* Reduced top padding to pull content up */}
        {/* Filter Bar */}
        <section className="mx-auto mb-8 max-w-7xl px-8">
          <div className="mb-12 text-center">
            <h1 className="text-on-surface text-4xl font-bold tracking-tight">
              Projects
            </h1>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category

                return (
                  <Badge
                    key={category}
                    variant="secondary"
                    className={`cursor-pointer rounded-full px-4 py-1 text-sm transition-all hover:opacity-80 ${isActive ? "bg-primary/40 ring-2 ring-primary" : "bg-card"}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Badge>
                )
              })}
            </div>
            <div className="relative w-full rounded-full md:w-60">
              <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
              <Input
                placeholder="Search..."
                className="h-9 rounded-full border border-powder-blue bg-card pl-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>
        {/* Project Grid */}
        <section className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <Card
                    className="cursor-pointer border-none bg-card pt-0 shadow-none"
                    onClick={() => {
                      setSelectedProject(project)
                      setIsDialogOpen(true)
                    }}
                  >
                    <CardContent className="p-0">
                      {/* FIXED HEIGHT: Changed aspect ratio to a literal height (h-48) */}
                      <div className="relative h-48 w-full overflow-hidden rounded-md bg-muted">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 pl-4">
                        <div>
                          <h3 className="line-clamp-1 text-lg font-bold">
                            {project.title}
                          </h3>
                          <p className="font-medium">
                            {project.location} • {project.category}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-card">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>
              {selectedProject?.location} • {selectedProject?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative h-64 w-full overflow-hidden rounded-md bg-card">
              <img
                src={selectedProject?.image}
                alt={selectedProject?.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm leading-relaxed">
              {selectedProject?.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
