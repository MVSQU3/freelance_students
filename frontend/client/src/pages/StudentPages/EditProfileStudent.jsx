import { useEffect, useState } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import { useUploadStore } from "../../store/useUploadStore";
import { useAuthStore } from "../../store/useAuthStore";

const EditProfile = () => {
  const { authUser } = useAuthStore();
  const { getMyProfile, UpdateMyProfile, myProfile, isStudentLoading } =
    useStudentStore();
  const { uploadCv, uploadPp, uploadProgress, lastUploadError } =
    useUploadStore();
  const [cvFile, setCvFile] = useState(null);
  const [ppFile, setPpFile] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    school: "",
    level: "",
    fieldOfStudy: "",
    location: "",
    availability: "",
    is_public: "",
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

    let cvUrl = form.cvUrl;
    let photoUrl = form.photoUrl;
    if (cvFile) {
      const result = await uploadCv(cvFile);
      if (result && result.publicUrl) {
        cvUrl = result.publicUrl;
      } else {
        setMessage({ type: "error", text: "Erreur lors de l'upload du CV" });
        return;
      }
    }
    if (ppFile) {
      const result = await uploadPp(ppFile);
      if (result && result.publicUrl) {
        photoUrl = result.publicUrl;
      } else {
        setMessage({
          type: "error",
          text: "Erreur lors de l'upload de la photo de profil",
        });
        return;
      }
    }

    const updatedForm = { ...form, cvUrl, photoUrl };
    const updated = await UpdateMyProfile(updatedForm);

    if (updated) setMessage({ type: "success", text: "Profil mis à jour" });
    else setMessage({ type: "error", text: "Erreur lors de la mise à jour" });
  };

  if (isStudentLoading && !myProfile) return <div>Chargement...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold">Éditer mon profil</h2>
        <p className="text-sm text-gray-500">
          Mettez à jour vos informations et fichiers
        </p>
      </div>

      {message && (
        <div
          className={`mb-4 alert ${
            message.type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          <span>{message.text}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow-md rounded-lg p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Prénom</span>
            </label>
            <input
              name="firstName"
              value={form.firstName || ""}
              onChange={handleChange}
              placeholder="Prénom"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              name="lastName"
              value={form.lastName || ""}
              onChange={handleChange}
              placeholder="Nom"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">École</span>
            </label>
            <input
              name="school"
              value={form.school || ""}
              onChange={handleChange}
              placeholder="École"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Niveau</span>
            </label>
            <input
              name="level"
              value={form.level || ""}
              onChange={handleChange}
              placeholder="Niveau"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Filière</span>
            </label>
            <input
              name="fieldOfStudy"
              value={form.fieldOfStudy || ""}
              onChange={handleChange}
              placeholder="Filière"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Localisation</span>
            </label>
            <input
              name="location"
              value={form.location || ""}
              onChange={handleChange}
              placeholder="Localisation"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Disponibilités</span>
            </label>
            <input
              name="availability"
              value={form.availability || ""}
              onChange={handleChange}
              placeholder="Disponibilités"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <select
              value={form.is_public || ""}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Oui">Public</option>
              <option value="Non">Privé</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            name="bio"
            value={form.bio || ""}
            onChange={handleChange}
            placeholder="Bio"
            className="textarea textarea-bordered w-full h-28"
          ></textarea>
        </div>
        <div>
          <label className="label">
            <span className="label-text">CV (PDF)</span>
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCvFile(e.target.files[0])}
            className="input input-bordered"
          />
          {uploadProgress > 0 && <p>Progression : {uploadProgress}%</p>}
          {lastUploadError && <p className="text-red-500">{lastUploadError}</p>}
        </div>
        {authUser && (
          <div>
            <label className="label">
              <span className="label-text">Photo de profil (PNG, JPG)</span>
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => setPpFile(e.target.files[0])}
              className="input input-bordered"
            />
            {uploadProgress > 0 && <p>Progression : {uploadProgress}%</p>}
            {lastUploadError && (
              <p className="text-red-500">{lastUploadError}</p>
            )}
          </div>
        )}
        <div className="flex justify-end">
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
