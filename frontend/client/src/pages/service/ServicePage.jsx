import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ServicePage = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/service/");
      console.log(res.data);
      setService(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {service.map((service) => (
        <li key={service._id} className="list-none">
            <Link to={`/service/detail/${service._id}`} className="">
            {service.title} <br />
            {service.description} <br />
            {service.price} <br />
            {service.tags} <br />
        </Link>
          </li>
      ))}
    </div>
  );
};

export default ServicePage;
