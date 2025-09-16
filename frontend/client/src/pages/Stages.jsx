import { useEffect, useState } from "react";
import { Search, MegaphoneOff } from "lucide-react";
import { useStageStore } from "../store/useStageStore";
import { useApplyStore } from "../store/useApplyStore";
import StageCard from "../components/StageCard";

const Stages = () => {
  const [formData, setFormData] = useState({ coverLetter: "" });
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [domain, setDomain] = useState("");
  const [sort, setSort] = useState("");
  const [field, setField] = useState("");

  const { getAllStages, stages, isLoading, searchStages } = useStageStore();
  const { setApplying } = useApplyStore();
  const stageId = stages[0]?.id;

  useEffect(() => {
    getAllStages();
  }, []);

  const handleApply = (e) => {
    e.preventDefault();
    setApplying(stageId, formData);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!q.trim() && !location && !domain && !sort && !field) {
      getAllStages();
      return;
    }
    await searchStages(q, location, domain, sort, field);
  };

  return (
    <>
      {/* Barre de recherche + filtres */}
      <div className="flex flex-col gap-4 justify-center mt-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Rechercher un stage..."
            className="input input-bordered flex-1"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <input
            type="text"
            placeholder="Localisation"
            className="input input-bordered"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="text"
            placeholder="Domaine"
            className="input input-bordered"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="">Champ de tri</option>
            <option value="title">Titre</option>
            <option value="location">Localisation</option>
            <option value="duree">Durée</option>
          </select>

          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Ordre</option>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>

          <button type="submit" className="btn btn-primary">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Liste des stages */}
      <div className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg col-span-full" />
        ) : stages.length > 0 ? (
          stages.map((stage) => (
            <li key={stage.id} className="list-none">
              <StageCard
                title={stage.title}
                company={stage.company.companyName}
                duree={stage.duree}
                skills={
                  Array.isArray(stage.skills)
                    ? stage.skills.map((s) => s.name)
                    : []
                }
                id={stage.id}
              />
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center col-span-full text-gray-500">
            <MegaphoneOff className="w-10 h-10 mb-2" />
            <span>Aucun résultat trouvé</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Stages;
