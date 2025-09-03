// src/components/StudentCard.jsx
import { Link } from "react-router-dom";

const StudentCard = ({ name, school, location, level, skill, photo, id }) => {
  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-sm relative">
      <figure>
        {/* Badge skill */}
        {skill && (
          <div className="badge badge-secondary absolute top-2 left-2">
            <span>{skill}</span>
          </div>
        )}
        <img
          src={photo}
          alt={`Photo de profil de ${name}`}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm text-gray-500">{school}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="font-medium">{level}</p>

        <div className="card-actions justify-end">
          <Link
            to={`/student/public/profile/${id}`}
            className="btn btn-primary"
          >
            Voir le profil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
