import React from "react";
import Footer from "../components/Footer";

export default function SignUp() {
  return (
    <>
      <section className="signup">
        <div className="signup__container">
          <h1 className="signup__title">Create Account</h1>
          <form className="signup__form">
            <label className="signup__field">
              <span>First Name</span>
              <input type="text" name="firstName" placeholder="Enter first name" />
            </label>

            <label className="signup__field">
              <span>Last Name</span>
              <input type="text" name="lastName" placeholder="Enter last name" />
            </label>

            <label className="signup__field signup__field--full">
              <span>Email Address</span>
              <input type="email" name="email" placeholder="name@email.com" />
            </label>

            <label className="signup__field signup__field--full">
              <span>Address</span>
              <input type="text" name="address" placeholder="Street, City, State" />
            </label>

            <label className="signup__field signup__field--full">
              <span>Phone Number</span>
              <input type="tel" name="phone" placeholder="(555) 123-4567" />
            </label>

            <button type="submit" className="btn signup__submit">
              Sign Up
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
