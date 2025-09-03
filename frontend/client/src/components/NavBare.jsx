import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FlaskConical } from "lucide-react";

const NavBare = () => {
  const { authUser } = useAuthStore();
  return (
    <div className="p-2.5">
      <nav className="flex justify-between p-1">
        <Link to="/">CompusConnect</Link>
        <div className="flex gap-4">
          {authUser?.role === "student" ? (
            <Link to="/stages">Découvrir les stages</Link>
          ) : (
            <Link to={"/student/liste"}>Découvrir les talents</Link>
          )}
          <Link to="#">À propos</Link>
          <Link to="#">Contact</Link>
          <Link to="/lab" className="flex items-center gap-1">
            Laboratoire <FlaskConical className="w-5 h-5" />
          </Link>
        </div>
        {!authUser ? (
          <div className="flex gap-4">
            <Link to="/login">Se connecter</Link>
            <Link to="/register">S'inscrire</Link>
          </div>
        ) : (
          <div className="flex gap-4">
            {authUser.role === "student" ? (
              <>
                <Link to="/student/me/profile">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/company/me/profile">Profile</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBare;
