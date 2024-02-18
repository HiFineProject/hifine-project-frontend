import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("https://hifine-project-backend.onrender.com/user", config);
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserImage();
  }, []);

  return (
    <div>
      <div className="h-[56px] flex items-center border-b-[1px] border-zinc-300 px-2 drop-shadow-md">
        <div className="w-[75px]">
          <img
            src={user.profileImage}
            alt="Profile Picture"
            className="w-[45px] rounded-full"
          />
        </div>
        <nav className="ml-auto mr-auto w-full sm:w-[640px] h-full">
          <Navigation />
        </nav>
        <div className="w-[75px]">
        </div>
      </div>
    </div>
  );
};

export default Navbar;
