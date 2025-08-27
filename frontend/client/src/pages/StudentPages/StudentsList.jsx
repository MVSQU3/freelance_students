import { useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";

const StudentsList = () => {
  const { getAllStudents, isStudentLoading } = useStudentStore();

  useEffect(() => {
    getAllStudents();
  }, []);
  return <div>StudentsList</div>;
};

export default StudentsList;
