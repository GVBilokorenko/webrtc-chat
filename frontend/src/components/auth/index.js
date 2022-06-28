import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../fireBase";
import "./auth.scss";

function Auth() {
  const navigate = useNavigate();
  const [fireBaseError, setFireBaseError] = useState("");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch
  } = useForm({
    mode: "onChange"
  });

  const [registered, setRegistered] = useState(true);
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async data => {
    if (Object.keys(data).length === 2) {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        navigate("/home");
      } catch (e) {
        console.log(e.message);
        setFireBaseError("Wrong email or password!");
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.repeatPassword);
        navigate("/home");
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  function handleError(type) {
    return errors[type]?.message;
  }

  return (
    <div className="Auth">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {registered ? (
            <div className="inputGroup">
              <label>
                Email:
                <input
                  {...register("email", {
                    required: "Field can't be empty!",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
                      message: "Please type valid email!"
                    }
                  })}
                  type="email"
                  className={handleError("email") ? "invalid" : ""}
                />
                <div className="error">{fireBaseError ? fireBaseError : handleError("email")}</div>
              </label>
              <label>
                Password:
                <input
                  {...register("password", {
                    required: "Field can't be empty!",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long!"
                    },
                    maxLength: {
                      value: 32,
                      message: "Password can't be longer than 32 characters!"
                    },
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}\]:;',?/*~$^+=<>_])*.{8,32}$/,
                      message: "At least one uppercase letter, one lowercase letter and one number!"
                    }
                  })}
                  type="password"
                  className={handleError("password") ? "invalid" : ""}
                />
                <div className="error">{handleError("password")}</div>
              </label>
            </div>
          ) : (
            <div className="inputGroup">
              <label>
                Email:
                <input
                  {...register("email", {
                    required: "Field can't be empty!",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
                      message: "Please type valid email!"
                    }
                  })}
                  type="email"
                  className={handleError("email") ? "invalid" : ""}
                />
                <div className="error">{handleError("email")}</div>
              </label>
              <label>
                Password:
                <input
                  {...register("password", {
                    required: "Field can't be empty!",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 10 characters long!"
                    },
                    maxLength: {
                      value: 32,
                      message: "Password can't be longer than 32 characters!"
                    },
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}\]:;',?/*~$^+=<>_])*.{8,32}$/,
                      message: "At least one uppercase letter, one lowercase letter and one number!"
                    }
                  })}
                  type="password"
                  className={handleError("password") ? "invalid" : ""}
                />
                <div className="error">{handleError("password")}</div>
              </label>
              <label>
                Repeat password:
                <input
                  {...register("repeatPassword", {
                    required: "Field can't be empty!",
                    validate: value => value === password.current || "The passwords do not match"
                  })}
                  type="password"
                  className={handleError("repeatPassword") ? "invalid" : ""}
                />
                <div className="error">{handleError("repeatPassword")}</div>
              </label>
            </div>
          )}
          <button type="submit" disabled={!isValid}>
            {registered ? "Sign in" : "Sign up"}
          </button>
        </form>
        {registered ? (
          <button onClick={() => setRegistered(false)}>Don't have an account? Sign up!</button>
        ) : (
          <button onClick={() => setRegistered(true)}>Already have an account? Sign in!</button>
        )}
      </div>
    </div>
  );
}

export default Auth;
