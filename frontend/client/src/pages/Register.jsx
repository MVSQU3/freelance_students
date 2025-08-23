import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const { register, isRegisterLoading } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
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
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="student">Étudiant</option>
          <option value="company">Entreprise</option>
        </select>
        <button type="submit" disabled={isRegisterLoading}>
          {isRegisterLoading ? "Chargement..." : "S’inscrire "}
        </button>
        <button>
          Pas encore de compte ? <Link to="/login">Connectez-vous</Link>
        </button>
      </form>
    </div>
  );
};

export default Register;
