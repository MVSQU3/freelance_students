import React, { useState } from "react";
import {
  Plus,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  FileText,
  X,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const CreateStage = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    salary: "",
    description: "",
    requirements: "",
    skills: [],
    category: "",
    contactEmail: "",
    applicationDeadline: "",
  });

  const [newSkill, setNewSkill] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Offre de stage créée:", formData);
    // Ici vous ajouterez la logique pour envoyer les données à votre API
  };

  const categories = [
    "Développement Web",
    "Data Science",
    "Design UI/UX",
    "Marketing Digital",
    "Communication",
    "Finance",
    "Ressources Humaines",
    "Commerce",
    "Ingénierie",
    "Recherche",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <Link
            to="/company/stages"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux offres
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Plus className="w-8 h-8 text-indigo-600" />
            Publier une nouvelle offre de stage
          </h1>
          <p className="text-gray-600">
            Remplissez les informations ci-dessous pour créer votre offre de
            stage
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Titre du stage */}
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Titre du stage *
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Stage en Développement Frontend"
                className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Entreprise */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Entreprise *</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Nom de votre entreprise"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Localisation */}
            <div>
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Localisation *
                </span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ex: Paris, Remote, Abidjan"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Durée */}
            <div>
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Durée *
                </span>
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Sélectionnez une durée</option>
                <option value="1 mois">1 mois</option>
                <option value="2 mois">2 mois</option>
                <option value="3 mois">3 mois</option>
                <option value="4 mois">4 mois</option>
                <option value="5 mois">5 mois</option>
                <option value="6 mois">6 mois</option>
              </select>
            </div>

            {/* Rémunération */}
            <div>
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Rémunération
                </span>
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Ex: 800€/mois, Gratification légale"
                className="input input-bordered w-full"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Catégorie *
                </span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date limite de candidature */}
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">
                  Date limite de candidature *
                </span>
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email de contact */}
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">
                  Email de contact *
                </span>
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="contact@entreprise.com"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description du stage *
              </span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez les missions principales, les objectifs du stage, l'environnement de travail..."
              className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Compétences requises */}
          <div className="mb-6">
            <label className="label">
              <span className="label-text font-medium">
                Compétences requises
              </span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Ajouter une compétence"
                className="input input-bordered flex-1"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                }
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn btn-outline btn-primary"
              >
                Ajouter
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-primary badge-lg flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Exigences */}
          <div className="mb-6">
            <label className="label">
              <span className="label-text font-medium">
                Exigences et prérequis
              </span>
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="Niveau d'études requis, compétences spécifiques, qualités attendues..."
              className="textarea textarea-bordered w-full h-24"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link to="/stages" className="btn btn-ghost">
              Annuler
            </Link>
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Publier l'offre
            </button>
          </div>
        </form>

        {/* Informations supplémentaires */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">
            Conseils pour une bonne offre
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Soyez précis dans la description des missions</li>
            <li>• Mentionnez les technologies et outils utilisés</li>
            <li>
              • Précisez les avantages (télétravail, tickets restaurant, etc.)
            </li>
            <li>• Indiquez clairement le processus de recrutement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateStage;
