import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  TrendingUp,
  Award,
  Eye,
  FileText,
  CheckCircle,
  Clock,
  BarChart3,
  Users,
  Mail,
  User,
  Settings,
  LogOut,
  PieChart,
  BookOpen,
  MapPin,
  Calendar,
} from "lucide-react";

const MyProfileStats = ({ userType = "student", logout }) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Données fictives
  const fakeStudentStats = {
    totalApplications: 12,
    acceptedApplications: 3,
    pendingApplications: 5,
    profileViews: 42,
    monthlyActivity: [
      { month: "Jan", count: 2 },
      { month: "Fév", count: 1 },
      { month: "Mar", count: 4 },
      { month: "Avr", count: 3 },
      { month: "Mai", count: 2 },
    ],
    popularDomains: [
      { name: "Développement Web", count: 6 },
      { name: "Design UI/UX", count: 3 },
      { name: "Marketing Digital", count: 2 },
    ],
  };

  const fakeCompanyStats = {
    activeStages: 4,
    totalApplications: 25,
    responseRate: 72,
    profileViews: 58,
    monthlyActivity: [
      { month: "Jan", count: 6 },
      { month: "Fév", count: 4 },
      { month: "Mar", count: 7 },
      { month: "Avr", count: 5 },
      { month: "Mai", count: 3 },
    ],
    popularDomains: [
      { name: "Informatique", count: 10 },
      { name: "Commerce", count: 7 },
      { name: "Communication", count: 5 },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setStats(userType === "student" ? fakeStudentStats : fakeCompanyStats);
      setIsLoading(false);
    }, 1000);
  }, [userType]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar identique aux autres pages */}
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
              <Link
                to={
                  userType === "student"
                    ? "/student/me/profile"
                    : "/company/me/profile"
                }
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <User className="mr-3 h-5 w-5" />
                Profil
              </Link>
            </li>
            <li>
              <Link
                to={
                  userType === "student"
                    ? "/student/my-apply"
                    : "/company/my-stages"
                }
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Briefcase className="mr-3 h-5 w-5" />
                {userType === "student" ? "Mes candidatures" : "Mes offres"}
              </Link>
            </li>
            <li>
              <div className="w-full text-left px-4 py-3 rounded-lg flex items-center text-indigo-700 bg-indigo-50 font-medium">
                <PieChart className="mr-3 h-5 w-5" />
                Statistiques
              </div>
            </li>
            <li>
              <Link
                to="/settings"
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Statistiques
          </h1>
          <p className="text-gray-600 mb-8">
            {userType === "student"
              ? "Suivez vos performances et l'impact de votre profil"
              : "Analysez les performances de vos offres et votre attractivité"}
          </p>

          {/* Cartes de statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {userType === "student" ? (
              <>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">Candidatures</h3>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">
                    {stats.totalApplications}
                  </p>
                  <p className="text-sm text-gray-500">Total envoyées</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">Acceptées</h3>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">
                    {stats.acceptedApplications}
                  </p>
                  <p className="text-sm text-gray-500">Candidatures validées</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">En attente</h3>
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">
                    {stats.pendingApplications}
                  </p>
                  <p className="text-sm text-gray-500">En cours d'évaluation</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">Vues profil</h3>
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Eye className="h-5 w-5 text-indigo-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">
                    {stats.profileViews}
                  </p>
                  <p className="text-sm text-gray-500">Par les entreprises</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">
                      Offres actives
                    </h3>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">
                    {stats.activeStages}
                  </p>
                  <p className="text-sm text-gray-500">Stages publiés</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">Candidatures</h3>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">
                    {stats.totalApplications}
                  </p>
                  <p className="text-sm text-gray-500">Total reçues</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">
                      Taux de réponse
                    </h3>
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">
                    {stats.responseRate}%
                  </p>
                  <p className="text-sm text-gray-500">Candidatures traitées</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">Vues profil</h3>
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">
                    {stats.profileViews}
                  </p>
                  <p className="text-sm text-gray-500">Par les étudiants</p>
                </div>
              </>
            )}
          </div>

          {/* Graphiques et visualisations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Activité mensuelle */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Activité mensuelle
              </h3>
              <div className="flex items-end justify-between gap-2 p-4 bg-gray-50 rounded-lg">
                {stats.monthlyActivity.map((month, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="bg-indigo-500 rounded-t w-full transition-all hover:bg-indigo-600"
                      style={{ height: `${month.count * 10}px` }}
                    />
                    <span className="text-xs mt-2 text-gray-600">
                      {month.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domaines populaires */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Domaines populaires
              </h3>
              <div className="space-y-3">
                {stats.popularDomains.map((domain, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {domain.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (domain.count /
                                Math.max(
                                  ...stats.popularDomains.map((d) => d.count)
                                )) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-6 text-right">
                        {domain.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights et conseils */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Insights
            </h3>
            <div className="space-y-3">
              {userType === "student" ? (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-700">
                      💡 Votre profil a été consulté{" "}
                      <strong>{stats.profileViews} fois</strong> par les
                      entreprises. Pensez à le mettre à jour régulièrement.
                    </p>
                  </div>
                  {stats.acceptedApplications === 0 &&
                    stats.totalApplications > 0 && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                        <p className="text-sm text-gray-700">
                          ⚠️ Aucune candidature acceptée pour le moment.
                          Vérifiez que vos compétences correspondent aux offres.
                        </p>
                      </div>
                    )}
                </>
              ) : (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-700">
                      💡 Votre taux de réponse est de{" "}
                      <strong>{stats.responseRate}%</strong>. Répondez
                      rapidement aux candidatures pour améliorer votre
                      attractivité.
                    </p>
                  </div>
                  {stats.activeStages === 0 && (
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <p className="text-sm text-gray-700">
                        ⚠️ Publiez de nouvelles offres pour attirer des
                        candidats qualifiés.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfileStats;
