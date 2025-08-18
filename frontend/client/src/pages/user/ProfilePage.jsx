import axios from "axios";
import { useEffect, useState } from "react";
import { getUserToken } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userDecode = getUserToken();

  console.log("userDecode: ", userDecode);
  const token = localStorage.getItem("JWT");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/me", {
          data: {
            userId: userDecode.userId,
          },
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        });
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.log("Erreur: ", error);
        if (error.response.status === 401) {
          alert("reconnecter vous");
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <div>
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-emerald-500">
              {user.nom} {user.prenom}
            </h2>
            <ul className="text-gray-700 space-y-1">
              <li>
                <span className="font-semibold">Âge :</span> {user.age} ans
              </li>
              <li>
                <span className="font-semibold">Téléphone :</span> {user.numero}
              </li>
              <li>
                <span className="font-semibold">Email :</span> {user.email}
              </li>
              <li>
                <span className="font-semibold">Compte :</span> {user.compte}
              </li>
              <li>
                <span className="font-semibold">Tarif :</span>{" "}
                {user.profile.tarif} €/h
              </li>
              <li>
                <span className="font-semibold">Bio :</span> {user.profile.bio}
              </li>
              <li>
                <span className="font-semibold">Compétences :</span>{" "}
                {user.profile.competences.join(", ")}
              </li>
            </ul>
            <Link to={"/service/create"} className="btn btn-success">
              Cree une offre
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
