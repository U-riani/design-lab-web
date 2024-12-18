import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./adminPages/LoginPage";
import AdminDashboard from "./adminPages/AdminDashboard";
import UnionLayout from "./union/components/UnionLayout";
import UnionMainPage from "./union/pages/UnionMainPage";
import NewsPage from "./union/pages/NewsPage";
import DesignersPage from "./union/pages/DesignersPage";
import ProjectsPage from "./union/pages/ProjectsPage";
import PartnersPage from "./union/pages/PartnersPage";
import ContactPage from "./union/pages/ContactPage";
import SingleNewsPage from "./union/pages/SingleNewsPage";
import GetNewsComponent from "./components/GetNewsComponent";
import GetSingleNews from "./components/GetSingleNews";
import AddNews from "./adminPages/pages/AddNews";
import AdminLayout from "./adminPages/adminlayout/AdminLayout";
// import DeleteNews from "./adminPages/pages/DeleteNews";
import AdminALlNews from "./adminPages/pages/AdminAllNews";
import AdminSingleNews from "./adminPages/pages/AdminSingleNewsPage";
import ProtectedRoute from "./adminPages/protectedRoute/ProtectedRoute"; // Import the ProtectedRoute component
import { AuthProvider } from "./adminPages/context/AuthContext";

import "bpg-nino-mtavruli/css/bpg-nino-mtavruli.min.css";
import "bpg-le-studio-04-caps/css/bpg-le-studio-04-caps.min.css";
import AddHero from "./adminPages/pages/AddHero";
import AdminAllHeros from "./adminPages/pages/AdminAllHeros";
import AdminAddPartners from "./adminPages/pages/AdminAddPartners";
import AdminAllPartners from "./adminPages/pages/AdminAllPartners";
import AdminAddDesigner from "./adminPages/pages/AdminAddDesigner";
import AdminAllDesigners from "./adminPages/pages/AdminAllDesigners";

import { LocalStorageProvider } from "./context/LocalStorageContext"; // Adjust path as needed
import Registration from "./union/pages/Registration";
import AdminAddProject from "./adminPages/pages/AdminAddProject";
import AdminAllProjects from "./adminPages/pages/AdminAllProjects";
import SingleProject from "./union/pages/SingleProject";
import AdminAddProjects from "./adminPages/pages/AdminAddProjects";
import AdminSingleProject from "./adminPages/pages/AdminSingleProject";
import AboutUs from "./union/pages/AboutUs";
import VisitBookPage from "./union/pages/BookVisitPage";
import ScrollToTop from "./hooks/ScrollToTop";

const App = () => (
  <AuthProvider>
    <LocalStorageProvider>
    <Router>
    <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/" element={<AdminLayout />}>
          <Route
            index
            element={<ProtectedRoute element={<AdminDashboard />} />}
          />
          <Route
            path="add-news"
            element={<ProtectedRoute element={<AddNews />} />}
          />
          <Route
            path="all-news"
            element={<ProtectedRoute element={<AdminALlNews />} />}
          />
          <Route
            path="all-news/:newsId"
            element={<ProtectedRoute element={<AdminSingleNews />} />}
          />
          <Route
            path="add-hero"
            element={<ProtectedRoute element={<AddHero />} />}
          />
          <Route
            path="all-heros"
            element={<ProtectedRoute element={<AdminAllHeros />} />}
          />
          <Route
            path="add-partner"
            element={<ProtectedRoute element={<AdminAddPartners />} />}
          />
          <Route
            path="all-partners"
            element={<ProtectedRoute element={<AdminAllPartners />} />}
          />
          <Route
            path="add-designer"
            element={<ProtectedRoute element={<AdminAddDesigner />} />}
          />
          <Route
            path="all-designers"
            element={<ProtectedRoute element={<AdminAllDesigners />} />}
          />
          <Route
            path="add-projects"
            element={<ProtectedRoute element={<AdminAddProjects />} />}
          />
          <Route
            path="all-projects"
            element={<ProtectedRoute element={<AdminAllProjects />} />}
          />
          <Route
            path="all-projects/:projectId"
            element={<ProtectedRoute element={<AdminSingleProject />} />}
          />
        </Route>
        {/* Add more routes as needed */}
          <Route path="/" element={<UnionLayout />}>
        
            <Route index element={<UnionMainPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:newsId" element={<SingleNewsPage />} />
            <Route path="/designers" element={<DesignersPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<SingleProject />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/bookVisit" element={<VisitBookPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/get-news" element={<GetNewsComponent />} />
            <Route path="/get-news/:newsId" element={<GetSingleNews />} />
          </Route>
      </Routes>
    </Router>
        </LocalStorageProvider>
  </AuthProvider>
);

export default App;
