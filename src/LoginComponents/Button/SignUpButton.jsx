import { Link } from "react-router-dom";
const SingUpButton = () => {
  return (
    <Link to="/Signup" className="w-full">
      <button className="bg-orange-400 hover:bg-orange-500 text-white p-2 m-2 w-1/2 rounded-full hover:ring hover:ring-orange-300">
        Sign up
      </button>
    </Link>
  );
};

export default SingUpButton