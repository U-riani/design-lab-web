import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
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

const App = () => (
  <AuthProvider>
    <Router>
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
        </Route>
        {/* Add more routes as needed */}
        <Route path="/" element={<UnionLayout />}>
          <Route index element={<UnionMainPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:newsId" element={<SingleNewsPage />} />
          <Route path="/designers" element={<DesignersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/get-news" element={<GetNewsComponent />} />
          <Route path="/get-news/:newsId" element={<GetSingleNews />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
