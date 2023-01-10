// Rutas
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

// Páginas
import Home from "containers/pages/Home";
import Error404 from "containers/errors/Error404";

// Animaciones
import {AnimatePresence} from "framer-motion"
import Blog from "containers/pages/Blog";
import Dashboard from "containers/pages/Dashboard";
import ResetPassword from "containers/auth/ResetPassword";
import ConfirmResetPass from "containers/auth/ConfirmResetPass";
import EditPost from "containers/pages/EditPost";

export default function AnimatedRoutes() {
    const location = useLocation()
    return (

      <AnimatePresence>
    <Routes location={location} key={location.pathname}>
    {/* Error 404 */}
    <Route path="*" element={<Error404 />} />

    {/* Pages */}
    <Route path="/" element={<Home />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<EditPost />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/password/reset/confirm/:uid/:token" element={<ConfirmResetPass />} />
</Routes>
      </AnimatePresence>

  )
}
