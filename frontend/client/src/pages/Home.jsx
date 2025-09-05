import { ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import StageCard from "../components/StageCard.jsx";

const Home = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="bg-neutral min-h-screen">
      {authUser.role === "student" ? (
        <>
          {/* Section Landing */}
          <section className="py-16 px-6 lg:px-20">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="flex flex-col gap-5 max-w-lg">
                <h1 className="text-5xl font-bold text-primary">
                  Trouvez des stages
                </h1>
                <p className="text-base-content text-lg">
                  Trouve le stage qui lancera ta carrière!
                </p>
                <Link
                  to="/stages"
                  className="btn btn-primary btn-lg rounded-lg w-fit"
                >
                  Voir les offres de stages
                </Link>
              </div>
              <div className="w-full lg:w-1/2">
                <img
                  src="/63cdf588-5bcc-47cb-ae87-8da2e47d607c.png"
                  alt="landing_page_image"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* Section Recherche & Offres */}
          <section className="py-12 px-6 lg:px-20">
            <input
              type="text"
              placeholder="Rechercher un stage..."
              className="input input-bordered input-primary w-full mb-8"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StageCard
                title="Stage en Data Science"
                company="IBM Côte d’Ivoire"
                duree="6 mois"
                skills={["Python", "Machine Learning"]}
              />
              <StageCard
                title="Stage en Data Science"
                company="IBM Côte d’Ivoire"
                duree="6 mois"
                skills={["Python", "Machine Learning", "Data Analysis"]}
              />
              <StageCard
                title="Stage en Data Science"
                company="IBM Côte d’Ivoire"
                duree="6 mois"
                skills={["Python", "Machine Learning"]}
              />
              <StageCard
                title="Stage en Data Science"
                company="IBM Côte d’Ivoire"
                duree="6 mois"
                skills={["Python", "Machine Learning"]}
              />
              <StageCard
                title="Stage en Data Science"
                company="IBM Côte d’Ivoire"
                duree="6 mois"
                skills={["Python", "Machine Learning"]}
              />
              <StageCard
                title="Stage en Data Science"
                company="IBM Côte d’Ivoire"
                duree="6 mois"
                skills={["Python", "Machine Learning"]}
              />
            </div>
          </section>

          {/* Section Domaines populaires */}
          <section className="py-12 px-6 lg:px-20">
            <h2 className="text-3xl font-bold text-center mb-10">
              Les domaines populaires
            </h2>
            <div className="flex flex-col sm:flex-row justify-around gap-10">
              {[
                {
                  title: "Web Development",
                  desc: "Bring your idea to life",
                  img: "/6b243c98-85ad-4ea5-b8d1-aedd4373ab78.png",
                },
                {
                  title: "UI/UX Design",
                  desc: "Build a seamless experience",
                  img: "/35d2d78b-c715-4aef-96f6-5d094924e2e4.png",
                },
                {
                  title: "Product Management",
                  desc: "Start executing on your ideas",
                  img: "/9533c4d0-8a7d-4ca0-aa21-ea294c6f1ad2.png",
                },
              ].map((domain, idx) => (
                <div
                  key={idx}
                  className="bg-base-100 rounded-xl shadow-lg p-4 w-full sm:w-1/3 flex flex-col items-center"
                >
                  <img
                    src={domain.img}
                    alt={domain.title}
                    className="rounded-lg mb-4 w-full"
                  />
                  <h3 className="text-xl font-semibold text-base-content mb-1 text-center">
                    {domain.title}
                  </h3>
                  <p className="text-center text-base-content mb-3">
                    {domain.desc}
                  </p>
                  <Link className="btn btn-secondary btn-sm flex items-center gap-1">
                    Découvrez les stages <ArrowRight className="w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="py-20 px-6 text-center">
          <h1 className="text-4xl font-bold text-primary">
            Trouvez des Étudiants
          </h1>
          <p className="text-base-content text-lg mt-3">
            Accède à une nouvelle génération de talents!
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
