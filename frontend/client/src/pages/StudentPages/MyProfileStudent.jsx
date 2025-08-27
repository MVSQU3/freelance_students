import { useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import { Link } from "react-router-dom";

const MyProfileStudent = () => {
  const { getMyProfile } = useStudentStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return (
    <div>
      <Link to="/student/edite/profile" className="btn btn-success">
        Éditer mon profil
      </Link>
    </div>
  );
};

export default MyProfileStudent;
