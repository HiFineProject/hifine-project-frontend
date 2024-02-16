import { Link } from "react-router-dom";
import LoginLayout from "./LoginLayout";
import SignInButton from "./Button/SignInButton";

function GettingStarted() {
  return (
    <LoginLayout>
      <div className="flex flex-col h-full justify-center items-center text-center relative">
        <h3 className="font-bold text-3xl p-2 text-white sm:text-gray-600">Get started</h3>
        <Link to="/Signup" className="w-full">
          <button className="text-white text-lg font-bold p-2 m-2 w-1/2 rounded-full sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500">
            Sign up
          </button>
        </Link>
        <SignInButton />
        <img className="h-full w-full sm:w-1/2 sm:hidden absolute bottom-0 z-[-1]" src="wave-getstarted-mobile.png" />
      </div>
    </LoginLayout>
  );
}

export default GettingStarted;
