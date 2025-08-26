import { useEffect } from "react";
import { useStudentStore } from "../store/useStudentStore";
import { Link } from "react-router-dom";

const DashboardStudent = () => {
  const { getDashboardStudent } = useStudentStore();

  useEffect(() => {
    getDashboardStudent();
  }, []);
  
  return (
    <div>
      <h1>DashboardStudent</h1>
      <Link to={"/"} className="btn btn-info">
        Home
      </Link>
    </div>
  );
};

export default DashboardStudent;
