import { useState } from "react";
import LoginLayout from "./LoginLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [nameData, setNameData] = useState({
    displayName: "",
  });
  const [nameErrors, setNameErrors] = useState({
    displayName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNameData({ ...nameData, [name]: value });
    setNameErrors({ ...nameErrors, [name]: "" });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const validateName = () => {
    if (nameData.displayName.trim().length < 2) {
      setNameErrors({
        ...nameErrors,
        displayName: "Display name must be at least 2 characters long",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNameValid = validateName();

    if (isNameValid && profileImage) {
      try {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("image", profileImage);
        formData.append("folder", "profiles");
        formData.append("displayName", nameData.displayName);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.patch(
          "https://hifine-project-backend.onrender.com/createProfile",
          formData,
          config
        );

        console.log("Response from backend:", response.data);
        navigate("/home");
      } catch (error) {
        console.error("Error uploading image to backend:", error);
      }
    }
  };

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="font-semibold mb-2">Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleImageChange}
          />
          {profileImage && (
            <img
              className="rounded-full"
              src={URL.createObjectURL(profileImage)}
              width="300px"
              alt="profile"
            />
          )}
          <p className="w-1/2 justify-items-start mb-2">Display :</p>
          <input
            className="mb-2 w-1/2 rounded-full px-5 py-1"
            placeholder="Display name"
            type="text"
            id="name"
            name="displayName"
            value={nameData.displayName}
            onChange={handleChange}
          ></input>
          {nameErrors.displayName && (
            <p className="text-red-500">{nameErrors.displayName}</p>
          )}
          <button
            type="submit"
            className="text-white p-2 m-2 w-1/2 rounded-full sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500"
          >
            Confirm
          </button>
        </form>
      </div>
    </LoginLayout>
  );
};

export default CreateProfile;
