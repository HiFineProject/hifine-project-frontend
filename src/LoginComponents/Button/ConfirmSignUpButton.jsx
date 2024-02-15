import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const ConfirmSignUpButton = ({email}) => {
  return (
    <button onClick={()=>{if (email===""){alert("test")} navigate("/Signup");}} className="flex flex-col items-center w-full bg-orange-400 hover:bg-orange-500 text-white p-2 m-2 w-1/2 rounded-full hover:ring hover:ring-orange-300">
        Confirm Sign up
    </button>
  );
};

export default ConfirmSignUpButton