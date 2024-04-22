import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8";
         
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setIsLoading(false);
      if (res.ok) {

        return res.json()
      } else {
        return res.json().then((data) => {
          let errorMessage = " authencaton failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          // alert(errorMessage);
          // console.log(data);
          throw new Error(errorMessage)
        });
      }
    }).then((data)=>{
      console.log(data)
    }).catch(err=>{
      alert(err.message)
    })
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
          {!isLoading && (
            <button
              type="submit"
              className={classes.toggle}
              onClick={submitHandler}
            >
              {isLogin ? "login" : " create account"}
            </button>
          )}
          {isLoading && <p>sending a request</p>}
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
