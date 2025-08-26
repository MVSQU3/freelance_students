import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useStudentStore } from "../store/useStudentStore";
import { Link } from "react-router-dom";

const ProfileStudent = () => {
  const { getProfileStudent, isGetProfileStudent } = useStudentStore();
  const id = 2;

  useEffect(() => {
    getProfileStudent(id);
  }, [getProfileStudent, id]);

  if (isGetProfileStudent) {
    return (
      <div>
        <Loader className="w-5 h-5" />
      </div>
    );
  }
  return (
    <div>
      <h1>Profile Student Page</h1>
      <Link to={"/"} className="btn btn-info">
        Home
      </Link>
    </div>
  );
};

export default ProfileStudent;
