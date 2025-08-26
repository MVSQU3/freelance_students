import { useStageStore } from "../store/useStageStore";

const StageDetails = () => {
  const { getStageById, stage } = useStageStore();
  const id = 1;
  
  useEffect(() => {
    getStageById(id);
  }, [id]);

  console.log("log de stage: ", stage);

  return <div>StageDetails</div>;
};

export default StageDetails;
