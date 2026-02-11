import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { auth } from "../firebase/inti";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/musicplayer");
    } catch (signinError) {
      setError(signinError?.message || "Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="signin">
        <div className="signin__container">
          <h1 className="signin__title">Welcome Back</h1>

          <form className="signin__form" onSubmit={handleSubmit}>
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

            {error && <p className="authMessage authMessage--error">{error}</p>}

            <button
              type="submit"
              className="btn signin__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
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
