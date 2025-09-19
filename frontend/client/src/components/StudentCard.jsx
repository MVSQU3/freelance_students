import { MapPin, BookOpen, Briefcase, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const StudentCard = ({ name, school, location, level, skill, photo, id }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Photo et nom */}
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
            <img 
              src={photo || "/default-avatar.png"} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <p className="text-gray-600 text-sm">{level}</p>
          </div>
        </div>

        {/* Informations */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center text-gray-600">
            <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="text-sm">{school}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Briefcase className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="text-sm">{skill}</span>
          </div>
        </div>

        {/* Bouton action */}
        <Link 
          to={`/students/${id}`}
          className="btn btn-primary btn-sm w-full rounded-lg flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Voir le profil
        </Link>
      </div>
    </div>
  );
};

export default StudentCard;