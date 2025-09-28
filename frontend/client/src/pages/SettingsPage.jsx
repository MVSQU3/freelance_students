import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  User,
  Briefcase,
  Settings,
  LogOut,
  Bell,
  Shield,
  Mail,
  Globe,
  Eye,
  EyeOff,
  Save,
  Palette,
  LucidePieChart,
} from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const { logout, user } = useAuthStore();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    newsletter: false,
    privacyProfile: "public", // public, connections, private
    language: "fr",
    theme: "light",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    // Logique pour changer le mot de passe
    console.log("Changement de mot de passe", passwordData);
    setShowPasswordForm(false);
    setPasswordData({ current: "", new: "", confirm: "" });
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
              <Link
                to={"/student/me/profile"}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <User className="mr-3 h-5 w-5" />
                Profil
              </Link>
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
              <div className="w-full text-left px-4 py-3 rounded-lg flex items-center text-indigo-700 bg-indigo-50 font-medium">
                <Settings className="mr-3 h-5 w-5" />
                Paramètres
              </div>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Paramètres</h1>
          <p className="text-gray-600 mb-8">
            Personnalisez votre expérience et gérez vos préférences
          </p>

          <div className="space-y-6">
            {/* Section Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-indigo-600" />
                Notifications
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Notifications par email
                    </h3>
                    <p className="text-sm text-gray-600">
                      Recevez des emails pour les nouvelles offres et mises à
                      jour
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Alertes de stages
                    </h3>
                    <p className="text-sm text-gray-600">
                      Soyez alerté des nouvelles offres correspondant à votre
                      profil
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={settings.jobAlerts}
                    onChange={(e) =>
                      handleSettingChange("jobAlerts", e.target.checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Newsletter</h3>
                    <p className="text-sm text-gray-600">
                      Recevez nos actualités et conseils de carrière
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={settings.newsletter}
                    onChange={(e) =>
                      handleSettingChange("newsletter", e.target.checked)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Section Confidentialité */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                Confidentialité
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    Visibilité du profil
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      {
                        value: "public",
                        label: "Public",
                        desc: "Tout le monde peut voir votre profil",
                      },
                      {
                        value: "connections",
                        label: "Connections seulement",
                        desc: "Seulement vos contacts",
                      },
                      {
                        value: "private",
                        label: "Privé",
                        desc: "Seulement vous",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-start space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="privacy"
                          className="radio radio-primary mt-1"
                          value={option.value}
                          checked={settings.privacyProfile === option.value}
                          onChange={(e) =>
                            handleSettingChange(
                              "privacyProfile",
                              e.target.value
                            )
                          }
                        />
                        <div>
                          <span className="font-medium">{option.label}</span>
                          <p className="text-sm text-gray-600">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section Mot de passe */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-indigo-600" />
                Sécurité du compte
              </h2>

              {!showPasswordForm ? (
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => setShowPasswordForm(true)}
                >
                  Changer mon mot de passe
                </button>
              ) : (
                <form onSubmit={handleSavePassword} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Mot de passe actuel</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="input input-bordered w-full"
                        value={passwordData.current}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            current: e.target.value,
                          })
                        }
                        required
                      />
                      <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Nouveau mot de passe</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="input input-bordered w-full"
                        value={passwordData.new}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            new: e.target.value,
                          })
                        }
                        required
                      />
                      <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Confirmer le nouveau mot de passe
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="input input-bordered w-full"
                        value={passwordData.confirm}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirm: e.target.value,
                          })
                        }
                        required
                      />
                      <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setShowPasswordForm(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Section Préférences */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-indigo-600" />
                Préférences
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Langue</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingChange("language", e.target.value)
                    }
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Thème</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={settings.theme}
                    onChange={(e) =>
                      handleSettingChange("theme", e.target.value)
                    }
                  >
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                    <option value="auto">Automatique</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end">
              <button className="btn btn-primary">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
