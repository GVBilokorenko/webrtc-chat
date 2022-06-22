import "./home.scss";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

const socket = io.connect("http://localhost:4000");

function Home(props) {
  const [chat, setChat] = useState([]);

  const {
    register,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = async data => {
    let name = props.user?.email.split("@")[0];
    let message = data.message;
    socket.emit("message", { name, message });
  };

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="Home">
      <div className="chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup">
          <label>
            <input
              {...register("message", {
                required: "Field can't be empty!"
              })}
              type="text"
              className="Input"
              placeholder="Message"
            />
          </label>
        </div>
        <button type="submit">Send message</button>
      </form>
    </div>
  );
}

export default Home;

