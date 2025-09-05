import { useEffect, useState } from "react";
import { useStageStore } from "../store/useStageStore";
import { useApplyStore } from "../store/useApplyStore";
import { useAuthStore } from "../store/useAuthStore";
import StageCard from "../components/StageCard";

const Stages = () => {
  const [formData, setFormData] = useState({ coverLetter: "" });
  const { getAllStages, stages, isLoading } = useStageStore();
  const { setApplying, isApplying } = useApplyStore();
  const stageId = stages[0]?.id;
  useEffect(() => {
    getAllStages();
  }, []);

  const handleApply = (e) => {
    e.preventDefault();
    setApplying(stageId, formData);
  };

  return (
    <>
      <div>
        <input type="text" className="input m-4" />
      </div>
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
        <StageCard
          title="Stage en Data Science"
          company="IBM Côte d’Ivoire"
          duree="6 mois"
          skills={["Python", "Machine Learning"]}
        />
      </div>
    </>
  );
};

export default Stages;
