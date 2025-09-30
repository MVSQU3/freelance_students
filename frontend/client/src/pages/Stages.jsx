import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  MegaphoneOff,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useStageStore } from "../store/useStageStore";
import StageCard from "../components/StageCard";

const Stages = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [domain, setDomain] = useState("");
  const [sort, setSort] = useState("");
  const [field, setField] = useState("");
  const [page, setPage] = useState(1);

  const { getAllStages, stages, isLoading, searchStages } = useStageStore();

  useEffect(() => {
    if (stages.length <= 0) getAllStages(page);
  }, [page, stages]);

  const handleNextClick = () => {
    if (page) {
      setPage(page + 1);
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    if (!q.trim() && !location && !domain && !sort && !field) {
      getAllStages(1);
      return;
    }
    await searchStages(q, location, domain, sort, field, page);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen">
      {/* Sidebar de recherche et filtres */}
      {showFilter ? (
        <div className="w-full md:w-80 bg-base-100 p-6 rounded-lg shadow-md h-fit">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => {
                setShowFilter(!showFilter);
              }}
              className="btn btn-ghost btn-sm"
            >
              <Filter className="w-5 h-5 text-primary" />
            </button>
            <h2 className="text-xl font-semibold">Filtres</h2>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recherche</span>
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un stage..."
                  className="input input-bordered pl-10 w-full"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Localisation</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Localisation"
                  className="input input-bordered pl-10 w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Domaine</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Domaine"
                  className="input input-bordered pl-10 w-full"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Trier par</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={field}
                onChange={(e) => setField(e.target.value)}
              >
                <option value="">Champ de tri</option>
                <option value="title">Titre</option>
                <option value="location">Localisation</option>
                <option value="duree">Durée</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Ordre</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Ordre</option>
                <option value="asc">Ascendant</option>
                <option value="desc">Descendant</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Appliquer les filtres
            </button>
          </form>
        </div>
      ) : (
        <div className="">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="btn btn-ghost btn-sm flex items-center gap-2"
          >
            <Filter className="w-5 h-5 text-primary" />
          </button>
        </div>
      )}
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Grille des stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 flex-1">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : stages.length > 0 ? (
            stages.map((stage) => (
              <div key={stage.id} className="list-none">
                <StageCard
                  title={stage.title}
                  company={stage?.company?.companyName}
                  duree={stage.duree}
                  location={stage.location}
                  skills={
                    Array.isArray(stage.skills)
                      ? stage.skills.map((s) => s.name)
                      : []
                  }
                  id={stage.id}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <MegaphoneOff className="w-12 h-12 mb-4 text-gray-400" />
              <span className="text-lg">Aucun résultat trouvé</span>
              <p className="text-sm mt-2 text-gray-400">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stages;
