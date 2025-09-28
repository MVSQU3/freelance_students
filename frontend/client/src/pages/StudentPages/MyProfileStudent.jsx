import { Link } from "react-router-dom";
import {
  User,
  Briefcase,
  Settings,
  LogOut,
  Calendar,
  MapPin,
  Mail,
  Award,
  BookOpen,
  ChevronRight,
  Camera,
  LucidePieChart,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useStudentStore } from "../../store/useStudentStore";
import { useEffect, useRef, useState } from "react";
import { useUploadStore } from "../../store/useUploadStore";

const StudentDashboard = () => {
  const fileInputRef = useRef(null);
  const { logout } = useAuthStore();
  const { getMyProfile, UpdateMyProfile, myProfile, stats } = useStudentStore();
  const { uploadPp } = useUploadStore();

  useEffect(() => {
    getMyProfile();
  }, []);

  console.log(stats);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // 1. Upload de la photo
      const result = await uploadPp(file);

      if (result && result.publicUrl) {
        console.log("Photo uploadée :", result.publicUrl);

        // 2. Mise à jour du profil avec la nouvelle photo
        await UpdateMyProfile({
          ...myProfile,
          photoUrl: result.publicUrl,
        });

        // 3. Recharge le profil pour voir le changement
        getMyProfile();
      } else {
        console.error("Erreur lors de l'upload");
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center">
            <User className="mr-2 h-6 w-6" />
            Mon compte
          </h2>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left px-4 py-3 rounded-lg flex items-center text-indigo-700 bg-indigo-50 font-medium">
                <User className="mr-3 h-5 w-5" />
                Profil
              </button>
            </li>
            <li>
              <Link
                to={"/student/my-apply"}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Mes candidatures
              </Link>
            </li>
            <li>
              <Link
                to={"/student/stats"}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <LucidePieChart className="mr-3 h-5 w-5" />
                Données
              </Link>
            </li>
            <li>
              <Link
                to={"/settings"}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Settings className="mr-3 h-5 w-5" />
                Paramètres
              </Link>
            </li>
          </ul>
        </nav>

        <div className="pt-4 border-t border-gray-200">
          <button
            className="w-full text-left px-4 py-3 rounded-lg flex items-center text-red-600 hover:bg-red-50 transition-colors"
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil</h1>
          <p className="text-gray-600 mb-8">
            Gérez vos informations personnelles et préférences
          </p>

          {/* Carte de profil */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="relative group mr-4">
                <div
                  className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer group-hover:bg-indigo-200 transition-colors"
                  onClick={handleAvatarClick}
                >
                  {myProfile?.photoUrl ? (
                    <img
                      src={myProfile?.photoUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-indigo-600" />
                  )}

                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />

                {/* Badge de modification */}
                <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1">
                  <Camera className="h-3 w-3 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {myProfile?.lastName} {myProfile?.firstName}
                </h2>
                <p className="text-gray-500 flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {myProfile?.school} - {myProfile?.level}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Disponibilité</p>
                  <p className="font-medium">{myProfile?.availability}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Localisation</p>
                  <p className="font-medium">{myProfile?.location}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{myProfile?.email}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Award className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Niveau</p>
                  <p className="font-medium">{myProfile?.level}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                Compétences
                <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {Array.isArray(myProfile?.skills)
                    ? myProfile?.skills.length
                    : 0}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(myProfile?.skills)
                  ? myProfile?.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge bg-indigo-100 text-indigo-700 border-0 px-3 py-2"
                      >
                        {skill.name}
                      </span>
                    ))
                  : []}
                <Link
                  to={"/student/add/competences"}
                  className="text-indigo-600 text-sm flex items-center hover:underline"
                >
                  Ajouter une compétence{" "}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Section statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">Candidatures</h3>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mt-3">{stats.candidatures}</p>
              <p className="text-sm text-gray-500">
                {stats.candidaturePending} en attente
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">Entretiens</h3>
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mt-3">3</p>
              <p className="text-sm text-gray-500">2 cette semaine</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">Profil complété</h3>
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mt-3">85%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">
              Actions rapides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to={"/student/edit/profile/"}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors"
              >
                <span>Éditer mon profil</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                to={"/stages"}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors"
              >
                <span>Voir les offres de stage</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
