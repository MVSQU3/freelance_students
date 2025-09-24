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
  LucidePieChart,
  BookOpen,
  MapPin,
  Calendar,
} from "lucide-react";

const MyProfileStats = ({ userType = "student", logout }) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Données fictives ---
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
    <div className="min-h-screen bg-gray-50">
      {/* Header avec photo de couverture */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 relative">
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <div className="w-32 h-32 bg-white rounded-full p-1 shadow-xl">
            <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center">
              <div className="w-28 h-28 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                <LucidePieChart className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          {/* Sidebar gauche */}
          <div className="lg:col-span-1 space-y-6">
            {/* Carte info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800">
                Mes Statistiques
              </h1>
              <p className="text-indigo-600 font-medium">
                {userType === "student" ? "Étudiant" : "Entreprise"}
              </p>

              <div className="space-y-4 mt-6">
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>
                    Profil {userType === "student" ? "étudiant" : "entreprise"}
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>Activité mensuelle</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>Performances</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-3">Navigation</h3>
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Mon Profil
                  </Link>
                  <Link
                    to={
                      userType === "student"
                        ? "/student/my-apply"
                        : "/company/stages"
                    }
                    className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 mr-3" />
                    {userType === "student" ? "Mes Candidatures" : "Mes Offres"}
                  </Link>
                  <button className="flex items-center text-indigo-600 bg-indigo-50 p-2 rounded-lg w-full">
                    <LucidePieChart className="w-4 h-4 mr-3" />
                    Statistiques
                  </button>
                </div>
              </div>
            </div>

            {/* Stats rapides */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Aperçu</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profil consulté</span>
                  <span className="font-bold text-indigo-600">
                    {stats.profileViews} fois
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {userType === "student" ? "Candidatures" : "Offres actives"}
                  </span>
                  <span className="font-bold text-indigo-600">
                    {userType === "student"
                      ? stats.totalApplications
                      : stats.activeStages}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taux de réussite</span>
                  <span className="font-bold text-indigo-600">
                    {userType === "student"
                      ? `${Math.round(
                          (stats.acceptedApplications /
                            stats.totalApplications) *
                            100
                        )}%`
                      : `${stats.responseRate}%`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistiques principales */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Statistiques Détaillées
              </h2>

              {/* Grid des stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userType === "student" ? (
                  <>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="flex items-center mb-2">
                        <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          Candidatures
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-indigo-600">
                        {stats.totalApplications}
                      </p>
                      <p className="text-sm text-gray-600">Total envoyées</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          Acceptées
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-green-600">
                        {stats.acceptedApplications}
                      </p>
                      <p className="text-sm text-gray-600">
                        Candidatures validées
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          En attente
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-yellow-600">
                        {stats.pendingApplications}
                      </p>
                      <p className="text-sm text-gray-600">
                        En cours d'évaluation
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center mb-2">
                        <Eye className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          Vues profil
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-blue-600">
                        {stats.profileViews}
                      </p>
                      <p className="text-sm text-gray-600">
                        Par les entreprises
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="flex items-center mb-2">
                        <Briefcase className="w-5 h-5 text-indigo-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          Offres actives
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-indigo-600">
                        {stats.activeStages}
                      </p>
                      <p className="text-sm text-gray-600">Stages publiés</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center mb-2">
                        <Mail className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          Candidatures
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-blue-600">
                        {stats.totalApplications}
                      </p>
                      <p className="text-sm text-gray-600">Total reçues</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          Taux de réponse
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-green-600">
                        {stats.responseRate}%
                      </p>
                      <p className="text-sm text-gray-600">
                        Candidatures traitées
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-yellow-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">
                          Vues profil
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-yellow-600">
                        {stats.profileViews}
                      </p>
                      <p className="text-sm text-gray-600">Par les étudiants</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activité mensuelle */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-800">
                    Activité mensuelle
                  </h3>
                </div>
                <div className="flex items-end justify-between gap-2 p-4 bg-gray-50 rounded-lg">
                  {stats.monthlyActivity.map((month, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="bg-indigo-500 rounded-t w-full transition-all hover:bg-indigo-600"
                        style={{ height: `${month.count * 10}px` }}
                        title={`${month.count} en ${month.month}`}
                      />
                      <span className="text-xs mt-2 text-gray-600">
                        {month.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Domaines populaires */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-800">
                    Domaines populaires
                  </h3>
                </div>
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

            {/* Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-gray-800">Insights</h3>
              </div>
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
                            Vérifiez que vos compétences correspondent aux
                            offres.
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
        </div>
      </div>
    </div>
  );
};

export default MyProfileStats;
