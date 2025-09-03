import StageCard from "../components/StageCard.jsx";
import StudentCard from "../components/StudentCard.jsx";

export default function Lab() {
  return (
    <>
      <StudentCard
        name="Lucie Stonis"
        school="Ecole Ingénieur Agitel Formation"
        location="Cocody, Abidjan"
        level="Étudiant en 3ème année"
        skill="UI/UX Design"
        photo="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        id="1"
      />
      <StageCard
        title="Stage en Data Science"
        company="IBM Côte d’Ivoire"
        duree="6 mois"
        skills={["Python", "Machine Learning"]}
      />
      {/* <div className="card w-96 bg-base-100 border border-gray-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold">
            Stage en Data Science
          </h2>
          <p className="text-sm text-gray-500">
            Entreprise : IBM Côte d’Ivoire
          </p>
          <p className="text-sm">Durée : 6 mois</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="badge badge-outline">Python</span>
            <span className="badge badge-outline">Machine Learning</span>
          </div>
          <div className="card-actions justify-between mt-3">
            <span className="text-xs text-gray-400">Posté il y a 3 jours</span>
            <button className="btn btn-sm btn-primary">Voir plus</button>
          </div>
        </div>
      </div> */}
    </>
  );
}
