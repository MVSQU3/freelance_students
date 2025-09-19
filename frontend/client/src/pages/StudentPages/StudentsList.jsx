import { useEffect, useState } from "react";
import { useStudentStore } from "../../store/useStudentStore";
import StudentCard from "../../components/StudentCard";
import { Search, MapPin, BookOpen, Filter, X } from "lucide-react";

const StudentsList = () => {
  const { getAllStudents, isStudentLoading, students } = useStudentStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getAllStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.skill?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      !locationFilter ||
      student.location?.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesSchool =
      !schoolFilter ||
      student.school?.toLowerCase().includes(schoolFilter.toLowerCase());
    const matchesSkill =
      !skillFilter ||
      student.skill?.toLowerCase().includes(skillFilter.toLowerCase());

    return matchesSearch && matchesLocation && matchesSchool && matchesSkill;
  });

  const clearFilters = () => {
    setLocationFilter("");
    setSchoolFilter("");
    setSkillFilter("");
  };

  const hasActiveFilters = locationFilter || schoolFilter || skillFilter;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Trouver des Étudiants
          </h1>
          <p className="text-gray-600">
            Découvrez des étudiants talentueux prêts à rejoindre votre
            entreprise
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, école ou compétence..."
                className="input input-bordered pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className="btn btn-outline flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              Filtres
              {hasActiveFilters && (
                <span className="badge badge-primary badge-sm">!</span>
              )}
            </button>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Localisation
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Abidjan, Cocody"
                  className="input input-bordered"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    École
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Agitel Formation"
                  className="input input-bordered"
                  value={schoolFilter}
                  onChange={(e) => setSchoolFilter(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Compétence</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: UI/UX Design"
                  className="input input-bordered"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                />
              </div>

              {hasActiveFilters && (
                <div className="md:col-span-3 flex justify-end">
                  <button
                    className="btn btn-ghost btn-sm flex items-center gap-2"
                    onClick={clearFilters}
                  >
                    <X className="w-4 h-4" />
                    Effacer les filtres
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="mb-4 flex justify-between items-center">
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {locationFilter && (
                <span className="badge badge-outline badge-primary">
                  📍 {locationFilter}
                </span>
              )}
              {schoolFilter && (
                <span className="badge badge-outline badge-secondary">
                  🎓 {schoolFilter}
                </span>
              )}
              {skillFilter && (
                <span className="badge badge-outline badge-accent">
                  💼 {skillFilter}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Liste des étudiants */}
        {isStudentLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : true ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <>
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=14"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
              <StudentCard
                name="Lucie Stonis"
                school="Ecole Ingénieur Agitel Formation"
                location="Cocody, Abidjan"
                level="Étudiant en 3ème année"
                skill="UI/UX Design"
                photo="https://avatars.githubusercontent.com/u/40762276?v=4"
                id="1"
              />
            </>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucun étudiant trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters
                ? "Aucun étudiant ne correspond à vos critères de recherche."
                : "Aucun étudiant n'est actuellement disponible."}
            </p>
            {hasActiveFilters && (
              <button className="btn btn-primary" onClick={clearFilters}>
                Effacer les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;
