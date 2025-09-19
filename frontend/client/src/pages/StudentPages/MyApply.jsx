import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useApplyStore } from "../../store/useApplyStore";
import { useEffect } from "react";
import {
  User,
  Briefcase,
  Settings,
  LogOut,
  Calendar,
  MapPin,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  ClockIcon,
} from "lucide-react";

const MyApply = () => {
  const { logout } = useAuthStore();
  const { getMyApply, myApply, isLoading } = useApplyStore();

  useEffect(() => {
    getMyApply();
  }, [getMyApply]);

  console.log(myApply);

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          text: "Acceptée",
        };
      case "rejected":
        return {
          color: "bg-red-100 text-red-800",
          icon: XCircle,
          text: "Refusée",
        };
      default:
        return {
          color: "bg-blue-100 text-blue-800",
          icon: ClockIcon,
          text: "En attente",
        };
    }
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
              <Link
                to={"/student/me/profile"}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <User className="mr-3 h-5 w-5" />
                Profil
              </Link>
            </li>
            <li>
              <Link
                to={"/student/my-apply"}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-indigo-700 bg-indigo-50 font-medium"
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Mes candidatures
          </h1>
          <p className="text-gray-600 mb-8">
            Suivez l'état de vos candidatures aux offres de stage
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-indigo-600"></span>
            </div>
          ) : myApply && myApply.length > 0 ? (
            <div className="space-y-4">
              {myApply.map((application) => {
                const StatusIcon = getStatusBadge(application.status).icon;
                return (
                  <div
                    key={application.id}
                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {application.stage?.title}
                        </h3>
                        <p className="text-indigo-600 font-medium">
                          {application.stage?.company?.companyName}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          getStatusBadge(application.status).color
                        }`}
                      >
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {getStatusBadge(application.status).text}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>{application.stage?.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>{application.stage?.duree}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>
                          Postulé le{" "}
                          {new Date(
                            application.applicationDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Lettre de motivation
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {application.coverLetter}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/stage-details/${application.stage?.id}`}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Voir l'offre
                      </Link>
                      {application.status === "accepted" && (
                        <button className="btn btn-primary btn-sm">
                          Contacter l'entreprise
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Aucune candidature
              </h3>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore postulé à des offres de stage.
              </p>
              <Link to="/stages" className="btn btn-primary">
                Explorer les offres
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyApply;
