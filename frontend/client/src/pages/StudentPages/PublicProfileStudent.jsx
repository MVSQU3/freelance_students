import { useEffect } from "react";
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
  Globe
} from "lucide-react";

const PublicProfileStudent = () => {
  const { getStudentById, isLoading } = useStudentStore();
  const id = 1;

  useEffect(() => {
    getStudentById(id);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Données simulées en attendant l'implémentation réelle
  const studentData = {
    name: "Paul Kevin",
    title: "Étudiant en Informatique",
    level: "Licence 3",
    school: "École Ingénieur Agitel Formation",
    location: "Abidjan, Côte d'Ivoire",
    email: "paul.kevin@email.com",
    availability: "Disponible immédiatement",
    bio: "Passionné par le développement web et les nouvelles technologies. Je recherche un stage de fin d'études dans le domaine du développement front-end pour mettre en pratique mes compétences et apprendre auprès de professionnels expérimentés.",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "HTML/CSS", "Git"],
    projects: [
      {
        title: "Application E-commerce",
        description: "Développement d'une plateforme e-commerce complète avec React et Node.js"
      },
      {
        title: "Portfolio Personnel",
        description: "Création d'un site portfolio responsive avec animations modernes"
      }
    ],
    stats: {
      projects: 12,
      yearsExperience: 2,
      certifications: 3
    },
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://portfolio.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec photo de couverture */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 relative">
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <div className="w-32 h-32 bg-white rounded-full p-1 shadow-xl">
            <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center">
              <div className="w-28 h-28 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                PK
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
              <h1 className="text-2xl font-bold text-gray-800">{studentData.name}</h1>
              <p className="text-indigo-600 font-medium">{studentData.title}</p>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{studentData.school}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{studentData.level}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{studentData.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="truncate">{studentData.email}</span>
                </div>
                
                <div className="flex items-center text-green-600">
                  <Calendar className="w-5 h-5 mr-3 text-green-500" />
                  <span>{studentData.availability}</span>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-3">Réseaux</h3>
                <div className="flex space-x-3">
                  <a href={studentData.socialLinks.github} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Github className="w-5 h-5 text-gray-600" />
                  </a>
                  <a href={studentData.socialLinks.linkedin} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </a>
                  <a href={studentData.socialLinks.portfolio} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
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
                  <span className="font-bold text-indigo-600">{studentData.stats.projects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Années d'expérience</span>
                  <span className="font-bold text-indigo-600">{studentData.stats.yearsExperience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Certifications</span>
                  <span className="font-bold text-indigo-600">{studentData.stats.certifications}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">À propos</h2>
              <p className="text-gray-600 leading-relaxed">{studentData.bio}</p>
            </div>

            {/* Compétences */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Compétences</h2>
              <div className="flex flex-wrap gap-3">
                {studentData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Projets */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Projets récents</h2>
              <div className="space-y-4">
                {studentData.projects.map((project, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Contacter
                </button>
                <button className="btn btn-outline btn-primary flex-1 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Télécharger CV
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