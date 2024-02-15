import BackButton from "./Button/BackButton";
import LoginLayout from "./LoginLayout";
import  axios  from "axios";
import { useState } from "react";
import { useNavigate} from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("https://hifine-project-backend.onrender.com/login", {
          email,
          password,
        });
  
        localStorage.setItem("token", response.data.token);
        console.log("Login successful!", response.data);
        navigate("/home");
      } catch (error) {
        setError("Invalid username or password. Please try again.");
        console.error("Login error:", error);
      }
    };
  return (
    <LoginLayout>
      <div className="flex flex-col h-full">
        <div>
          <BackButton />
        </div>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col items-center justify-center h-full" >
          <h2 className="font-semibold mb-2">Sign in to HiFine</h2>
          <p className="w-1/2 justify-items-start mb-2">E-mail address :</p>
          <input
            type="email"
            name="email"
            className="mb-2 w-1/2 rounded-full px-5 py-1"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p className="w-1/2 justify-items-start mb-2">Password :</p>
          <input
            type="password"
            name="password"
            className="mb-2 w-1/2 rounded-full px-5 py-1"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
            <button type="submit" onClick={handleLogin} className="bg-orange-400 hover:bg-orange-500 text-white p-2 m-2 w-1/2 rounded-full hover:ring hover:ring-orange-300">
              Sign in
            </button>
        </form>
      </div>
    </LoginLayout>
  );
}

export default Signin;
