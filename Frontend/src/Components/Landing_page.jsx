import React, { useState } from "react";
import "./Landing.css";

// Custom hook for form validation
const useFormValidation = () => {
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};

    // First Name validation
    if (!formValues.fname) {
      errors.fname = "Please enter your First Name";
    } else {
      errors.fname = "";
    }

    // Last Name validation
    if (!formValues.lname) {
      errors.lname = "Please enter your Last Name";
    } else {
      errors.lname = "";
    }

    // Email validation
    if (!formValues.email) {
      errors.email = "Please enter your Email";
    } else {
      errors.email = "";
    }

    // Password validation
    if (!formValues.password) {
      errors.password = "Please enter your Password";
    } else if (!/^.{8,20}$/.test(formValues.password)) {
      errors.password = "Invalid password. Must be between 8 and 20 characters.";
    } else {
      errors.password = "";
    }

    setFormErrors(errors);
    return Object.values(errors).every((err) => err === "");
  };

  return { formValues, formErrors, handleChange, validateForm };
};

function landing() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { formValues, formErrors, handleChange, validateForm } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setRegistrationSuccess(true);
    }
  };

  const closePopup = () => {
    setRegistrationSuccess(false);
  };

  return (
    <div id="container">
      <div className="form">
        <form action="/submit_form" method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Enter your First name"
            value={formValues.fname}
            onChange={handleChange}
          />
          <span className="error">{formErrors.fname}</span>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Enter your Last name"
            value={formValues.lname}
            onChange={handleChange}
          />
          <span className="error">{formErrors.lname}</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={formValues.email}
            onChange={handleChange}
          />
          <span className="error">{formErrors.email}</span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Please enter your Password"
            maxLength="20"
            value={formValues.password}
            onChange={handleChange}
          />
          <span className="error">{formErrors.password}</span>
          <input type="submit" value="Register" />
        </form>
      </div>
      {registrationSuccess && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <p>Registration successful!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default landing;
