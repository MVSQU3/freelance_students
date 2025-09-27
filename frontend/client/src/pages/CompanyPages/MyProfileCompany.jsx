import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCompanyStore } from "../../store/useCompanyStore";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  Edit3,
  LogOut,
  Briefcase,
  Users,
  BarChart3,
  Award,
  Star,
  Eye,
} from "lucide-react";
import { useStageStore } from "../../store/useStageStore";

const MyProfileCompany = () => {
  const { getMyProfile, myProfile, isCompanyLoading } = useCompanyStore();
  const { getMyStages, stages, lastUploadStages } = useStageStore();
  const { logout, authUser } = useAuthStore();

  useEffect(() => {
    getMyProfile();
    getMyStages();
  }, []);

  if (isCompanyLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec photo de couverture */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 relative">
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <div className="w-32 h-32 bg-white rounded-full p-1 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden">
              {myProfile?.photoUrl ? (
                <img
                  src={myProfile.photoUrl}
                  alt="Photo de profil"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-indigo-600">
                  <Building2 className="w-12 h-12" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="absolute top-6 right-6 flex gap-3">
          <Link
            to="/company/edit/profile"
            className="btn btn-white bg-white/20 hover:bg-white/30 text-white border-none rounded-full px-6 gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Éditer le profil
          </Link>
          <button
            onClick={logout}
            className="btn btn-outline btn-error text-white border-white/50 hover:bg-white/10 rounded-full px-6 gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          {/* Sidebar gauche */}
          <div className="lg:col-span-1 space-y-6">
            {/* Carte info entreprise */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800">
                {myProfile?.companyName || "Nom de l'entreprise"}
              </h1>
              <p className="text-indigo-600 font-medium">
                {myProfile?.sector || "Secteur d'activité"}
              </p>

              <div className="space-y-4 mt-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{myProfile?.location || "Localisation"}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Globe className="w-5 h-5 mr-3 text-indigo-500" />
                  <a
                    href={myProfile?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 truncate"
                  >
                    {myProfile?.website || "Site web"}
                  </a>
                </div>

                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{myProfile?.phone || "Téléphone"}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="truncate">{authUser?.email}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{myProfile?.employeesCount || "0"} employés</span>
                </div>
              </div>

              {/* Stats rapides */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-3">Activité</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-xl font-bold text-indigo-600">
                      {stages.length}
                    </div>
                    <div className="text-xs text-gray-600">Offres actives</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      {(Array.isArray(stages) ? stages : [])
                        .map((stage) =>
                          Array.isArray(stage.applications)
                            ? stage.applications.length
                            : 0
                        )
                        .reduce((a, b) => a + b, 0)}
                    </div>
                    <div className="text-xs text-gray-600">Candidatures</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">Navigation</h3>
              <div className="space-y-2">
                <Link
                  to="/company/dashboard"
                  className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Tableau de bord
                </Link>
                <Link
                  to="/company/stages"
                  className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Briefcase className="w-4 h-4 mr-3" />
                  Mes offres de stage
                </Link>
                <Link
                  to="/company/applied-stages"
                  className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Candidatures
                </Link>
                {/* <Link
                  to="/company/stats"
                  className="flex items-center text-indigo-600 bg-indigo-50 p-2 rounded-lg"
                >
                  <Award className="w-4 h-4 mr-3" />
                  Statistiques
                </Link> */}
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                À propos de notre entreprise
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {myProfile?.description || "Aucune description fournie."}
              </p>
            </div>

            {/* Offres récentes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Offres récentes
                </h2>
                <Link
                  to="/company/create/stage"
                  className="btn btn-primary btn-sm gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Nouvelle offre
                </Link>
              </div>

              <div className="space-y-4">
                {Array.isArray(lastUploadStages) &&
                lastUploadStages.length > 0 ? (
                  lastUploadStages.map((stage, index) => (
                    <Link
                      to={`/company/applied-stages/${stage.id}`}
                      key={index}
                      className="list-none"
                    >
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {stage.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              Durée {stage.duree} • {stage.location} • Publié le{" "}
                              {new Date(stage.created).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`bg-${
                              stage.isActive ? "green" : "red"
                            }-100 text-${
                              stage.isActive ? "green" : "red"
                            }-800 text-xs px-2 py-1 rounded-full`}
                          >
                            {stage.isActive ? "Actif" : "Inactif"}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                            {Array.isArray(stage?.applications)
                              ? stage?.applications.length
                              : 0}{" "}
                            Candidature
                            {Array.isArray(stage?.applications)
                              ? stage?.applications.length > 1
                                ? "s"
                                : ""
                              : []}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {stage.domain}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-600">
                    Aucune offre publiée récemment.
                  </p>
                )}
              </div>
            </div>

            {/* Statistiques rapides */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-800">Visibilité</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vues du profil</span>
                    <span className="font-bold text-indigo-600">128</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taux de réponse</span>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-gray-800">Performance</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stagiaires recrutés</span>
                    <span className="font-bold text-indigo-600">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Évaluation moyenne</span>
                    <span className="font-bold text-yellow-600">4.5/5</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">
                Actions rapides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/company/create/stage/"
                  className="btn btn-primary gap-2 justify-start"
                >
                  <Briefcase className="w-4 h-4" />
                  Publier une offre
                </Link>
                <Link
                  to="/company/applied-stages"
                  className="btn btn-outline gap-2 justify-start"
                >
                  <Users className="w-4 h-4" />
                  Voir candidatures
                </Link>
                <Link
                  to="/company/edit/profile"
                  className="btn btn-outline gap-2 justify-start"
                >
                  <Edit3 className="w-4 h-4" />
                  Modifier le profil
                </Link>
                <Link
                  to="/company/dashboard"
                  className="btn btn-outline gap-2 justify-start"
                >
                  <BarChart3 className="w-4 h-4" />
                  Voir statistiques
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileCompany;
