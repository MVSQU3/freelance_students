import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
  MapPin,
  BookOpen,
  Star,
  MessageCircle,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ApplyStages = () => {
  const { stageId } = useParams();
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedApp, setExpandedApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Données simulées
  useEffect(() => {
    setTimeout(() => {
      setApplications([
        {
          id: 1,
          student: {
            name: "Marie Dubois",
            email: "marie.dubois@email.com",
            phone: "+33 6 12 34 56 78",
            school: "École d'Ingénieurs Informatique",
            level: "Master 2",
            location: "Paris",
          },
          applicationDate: "2024-01-20",
          status: "new",
          motivation:
            "Je suis très intéressée par ce stage car il correspond parfaitement à mes compétences en React et Node.js. J'ai déjà réalisé plusieurs projets similaires durant mes études...",
          cvUrl: "/cv-marie-dubois.pdf",
          score: 85,
          skills: ["React", "Node.js", "JavaScript", "MongoDB"],
        },
        {
          id: 2,
          student: {
            name: "Thomas Martin",
            email: "thomas.martin@email.com",
            phone: "+33 6 23 45 67 89",
            school: "Université Paris-Saclay",
            level: "Licence 3",
            location: "Lyon",
          },
          applicationDate: "2024-01-18",
          status: "reviewed",
          motivation:
            "Passionné par le développement web, je souhaite mettre à profit mes connaissances acquises durant ma formation...",
          cvUrl: "/cv-thomas-martin.pdf",
          score: 72,
          skills: ["JavaScript", "HTML/CSS", "Python", "SQL"],
        },
        {
          id: 3,
          student: {
            name: "Sophie Lambert",
            email: "sophie.lambert@email.com",
            phone: "+33 6 34 56 78 90",
            school: "EPITECH",
            level: "Master 1",
            location: "Remote",
          },
          applicationDate: "2024-01-15",
          status: "contacted",
          motivation:
            "Votre offre de stage m'intéresse particulièrement car elle me permettrait de développer mes compétences en environnement professionnel...",
          cvUrl: "/cv-sophie-lambert.pdf",
          score: 91,
          skills: ["React", "TypeScript", "AWS", "Docker"],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const stageData = {
    id: stageId,
    title: "Développeur Full Stack React/Node.js",
    company: "Tech Solutions Inc.",
    applicationsCount: applications.length,
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.student.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      case "oldest":
        return new Date(a.applicationDate) - new Date(b.applicationDate);
      case "score":
        return b.score - a.score;
      default:
        return 0;
    }
  });

  const getStatusConfig = (status) => {
    const configs = {
      new: {
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
        label: "Nouvelle",
      },
      reviewed: {
        color: "bg-amber-100 text-amber-800",
        icon: Eye,
        label: "Consultée",
      },
      contacted: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Contactée",
      },
      rejected: { color: "bg-red-100 text-red-800", icon: X, label: "Rejetée" },
    };
    return configs[status] || configs.new;
  };

  const toggleExpand = (appId) => {
    setExpandedApp(expandedApp === appId ? null : appId);
  };

  const updateStatus = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
  };

  const downloadAllCVs = () => {
    // Logique pour télécharger tous les CV
    alert("Téléchargement de tous les CV en cours...");
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <Link
            to="/company/stages/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à mes offres
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Candidatures reçues
                </h1>
                <div className="text-lg text-indigo-600 font-medium">
                  {stageData.title} • {stageData.company}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-800">
                  {applications.length}
                </span>
                <span className="text-gray-600">candidatures</span>
                <button
                  onClick={downloadAllCVs}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Tous les CV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un candidat..."
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
              <option value="new">Nouvelles</option>
              <option value="reviewed">Consultées</option>
              <option value="contacted">Contactées</option>
              <option value="rejected">Rejetées</option>
            </select>

            <select
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
              <option value="score">Meilleur score</option>
            </select>
          </div>
        </div>

        {/* Liste des candidatures */}
        <div className="space-y-4">
          {sortedApplications.length > 0 ? (
            sortedApplications.map((application) => {
              const StatusIcon = getStatusConfig(application.status).icon;

              return (
                <div
                  key={application.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200"
                >
                  {/* En-tête de la candidature */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleExpand(application.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-semibold">
                            {application.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {application.student.name}
                          </h3>
                          <p className="text-gray-600">
                            {application.student.school} •{" "}
                            {application.student.level}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-amber-500" />
                            <span className="font-semibold">
                              {application.score}%
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            Postulé le{" "}
                            {new Date(
                              application.applicationDate
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            getStatusConfig(application.status).color
                          }`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {getStatusConfig(application.status).label}
                        </span>

                        {expandedApp === application.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Détails expandables */}
                  {expandedApp === application.id && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                        {/* Informations du candidat */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Informations
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{application.student.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{application.student.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{application.student.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Compétences */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Compétences
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {application.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="badge badge-outline badge-primary"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Actions
                          </h4>
                          <div className="space-y-2">
                            <a
                              href={application.cvUrl}
                              download
                              className="btn btn-outline btn-sm w-full flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Télécharger CV
                            </a>
                            <button className="btn btn-primary btn-sm w-full flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              Contacter
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Lettre de motivation */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Lettre de motivation
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                          {application.motivation}
                        </p>
                      </div>

                      {/* Changement de statut */}
                      <div className="mt-6 flex gap-2">
                        <select
                          className="select select-bordered select-sm"
                          value={application.status}
                          onChange={(e) =>
                            updateStatus(application.id, e.target.value)
                          }
                        >
                          <option value="new">Marquer comme nouvelle</option>
                          <option value="reviewed">
                            Marquer comme consultée
                          </option>
                          <option value="contacted">
                            Marquer comme contactée
                          </option>
                          <option value="rejected">
                            Marquer comme rejetée
                          </option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Aucune candidature
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all"
                  ? "Aucune candidature ne correspond à vos critères de recherche."
                  : "Aucune candidature n'a été reçue pour cette offre pour le moment."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyStages;
