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
    <div className="bg-neutral shadow-md mb-6">
      <nav className="flex items-center p-4 lg:px-20">
        {/* left: logo */}
        <div className="flex-none">
          <Link to="/" className="font-bold text-primary text-xl">
            FreelStudent
          </Link>
        </div>

        {/* center: main links if not authenticated */}
        <div className="flex-1 flex justify-center">
          {!authUser ? (
            <div className="flex gap-6 text-base-content font-medium">
              {links}
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* right: auth links or profile */}
        <div className="flex-none">
          {!authUser ? (
            <div className="flex gap-4">
              <Link to="/login" className="btn btn-primary btn-sm">
                Se connecter
              </Link>
              <Link to="/register" className="btn btn-secondary btn-sm">
                S'inscrire
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex gap-4">{links}</div>
              {authUser.role === "student" ? (
                <Link
                  to="/student/me/profile"
                  className="btn btn-outline btn-sm"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/company/me/profile"
                  className="btn btn-outline btn-sm"
                >
                  Profile
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBare;
