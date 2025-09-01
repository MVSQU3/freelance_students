import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import NavBare from "./components/NavBare.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Stages from "./pages/Stages.jsx";
import TestRoute from "./test/TestRoute.jsx";

// START STUDENT ROUTES
import EditProfileStudent from "./pages/StudentPages/EditProfileStudent.jsx";
import MyProfileStudent from "./pages/StudentPages/MyProfileStudent.jsx";
import PublicProfileStudent from "./pages/StudentPages/PublicProfileStudent.jsx";
import StudentsList from "./pages/StudentPages/StudentsList.jsx";
// END STUDENT ROUTES

// START COMPANY ROUTES
import PublicProfileCompany from "./pages/CompanyPages/PublicProfileCompany.jsx";
import MyProfileCompany from "./pages/CompanyPages/MyProfileCompany.jsx";
import EditProfileCompany from "./pages/CompanyPages/EditProfileCompany.jsx";
// END COMPANY ROUTES
function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <NavBare />
      <Routes>
        <Route path="/test" element={<TestRoute />} />
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        <Route path="/stages" element={authUser ? <Stages /> : <Login />} />

        {/* start Student routes */}
        <Route
          path="/student/liste"
          element={authUser ? <StudentsList /> : <Login />}
        />

        <Route
          path="/student/public/profile/:id"
          element={authUser ? <PublicProfileStudent /> : <Login />}
        />

        <Route
          path="/student/me/profile"
          element={authUser ? <MyProfileStudent /> : <Login />}
        />

        <Route
          path="/student/edit/profile"
          element={authUser ? <EditProfileStudent /> : <Login />}
        />
        {/* end Student routes */}

        {/* start Company routes */}

        <Route
          path="/company/public/profile/:id"
          element={authUser ? <PublicProfileCompany /> : <Login />}
        />

        <Route
          path="/company/me/profile"
          element={authUser ? <MyProfileCompany /> : <Login />}
        />

        <Route
          path="/company/edit/profile"
          element={authUser ? <EditProfileCompany /> : <Login />}
        />
        {/* end Company routes */}

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
