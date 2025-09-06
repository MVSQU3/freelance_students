const StageCard = ({ title, company, duree, skills }) => {
  return (
    <div className="card w-full bg-base-100 border border-gray-200 shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold text-primary">
          {title}
        </h2>
        <p className="text-sm text-base-content/70">Entreprise : {company}</p>
        <p className="text-sm text-base-content/70">Durée : {duree}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="badge badge-primary badge-outline text-xs"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-primary rounded-lg">
            Voir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageCard;
