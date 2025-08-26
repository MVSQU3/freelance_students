import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import DashboardStudent from "./pages/DashboardStudent.jsx";
import DashboardCompany from "./pages/DashboardCompany.jsx";
import ProfileCompany from "./pages/ProfileCompany.jsx";
import ProfileStudent from "./pages/ProfileStudent.jsx";
import Stages from "./pages/Stages.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";

function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard-student"
        element={authUser ? <DashboardStudent /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard-company"
        element={authUser ? <DashboardCompany /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile-company/:id"
        element={authUser ? <ProfileCompany /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile-student/:id"
        element={authUser ? <ProfileStudent /> : <Navigate to="/login" />}
      />
      <Route
        path="/stages"
        element={authUser ? <Stages /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={!authUser ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!authUser ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
