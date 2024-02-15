import LoginLayout from "./LoginLayout";
import BackButton from "./Button/BackButton";
import SignInButton from "./Button/SignInButton";

import { useState } from "react";
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


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

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(formData.email)) {
      setFormErrors({ ...formErrors, email: 'Invalid email address' });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (formData.password.trim().length < 7) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 7 characters long' });
      return false;
    }
    return true;
  };

  const validateConfirmPassword = () => {
    if (formData.confirmPassword.trim() === '') {
      setFormErrors({ ...formErrors, confirmPassword: 'Confirm password is required' });
      return false;
    } else if (formData.confirmPassword !== formData.password) {
      setFormErrors({ ...formErrors, confirmPassword: 'Passwords do not match' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      const formDataToSend = { email: formData.email, password: formData.password };
  
      const response = await axios.post(
        'http://127.0.0.1:3000/signup'//NEED CHANGE TO RENDER
        , formDataToSend);
      if (response.status === 201) {
        console.log('Form submitted successfully:', response.data);
        navigate('/createProfile');
        // Additional logic after successful submission
        //navigate('/CreateProfile');
        
      } else {
        console.error('Error submitting form:', response.statusText);
        // Handle error scenarios
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
      <h2 className="flex font-bold mb-2 items-center justify-center">Create your account</h2>
        <label htmlFor ="email" className="justify-items-start mb-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="items-center justify-center mb-2 rounded-full px-5 py-1"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
      </div>
      <div className="flex flex-col w-1/2">
        <label htmlFor="password" className="justify-items-start mb-2">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="mb-2 rounded-full px-5 py-1"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
      </div>
      <div className="flex flex-col w-1/2">
        <label htmlFor="confirmPassword" className="justify-items-start mb-2" >Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="mb-2 rounded-full px-5 py-1"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {formErrors.confirmPassword && <span style={{ color: 'red' }}>{formErrors.confirmPassword}</span>}
      </div>
      <div className="flex flex-col items-center w-full">
      <button onClick={handleSubmit} className="bg-orange-400 hover:bg-orange-500 text-white p-2 m-2 w-1/2 rounded-full hover:ring hover:ring-orange-300">Sign Up</button>
      </div>
      <div className="flex flex-col w-full justify-center">
          <p className="flex flex-col items-center justify-center">Already have account</p>
          <SignInButton />
          </div>
    </div>
    </div>
    </LoginLayout>
  );
};
export default SignUpPage;

