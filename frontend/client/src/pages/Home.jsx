import {
  Search,
  ArrowRight,
  Code,
  Palette,
  BarChart3,
  Briefcase,
  MapPin,
  Clock,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import StageCard from "../components/StageCard.jsx";
import { useStageStore } from "../store/useStageStore.js";
import { useEffect } from "react";

const Home = () => {
  const { authUser } = useAuthStore();
  const { lastUploadedStages, stages, isLoading } = useStageStore();

  useEffect(() => {
    lastUploadedStages();
  }, [lastUploadedStages]);

  console.log("stages =>", stages);
  return (
    <div className="bg-gray-50 min-h-screen">
      {authUser.role === "student" ? (
        <>
          {/* Section Hero */}
          <section className="py-16 px-6 lg:px-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10 max-w-6xl mx-auto">
              <div className="flex flex-col gap-6 max-w-lg">
                <h1 className="text-5xl font-bold">
                  Trouvez le stage parfait pour lancer votre carrière
                </h1>
                <p className="text-lg text-indigo-100">
                  Des opportunités exclusives dans les entreprises les plus
                  innovantes de Côte d'Ivoire et d'ailleurs.
                </p>
                <Link
                  to="/stages"
                  className="btn btn-lg bg-white text-indigo-700 hover:bg-gray-100 border-0 rounded-full w-fit px-8 font-semibold flex items-center gap-2"
                >
                  Explorer les offres <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
                <img
                  src="/63cdf588-5bcc-47cb-ae87-8da2e47d607c.png"
                  alt="Étudiants en stage"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </section>

          {/* Section Recherche */}
          <section className="py-12 px-6 lg:px-20 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un stage par mot-clé, entreprise ou technologie..."
                  className="input input-lg w-full pl-12 pr-4 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                />
              </div>
            </div>
          </section>

          {/* Section Offres récentes */}
          <section className="py-12 px-6 lg:px-20 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
                Offres de stage récentes
              </h2>
              <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                Découvrez les dernières opportunités de stage proposées par nos
                entreprises partenaires
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <Loader />
                ) : (
                  stages.map((stage, index) => (
                    <li key={index} className="list-none">
                      <StageCard
                        title={stage.title}
                        company={stage.company.companyName}
                        duree={stage.duree}
                        location={stage.location}
                        id={stage.id}
                        skills={stage.skills.map((s) => s.name)}
                      />
                    </li>
                  ))
                )}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/stages"
                  className="btn btn-outline btn-primary rounded-full px-8"
                >
                  Voir toutes les offres
                </Link>
              </div>
            </div>
          </section>

          {/* Section Domaines populaires */}
          <section className="py-16 px-6 lg:px-20 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
                Domaines populaires
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Explorez les domaines qui recrutent le plus et trouvez votre
                voie
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Développement Web",
                    desc: "Donnez vie à vos idées",
                    img: "/6b243c98-85ad-4ea5-b8d1-aedd4373ab78.png",
                    icon: <Code className="h-8 w-8 text-indigo-600" />,
                    color: "bg-blue-50",
                  },
                  {
                    title: "Design UI/UX",
                    desc: "Créez des expériences utilisateur exceptionnelles",
                    img: "/35d2d78b-c715-4aef-96f6-5d094924e2e4.png",
                    icon: <Palette className="h-8 w-8 text-indigo-600" />,
                    color: "bg-purple-50",
                  },
                  {
                    title: "Data Science",
                    desc: "Transformez les données en insights",
                    img: "/9533c4d0-8a7d-4ca0-aa21-ea294c6f1ad2.png",
                    icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
                    color: "bg-amber-50",
                  },
                ].map((domain, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:scale-105"
                  >
                    <div className={`${domain.color} p-6 flex justify-center`}>
                      <div className="bg-white p-4 rounded-full shadow-md">
                        {domain.icon}
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {domain.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{domain.desc}</p>
                      <Link className="btn btn-sm btn-outline btn-primary rounded-full flex items-center justify-center gap-1 mx-auto">
                        Découvrir <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="text-center text-white p-8 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Recrutez la prochaine génération de talents
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Connectez-vous avec des étudiants talentueux et trouvez les futurs
              leaders de votre entreprise
            </p>
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pour les recruteurs
              </h2>
              <p className="text-gray-600 mb-6">
                Publiez vos offres de stage et consultez les profils des
                étudiants
              </p>
              <button className="btn btn-primary rounded-full px-8">
                Accéder au tableau de bord
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
