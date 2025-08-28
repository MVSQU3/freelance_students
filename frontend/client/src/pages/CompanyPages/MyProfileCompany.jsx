import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCompanyStore } from "../../store/useCompanyStore";

const MyProfileCompany = () => {
  const { getMyProfile, myProfile, isCompanyLoading } = useCompanyStore();

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div>
      <Link to="/company/edit/profile" className="btn btn-success">
        Éditer mon profil
      </Link>
    </div>
  );
};

export default MyProfileCompany;
