import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCompanyStore } from "../../store/useCompanyStore";
import { useAuthStore } from "../../store/useAuthStore";

const MyProfileCompany = () => {
  const { getMyProfile, myProfile, isCompanyLoading } = useCompanyStore();
  const { logout } = useAuthStore();
  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <>
      <div className="flex gap-5">
        <Link to="/company/edit/profile" className="btn btn-success">
          Éditer mon profil
        </Link>
        <Link to="/logout" className="btn btn-success" onClick={logout}>
          Se déconnecter
        </Link>
      </div>
    </>
  );
};

export default MyProfileCompany;
