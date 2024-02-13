import { useState } from "react"
import LoginLayout from "./LoginLayout"
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const CreateProfile = () => {
    const navigate = useNavigate();

    const [nameData, setnameData] = useState({
        displayName:""
    });
    const [nameErrors, setnameErrors] = useState({
        displayName:"",
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setnameData({ ...nameData, [name]: value });
        setnameErrors({ ...nameErrors, [name]: '' });
      };
      const  validateName = () => {
        if (nameData.trim().length < 2) {
          setnameErrors({ ...nameErrors, name: 'Password must be at least 2 characters long' });
          return false;
        }
        return true;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        if (isNameValid) {
            const nameDataToSend = { name:nameData.name}
        
        const response = await axios.post(
            'http://127.0.0.1:3000/createProfile'
            , nameDataToSend);
          if (response.status === 201) {
            console.log('Form submitted successfully:', response.data);
            navigate('/Home');
            // Additional logic after successful submission
            //navigate('/CreateProfile');
            
          } else {
            console.error('Error submitting form:', response.statusText);
            // Handle error scenarios
          }
      }};
    return (
        <LoginLayout>
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="font-semibold mb-2">Profile</h2>
                    <img className="rounded-full" src="https://img.pikbest.com/origin/09/21/40/48gpIkbEsTske.png!sw800" width="300px" alt="picture" />
                <p className="w-1/2 justify-items-start mb-2">Display :</p>
                <input className="mb-2 w-1/2 rounded-full px-5 py-1" placeholder="Display name"
                type="text"
                id="name"
                  onChange={handleChange}></input>
               
                <button onClick={handleSubmit} className="bg-orange-400 hover:bg-orange-500 text-white p-2 m-2 w-1/2 rounded-full hover:ring hover:ring-orange-300">Confirm</button>
            </div>
        </LoginLayout>
    )
}

export default CreateProfile