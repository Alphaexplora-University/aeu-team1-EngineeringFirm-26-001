import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, Calendar as CalendarIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { createInquiry, getUnavailable } from "@/lib/api"
import type { Inquiry } from "@/lib/supabaseClient"

const BUSINESS_HOURS_START = 9 // 09:00
const BUSINESS_HOURS_END = 17 // 17:00

const formSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),

  email: z.email("Please enter a valid email address"),

  project_type: z.string().min(1, "Please select a project type"),

  message: z
    .string()
    .min(20, "Please provide more details (at least 20 characters)")
    .max(500, "Message must not exceed 500 characters"),

  date: z
    .string()
    .min(1, "Please select a date")
    .refine((d) => {
      const selected = new Date(d)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selected >= today
    }, "Date must be in the future"),

  time: z
    .string()
    .min(1, "Please select a time")
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [unavailableData, setUnavailableData] = useState<{
    bookings: Array<{ date: string; time: string }>
    holidays: string[]
  } | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    Array<{ time: string; booked: boolean }>
  >([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  const projectTypes = [
    { label: "Commercial Building", value: "commercial" },
    { label: "Residential Development", value: "residential" },
    { label: "Structural Engineering", value: "structural" },
    { label: "Renovation / Retrofitting", value: "renovation" },
    { label: "Consultation", value: "consultation" },
    { label: "Other", value: "other" },
  ] as const

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      full_name: "",
      email: "",
      project_type: "",
      message: "",
      date: "",
      time: "",
    },
  })

  // Load unavailable data on mount
  useEffect(() => {
    const fetchUnavailable = async () => {
      try {
        const data = await getUnavailable()
        setUnavailableData(data)
      } catch (error) {
        console.error("Failed to load availability:", error)
      }
    }
    fetchUnavailable()
  }, [])

  // Generate available time slots when date changes
  useEffect(() => {
    if (!selectedDate || !unavailableData) {
      setAvailableTimeSlots([])
      return
    }

    setLoadingSlots(true)
    const dateString = format(selectedDate, "yyyy-MM-dd")
    const isHoliday = unavailableData.holidays.includes(dateString)

    if (isHoliday) {
      toast.error("This date is a holiday. Please choose another.")
      setAvailableTimeSlots([])
      setLoadingSlots(false)
      return
    }

    // Generate 30-minute slots (all, including booked)
    const slots: Array<{ time: string; booked: boolean }> = []
    for (let hour = BUSINESS_HOURS_START; hour < BUSINESS_HOURS_END; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`

        // Check if slot is booked
        const isBooked = unavailableData.bookings.some(
          (b) => b.date === dateString && b.time === timeString
        )

        slots.push({ time: timeString, booked: isBooked })
      }
    }

    setAvailableTimeSlots(slots)
    form.setValue("time", "", {
      shouldValidate: true,
      shouldDirty: true,
    }) // Clear time when date changes
    setLoadingSlots(false)
  }, [selectedDate, unavailableData, form])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      form.setValue("date", format(date, "yyyy-MM-dd"), {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Double-check time is available (in case multiple submissions)
      if (unavailableData) {
        const isBooked = unavailableData.bookings.some(
          (b) => b.date === data.date && b.time === data.time
        )

        if (isBooked) {
          toast.error("Time slot already booked. Please choose another.")
          setIsSubmitting(false)
          return
        }
      }

      // Submit inquiry
      await createInquiry({
        full_name: data.full_name,
        email: data.email,
        project_type: data.project_type,
        message: data.message,
        date: data.date,
        time: data.time,
        status: "pending",
      } as Omit<Inquiry, "id" | "created_at">)

      try {
        const updatedData = await getUnavailable()
        setUnavailableData(updatedData)
      } catch (refreshError) {
        console.warn(
          "Failed to refresh availability after submission:",
          refreshError
        )
      }

      toast.success("Inquiry submitted! We'll confirm within 24 hours.")
      form.reset()
      setSelectedDate(undefined)
      setAvailableTimeSlots([])

      // Auto-scroll to success
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 500)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit inquiry"
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedTimeValue = form.watch("time")
  const disabledDates = unavailableData
    ? unavailableData.holidays.map((d) => new Date(d + "T00:00:00"))
    : []

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-6 py-10"
    >
      {/* Full Name */}
      <Field>
        <FieldLabel htmlFor="full_name">FULL NAME</FieldLabel>
        <Input
          id="full_name"
          placeholder="Juan Dela Cruz"
          {...form.register("full_name")}
        />
        {form.formState.errors.full_name && (
          <FieldError errors={[form.formState.errors.full_name]} />
        )}
      </Field>

      {/* Email */}
      <Field>
        <FieldLabel htmlFor="email">EMAIL ADDRESS</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <FieldError errors={[form.formState.errors.email]} />
        )}
      </Field>

      {/* Project Type */}
      <Field>
        <FieldLabel htmlFor="project_type">PROJECT TYPE</FieldLabel>
        <select
          id="project_type"
          className="w-full rounded-md border p-2"
          {...form.register("project_type")}
        >
          <option value="">Select project type</option>
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {form.formState.errors.project_type && (
          <FieldError errors={[form.formState.errors.project_type]} />
        )}
      </Field>

      {/* Message */}
      <Field>
        <FieldLabel htmlFor="message">PROJECT DETAILS</FieldLabel>
        <Textarea
          id="message"
          placeholder="Describe your project scope, timeline, and requirements..."
          className="min-h-32 resize-none"
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <FieldError errors={[form.formState.errors.message]} />
        )}
      </Field>

      {/* Date Picker */}
      <Field>
        <FieldLabel htmlFor="date">PREFERRED DATE</FieldLabel>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate
                  ? format(selectedDate, "MMM d, yyyy")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => {
                  // Disable past dates
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  if (date < today) return true

                  // Disable holidays
                  const dateString = format(date, "yyyy-MM-dd")
                  return disabledDates.some(
                    (d) => format(d, "yyyy-MM-dd") === dateString
                  )
                }}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>
        {form.formState.errors.date && (
          <FieldError errors={[form.formState.errors.date]} />
        )}
        {selectedDate && (
          <p className="mt-1 text-xs text-muted-foreground">
            All times in Manila (PHT / UTC+8)
          </p>
        )}
        <input id="date" type="hidden" {...form.register("date")} />
      </Field>

      {/* Time Slots */}
      {selectedDate && (
        <Field>
          <FieldLabel htmlFor="time">PREFERRED TIME</FieldLabel>
          {loadingSlots ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="ml-2 text-sm">Loading available times...</span>
            </div>
          ) : availableTimeSlots.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() =>
                      !slot.booked &&
                      form.setValue("time", slot.time, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    disabled={slot.booked}
                    className={`rounded-md border p-2 text-sm transition-colors ${
                      slot.booked
                        ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-600"
                        : selectedTimeValue === slot.time
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input hover:bg-accent"
                    }`}
                    title={slot.booked ? "Already booked" : ""}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              {form.formState.errors.time && (
                <FieldError errors={[form.formState.errors.time]} />
              )}
            </>
          ) : (
            <div className="rounded-md border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
              All time slots are booked for this date. Please choose another
              date.
            </div>
          )}
        </Field>
      )}

      <input id="time" type="hidden" {...form.register("time")} />

      <Button
        type="submit"
        disabled={
          isSubmitting ||
          !form.formState.isValid ||
          !selectedDate ||
          !selectedTimeValue
        }
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Send Inquiry"
        )}
      </Button>
    </form>
  )
}
