import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";

const Home = () => {
  const { getAllStudents } = useStudentStore();
  const { logout } = useAuthStore();
  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <div>
        <p>Welcome to the home page!</p>
        <Link to="/dashboard-student" className="btn btn-primary">
          My Dashboard
        </Link>
      </div>
      <button onClick={logout} className="btn btn-error">
        Logout
      </button>
    </div>
  );
};

export default Home;
