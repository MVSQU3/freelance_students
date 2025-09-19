import { useEffect, useState } from "react";
import {
  User,
  Upload,
  Save,
  BookOpen,
  MapPin,
  FileText,
  Briefcase,
} from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Éditer mon profil
          </h2>
          <p className="text-gray-600">
            Mettez à jour vos informations personnelles et professionnelles
          </p>
        </div>

        {/* Message d'alerte */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            <span>{message.text}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 space-y-8 border border-gray-200"
        >
          {/* Section Informations personnelles */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Informations personnelles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Prénom</span>
                </label>
                <input
                  name="firstName"
                  value={form.firstName || ""}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Nom</span>
                </label>
                <input
                  name="lastName"
                  value={form.lastName || ""}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section Formation */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Formation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">École</span>
                </label>
                <input
                  name="school"
                  value={form.school || ""}
                  onChange={handleChange}
                  placeholder="Nom de votre école"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Niveau</span>
                </label>
                <input
                  name="level"
                  value={form.level || ""}
                  onChange={handleChange}
                  placeholder="Ex: Licence 3, Master 2"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Filière</span>
                </label>
                <input
                  name="fieldOfStudy"
                  value={form.fieldOfStudy || ""}
                  onChange={handleChange}
                  placeholder="Votre domaine d'étude"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section Localisation */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              Localisation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Localisation</span>
                </label>
                <input
                  name="location"
                  value={form.location || ""}
                  onChange={handleChange}
                  placeholder="Ville, région"
                  className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Disponibilité</span>
                </label>
                <select
                  name="availability"
                  value={form.availability || ""}
                  onChange={handleChange}
                  className="select select-bordered w-full focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="disponible">Disponible</option>
                  <option value="indisponible">Indisponible</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Bio */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              Présentation
            </h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Bio</span>
              </label>
              <textarea
                name="bio"
                value={form.bio || ""}
                onChange={handleChange}
                placeholder="Parlez-nous de vous, de vos compétences et de vos aspirations professionnelles..."
                className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              <label className="label">
                <span className="label-text-alt">Maximum 500 caractères</span>
              </label>
            </div>
          </div>

          {/* Section Fichiers */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">CV (PDF)</span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Cliquer pour uploader
                    </span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setCvFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
                {cvFile && (
                  <p className="text-sm text-green-600 mt-2">✓ {cvFile.name}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Photo de profil
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Cliquer pour uploader
                    </span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => setPpFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
                {ppFile && (
                  <p className="text-sm text-green-600 mt-2">✓ {ppFile.name}</p>
                )}
              </div>
            </div>

            {/* Barre de progression */}
            {uploadProgress > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Upload en cours...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={uploadProgress}
                  max="100"
                ></progress>
              </div>
            )}

            {lastUploadError && (
              <p className="text-red-500 text-sm mt-2">{lastUploadError}</p>
            )}
          </div>

          {/* Bouton de soumission */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isStudentLoading}
              className="btn btn-primary min-w-[120px] flex items-center gap-2"
            >
              {isStudentLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isStudentLoading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
