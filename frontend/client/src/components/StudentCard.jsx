// src/components/StudentCard.jsx
import { Link } from "react-router-dom";

const StudentCard = ({ name, school, location, level, skill, photo, id }) => {
  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300 relative">
      <figure className="relative">
        {/* Badge skill */}
        {skill && (
          <div className="badge badge-primary absolute top-2 left-2">
            <span>{skill}</span>
          </div>
        )}
        <img
          src={photo}
          alt={`Photo de profil de ${name}`}
          className="h-48 w-full object-cover rounded-t-xl"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-primary">{name}</h2>
        <p className="text-sm text-base-content/70">{school}</p>
        <p className="text-sm text-base-content/70">{location}</p>
        <p className="font-medium text-base-content">{level}</p>

        <div className="card-actions justify-end mt-3">
          <Link
            to={`/student/public/profile/${id}`}
            className="btn btn-primary rounded-lg btn-sm"
          >
            Voir le profil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
