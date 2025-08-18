import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserToken } from "../lib/utils";

const ChatPage = () => {
  const [message, setMessage] = useState([]);
  const [content, setContent] = useState("");
  const user = getUserToken();
  const token = localStorage.getItem("JWT");

  const { id } = useParams();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/get-all-message/${id}`,
          {
            headers: {
              Authorization: `Bearer: ${token}`,
            },
          }
        );
        console.log(res.data);
        setMessage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, []);

  const handlSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      senderId: user.userId,
      content: content,
      receiverId: id,
    };
    try {
      const res = await axios.post(
        `http://localhost:3000/api/send-message/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {message ? (
        <p>
          {message.map((m) => (
            <li key={m._id}>
              {m.senderId.email} {":--------------------->"}{m.content}
            </li>
          ))}
        </p>
      ) : null}
      <form onSubmit={handlSubmit}>
        <textarea
          className="textarea textarea-accent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="  Message..."
        ></textarea>
        <button type="submit" className="btn btn-success">
          Envoyé
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
