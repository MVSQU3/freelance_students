import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
  const [service, setService] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchService = async () => {
      const res = await axios.get(`http://localhost:3000/api/service/${id}`);
      console.log(res.data);
      setService(res.data);
    };
    fetchService();
  }, [id]);

  console.log("log de service: ", service);

  return <div>{service ? <h2>{service.title}</h2> : null}</div>;
};

export default ServiceDetail;
