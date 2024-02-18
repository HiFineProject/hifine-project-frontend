import { useEffect, useState } from "react";
import UserLayout from "./UserComponents/UserLayout";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState([]);

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
    <UserLayout>
      <div className="flex flex-col sm:w-[640px] w-screen ml-auto mr-auto justify-center items-center rounded-lg bg-red-400 mt-2">
        <div className="flex flex-col justify-center mt-10 mb-10rounded-full items-center">
        <img
            src={user.profileImage}
            alt="Profile Picture"
            className=" w-[250px] h-[250px] rounded-full"
          />
          <h2>{user.displayName}</h2>
        </div>
        <div className="flex flex-wrap w-fit justify-center items-center">
          {/* {media.map((image) => {
            return <img className="w-1/3" alt="image" key={image.id} />;
          })} */}
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
