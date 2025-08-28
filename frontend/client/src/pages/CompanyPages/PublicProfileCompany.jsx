import { useEffect } from "react";

const PublicProfileCompany = () => {
  const { getCompanyById, myProfile, isCompanyLoading } = useCompanyStore();

  useEffect(() => {
    getCompanyById();
  }, []);
  return <div>PublicProfileCompany</div>;
};

export default PublicProfileCompany;
