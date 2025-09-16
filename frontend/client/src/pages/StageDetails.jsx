// pages/StageDetails.jsx
import { useEffect, useState } from "react";
import { useStageStore } from "../store/useStageStore";
import { useParams } from "react-router-dom";
import StageDetailCard from "../components/StageDetailsCard";
import MotivationModal from "../components/MotivationModal";

const StageDetails = () => {
  const { getStageById, stage } = useStageStore();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getStageById(id);
  }, [id]);

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          {stage && (
            <StageDetailCard
              title={stage.title}
              company={stage.company.companyName}
              location={stage.location}
              duree={stage.duree}
              isActive={stage.isActive}
              description={stage.description}
              skills={stage.skills.map((skill) => skill.name)}
              onApply={handleApplyClick}
            />
          )}
        </div>
      </div>

      {stage && (
        <MotivationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={stage.title}
          company={stage.company.companyName}
          stageId={stage.id}
        />
      )}
    </div>
  );
};

export default StageDetails;
