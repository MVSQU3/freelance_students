import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useApplyStore } from "../../store/useApplyStore";
import { useEffect } from "react";

const MyApply = () => {
  const { logout } = useAuthStore();
  const { getApply } = useApplyStore();

  useEffect(() => {
    getApply();
  }, [getApply]);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 border-r p-6">
        <h2 className="text-2xl font-bold mb-8 text-primary">Mon compte</h2>
        <ul className="space-y-3">
          <li>
            <Link
              to={"/student/me/profile"}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-base-300"
            >
              Profil
            </Link>
          </li>
          <li>
            <Link
              to={"/student/my-apply"}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-base-300"
            >
              Mes candidatures
            </Link>
          </li>
          <li>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-base-300">
              Paramètres
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-3 py-2 rounded-lg hover:text-white hover:bg-red-600"
              onClick={logout}
            >
              Déconnexion
            </button>
          </li>
        </ul>
      </aside>

      {/* Contenu */}
      <main className="flex"></main>
    </div>
  );
};

export default MyApply;
