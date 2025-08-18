import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserInfoPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { id } = useParams();
  console.log("ID récupéré :", id);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get(`http://localhost:3000/api/user/info/${id}`);
      console.log(res.data);
      setUserInfo(res.data);
    };
    fetchUserInfo();
  }, [id]);

  console.log("User Info:", userInfo);
  return (
    <div>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
        {userInfo ? (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-emerald-500">
              {userInfo.nom} {userInfo.prenom}
            </h2>
            <ul className="text-gray-700 space-y-1">
              <li>
                <span className="font-semibold">Âge :</span> {userInfo.age} ans
              </li>
              <li>
                <span className="font-semibold">Téléphone :</span>{" "}
                {userInfo.numero}
              </li>
              <li>
                <span className="font-semibold">Email :</span> {userInfo.email}
              </li>
              <li>
                <span className="font-semibold">Compte :</span>{" "}
                {userInfo.compte}
              </li>
              <li>
                <span className="font-semibold">Tarif :</span>{" "}
                {userInfo.profile.tarif} €/h
              </li>
              <li>
                <span className="font-semibold">Bio :</span>{" "}
                {userInfo.profile.bio}
              </li>
              <li>
                <span className="font-semibold">Compétences :</span>{" "}
                {userInfo.profile.competences.join(", ")}
              </li>
              <Link className="btn" to={`/chat/send-message/${userInfo._id}`}>
                envoyé un message
              </Link>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserInfoPage;
