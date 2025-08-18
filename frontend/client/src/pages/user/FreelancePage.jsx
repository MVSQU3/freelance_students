import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FreelancePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/user");
      console.log(res.data);
      setData(res.data.user);
    }
    fetchData();
  }, []);

  console.log(
    "log de data",
    data.map((u) => u)
  );

  return (
    <div className="grid grid-cols-3">
      {data.map((user) => (
        <li key={user._id}className="list-none">
          <Link to={`/user/info/${user._id}`}>
            <div className="card bg-base-100 w-96 shadow-md border border-base-200 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="Freelancer"
                    className="w-16 h-16 rounded-full border-2 border-green-500"
                  />
                  <span className="absolute bottom-0 right-0 bg-blue-500 w-4 h-4 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {user.nom} {user.prenom}
                  </h2>
                  <p className="text-sm text-gray-500">
                    ${user.profile.tarif}/hr
                  </p>
                  <div className="flex items-center text-sm text-yellow-500">
                    ★ 5.0 <span className="text-gray-400 ml-1">(12)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge badge-outline">Disponible</span>
                <span className="badge badge-outline">Match parfait</span>
                <span className="badge badge-outline">5/5 compétences</span>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="btn btn-primary btn-sm">Voir profil</button>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default FreelancePage;
