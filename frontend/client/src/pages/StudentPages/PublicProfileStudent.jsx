import { useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";

const PublicProfileStudent = () => {
  const { getStudentById } = useStudentStore();
  const id = 1;

  useEffect(() => {
    getStudentById(id);
  }, []);
  return <div>PublicProfileStudent</div>;
};

export default PublicProfileStudent;
