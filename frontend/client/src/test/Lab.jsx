import StageCard from "../components/StageCard.jsx";
import StudentCard from "../components/StudentCard.jsx";

export default function Lab() {
  return (
    <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl overflow-hidden mt-10">
      <div className="flex flex-col lg:flex-row">
        {/* Photo de profil */}
        <div className="flex-shrink-0 relative">
          <img
            src="../../public/success-not-random-portrait-handsome-businessman-leaning-against-glass-wall-249709359.webp"
            alt="Paul Kevin"
            className="h-48 w-full lg:h-full lg:w-48 object-cover"
          />
          <span className="absolute top-2 right-2 badge badge-primary">
            disponible
          </span>
        </div>

        {/* Infos principales */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Paul Kevin</h1>
            <p className="text-sm text-base-content/70">Université Abidjan</p>
            <p className="text-sm text-base-content/70">Licence 3</p>
            <p className="text-sm text-base-content/70">Abidjan</p>
            <p className="mt-3 text-base-content">Étudiant motivé</p>

            {/* Domaine d'étude */}
            <p className="mt-2 text-sm text-base-content/70">
              Domaine : Informatique
            </p>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge badge-outline badge-primary text-xs">
                React
              </span>
              <span className="badge badge-outline badge-primary text-xs">
                Node.js
              </span>
              <span className="badge badge-outline badge-primary text-xs">
                JavaScript
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-4">
            <span className="text-sm text-base-content/60 italic">
              CV non disponible
            </span>
            <button className="btn btn-outline btn-sm rounded-lg">
              Contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
