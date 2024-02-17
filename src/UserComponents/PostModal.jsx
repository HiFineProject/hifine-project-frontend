import { useState } from "react";
import SelectActivityButton from "./SelectActivityButton/SelectActivityButton";
import axios from "axios";

const PostModal = ({ setOpenModal, activities }) => {
  const [formData, setFormData] = useState({
    description: "",
    duration: { hour: "", min: "" },
    distance: { km: "", m: "" },
    activityType: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedActivityText, setSelectedActivityText] =
    useState("Select Activity");

  const handleChange = (e, field, subfield = null) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: subfield ? { ...prevData[field], [subfield]: value } : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const createPost = async (e) => {
    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("image", image);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("activityType", formData.activityType);
      formDataToSend.append("duration_hour", formData.duration.hour);
      formDataToSend.append("duration_min", formData.duration.min);
      formDataToSend.append("distance_km", formData.distance.km);
      formDataToSend.append("distance_m", formData.distance.m);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:3000/posts",
        formDataToSend,
        config
      );

      console.log("Response from backend:", response.data);
      setOpenModal(false)
    } catch (error) {
      console.error("Error uploading image to backend:", error);
    }
  };

  return (
    <form
      onSubmit={createPost}
      className="flex fixed top-0 left-0 w-full h-dvh justify-center items-center sm:mx-auto backdrop-blur-md"
    >
      <div className="flex flex-col sm:w-[640px] mx-auto bg-white rounded-lg p-5 border-4">
        <div className="flex justify-between mx-2 text-center items-center">
          <div className="w-[40px]"></div>
          <div>
            <h2 className="text-lg font-bold">Create Post</h2>
          </div>
          <button onClick={() => setOpenModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
            >
              <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
            </svg>
          </button>
        </div>
        <div className="p-2 border-2 rounded mb-3">
          <textarea
            className="w-full h-[150px] p-3"
            placeholder="Share your exercise today"
            value={formData.description}
            onChange={(e) => handleChange(e, "description")}
            maxLength="250"
          ></textarea>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 mx-auto"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
        <div className="modalFooter">
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 size-fit">
                  <label>Time</label>
                  <input
                    className="w-1/2"
                    type="number"
                    value={formData.duration.hour}
                    onChange={(e) => handleChange(e, "duration", "hour")}
                    min="0"
                    placeholder="Hour"
                  />
                  <p>Hour</p>
                  <input
                    className="w-1/2"
                    type="number"
                    value={formData.duration.min}
                    onChange={(e) => handleChange(e, "duration", "min")}
                    min="0"
                    placeholder="Minute"
                  />
                  <p>Minute</p>
                </div>
                <div className="flex gap-3">
                  <label>Distance</label>
                  <input
                    className="w-1/2"
                    type="number"
                    value={formData.distance.km}
                    onChange={(e) => handleChange(e, "distance", "km")}
                    placeholder="KiloMetre"
                    min="0"
                    step="any"
                  />
                  <p>Kilometre</p>
                  <input
                    className="w-1/2"
                    type="number"
                    value={formData.distance.m}
                    onChange={(e) => handleChange(e, "distance", "m")}
                    placeholder="Metre"
                    min="0"
                    step="any"
                  />
                  <p>Metre</p>
                </div>
              </div>
              <div>
                <p></p>
              </div>
            </div>
            <div className="flex justify-between">
              <div class="flex items-center gap-5">
                <p>Add Picture to Your Post</p>
                <div>
                  <label htmlFor="upload-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="40"
                      viewBox="0 -960 960 960"
                      width="40"
                    >
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Zm80-80h400q12 0 18-11t-2-21L586-459q-6-8-16-8t-16 8L450-320l-74-99q-6-8-16-8t-16 8l-80 107q-8 10-2 21t18 11Z" />
                    </svg>
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    id="upload-image"
                  />
                </div>
              </div>
              <SelectActivityButton
                activities={activities}
                activityType={selectedActivityText}
                setActivityType={(value) => {
                  setSelectedActivityText(value);
                  setFormData((prevData) => ({
                    ...prevData,
                    activityType: value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-orange-400 w-1/2 rounded-full p-2 m-2"
              onClick={createPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostModal;
