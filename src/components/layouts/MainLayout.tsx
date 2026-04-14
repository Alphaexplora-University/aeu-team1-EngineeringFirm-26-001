// src/layouts/MainLayout.jsx
import { Outlet } from "react-router"
import Header from "../Header"

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        {/* This is where the magic happens: child routes render here */}
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
