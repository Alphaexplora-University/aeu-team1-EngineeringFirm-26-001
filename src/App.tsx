import { Routes, Route } from "react-router"
import MainLayout from "./components/layouts/MainLayout"
import HomePage from "./view/HomePage"
import AboutPage from "./view/AboutPage"
import ServicesPage from "./view/ServicesPage"
import ProjectsPage from "./view/ProjectsPage"
import ContactPage from "./view/ContactPage"
import AdminPage from "./view/AdminPage"

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  )
}

export default App
