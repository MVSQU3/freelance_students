import { useEffect, useState } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import { useUploadStore } from "../../store/useUploadStore";

const EditProfile = () => {
  const { getMyProfile, UpdateMyProfile, myProfile, isStudentLoading } =
    useStudentStore();
  const { uploadFile, isUploading, uploadProgress } = useUploadStore();
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadFile(file);

    if (url) {
      if (e.target.name === "pp") {
        setForm((f) => ({ ...f, photoUrl: url }));
      } else if (e.target.name === "cv") {
        setForm((f) => ({ ...f, cvUrl: url }));
      }
    }
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="visibility"
              checked={!!form.visibility}
              onChange={handleChange}
              className="checkbox"
            />
            <label className="label-text">Visible</label>
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
        <div className="flex flex-col gap-4">
          <div>
            <label className="label">
              <span className="label-text">Photo de profil</span>
            </label>
            <input
              type="file"
              accept="image/*"
              name="pp"
              onChange={handleFileChange}
            />
            {form.photoUrl && (
              <img
                src={form.photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full mt-2"
              />
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">CV (PDF)</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              name="cv"
              onChange={handleFileChange}
            />
            {form.cvUrl && (
              <a
                href={form.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary mt-2"
              >
                Voir mon CV
              </a>
            )}
          </div>

          {isUploading && (
            <progress
              className="progress progress-primary w-full"
              value={uploadProgress}
              max="100"
            ></progress>
          )}
        </div>

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
