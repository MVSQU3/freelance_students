import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FlaskConical } from "lucide-react";

const NavBare = () => {
  const { authUser } = useAuthStore();
  const links = (
    <div className="flex gap-4 items-center">
      <Link to="/stages" className="hover:underline">
        Découvrir les stages
      </Link>
      <Link to={"/student/liste"} className="hover:underline">
        Découvrir les talents
      </Link>
      <Link to="/lab" className="flex items-center gap-1 hover:underline">
        Laboratoire <FlaskConical className="w-5 h-5" />
      </Link>
    </div>
  );

  return (
    <div className="bg-purple-600 p-2.5 mb-4">
      <nav className="flex items-center p-1">
        {/* left: logo */}
        <div className="flex-none">
          <Link to="/" className="font-bold text-white">
            CompusConnect
          </Link>
        </div>

        {/* center: when not authenticated show the main links centered */}
        <div className="flex-1 flex justify-center">
          {!authUser ? <div className="text-white">{links}</div> : <div />}
        </div>

        {/* right: if authenticated show links + profile, otherwise login/register */}
        <div className="flex-none">
          {!authUser ? (
            <div className="flex gap-4 text-white">
              <Link to="/login">Se connecter</Link>
              <Link to="/register">S'inscrire</Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-white">
              <div>{links}</div>
              {authUser.role === "student" ? (
                <Link to="/student/me/profile">Profile</Link>
              ) : (
                <Link to="/company/me/profile">Profile</Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBare;
