import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { auth } from "../firebase/inti";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const displayName = [firstName, lastName].filter(Boolean).join(" ");
      if (displayName) {
        await updateProfile(credentials.user, { displayName });
      }

      navigate("/musicplayer");
    } catch (signupError) {
      setError(signupError?.message || "Unable to create account right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="signup">
        <div className="signup__container">
          <h1 className="signup__title">Create Account</h1>
          <form className="signup__form" onSubmit={handleSubmit}>
            <label className="signup__field">
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                required
              />
            </label>

            <label className="signup__field">
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                required
              />
            </label>

            <label className="signup__field signup__field--full">
              <span>Email Address</span>
              <input
                type="email"
                name="email"
                placeholder="name@email.com"
                required
              />
            </label>

            <label className="signup__field signup__field--full">
              <span>Address</span>
              <input
                type="text"
                name="address"
                placeholder="Street, City, State"
                required
              />
            </label>

            <label className="signup__field signup__field--full">
              <span>Phone Number</span>
              <input
                type="tel"
                name="phone"
                placeholder="(555) 123-4567"
                required
              />
            </label>

            <label className="signup__field signup__field--full">
              <span>Password</span>
              <div className="signin__passwordRow">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  minLength={6}
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
              className="btn signup__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
