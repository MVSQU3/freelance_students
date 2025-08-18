import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <nav className="bg-white shadow-sm px-5 py-4 flex justify-between items-center text-sm font-medium">
        {/* <!-- Logo --> */}
        <div className="flex items-center space-x-10">
          <Link to={"/"} className="text-gray-800">
            BaraFree
          </Link>

          {/* <!-- Menu gauche --> */}
          <div className="hidden md:flex space-x-6 text-gray-700">
            <div className="group relative">
              <Link to={"/freelance"} className="hover:text-black">
                Trouver un talent ▾
              </Link>
              {/* <!-- Dropdown si besoin --> */}
            </div>
            <div className="group relative">
              <Link to={"/service/"} className="hover:text-black">
                Trouver un job ▾
              </Link>
            </div>
            <div className="group relative">
              <button className="hover:text-black">
                Pourquoi FreelanceX ▾
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Actions droite --> */}
        <div className="flex items-center gap-4 px-1">
          {user ? (
            <Link to={"/profile"} className="text-red-500">
              Profilez
            </Link>
          ) : (
            <div>
              <Link to={"/login"} className="text-gray-700 hover:underline">
                Se connecter
              </Link>
              <Link
                to={"/register"}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
