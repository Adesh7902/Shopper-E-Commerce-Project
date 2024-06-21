import React, { useState } from "react";
import "./CSS/LoginSignUp.css";

function LoginSignUp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="loginsignup">
      {!isLoggedIn ? (
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="password" placeholder="Password" />
          </div>
          <button
            onClick={() => {
              setIsLoggedIn(true);
            }}
          >
            Continue
          </button>
          <p className="loginsignup-login">
            Already have an account <span>Login Here</span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </div>
      ) : (
        <div className="loginsignup-container">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input type="email" placeholder="Your Email" />
            <input type="password" placeholder="Password" />
          </div>
          <button
            onClick={() => {
              setIsLoggedIn(true);
            }}
          >
            Login
          </button>
          <p className="loginsignup-login">
            Create an account <span>Click Here</span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginSignUp;
