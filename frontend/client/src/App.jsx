import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/service/ServicePage";
import ServiceDetail from "./pages/service/ServiceDetail";
import CreateServicePage from "./pages/service/CreateServicePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/user/ProfilePage";
import FreelancePage from "./pages/user/FreelancePage";
import UserInfoPage from "./pages/user/UserInfoPage";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./components/AuthContext";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Service routes */}
        <Route path="/service" element={<ServicePage />} />
        <Route path="/service/detail/:id" element={<ServiceDetail />} />
        <Route path="/service/create" element={<CreateServicePage />} />
        {/* authentification routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* user */}
        <Route path="/freelance" element={<FreelancePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user/info/:id" element={<UserInfoPage />} />
        {/* Message */}
        <Route path="/chat/send-message/:id" element={<ChatPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
