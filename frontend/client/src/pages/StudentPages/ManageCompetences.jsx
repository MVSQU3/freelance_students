import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  X,
  BookOpen,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useStudentStore } from "../../store/useStudentStore";

const ManageCompetences = () => {
  const { getMySkills, addSkill, removeSkill, skills } = useStudentStore();
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    getMySkills();
  }, []);

  console.log("skills =>", skills);

  const handleAddSkill = (skill, e) => {
    e.preventDefault();
    if (skills.MySkills.length >= 20) return; // limite 20 compétences
    addSkill(skill); // ajout et mise à jour automatique dans le store
  };

  const handleRemoveSkill = (skill, e) => {
    e.preventDefault();
    if (skills.MySkills.length <= 0) return;
    removeSkill(skill);
  };

  const popularSkills = ["React", "Python", "JavaScript", "Docker", "AWS"];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <Link
            to="/student/me/profile"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au profil
          </Link>

          <div className="text-center mb-8">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Gérer mes compétences
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ajoutez les compétences qui correspondent à votre profil. Cela
              aide les recruteurs à mieux vous trouver.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Gestion des compétences */}
          <div className="lg:col-span-2">
            {/* Compétences sélectionnées */}
            {/* Compétences sélectionnées */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Mes compétences (
                {skills.CountMySkills ? skills.CountMySkills : 0}/20)
              </h2>

              {Array.isArray(skills.MySkills) && skills.MySkills.length > 0 ? (
                <div className="flex flex-wrap gap-3 mb-4">
                  {skills.MySkills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary badge-lg flex items-center gap-1"
                    >
                      {skill.name}
                      <button
                        className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                        onClick={(e) => handleRemoveSkill(skill.name, e)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucune compétence sélectionnée</p>
                </div>
              )}

              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm">Tout supprimer</button>
                <button className="btn btn-primary btn-sm ml-auto">
                  Enregistrer les modifications
                </button>
              </div>
            </div>

            {/* Liste des compétences disponibles */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Ajouter des compétences
              </h2>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher une compétence..."
                  className="input input-bordered pl-10 w-full"
                />
              </div>

              <div className="max-h-64 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Array.isArray(skills.AllSkills) &&
                  skills.AllSkills.length > 0 ? (
                    skills.AllSkills.map((skill) => {
                      const isSelected = skills.MySkills?.some(
                        (s) => s.id === skill.id
                      );
                      return (
                        <button
                          key={skill.id}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                            isSelected
                              ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                          onClick={(e) => handleAddSkill(skill.name, e)}
                        >
                          <span className="font-medium">{skill.name}</span>
                          {isSelected ? (
                            <CheckCircle className="w-4 h-4 text-indigo-600" />
                          ) : (
                            <Plus className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Colonne latérale - Conseils et statistiques */}
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">
                Votre progression
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Compétences ajoutées</span>
                  <span className="font-bold text-indigo-600">
                    {skills.CountMySkills}/20
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${
                      skills.CountMySkills === 20
                        ? "bg-red-600 h-2 rounded-full transition-all"
                        : "bg-indigo-600 h-2 rounded-full transition-all"
                    }  `}
                    style={{
                      width: `${
                        (Array.isArray(skills.MySkills) &&
                          skills.MySkills.length / 20) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Profil complet à 85%</span>
                </div>
              </div>
            </div>

            {/* Compétences populaires */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Compétences populaires
              </h3>
              <div className="space-y-2">
                {popularSkills.map((skill, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded"
                  >
                    <span className="text-sm">{skill}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      +25%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Conseils */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-3">Conseils</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Ajoutez 5-10 compétences principales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Mélangez compétences techniques et soft skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Priorisez vos expertises principales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Mettez à jour régulièrement</span>
                </li>
              </ul>
            </div>

            {/* Impact sur le profil */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-2">Impact</h3>
              <p className="text-sm text-green-700">
                Les profils avec 5+ compétences reçoivent{" "}
                <strong>3x plus</strong> de vues de la part des recruteurs.
              </p>
            </div>
          </div>
        </div>

        {/* Actions finales */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <Link to="/student/me/profile" className="btn btn-ghost">
            Annuler
          </Link>
          <button className="btn btn-primary flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Enregistrer les compétences
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCompetences;
