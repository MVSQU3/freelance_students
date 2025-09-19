import { Link } from "react-router-dom";
import {
  User,
  Briefcase,
  Settings,
  LogOut,
  Calendar,
  MapPin,
  Mail,
  Award,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const StudentDashboard = () => {
  const logout = () => {
    // Logique de déconnexion
    console.log("Déconnexion");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center">
            <User className="mr-2 h-6 w-6" />
            Mon compte
          </h2>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left px-4 py-3 rounded-lg flex items-center text-indigo-700 bg-indigo-50 font-medium">
                <User className="mr-3 h-5 w-5" />
                Profil
              </button>
            </li>
            <li>
              <Link
                to={"/student/my-apply"}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Mes candidatures
              </Link>
            </li>
            <li>
              <Link
                to={"/settings"}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Settings className="mr-3 h-5 w-5" />
                Paramètres
              </Link>
            </li>
          </ul>
        </nav>

        <div className="pt-4 border-t border-gray-200">
          <button
            className="w-full text-left px-4 py-3 rounded-lg flex items-center text-red-600 hover:bg-red-50 transition-colors"
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil</h1>
          <p className="text-gray-600 mb-8">
            Gérez vos informations personnelles et préférences
          </p>

          {/* Carte de profil */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="bg-indigo-100 p-4 rounded-full mr-4">
                <User className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Paul Kevin</h2>
                <p className="text-gray-500 flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Étudiant en Informatique - Licence 3
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Disponibilité</p>
                  <p className="font-medium">Disponible</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Localisation</p>
                  <p className="font-medium">Abidjan</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">student1@mail.com</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Award className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Niveau</p>
                  <p className="font-medium">Licence 3</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                Compétences
                <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {["React", "Node.js", "JavaScript"].length}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "JavaScript"].map((skill, index) => (
                  <span
                    key={index}
                    className="badge bg-indigo-100 text-indigo-700 border-0 px-3 py-2"
                  >
                    {skill}
                  </span>
                ))}
                <button className="text-indigo-600 text-sm flex items-center hover:underline">
                  Ajouter une compétence{" "}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Section statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">Candidatures</h3>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mt-3">12</p>
              <p className="text-sm text-gray-500">5 en attente</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">Entretiens</h3>
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mt-3">3</p>
              <p className="text-sm text-gray-500">2 cette semaine</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">Profil complété</h3>
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mt-3">85%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">
              Actions rapides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors">
                <span>Compléter mon profil</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors">
                <span>Voir les offres de stage</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
