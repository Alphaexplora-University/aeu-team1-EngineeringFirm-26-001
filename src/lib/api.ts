import { supabase } from "./supabaseClient"
import type { Inquiry } from "./supabaseClient"

// 🔹 Get unavailable dates + times
export async function getUnavailable() {
  const { data: bookings, error: bookingsError } = await supabase
    .from("inquiries")
    .select("date, time")
    .eq("status", "pending")
    .or("status.eq.confirmed")

  if (bookingsError) throw bookingsError

  const { data: holidays, error: holidaysError } = await supabase
    .from("holidays")
    .select("date")

  if (holidaysError) throw holidaysError

  return {
    bookings: bookings ?? [],
    holidays: holidays?.map((h) => h.date) ?? [],
  }
}

// 🔹 Create booking
export async function createInquiry(
  payload: Omit<Inquiry, "id" | "created_at">
) {
  const { error } = await supabase.from("inquiries").insert([payload])

  if (error) {
    if (error.code === "23505") {
      throw new Error("Time slot already booked")
    }
    throw error
  }
}
