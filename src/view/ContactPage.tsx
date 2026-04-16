import { motion } from "motion/react"
import { MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ContactForm from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>

          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-smart-blue" />
              <span>London, UK</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-smart-blue" />
              <span>+44 20 7946 0123</span>
            </div>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="space-y-6 p-6">
              <ContactForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
