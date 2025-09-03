const StageCard = ({ title, company, duree, skills }) => {
  return (
    <>
      <div className="card w-full bg-base-100 border border-gray-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">Entreprise : {company}</p>
          <p className="text-sm">Durée : {duree}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
          <div className="card-actions justify-end mt-3">
            <button className="btn btn-sm btn-primary">Voir plus</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StageCard;
