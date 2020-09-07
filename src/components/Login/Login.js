import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { auth, provider } from "../../firebase/firebase";
import { useStateValue } from "../../contextApi/StateProvider";
import { actionTypes } from "../../contextApi/reducer";
function Login() {
  const [state, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem("userInfo", JSON.stringify(result.user));
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__text">
          <h1>
            <WhatsAppIcon />
            Sign in to WhatsApp clone
          </h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
