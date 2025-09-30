import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  TrendingUp,
  Eye,
  Calendar,
  MapPin,
  MessageCircle,
  Plus,
  ArrowRight,
  StarIcon,
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  Download,
  Share2,
  DoorClosed,
  DoorOpen,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useStageStore } from "../../store/useStageStore";

const CompanyDashboard = () => {
  const { StageDashboard, stage, isLoading } = useStageStore();
  const [stats, setStats] = useState({});

  // Données simulées
  useEffect(() => {
    StageDashboard();
  }, [StageDashboard]);

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        color: "bg-green-100 text-green-800",
        label: "Active",
        icon: CheckCircle2,
      },
      draft: {
        color: "bg-gray-100 text-gray-800",
        label: "Brouillon",
        icon: Clock,
      },
      closed: {
        color: "bg-red-100 text-red-800",
        label: "Clôturée",
        icon: XCircle,
      },
      new: {
        color: "bg-blue-100 text-blue-800",
        label: "Nouvelle",
        icon: Star,
      },
      reviewed: {
        color: "bg-amber-100 text-amber-800",
        label: "Consultée",
        icon: Eye,
      },
      contacted: {
        color: "bg-indigo-100 text-indigo-800",
        label: "Contactée",
        icon: MessageCircle,
      },
    };

    return configs[status] || configs.draft;
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Tableau de bord entreprise
              </h1>
              <p className="text-gray-600">
                Bienvenue sur votre espace de gestion des stages
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

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">Offres publiées</h3>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800">
                {stage.totalStages}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <DoorOpen className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">
                  {stage.totalStageActifs} actives
                </span>
                <DoorClosed className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">
                  {stage.totalStageInactifs} inactif
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">Candidatures</h3>
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800">
                {stage.totalApplications}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600">
                  {stage.totalApplicationsPending} En attente
                </span>
                <StarIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">
                  {stage.totalApplicationsAccepted} Accepté
                </span>
                <X className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">
                  {stage.totalApplicationsRejected} Rejeté
                </span>
              </div>
            </div>

            {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">Taux d'entretien</h3>
                <div className="bg-amber-100 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800">
                {stats.interviewRate}%
              </div>
              <div className="text-sm text-gray-500 mt-2">
                sur les 30 derniers jours
              </div>
            </div> */}

            {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">Temps de réponse</h3>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800">
                {stats.averageResponseTime}
              </div>
              <div className="text-sm text-gray-500 mt-2">moyen</div>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Colonne gauche - Offres récentes */}
          <div className="xl:col-span-2 space-y-6">
            {/* Offres de stage récentes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Vos offres récentes
                </h2>
                <Link
                  to="/company/stages"
                  className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
                >
                  Voir tout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {Array.isArray(stage.lastUploadedStages) &&
                  stage.lastUploadedStages.map((stage) => {
                    const StatusIcon = getStatusConfig(stage.status).icon;

                    return (
                      <div
                        key={stage.id}
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-800">
                              {stage.title}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                getStatusConfig(stage.status).color
                              }`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {getStatusConfig(stage.status).label}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{stage.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>
                                {stage?.applications.length} candidatures
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{stage.views} vues</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">
                            Clôture le{" "}
                            {new Date(stage.created).toLocaleDateString()}
                          </div>
                          <Link
                            to={`/company/applied-stages/${stage.id}`}
                            className="btn btn-ghost btn-sm text-indigo-600"
                          >
                            Voir candidatures
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Graphique d'activité (simplifié) */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Activité récente
              </h2>
              <div className="flex items-end justify-between h-32">
                {[65, 80, 45, 90, 75, 60, 85].map((height, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-indigo-500 rounded-t transition-all hover:bg-indigo-600"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      J{index + 1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>7 derniers jours</span>
                <span className="text-indigo-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12% vs semaine dernière
                </span>
              </div>
            </div> */}
          </div>

          {/* Colonne droite - Candidatures récentes */}
          <div className="space-y-6">
            {/* Candidatures récentes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Candidatures récentes
                </h2>
                <Link
                  to="/company/applications"
                  className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
                >
                  Voir tout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {Array.isArray(stage.lastApplications) &&
                  stage.lastApplications.map((application) => {
                    const StatusIcon = getStatusConfig(application.status).icon;

                    return (
                      <div
                        key={application.id}
                        className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {application.student.firstName}{" "}
                              {application.student.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {application.student.school}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              getStatusConfig(application.status).color
                            }`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {getStatusConfig(application.status).label}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {application.stage.title}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500" />
                            <span className="font-medium">{"100"}%</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 mt-2">
                          Postulé le{" "}
                          {new Date(application.created).toLocaleDateString()}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Actions rapides
              </h2>
              <div className="space-y-3">
                <Link
                  to="/company/create/stage"
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors"
                >
                  <span>Créer une nouvelle offre</span>
                  <Plus className="w-4 h-4 text-gray-400" />
                </Link>
                {/* <button className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors">
                  <span>Télécharger les rapports</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button> */}
                {/* <button className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors">
                  <span>Partager le profil</span>
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button> */}
              </div>
            </div>

            {/* Performance */}
            {/* <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">
                Performance du mois
              </h2>
              <p className="text-indigo-100 mb-4">
                Votre entreprise est très attractive !
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Vues des offres</span>
                  <span className="font-semibold">+45%</span>
                </div>
                <div className="flex justify-between">
                  <span>Candidatures qualifiées</span>
                  <span className="font-semibold">+28%</span>
                </div>
                <div className="flex justify-between">
                  <span>Taux de réponse</span>
                  <span className="font-semibold">92%</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
