import { useForm } from "react-hook-form";
import { getUserToken } from "../../lib/utils";
import axios from "axios";

const CreateServicePage = () => {
  const { register, handleSubmit, reset } = useForm();
  const userDecode = getUserToken();

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      price: parseInt(data.price),
      tags: data.tags.split(",").map((t) => t.trim()),
      userId: userDecode.userId,
    };
    const token = localStorage.getItem("JWT");
    const res = await axios.post(
      "http://localhost:3000/api/service/",
      payload,
      {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      }
    );

    console.log(res.data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="title" {...register("title")} /> <br />
        <input
          type="text"
          placeholder="description"
          {...register("description")}
        />{" "}
        <br />
        <input type="text" placeholder="price" {...register("price")} /> <br />
        <input type="text" placeholder="tags" {...register("tags")} /> <br />
        <button type="submit" className="btn btn-success">
          Publier
        </button>
      </form>
    </div>
  );
};

export default CreateServicePage;
