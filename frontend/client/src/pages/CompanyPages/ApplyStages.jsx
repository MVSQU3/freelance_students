import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Search,
  Download,
  Mail,
  Phone,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
  MapPin,
  Star,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { Link, useParams } from "react-router-dom";
import { useStageStore } from "../../store/useStageStore.js";
import { useApplyStore } from "../../store/useApplyStore.js";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ApplyStages = () => {
  const { getMyStageDetails, stage, isLoading } = useStageStore();
  const { updateApplyStatus } = useApplyStore();
  const [applyStatus, setApplyStatus] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showCV, setShowCV] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedApp, setExpandedApp] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getMyStageDetails(id);
  }, [id]);

  // console.log("stage in ApplyStages =>", stage);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function previousPage() {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }

  function nextPage() {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  }

  const handleViewCV = (cvUrl) => {
    setShowCV(true);
    setPageNumber(1);
  };

  const handleCloseCV = () => {
    setShowCV(false);
  };

  const toggleExpand = (appId) => {
    setExpandedApp(expandedApp === appId ? null : appId);
  };

  const downloadAllCVs = () => {
    // Action de téléchargement
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "bg-blue-100 text-blue-800",
        icon: Eye,
        label: "En attente",
      },
      accepted: {
        color: "bg-green-100 text-green-800",
        icon: Star,
        label: "Acceptée",
      },
      rejected: { color: "bg-red-100 text-red-800", icon: X, label: "Rejetée" },
    };
    return configs[status];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Modal de visualisation du CV */}
      {showCV && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                CV de l'étudiant
              </h3>
              <button
                onClick={handleCloseCV}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 overflow-auto">
              <div className="flex justify-center mb-4">
                <Document
                  file={"/cv.pdf"}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={700}
                    className="shadow-lg"
                  />
                </Document>
              </div>

              {numPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4">
                  <button
                    onClick={previousPage}
                    disabled={pageNumber <= 1}
                    className="btn btn-outline btn-sm flex items-center gap-1 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Précédent
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {pageNumber} sur {numPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                    className="btn btn-outline btn-sm flex items-center gap-1 disabled:opacity-50"
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <span className="text-sm text-gray-600">
                {numPages && `${numPages} page${numPages > 1 ? "s" : ""}`}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCloseCV}
                  className="btn btn-ghost btn-sm"
                >
                  Fermer
                </button>
                <a
                  href={"/cv.pdf"}
                  download
                  className="btn btn-primary btn-sm flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    {stage.title} • {stage?.company?.companyName}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-800">
                    {Array.isArray(stage.applications)
                      ? stage.applications.length
                      : 0}
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

              <select className="select select-bordered" defaultValue="">
                <option value="">Tous les statuts</option>
                <option value="">En attente</option>
                <option value="accepted">Acceptées</option>
                <option value="rejected">Rejetées</option>
              </select>

              <select className="select select-bordered" defaultValue="newest">
                <option value="newest">Plus récentes</option>
                <option value="oldest">Plus anciennes</option>
              </select>
            </div>
          </div>

          {/* Liste des candidatures */}
          <div className="space-y-4">
            {Array.isArray(stage.applications) &&
              stage.applications.map((application) => {
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
                              {application.student.firstName?.[0]}
                              {application.student.lastName?.[0]}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {application.student.firstName}{" "}
                              {application.student.lastName}
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
                              <span className="font-semibold">100%</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              Postulé le{" "}
                              {new Date(
                                application.created
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
                                <span>{application.student.student.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>Non renseigné</span>
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
                              {application.student.skills.map(
                                (skill, index) => (
                                  <span
                                    key={index}
                                    className="badge badge-outline badge-primary"
                                  >
                                    {skill.name}
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">
                              Actions
                            </h4>
                            <div className="space-y-2">
                              <button
                                onClick={() =>
                                  handleViewCV(application.student.cvUrl)
                                }
                                className="btn btn-outline btn-sm w-full flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Voir le CV
                              </button>
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
                          </h4>+
                          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                            {application.coverLetter}
                          </p>
                        </div>

                        {/* Changement de statut */}
                        <div className="mt-6 flex gap-2">
                          <form>
                            <select
                              className="select select-bordered select-sm"
                              value={applyStatus}
                              onChange={async (e) => {
                                setApplyStatus(e.target.value);
                                await updateApplyStatus(
                                  application.id,
                                  e.target.value
                                );
                                await getMyStageDetails(id);
                              }}
                            >
                              <option value="">Changer le statut</option>
                              <option value="pending">En attente</option>
                              <option value="accepted">Accepter</option>
                              <option value="rejected">Rejeter</option>
                            </select>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyStages;
