import LoginLayout from "./LoginLayout";
import BackButton from "./Button/BackButton";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear previous error for the field
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (formData.password.trim().length < 7) {
      errors.password = 'Password must be at least 7 characters long';
      isValid = false;
    }

    if (formData.confirmPassword.trim() === '') {
      errors.confirmPassword = 'Confirm password is required';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const formDataToSend = { email: formData.email, password: formData.password };

      try {
        const response = await axios.post('https://hifine-project-backend.onrender.com/signup', formDataToSend);
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token);
          navigate('/createProfile');
        } else {
          // Handle other status codes
          console.error('Error submitting form:', response.data);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <LoginLayout>
      <div className="flex flex-col h-full">
        <div>
          <BackButton />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col w-1/2">
            <h2 className="flex font-bold text-2xl mb-2 items-center justify-center text-white sm:bg-gradient-to-r sm:from-sky-500 sm:to-emerald-500 sm:text-transparent sm:bg-clip-text">Create your account</h2>
            <label htmlFor="email" className="justify-items-start mb-2 text-white sm:text-sky-500">E-mail :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="mb-2 rounded-full px-5 py-1 border-2 border-white-600/100 sm:border-sky-500/100 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="password" className="justify-items-start mb-2 text-white sm:text-sky-500">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              className="mb-2 rounded-full px-5 py-1 border-2 border-white-600/100 sm:border-sky-500/100 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="confirmPassword" className="justify-items-start mb-2 text-white sm:text-sky-500">Confirm Password :</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="**********"
              className="mb-2 rounded-full px-5 py-1 border-2 border-white-600/100 sm:border-sky-500/100 focus:outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formErrors.confirmPassword && <span style={{ color: 'red' }}>{formErrors.confirmPassword}</span>}
          </div>
          <div className="flex flex-col items-center w-full">
            <button onClick={handleSubmit} className="text-white text-lg font-bold p-2 m-2 w-1/2 rounded-full sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500">Sign Up</button>
          </div>
          <div className="flex flex-col w-full justify-center">
            <p className="flex flex-col items-center justify-center text-white sm:text-sky-500">Already have account</p>
            <div className="flex justify-center">
              <button className="text-white text-lg font-bold p-2 m-2 w-1/2 rounded-full sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500">
                <Link to="/SignIn" className="flex flex-col items-center w-full">
                  Sign in
                </Link>
              </button>
            </div>
            <img className="h-full w-full sm:w-1/2 sm:hidden absolute bottom-0 z-[-1]" src="wave-signup-mobile.png" />
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};
export default SignUpPage;