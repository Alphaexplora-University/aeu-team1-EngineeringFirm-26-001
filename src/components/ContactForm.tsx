import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),

  email_address: z.email("Please enter a valid email address"),

  project_type: z.string().min(1, "Please select a project type"),

  message: z
    .string()
    .min(20, "Please provide more details (at least 20 characters)")
    .max(500, "Message must not exceed 500 characters"),
})

export default function ContactForm() {
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
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

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
        <FieldLabel htmlFor="email_address">EMAIL ADDRESS</FieldLabel>
        <Input
          id="email_address"
          type="email"
          placeholder="you@company.com"
          {...form.register("email_address")}
        />
        {form.formState.errors.email_address && (
          <FieldError errors={[form.formState.errors.email_address]} />
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

      <Button type="submit" className="w-full">
        Send Inquiry
      </Button>
    </form>
  )
}
