import { useEffect, useState } from "react"
import { supabase, type Inquiry, type Holiday } from "../lib/supabaseClient"
import { CalendarDays, Inbox, ChevronRight, Clock, User2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function App() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [inqResponse, holResponse] = await Promise.all([
        supabase
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("holidays")
          .select("*")
          .order("date", { ascending: true }),
      ])
      if (inqResponse.data) setInquiries(inqResponse.data)
      if (holResponse.data) setHolidays(holResponse.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <DashboardSkeleton />

  return (
    <div className="min-h-screen bg-[#fafafa] pt-16 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="container mx-auto max-w-6xl space-y-8 p-6 md:p-10">
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Manage your latest inquiries and schedule.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Inquiries Table Card */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border dark:border-zinc-800 dark:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Inbox className="h-5 w-5 text-zinc-400" />
                  Recent Inquiries
                </CardTitle>
                <CardDescription>
                  Direct requests from your website.
                </CardDescription>
              </div>
              <Badge variant="secondary" className="rounded-full px-3">
                {inquiries.length} Total
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800">
                <Table>
                  <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                    <TableRow>
                      <TableHead className="w-62.5">Client</TableHead>
                      <TableHead>Project Type</TableHead>
                      <TableHead>Requested Date</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.length > 0 ? (
                      inquiries.map((inq) => (
                        <TableRow
                          key={inq.id}
                          className="group transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                <User2 className="h-4 w-4 text-zinc-500" />
                              </div>
                              <span className="font-medium">
                                {inq.full_name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-zinc-600 dark:text-zinc-400">
                              {inq.project_type}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col text-sm">
                              <span className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100">
                                <Clock className="h-3 w-3 text-zinc-400" />{" "}
                                {inq.time}
                              </span>
                              <span className="text-zinc-500">{inq.date}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className="bg-zinc-900 capitalize hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
                              {inq.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-32 text-center text-zinc-500"
                        >
                          No inquiries found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Holidays Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <CalendarDays className="h-5 w-5 text-zinc-400" />
              <h2 className="text-lg font-semibold">Holiday Closures</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {holidays.map((h) => (
                <Card
                  key={h.id}
                  className="group border-none shadow-sm transition-all hover:shadow-md dark:border dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                        {h.date}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {h.name || "Untitled Holiday"}
                        </span>
                        <ChevronRight className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl space-y-8 p-10">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-100 w-full rounded-2xl" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}
