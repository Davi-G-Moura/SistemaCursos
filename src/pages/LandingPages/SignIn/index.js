import { useState } from "react";
import "./index.css";
import world from "assets/images/bg-presentation.jpg";
import aviso from "assets/images/aviso.png";
import { auth } from "Firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignInBasic = () => {
  const [NewUser, setNewUser] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    seterror(false);

    if (NewUser) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          localStorage.setItem("username", username);
        })
        .catch((error) => {
          seterror(true);
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((UserDetails) => {
          console.log(UserDetails);
          navigate("/aluno");
        })
        .catch((error) => {
          seterror(true);
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    }
  };
  return (
    <>
      <div className="login-page">
        <header>
          <span>
            from <i>Infinity Studios</i>
          </span>
        </header>
        <img className="logo" src={world} alt="" />
        <h2 className="title">
          Sub-Min <br />
          Dashboard
        </h2>
        <form onSubmit={submit}>
          {NewUser && (
            <div className="username">
              <input
                onChange={(e) => setusername(e.target.value)}
                type="username"
                id="username"
                required
              />
              <label htmlFor="username">username</label>
            </div>
          )}
          <div className="email">
            <input onChange={(e) => setemail(e.target.value)} type="email" id="email" required />
            <label htmlFor="email">email</label>
          </div>
          <div className="password">
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              id="password"
              required
            />
            <label htmlFor="password">password</label>
          </div>
          {error && <img src={aviso} alt="" className="status" />}

          {error && <span className="error">Processo falho</span>}
          {error && <span className="error">{ErrorMsg}</span>}

          <button type="submit">{NewUser ? "Sign Up" : "Log In"}</button>
          {NewUser ? (
            <span className="user-stat">
              Alredy have an account?
              <b
                onClick={() => {
                  setNewUser(false);
                  seterror(false);
                }}
              >
                Log In
              </b>
            </span>
          ) : (
            <span className="user-stat">
              Don&apos;t have an account?
              <b
                onClick={() => {
                  setNewUser(true);
                  seterror(true);
                }}
              >
                Log Up
              </b>
            </span>
          )}
        </form>
      </div>
    </>
  );
};

export default SignInBasic;
