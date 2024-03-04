import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import DOMPurify from 'dompurify';  // Import DOMPurify
import "./Landing.css";

const useFormValidation = () => {
  const [formValues, setFormValues] = useState({
    User_Name: "",
    Email: "",
    Password: "",
  });

  const [formErrors, setFormErrors] = useState({
    User_Name: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: DOMPurify.sanitize(value),  // Sanitize user input using DOMPurify
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!formValues.User_Name) {
      errors.User_Name = "Please enter a User Name";
    } else {
      errors.User_Name = "";
    }

    if (!formValues.Email) {
      errors.Email = "Please enter an Email";
    } else {
      errors.Email = "";
    }

    if (!formValues.Password) {
      errors.Password = "Please enter a Password";
    } else if (!/^.{8,20}$/.test(formValues.Password)) {
      errors.Password = "Invalid password. Must be between 8 and 20 characters.";
    } else {
      errors.Password = "";
    }

    setFormErrors(errors);
    return Object.values(errors).every((err) => err === "");
  };

  return { formValues, formErrors, handleChange, validateForm };
};

function LandingPage() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const { formValues, formErrors, handleChange, validateForm } = useFormValidation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const sanitizedFormValues = {
          User_Name: DOMPurify.sanitize(formValues.User_Name),
          Email: DOMPurify.sanitize(formValues.Email),
          Password: DOMPurify.sanitize(formValues.Password),
        };

        const response = await axios.post('http://localhost:3000/users', sanitizedFormValues);

        if (!response.data.error) {
          Cookies.set('user_name', sanitizedFormValues.User_Name);

          navigate("/");
          setRegistrationSuccess(true);
          setPopupVisible(true);

          setTimeout(() => {
            setPopupVisible(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div id="container">
      <div className="form">
        <form action="/submit_form" method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            id="User_Name"
            name="User_Name"
            placeholder="Enter your User Name"
            value={formValues.User_Name}
            onChange={handleChange}
          />
          <span className="error">{formErrors.User_Name}</span>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder="Enter your Email"
            value={formValues.Email}
            onChange={handleChange}
          />
          <span className="error">{formErrors.Email}</span>
          <input
            type="password"
            id="Password"
            name="Password"
            placeholder="Enter your Password"
            maxLength="20"
            value={formValues.Password}
            onChange={handleChange}
          />
          <span className="error">{formErrors.Password}</span>
          <button className="sign" type="submit" value="Register">Sign</button>
        </form>
      </div>
      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>Registration successful! Closing the page...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

