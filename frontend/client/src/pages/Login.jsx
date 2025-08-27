import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoginLoading } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData).then((user) => {
      if (user && user.role === "student") navigate("/student/profile");
      else if (user && user.role === "company") navigate("/");
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit" disabled={isLoginLoading}>
          {isLoginLoading ? "Chargement..." : "Se connecter"}
        </button>
        <br />

        <button>
          Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
