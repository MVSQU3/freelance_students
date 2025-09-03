import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, KeyRound, User } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoginLoading } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData).then((user) => {
      if (user && user.role === "student") navigate("/student/me/profile");
      else if (user && user.role === "company") navigate("/");
    });
  };

  return (
    <>
      <section
        onSubmit={handleSubmit}
        className="flex bg-base-100 items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8"
      >
        <div className="card w-full max-w-md shadow-md bg-base-100">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold text-base-content">
              Se connecter
            </h2>
            <p className="mt-2 text-center text-sm text-base-content/70">
              Vous n'avez pas de compte?{" "}
              <Link to={"/register"} className="link link-hover font-semibold">
                Créer un compte gratuit
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email address</span>
                </label>
                <div className="join w-full">
                  <span className="join-item flex items-center px-3 bg-base-200 rounded-l-md">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered join-item w-full"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <div className="flex items-center justify-between">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <a href="#" className="link text-sm font-semibold">
                    Forgot password?
                  </a>
                </div>
                <div className="join w-full">
                  <span className="join-item flex items-center px-3 bg-base-200 rounded-l-md">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered join-item w-full"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="btn btn-neutral w-full"
                disabled={isLoginLoading}
              >
                <KeyRound size={18} className="mr-2" />
                {isLoginLoading ? "Loading..." : "Get started"}
              </button>
            </form>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Google Sign in */}
            <button type="button" className="btn btn-outline w-full">
              <User size={18} className="mr-2 text-rose-500" />
              Sign in with Google
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
