import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/useCompanyStore";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Building,
  MapPin,
  Globe,
  Phone,
  Mail,
  ArrowLeft,
  Save,
  Upload,
  X,
  Eye,
  EyeOff,
  Building2,
} from "lucide-react";
import { useUploadStore } from "../../store/useUploadStore";

const EditProfileCompany = () => {
  const { updateMyProfile, getMyProfile, myProfile, isCompanyLoading } =
    useCompanyStore();
  const { uploadPp } = useUploadStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [ppFile, setPpFile] = useState(null);
  const [form, setForm] = useState({
    companyName: "",
    sector: "",
    location: "",
    website: "",
    photoUrl: "",
    description: "",
  });

  const [logoPreview, setLogoPreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const load = async () => {
      const profile = await getMyProfile();
      if (profile) {
        setForm((f) => ({ ...f, ...profile }));
      }
      if (profile?.photoUrl) {
        setLogoPreview(profile.photoUrl);
      }
      console.log("profile récupéré :", profile);
    };
    load();
  }, [getMyProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const removeLogo = () => {
    setLogoPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = form.photoUrl;
    if (ppFile) {
      const result = await uploadPp(ppFile);
      if (result && result.publicUrl) {
        photoUrl = result.publicUrl;
      }
    }

    setLogoPreview(photoUrl);

    const success = await updateMyProfile({
      ...form,
      photoUrl,
    });

    if (success) {
      navigate("/company/profile");
    }
  };

  const sectors = [
    "Informatique",
    "Marketing",
    "Finance",
    "Santé",
    "Éducation",
    "Construction",
    "Transport",
    "Commerce",
    "Restauration",
    "Tourisme",
    "Énergie",
    "Télécommunications",
    "Agriculture",
    "Industrie",
    "Services",
  ];

  if (isCompanyLoading && !myProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 relative">
        <div className="absolute top-6 left-6">
          <Link
            to="/company/me/profile"
            className="btn btn-white bg-white/20 hover:bg-white/30 text-white border-none rounded-full px-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au profil
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-12 -mt-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Carte principale */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Colonne gauche - Logo */}
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">
                    Logo de l'entreprise
                  </h3>

                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <Building2 className="w-12 h-12 text-indigo-400" />
                      )}
                    </div>

                    <div className="flex gap-2">
                      <label className="btn btn-outline btn-sm cursor-pointer gap-2">
                        <Upload className="w-4 h-4" />
                        Choisir une image
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setPpFile(file);
                              setLogoPreview(URL.createObjectURL(file)); // <-- génère la preview
                            }
                          }}
                        />{" "}
                      </label>

                      {logoPreview && (
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="btn btn-error btn-sm gap-2"
                        >
                          <X className="w-4 h-4" />
                          Supprimer
                        </button>
                      )}
                    </div>

                    {errors.logo && (
                      <p className="text-error text-sm">{errors.logo}</p>
                    )}

                    <p className="text-xs text-gray-500 text-center">
                      PNG, JPG max. 5MB. Format carré recommandé.
                    </p>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Informations */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informations de base */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Informations de base
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Nom de l'entreprise *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        className={`input input-bordered ${
                          errors.companyName ? "input-error" : ""
                        }`}
                        placeholder="Ex: TechCorp"
                      />
                      {errors.companyName && (
                        <span className="text-error text-sm mt-1">
                          {errors.companyName}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Secteur d'activité *</span>
                      </label>
                      <select
                        name="sector"
                        value={form.sector}
                        onChange={handleChange}
                        className={`select select-bordered ${
                          errors.sector ? "select-error" : ""
                        }`}
                      >
                        <option value="">Sélectionnez un secteur</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </select>
                      {errors.sector && (
                        <span className="text-error text-sm mt-1">
                          {errors.sector}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Localisation *</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className={`input input-bordered ${
                          errors.location ? "input-error" : ""
                        }`}
                        placeholder="Ex: Abidjan, Côte d'Ivoire"
                      />
                      {errors.location && (
                        <span className="text-error text-sm mt-1">
                          {errors.location}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Site web</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="url"
                          name="website"
                          value={form.website}
                          onChange={handleChange}
                          className={`input input-bordered pl-10 w-full ${
                            errors.website ? "input-error" : ""
                          }`}
                          placeholder="https://example.com"
                        />
                      </div>
                      {errors.website && (
                        <span className="text-error text-sm mt-1">
                          {errors.website}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Téléphone</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="input input-bordered pl-10 w-full"
                          placeholder="+225 00 00 00 00"
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="email"
                          value={authUser?.email || ""}
                          className="input input-bordered pl-10 w-full bg-gray-50"
                          disabled
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        L'email ne peut pas être modifié ici
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informations supplémentaires */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Informations supplémentaires
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nombre d'employés</span>
                      </label>
                      <input
                        type="number"
                        name="employeesCount"
                        value={form.employeesCount}
                        onChange={handleChange}
                        min="0"
                        className={`input input-bordered ${
                          errors.employeesCount ? "input-error" : ""
                        }`}
                        placeholder="Ex: 50"
                      />
                      {errors.employeesCount && (
                        <span className="text-error text-sm mt-1">
                          {errors.employeesCount}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Année de création</span>
                      </label>
                      <input
                        type="number"
                        name="foundedYear"
                        value={form.foundedYear}
                        onChange={handleChange}
                        min="1900"
                        max={new Date().getFullYear()}
                        className="input input-bordered"
                        placeholder="Ex: 2010"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Description de l'entreprise
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    className="textarea textarea-bordered"
                    placeholder="Décrivez votre entreprise, sa mission, ses valeurs, ses activités..."
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    {form.description.length}/500 caractères
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link to="/company/profile" className="btn btn-outline px-8">
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isCompanyLoading}
              className="btn btn-primary px-8 gap-2"
            >
              <Save className="w-4 h-4" />
              {isCompanyLoading
                ? "Mise à jour..."
                : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileCompany;
