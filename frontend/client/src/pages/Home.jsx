import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Home = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div>
      <div>
        <p>Welcome to the home page! is Connected {authUser.role} </p>
      </div>
      <div className="flex justify-evenly">
        <button onClick={logout} className="btn btn-error">
          Logout
        </button>
        <Link to="/stages" className="btn btn-secondary">
          voir les offres de stages
        </Link>
      </div>
    </div>
  );
};

export default Home;
