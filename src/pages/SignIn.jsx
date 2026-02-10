import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <section className="signin">
        <div className="signin__container">
          <h1 className="signin__title">Welcome Back</h1>

          <form className="signin__form">
            <label className="signin__field">
              <span>Email Address</span>
              <input type="email" name="email" placeholder="name@email.com" required />
            </label>

            <label className="signin__field">
              <span>Password</span>
              <div className="signin__passwordRow">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="signin__toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button type="submit" className="btn signin__submit">
              Sign In
            </button>
          </form>

          <p className="signin__signupText">
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
