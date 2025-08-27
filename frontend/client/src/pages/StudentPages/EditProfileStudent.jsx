import { useEffect, useState } from "react";
import { useStudentStore } from "../../store/useStudentStore";

const EditProfile = () => {
  const { getMyProfile, UpdateMyProfile, myProfile, isStudentLoading } =
    useStudentStore();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    school: "",
    level: "",
    fieldOfStudy: "",
    location: "",
    availability: "",
    visibility: true,
    bio: "",
    photoUrl: "" || undefined,
    cvUrl: "" || undefined,
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const load = async () => {
      const profile = await getMyProfile();
      if (profile) {
        setForm((f) => ({ ...f, ...profile }));
      }
    };
    load();
  }, [getMyProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const updated = await UpdateMyProfile(form);
    if (updated) setMessage({ type: "success", text: "Profil mis à jour" });
    else setMessage({ type: "error", text: "Erreur lors de la mise à jour" });
  };

  if (isStudentLoading && !myProfile) return <div>Chargement...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Éditer mon profil</h2>
      {message && (
        <div
          className={`p-2 mb-4 ${
            message.type === "success" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="firstName"
          value={form.firstName || ""}
          onChange={handleChange}
          placeholder="Prénom"
        />
        <input
          name="lastName"
          value={form.lastName || ""}
          onChange={handleChange}
          placeholder="Nom"
        />
        <input
          name="school"
          value={form.school || ""}
          onChange={handleChange}
          placeholder="École"
        />
        <input
          name="level"
          value={form.level || ""}
          onChange={handleChange}
          placeholder="Niveau"
        />
        <input
          name="fieldOfStudy"
          value={form.fieldOfStudy || ""}
          onChange={handleChange}
          placeholder="Filière"
        />
        <input
          name="location"
          value={form.location || ""}
          onChange={handleChange}
          placeholder="Localisation"
        />
        <input
          name="availability"
          value={form.availability || ""}
          onChange={handleChange}
          placeholder="Disponibilités"
        />
        <label>
          <input
            type="checkbox"
            name="visibility"
            checked={!!form.visibility}
            onChange={handleChange}
          />{" "}
          Visible
        </label>
        <textarea
          name="bio"
          value={form.bio || ""}
          onChange={handleChange}
          placeholder="Bio"
        />
        <input
          name="photoUrl"
          value={form.photoUrl || ""}
          onChange={handleChange}
          placeholder="URL photo"
        />
        <input
          name="cvUrl"
          value={form.cvUrl || ""}
          onChange={handleChange}
          placeholder="URL CV"
        />

        <div>
          <button
            type="submit"
            disabled={isStudentLoading}
            className="btn btn-primary"
          >
            {isStudentLoading ? "En cours..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
