import { Link } from "react-router-dom";

const SignInButton = () => {
  return (
    <button className="text-white text-lg font-bold p-2 m-2 w-1/2 rounded-full sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500">
      <Link to="/SignIn" className="flex flex-col items-center w-full">
        Sign in
      </Link>
    </button>
  );
};

export default SignInButton;
