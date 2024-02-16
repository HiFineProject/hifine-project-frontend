import { Link } from "react-router-dom";
const SingUpButton = () => {
  return (
    <Link to="/Signup" className="w-full">
      <button className="text-white p-2 m-2 w-1/2 rounded-full sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500">
        Sign up
      </button>
    </Link>
  );
};

export default SingUpButton