import { useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const MyProfileStudent = () => {
  const { getMyProfile } = useStudentStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return (
    <>
      <div className="flex gap-5">
        <Link to="/student/edit/profile" className="btn btn-success">
          Éditer mon profil
        </Link>
        <Link className="btn btn-success" onClick={logout}>
          Se déconnecter
        </Link>
      </div>
    </>
  );
};

export default MyProfileStudent;
