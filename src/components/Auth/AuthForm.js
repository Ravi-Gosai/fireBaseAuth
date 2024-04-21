import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8",{
          method : 'POST',
          body : JSON.stringify({
            email : enteredEmail,
            password : enteredPassword,
            returnSecureToken : true 
          }),
          headers : {
            'Content-Type': 'application/json'
          }
        }
      ).then((res)=>{
        if(res.ok){

        }else{
          return res.json().then((data)=>{
            console.log(data)
          })
        }
      })
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={inputEmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={inputPasswordRef}
          />
        </div>
        <div
          style={{
            backgroundColor: "brown",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={classes.actions}
        >
          <button
            type="submit"
            className={classes.toggle}
            onClick={submitHandler}
          >
            {isLogin ? "login" : " create account"}
          </button>
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
