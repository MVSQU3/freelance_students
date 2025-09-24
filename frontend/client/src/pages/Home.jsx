import {
  Search,
  ArrowRight,
  Code,
  Palette,
  BarChart3,
  Briefcase,
  MapPin,
  Clock,
  Star,
  LogIn,
  PlayCircle,
  ChevronDown,
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
          {/* Éléments décoratifs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          </div>

          <div className="relative text-center text-white p-8 max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="text-sm font-medium">
                Plateforme n°1 pour les stages
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Recrutez la
              <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                prochaine génération
              </span>
              de talents
            </h1>

            <p className="text-xl md:text-2xl text-indigo-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Connectez-vous avec des étudiants talentueux et trouvez les
              <span className="font-semibold text-white">
                {" "}
                futurs leaders
              </span>{" "}
              de votre entreprise
            </p>

            {/* Statistiques */}
            <div className="flex justify-center gap-8 mb-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-indigo-200 text-sm">
                  Entreprises partenaires
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">10K+</div>
                <div className="text-indigo-200 text-sm">Étudiants actifs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-indigo-200 text-sm">
                  Taux de satisfaction
                </div>
              </div>
            </div>

            {/* Carte principale */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Pour les recruteurs
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Publiez vos offres de stage, consultez les profils qualifiés
                  et
                  <Link to={"/student/liste"}>
                    <span className="font-semibold text-indigo-600">
                      {" "}
                      trouvez les talents de demain
                    </span>
                  </Link>
                </p>

                <div className="space-y-3">
                  <button className="btn btn-primary rounded-full px-8 w-full gap-2 transform hover:-translate-y-1 transition-transform">
                    <LogIn className="w-4 h-4" />
                    Accéder au tableau de bord
                  </button>

                  <button className="btn btn-outline border-indigo-200 text-indigo-600 rounded-full px-8 w-full gap-2 hover:bg-indigo-50">
                    <PlayCircle className="w-4 h-4" />
                    Voir la démo
                  </button>
                </div>
              </div>
            </div>

            {/* Témoignage */}
            <div className="mt-8 max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-3 text-indigo-200">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                </div>
                <span className="text-sm">
                  Rejoignez{" "}
                  <span className="font-semibold text-white">
                    TechCorp, MarketPlus,
                  </span>{" "}
                  et d'autres...
                </span>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-white/60" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
