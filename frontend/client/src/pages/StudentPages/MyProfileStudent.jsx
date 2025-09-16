import { useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const MyProfileStudent = () => {
  const { getMyProfile, myProfile } = useStudentStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  console.log(myProfile);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 border-r p-6">
        <h2 className="text-2xl font-bold mb-8 text-primary">Mon compte</h2>
        <ul className="space-y-3">
          <li>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-base-300">
              Profil
            </button>
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
              className="w-full text-left px-3 py-2 rounded-lg hover:text-white hover:bg-black"
              onClick={logout}
            >
              Déconnexion
            </button>
          </li>
        </ul>
      </aside>

      {/* Contenu */}
      <main className="flex-1 p-8 bg-base-100">
        <h1 className="text-3xl font-semibold mb-6">Profil</h1>

        <div className="card bg-base-100 border shadow-sm p-6 mx-auto w-1/2">
          <h2 className="text-xl font-bold">Paul Kevin</h2>
          <p className="text-gray-500">Étudiant en Informatique - Licence 3</p>
          <p className="mt-4">
            <span className="font-semibold">Disponibilité :</span> Disponible
          </p>
          <p className="mt-2">
            <span className="font-semibold">Localisation :</span> Abidjan
          </p>
          <p className="mt-2">
            <span className="font-semibold">Email :</span> student1@mail.com
          </p>

          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="badge badge-outline">React</span>
            <span className="badge badge-outline">Node.js</span>
            <span className="badge badge-outline">JavaScript</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfileStudent;
