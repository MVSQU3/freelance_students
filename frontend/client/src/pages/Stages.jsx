import { useEffect, useState } from "react";
import { useStageStore } from "../store/useStageStore";
import { useApplyStore } from "../store/useApplyStore";
import { useAuthStore } from "../store/useAuthStore";

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
        <form onSubmit={handleApply} className="flex flex-col">
          <textarea
            cols="30"
            className="textarea"
            placeholder="Votre lettre de motivation..."
            value={formData.coverLetter}
            onChange={(e) =>
              setFormData({ ...formData, coverLetter: e.target.value })
            }
          ></textarea>

          <button
            className="btn btn-success"
            type="submit"
            disabled={isApplying}
          >
            {isApplying ? "Envoi..." : "Postuler"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Stages;
