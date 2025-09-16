// components/StageDetailCard.jsx
import { MapPin, Clock, Bookmark, Share } from "lucide-react";

const StageDetailCard = ({
  title,
  company,
  duree,
  location,
  skills,
  description,
  isActive,
  onApply,
}) => {
  return (
    <div className="card w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
      <div className="card-body p-6 space-y-5">
        {/* En-tête avec titre et actions */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title text-2xl font-bold text-gray-800">
              {title}
            </h2>
            <p className="text-md text-gray-600 mt-1">
              Chez{" "}
              <span className="font-semibold text-indigo-600">{company}</span>
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-ghost btn-circle btn-sm">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="btn btn-ghost btn-circle btn-sm">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badge de statut */}
        <div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isActive ? "📍 Recrutement actif" : "❌ Poste pourvu"}
          </span>
        </div>

        {/* Localisation et durée */}
        <div className="flex flex-col gap-3 text-gray-700">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <span>{location}, Côte d'Ivoire</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span>Durée: {duree}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Description du poste
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Compétences */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Compétences requises
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="badge bg-indigo-100 text-indigo-700 border-0 px-3 py-2"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="card-actions justify-end mt-6 pt-4 border-t border-gray-100">
          <button className="btn btn-outline btn-gray">Enregistrer</button>
          <button
            className="btn btn-primary"
            onClick={onApply}
            disabled={!isActive}
          >
            Postuler maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageDetailCard;
