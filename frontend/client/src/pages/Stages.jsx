import { useEffect } from "react";
import { useStageStore } from "../store/useStageStore";

const Stages = () => {
  const { getAllStages, stages, isLoading } = useStageStore();

  useEffect(() => {
    getAllStages();
  }, []);


  return (
    <>
      <div></div>
    </>
  );
};

export default Stages;
