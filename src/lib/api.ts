import { supabase } from "./supabaseClient"

// 🔹 Get unavailable dates + times
export async function getUnavailable() {
  const { data: bookings } = await supabase
    .from("inquiries")
    .select("date, time")

  const { data: holidays } = await supabase.from("holidays").select("date")

  return {
    bookings: bookings ?? [],
    holidays: holidays?.map((h) => h.date) ?? [],
  }
}

// 🔹 Create booking
export async function createInquiry(payload: any) {
  const { error } = await supabase.from("inquiries").insert([payload])

  if (error) {
    if (error.code === "23505") {
      throw new Error("Time slot already booked")
    }
    throw error
  }
}
