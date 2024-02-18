import BackButton from "./Button/BackButton";
import LoginLayout from "./LoginLayout";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://hifine-project-backend.onrender.com/signin", {
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
        <form onSubmit={handleLogin} className="flex flex-col items-center justify-center h-full" >
          <h2 className="flex font-bold text-2xl mb-2 items-center justify-center bg-gradient-to-r from-sky-500 to-emerald-500 text-transparent bg-clip-text">Sign in to HiFine</h2>
          <p className="w-1/2 justify-items-start mb-2 text-sky-500">E-mail :</p>
          <input
            type="email"
            name="email"
            className="mb-2 w-1/2 rounded-full px-5 py-1 border-2 border-sky-500/100 focus:outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p className="w-1/2 justify-items-start mb-2 text-sky-500">Password :</p>
          <input
            type="password"
            name="password"
            className="mb-2 w-1/2 rounded-full px-5 py-1 border-2 border-sky-500/100 focus:outline-none"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" onClick={handleLogin} className="text-white text-lg font-bold p-2 m-2 w-1/2 rounded-full sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500">
            Sign in
          </button>
        </form>
        <img className="h-full w-full sm:w-1/2 sm:hidden absolute bottom-0 z-[-1]" src="wave-signin-mobile.png" />
      </div>
    </LoginLayout>
  );
}

export default Signin;