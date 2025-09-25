import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import NavBare from "./components/NavBare.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Stages from "./pages/Stages.jsx";
import StageDetails from "./pages/StageDetails.jsx";
import MyProfileStats from "./pages/StudentPages/MyProfileStats.jsx";
import Lab from "./test/Lab.jsx";

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
import MyApply from "./pages/StudentPages/MyApply.jsx";
import { LogIn } from "lucide-react";
import SettingsPage from "./pages/SettingsPage.jsx";
import CreateStage from "./pages/CompanyPages/CreateStage.jsx";
import MyStages from "./pages/CompanyPages/MyStages.jsx";
import ApplyStages from "./pages/CompanyPages/ApplyStages.jsx";
import CompanyDashboard from "./pages/CompanyPages/CompanyDashboard.jsx";
import EditeStage from "./pages/CompanyPages/EditeStage.jsx";
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
        <Route path="/lab" element={<Lab />} />
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        <Route path="/stages" element={authUser ? <Stages /> : <Login />} />
        <Route
          path="/company/stages"
          element={authUser ? <MyStages /> : <Login />}
        />
        <Route
          path="/company/applied-stages/:id"
          element={authUser ? <ApplyStages /> : <Login />}
        />
        <Route
          path="/company/dashboard"
          element={authUser ? <CompanyDashboard /> : <Login />}
        />

        <Route
          path="/company/edite/stage/:id"
          element={authUser ? <EditeStage /> : <Login />}
        />

        <Route
          path="/student/stats"
          element={authUser ? <MyProfileStats /> : <Login />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Login />}
        />
        <Route
          path="/stage-details/:id"
          element={authUser ? <StageDetails /> : <Login />}
        />
        <Route
          path="student/my-apply"
          element={authUser ? <MyApply /> : <LogIn />}
        />

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

        <Route
          path="/company/create/stage"
          element={authUser ? <CreateStage /> : <Login />}
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
      <Footer />
    </>
  );
}

export default App;
