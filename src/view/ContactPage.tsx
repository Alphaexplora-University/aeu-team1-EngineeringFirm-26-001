import { useState } from "react"
import { motion } from "motion/react"
import { MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "../lib/supabaseClient"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    project_type: "",
    message: "",
    date: "",
    time: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: holiday } = await supabase
        .from("holidays")
        .select("name")
        .eq("date", formData.date)
        .maybeSingle()

      if (holiday) {
        alert(`Closed: ${holiday.name || "Holiday"}`)
        return
      }

      const { error } = await supabase.from("inquiries").insert([formData])

      if (error?.code === "23505") {
        alert("Time slot already booked")
      } else if (error) throw error
      else {
        alert("Success!")
        setFormData({
          full_name: "",
          email: "",
          project_type: "",
          message: "",
          date: "",
          time: "",
        })
      }
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>

          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 fill-red-500" />
              <span>London, UK</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 fill-green-500" />
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <Select
                    value={formData.project_type}
                    onValueChange={(v) =>
                      setFormData({ ...formData, project_type: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="structural">
                        Structural Engineering
                      </SelectItem>
                      <SelectItem value="architectural">
                        Architectural Design
                      </SelectItem>
                      <SelectItem value="consultancy">Consultancy</SelectItem>
                      <SelectItem value="urban">Urban Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="min-h-30"
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
