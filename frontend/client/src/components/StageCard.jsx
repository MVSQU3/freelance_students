import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StageCard = ({ title, company, duree, skills, location, id }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
              {title}
            </h3>
            <p className="text-indigo-600 font-medium mt-1">{company}</p>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{location}, Côte d'ivoire</span>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{duree}</span>
        </div>

        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="badge bg-indigo-100 text-indigo-700 border-0 px-3 py-1 text-xs"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="badge bg-gray-100 text-gray-600 border-0 px-3 py-1 text-xs">
                +{skills.length - 3}
              </span>
            )}
          </div>
        </div>

        <Link
          to={`/stage-details/${id}`}
          className="btn btn-primary btn-sm w-full rounded-lg flex items-center justify-center gap-2"
        >
          Voir les détails
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default StageCard;
