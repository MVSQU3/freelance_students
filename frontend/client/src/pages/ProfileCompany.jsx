import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useCompanyStore } from "../store/useCompanyStore";
import { Link } from "react-router-dom";

const ProfileCompany = () => {
  const { getCompanyProfile, isLoadingCompanyProfile } = useCompanyStore();

  const id = 1;
  useEffect(() => {
    getCompanyProfile(id);
  }, [getCompanyProfile, id]);

  if (isLoadingCompanyProfile) {
    return <Loader className="w-5 h-5" />;
  }

  return (
    <>
      <Link to="/" className="btn btn-accent">
        Home
      </Link>
    </>
  );
};

export default ProfileCompany;
