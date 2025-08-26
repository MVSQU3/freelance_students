import { useEffect } from "react";
import { useStageStore } from "../store/useStageStore";

const Stages = () => {
  const { getAllStages, stages, isLoading } = useStageStore();

  useEffect(() => {
    getAllStages();
  }, []);

  console.log("log de stages: ", stages);

  return (
    <>
      <div></div>
    </>
  );
};

export default Stages;
