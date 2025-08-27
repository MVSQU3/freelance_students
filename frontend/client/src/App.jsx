import { Routes, Route, Navigate } from "react-router-dom";
import NavBare from "./components/NavBare.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Stages from "./pages/Stages.jsx";
// start student routes
import EditProfileStudent from "./pages/StudentPages/EditProfileStudent.jsx";
import MyProfileStudent from "./pages/StudentPages/MyProfileStudent.jsx";
import PublicProfileStudent from "./pages/StudentPages/PublicProfileStudent.jsx";
import StudentsList from "./pages/StudentPages/StudentsList.jsx";
// end Student routes
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";

function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <NavBare />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        {/* start Student routes */}
        <Route
          path="/student/liste"
          element={authUser ? <StudentsList /> : <Login />}
        />

        <Route
          path="/student/profile/:id"
          element={authUser ? <PublicProfileStudent /> : <Login />}
        />

        <Route
          path="/student/profile"
          element={authUser ? <MyProfileStudent /> : <Login />}
        />

        <Route
          path="/student/edite/profile"
          element={authUser ? <EditProfileStudent /> : <Login />}
        />
        {/* end Student routes */}

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
