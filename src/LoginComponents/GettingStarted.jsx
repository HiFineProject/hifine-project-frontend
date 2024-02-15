import { Link } from "react-router-dom";
import LoginLayout from "./LoginLayout";

import SignInButton from "./Button/SignInButton";

function GettingStarted() {
  return (
    <LoginLayout>
      <div className="flex flex-col h-full justify-center items-center text-center">
        <h3 className="font-semibold">Get started</h3>
        <Link to="/Signup" className="w-full">
          <button className="bg-orange-400 hover:bg-orange-500 text-white p-2 m-2 w-1/2 rounded-full hover:ring hover:ring-orange-300">
            Sign up
          </button>
        </Link>
        <SignInButton />
      </div>
    </LoginLayout>
  );
}

export default GettingStarted;
