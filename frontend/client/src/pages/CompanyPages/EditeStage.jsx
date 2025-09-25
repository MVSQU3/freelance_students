import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
  Trash2,
  Eye,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  FileText,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useStageStore } from "../../store/useStageStore";

const EditeStage = () => {
  const { getStageById, updateStage, stage } = useStageStore();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    isActive: "",
    duree: "",
    domain: "",
  });
  const { id } = useParams();
  useEffect(() => {
    const load = async () => {
      const stage = await getStageById(id);
      if (stage) {
        setForm((f) => ({ ...f, ...stage }));
      }
    };
    load();
  }, [getStageById, id]);
  console.log("stage => ", stage);

  // Données simulées pour le style seulement

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateStage(id, form);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <Link
                to="/company/stages"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux offres
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Modifier l'offre de stage
              </h1>
              <p className="text-gray-600">
                Mettez à jour les informations de votre offre de stage
              </p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Aperçu
              </button>
              <button className="btn btn-error flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          </div>

          {/* Bannière d'information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">
                  Offre publiée
                </h3>
                <p className="text-sm text-blue-700">
                  Cette offre est actuellement visible par les étudiants. Toute
                  modification sera mise à jour immédiatement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'édition */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section Informations générales */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                Informations générales
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">
                      Titre du stage *
                    </span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Entreprise *</span>
                  </label>
                  <input
                    name="company"
                    type="text"
                    defaultValue={stage.company?.companyName}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Localisation *
                    </span>
                  </label>
                  <input
                    name="location"
                    type="text"
                    value={form.location}
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Durée *
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={form.duree}
                    onChange={handleChange}
                  >
                    <option value={"3 mois"}>3 mois</option>
                    <option value={"4 mois"}>4 mois</option>
                    <option value={"5 mois"}>5 mois</option>
                    <option value={"6 mois"}>6 mois</option>
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Rémunération
                    </span>
                  </label>
                  <input
                    name="remuneration"
                    type="text"
                    value={form?.remuneration}
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Catégorie *
                    </span>
                  </label>
                  <select
                    name="domain"
                    className="select select-bordered w-full"
                    value={form.domain}
                    onChange={handleChange}
                  >
                    <option value={"Développement Web"}>
                      Développement Web
                    </option>
                    <option value={"Data Science"}>Data Science</option>
                    <option value={"Design UI/UX"}>Design UI/UX</option>
                    <option value={"Marketing Digital"}>
                      Marketing Digital
                    </option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date limite de candidature *
                    </span>
                  </label>
                  <input
                    name="duree"
                    type="text"
                    value={form.duree}
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">
                      Email de contact *
                    </span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form?.email}
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Section Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Description du poste
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Description du stage *
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-indigo-500"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Missions principales
                    </span>
                  </label>
                  <textarea
                    placeholder="Décrivez les missions que le stagiaire devra accomplir..."
                    className="textarea textarea-bordered w-full h-24"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Profil recherché *
                    </span>
                  </label>
                  <textarea
                    value={form?.neant}
                    className="textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Section Compétences */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Compétences recherchées
              </h2>

              {/* <div className="flex flex-wrap gap-2 mb-4">
                {.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-primary badge-lg flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div> */}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ajouter une compétence..."
                  className="input input-bordered flex-1"
                />
                <button type="button" className="btn btn-outline">
                  Ajouter
                </button>
              </div>
            </div>

            {/* Section Statut */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Statut de l'offre
              </h2>

              <div className="flex flex-wrap gap-4">
                {/* <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    className="radio radio-primary"
                    defaultChecked={stageData.status === "active"}
                  />
                  <span className="font-medium">
                    Active (visible par les étudiants)
                  </span>
                </label> */}

                {/* <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    className="radio radio-primary"
                    defaultChecked={stageData.status === "paused"}
                  />
                  <span className="font-medium">En pause (invisible)</span>
                </label> */}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Dernière modification : 15 janvier 2024
              </div>

              <div className="flex gap-3">
                <Link to="/company/my-stages" className="btn btn-ghost">
                  Annuler
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditeStage;
