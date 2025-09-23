import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useStudentStore } from "../../store/useStudentStore";
import {
  MapPin,
  Calendar,
  Mail,
  BookOpen,
  Award,
  Briefcase,
  Download,
  MessageCircle,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PublicProfileStudent = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showCV, setShowCV] = useState(false);

  const { getStudentById, myPublicProfile, isLoading } = useStudentStore();
  const { id } = useParams();

  useEffect(() => {
    if (!myPublicProfile.id) {
      getStudentById(id);
    }
  }, [id]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const handleViewCV = () => {
    setShowCV(true);
    setPageNumber(1);
  };

  const handleCloseCV = () => {
    setShowCV(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Données simulées en attendant l'implémentation réelle
  const studentData = {
    projects: [
      {
        title: "Application E-commerce",
        description:
          "Développement d'une plateforme e-commerce complète avec React et Node.js",
      },
      {
        title: "Portfolio Personnel",
        description:
          "Création d'un site portfolio responsive avec animations modernes",
      },
    ],
    stats: {
      projects: 12,
      yearsExperience: 2,
      certifications: 3,
    },
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://portfolio.com",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal de visualisation du CV */}
      {showCV && (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* En-tête du modal */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                CV de {myPublicProfile.lastName} {myPublicProfile.firstName}
              </h3>
              <button
                onClick={handleCloseCV}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenu du PDF */}
            <div className="p-6 overflow-auto">
              <div className="flex justify-center mb-4">
                <div className="max-h-[75vh] overflow-y-auto">
                  <Document
                    file={myPublicProfile.cvUrl || "/cv.pdf"}
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
                      width={700} // ou responsive si tu veux
                      className="shadow-lg"
                    />
                  </Document>
                </div>
              </div>

              {/* Contrôles de pagination */}
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

            {/* Pied du modal */}
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
                  href={myPublicProfile.cvUrl || "/cv.pdf"}
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

      {/* Header avec photo de couverture */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 relative">
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <div className="w-32 h-32 bg-white rounded-full p-1 shadow-xl">
            <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center">
              <div className="w-28 h-28 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                {myPublicProfile.firstName?.[0]}
                {myPublicProfile.lastName?.[0]}
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
                {myPublicProfile.lastName} {myPublicProfile.firstName}
              </h1>
              <p className="text-indigo-600 font-medium">
                {myPublicProfile.fieldOfStudy}
              </p>

              <div className="space-y-4 mt-6">
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{myPublicProfile.school}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{myPublicProfile.level}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{myPublicProfile.location}</span>
                </div>

                <div className="flex items-center text-green-600">
                  <Calendar className="w-5 h-5 mr-3 text-green-500" />
                  <span>{myPublicProfile.availability} immédiatement</span>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-3">Réseaux</h3>
                <div className="flex space-x-3">
                  <a
                    href={studentData.socialLinks.github}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-600" />
                  </a>
                  <a
                    href={studentData.socialLinks.linkedin}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </a>
                  <a
                    href={studentData.socialLinks.portfolio}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Globe className="w-5 h-5 text-gray-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projets réalisés</span>
                  <span className="font-bold text-indigo-600">
                    {studentData.stats.projects}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Années d'expérience</span>
                  <span className="font-bold text-indigo-600">
                    {studentData.stats.yearsExperience}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Certifications</span>
                  <span className="font-bold text-indigo-600">
                    {studentData.stats.certifications}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                À propos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {myPublicProfile.bio}
              </p>
            </div>

            {/* Compétences */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Compétences
              </h2>
              <div className="flex flex-wrap gap-3">
                {myPublicProfile.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Projets */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Projets récents
              </h2>
              <div className="space-y-4">
                {studentData.projects.map((project, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons - MODIFIÉ */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Contacter
                </button>
                <button
                  onClick={handleViewCV}
                  className="btn btn-outline btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Voir le CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileStudent;
