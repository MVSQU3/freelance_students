import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../components/AuthContext";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { setUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        payload
      );
      console.log("Envoyé :", res.data);
      if (res.data.message) {
        alert(res.data.message);
      }
      const token = res.data.token;

      token
        ? localStorage.setItem("JWT", token)
        : alert("Erreur d'authentification");
      setUser({ token });

      reset();
    } catch (error) {
      console.log("Erreur: ", error);
      if (error.response.status === 401) {
        console.log("hello");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
