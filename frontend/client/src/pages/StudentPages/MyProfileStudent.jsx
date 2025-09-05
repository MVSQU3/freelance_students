import { useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const MyProfileStudent = () => {
  const { getMyProfile, myProfile } = useStudentStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  console.log(myProfile);

  return (
    <>
      <div className="max-w-3xl mx-auto bg-base-100 shadow-2xl rounded-2xl overflow-hidden mt-10 flex flex-col lg:flex-row">
        {/* Photo de profil */}
        <div className="lg:w-1/3 relative">
          <img
            src="../../../public/success-not-random-portrait-handsome-businessman-leaning-against-glass-wall-249709359.webp"
            alt="Paul Kevin"
            className="w-full h-64 lg:h-full object-cover rounded-b-2xl lg:rounded-l-2xl lg:rounded-r-none"
          />
          <span className="absolute top-4 right-4 badge badge-primary text-sm">
            disponible
          </span>
        </div>

        {/* Infos principales */}
        <div className="lg:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Paul Kevin</h1>
            <p className="text-sm text-base-content/70 mb-1">
              Université Abidjan - Licence 3
            </p>
            <p className="text-sm text-base-content/70 mb-1">Abidjan</p>

            <p className="mt-4 text-base-content">{`Étudiant motivé`}</p>

            <p className="mt-3 text-sm text-base-content/70 font-medium">
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
            <button className="btn btn-primary btn-sm rounded-lg">
              Contacter
            </button>
          </div>
        </div>
      </div>
      );
    </>
  );
};

export default MyProfileStudent;
