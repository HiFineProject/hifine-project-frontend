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
      <div className="flex flex-col sm:w-[640px] w-screen ml-auto mr-auto justify-center items-center rounded-lg bg-stone-100 mt-2 shadow-2xl p-1">
        <div className="flex flex-col justify-center mt-4 rounded-full items-center">
          <h2 className="text-stone-600 font-semibold text-lg pb-6 underline underline-offset-8">{user.displayName}</h2>
          <div className="pb-6">
            <img
              src={user.profileImage}
              alt="Profile Picture"
              className="w-[200px] h-[200px] rounded-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 w-fit justify-center items-center">
          {images.map((image) => {
            return (
              <img
                className="relative overflow-hidden inset-0 w-full h-full object-cover p-1 rounded-lg"
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
