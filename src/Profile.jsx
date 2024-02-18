import { useEffect, useState } from "react";
import UserLayout from "./UserComponents/UserLayout";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    const getImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("https://hifine-project-backend.onrender.com/posts", config);
        if (response.status === 200) {
          setImages(response.data);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    getImages();
  }, []);

  return (
    <UserLayout>
      <div className="flex flex-col sm:w-[640px] w-screen ml-auto mr-auto justify-center items-center rounded-lg bg-red-400 mt-2">
        <div className="flex flex-col justify-center mt-10 mb-10rounded-full items-center">
          <img
            src={user.profileImage}
            alt="Profile Picture"
            className="w-[200px] h-[200px] rounded-full"
          />
          <h2>{user.displayName}</h2>
        </div>
        <div className="grid grid-cols-3 w-fit justify-center items-center">
          {images.map((image) => {
            return (
                <img
                  className="relative overflow-hidden inset-0 w-full h-full object-cover"
                  alt="image"
                  src={image.image.secure_url}
                />
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
