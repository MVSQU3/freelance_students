import axios from "axios";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const payload = {
      nom: data.nom,
      prenom: data.prenom,
      age: parseInt(data.age),
      numero: data.numero,
      email: data.email,
      password: data.password,
      compte: data.compte,
      profile: {
        competences: data.competences.split(",").map((c) => c.trim()),
        bio: data.bio,
        tarif: parseInt(data.tarif),
      },
    };

    axios
      .post("http://localhost:3000/api/auth/register", payload)
      .then((res) => {
        console.log("Envoyé :", res.data);
        alert("Inscription réussie !");
        reset();
      })
      .catch((err) => {
        console.error("Erreur :", err);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2 mb-2">
        <span className="w-4 h-4 rounded-full bg-blue-500"></span> Register
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Signup now and get full access to our app.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nom & Prénom */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nom"
            {...register("nom")}
            className="w-1/2 border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            {...register("prenom")}
            className="w-1/2 border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
          />
        </div>

        {/* Age & Numéro */}
        <div className="flex gap-2">
          <input
            type="number"
            name="age"
            placeholder="Âge"
            {...register("age")}
            className="w-1/2 border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
          />
          <input
            type="tel"
            name="numero"
            placeholder="Numéro de téléphone"
            {...register("numero")}
            className="w-1/2 border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
          />
        </div>

        {/* Email & Password */}
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          {...register("email")}
          className="w-full border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          {...register("password")}
          className="w-full border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
        />

        {/* Type de compte */}
        <select
          name="compte"

          {...register("compte")}
          className="w-full border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
          required
        >
          <option value="">Type de compte</option>
          <option value="freelance" className="text-gray-400">Freelance</option>
          <option value="client" className="text-gray-400">Client</option>
        </select>

        {/* Bio */}
        <textarea
          name="bio"
          placeholder="Courte biographie"
          rows={3}
          {...register("bio")}
          className="w-full border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
        />

        {/* Compétences */}
        <input
          type="text"
          name="competences"
          placeholder="Compétences (ex : JS, React...)"
          {...register("competences")}
          className="w-full border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
        />

        {/* Tarif */}
        <input
          type="number"
          name="tarif"
          placeholder="Tarif (€/h)"
          {...register("tarif")}
          className="w-full border rounded px-3 py-2 text-sm placeholder-gray-400 text-gray-800"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Signin
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
