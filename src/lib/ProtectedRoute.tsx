import { Navigate } from "react-router"
import { useAuth } from "./AuthContext"
import type { ReactNode } from "react"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth()

  if (!session) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />
  }

  // If logged in, render the protected component
  return <>{children}</>
}

export default ProtectedRoute
