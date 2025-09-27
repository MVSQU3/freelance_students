import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  Calendar,
  MapPin,
  Clock,
  BarChart3,
  Download,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useStageStore } from "../../store/useStageStore";

const MyStages = () => {
  const { getMyStages, deleteStage, stages, isLoading } = useStageStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const stagesPerPage = 5; // tu peux mettre 10 ou 20

  // Données simulées
  useEffect(() => {
    getMyStages();
  }, []);

  // On filtre les stages avant de les afficher
  const [sortOption, setSortOption] = useState("recent"); // par défaut

  // On filtre puis on trie les stages
  const filteredStages = stages
    .filter((stage) => {
      // filtre statut
      if (statusFilter !== "all") {
        if (statusFilter === "active" && !stage.isActive) return false;
        if (statusFilter === "closed" && stage.isActive) return false;
      }

      // filtre recherche
      if (searchTerm.trim() !== "") {
        const lowerSearch = searchTerm.toLowerCase();
        const matchTitle = stage.title?.toLowerCase().includes(lowerSearch);
        const matchCompany = stage.company?.companyName
          ?.toLowerCase()
          .includes(lowerSearch);
        const matchLocation = stage.location
          ?.toLowerCase()
          .includes(lowerSearch);

        if (!matchTitle && !matchCompany && !matchLocation) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortOption === "recent") {
        return new Date(b.created) - new Date(a.created); // plus récent en premier
      }
      if (sortOption === "oldest") {
        return new Date(a.created) - new Date(b.created); // plus ancien
      }
      if (sortOption === "applications") {
        return (b.applications?.length || 0) - (a.applications?.length || 0); // + de candidatures en premier
      }
      if (sortOption === "views") {
        return (b.views || 0) - (a.views || 0); // + de vues en premier
      }
      return 0;
    });

  // Pagination : calcul index
  const indexOfLastStage = currentPage * stagesPerPage;
  const indexOfFirstStage = indexOfLastStage - stagesPerPage;
  const currentStages = filteredStages.slice(
    indexOfFirstStage,
    indexOfLastStage
  );

  // Nombre total de pages
  const totalPages = Math.ceil(filteredStages.length / stagesPerPage);

  // Changer de page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (isActive) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      closed: { color: "bg-red-100 text-red-800", label: "Clôturée" },
    };
    return statusConfig[isActive ? "active" : "closed"];
  };

  const handleDeleteStage = async (stageId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      const success = await deleteStage(stageId);
      if (success) {
        getMyStages();
      }
    }
  };

  const stats = {
    total: stages.length,
    active: stages.filter((s) => s.isActive === true).length,
    closed: stages.filter((s) => s.isActive === false).length,
    totalApplications: stages.reduce(
      (sum, stage) => sum + stage?.applications.length,
      0
    ),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-indigo-600" />
                Mes offres de stage
              </h1>
              <p className="text-gray-600">
                Gérez et suivez vos offres de stage publiées
              </p>
            </div>
            <Link
              to="/company/create/stage"
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Nouvelle offre
            </Link>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-indigo-600">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {stats.active}
              </div>
              <div className="text-sm text-gray-600">Actives</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-red-600">
                {stats.closed}
              </div>
              <div className="text-sm text-gray-600">Clôturées</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalApplications}
              </div>
              <div className="text-sm text-gray-600">Candidatures</div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher une offre..."
                className="input input-bordered pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="select select-bordered"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actives</option>
              <option value="closed">Clôturées</option>
            </select>
            <select
              className="select select-bordered"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recent">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
              <option value="applications">+ de candidatures</option>
              <option value="views">+ de vues</option>
            </select>
          </div>
        </div>

        {/* Liste des offres */}
        <div className="space-y-4">
          {Array.isArray(currentStages) && currentStages.length > 0 ? (
            currentStages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {stage.title}
                        </h3>
                        <p className="text-indigo-600 font-medium">
                          {stage.company?.companyName}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${
                          getStatusBadge(stage.isActive).color
                        }`}
                      >
                        {getStatusBadge(stage.isActive).label}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{stage.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{stage.duree}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {Array.isArray(stage.applications)
                            ? stage?.applications.length
                            : []}{" "}
                          candidatures
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        <span>{stage.views} vues</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        Publiée le{" "}
                        {new Date(stage.created).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>
                        Clôture le{" "}
                        {new Date(stage.created).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/company/applied-stages/${stage.id}`}
                      className="btn btn-ghost btn-sm flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Voir
                    </Link>
                    <Link
                      to={`/company/edite/stage/${stage.id}`}
                      className="btn btn-ghost btn-sm flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </Link>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-sm">
                        <MoreVertical className="w-4 h-4" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <button className="flex items-center gap-2 ">
                            <Download className="w-4 h-4" />
                            Télécharger les CV
                          </button>
                        </li>
                        <li>
                          <button className="flex items-center gap-2 ">
                            <Share2 className="w-4 h-4" />
                            Partager
                          </button>
                        </li>
                        <li>
                          <hr />
                        </li>
                        <li>
                          <button
                            onClick={() => handleDeleteStage(stage.id)}
                            className="flex items-center gap-2 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                            Supprimer
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Aucune offre trouvée
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Aucune offre ne correspond à vos critères de recherche."
                  : "Vous n'avez pas encore publié d'offre de stage."}
              </p>
              <Link to="/company/create/stage" className="btn btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Créer votre première offre
              </Link>
            </div>
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm"
              >
                Précédent
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className={`btn btn-sm ${
                    currentPage === index + 1 ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-sm"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStages;
