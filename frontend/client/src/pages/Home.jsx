import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import StageCard from "../components/StageCard.jsx";

const Home = () => {
  const { authUser } = useAuthStore();

  return (
    <div>
      <div>
        {authUser.role === "student" ? (
          <>
            <section>
              <div className="flex justify-around">
                <div className="flex flex-col gap-5 justify-center">
                  <h1 className="text-4xl">Trouvez des stages</h1>
                  <p>Trouve le stage qui lancera ta carrière!</p>
                  <Link to="/stages" className="btn btn-primary rounded-lg">
                    Voir les offres de stages
                  </Link>
                </div>
                <div>
                  <img
                    src="../../public/63cdf588-5bcc-47cb-ae87-8da2e47d607c.png"
                    alt="landing_page_image"
                    className="w-96"
                  />
                </div>
              </div>
            </section>{" "}
            <section>
              <input type="text" className="input ml-15 mb-5" />
              <div className="px-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </>
        ) : (
          <>
            <h1>Trouvez des Étudiants</h1>
            <p>Accède à une nouvelle génération de talents!</p>
          </>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Home;
