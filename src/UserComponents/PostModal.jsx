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
  const [isPosting, setIsPosting] = useState(false);

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
    if (isPosting) return; // If already posting, return early
    setIsPosting(true) // Set posting state to true to disable the button
    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("image", image);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("activityType", formData.activityType);
      formDataToSend.append("duration", JSON.stringify(formData.duration));
      formDataToSend.append("distance", JSON.stringify(formData.distance));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Form Data before sending:", formData);

      const response = await axios.post(
        "https://hifine-project-backend.onrender.com/posts",
        formDataToSend,
        config
      );

      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error uploading image to backend:", error);
    } finally {
      setIsPosting(false); // Reset posting state after completion
      setOpenModal(false);
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
            <h2 className="font-bold text-sky-500 text-xl mb-3">CREATE POST</h2>
          </div>
          <button onClick={() => setOpenModal(false)}>
            <svg
              className="fill-stone-400"
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 -960 960 960"
              width="25"
            >
              <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
            </svg>
          </button>
        </div>
        <div className="p-1 rounded mb-3 text-lg border-2 border-sky-500/100 sm:border-sky-500/100 focus:outline-none">
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
                <div className="flex gap-3 size-fit text-sky-500 p-3">
                  <label className="p-1">Time</label>
                  <input
                    className="sm:w-2/3 min-w-32 rounded-xl p-1 border-2 border-sky-200/100 sm:border-sky-200/100 focus:outline-none"
                    type="number"
                    value={formData.duration.hour}
                    onChange={(e) => handleChange(e, "duration", "hour")}
                    min="0"
                    placeholder="Hour"
                  />
                  <p className="p-1">hr</p>
                  <input
                    className="sm:w-2/3 min-w-32 rounded-xl p-1 border-2 border-sky-200/100 sm:border-sky-200/100 focus:outline-none"
                    type="number"
                    value={formData.duration.min}
                    onChange={(e) => handleChange(e, "duration", "min")}
                    min="0"
                    placeholder="Minute"
                  />
                  <p className="p-1">min</p>
                </div>
                <div className="flex gap-3 text-sky-500">
                  <label>Distance</label>
                  <input
                    className="sm:w-2/3 min-w-32 rounded-xl p-1 border-2 border-sky-200/100 sm:border-sky-200/100 focus:outline-none"
                    type="number"
                    value={formData.distance.km}
                    onChange={(e) => handleChange(e, "distance", "km")}
                    placeholder="KiloMetre"
                    min="0"
                    step="any"
                  />
                  <p className="p-1">km.</p>
                  <input
                    className="sm:w-2/3 min-w-32 rounded-xl p-1 border-2 border-sky-200/100 sm:border-sky-200/100 focus:outline-none"
                    type="number"
                    value={formData.distance.m}
                    onChange={(e) => handleChange(e, "distance", "m")}
                    placeholder="Metre"
                    min="0"
                    step="any"
                  />
                  <p className="p-1">m.</p>
                </div>
              </div>
              <div>
                <p></p>
              </div>
            </div>
            <div className="flex justify-between text-sky-500">
              <div className="flex items-center gap-5">
                <p>Upload Image</p>
                <div>
                  <label htmlFor="upload-image">
                    <svg
                      className="cursor-pointer"
                      fill="#000000"
                      height="30px"
                      width="30px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"

                      viewBox="0 0 368 368">
                      <g>
                        <g>
                          <g>
                            <path d="M328,32H40C18,32,0,50,0,72v224c0,22,18,40,40,40h288c22,0,40-18,40-40V72C368,50,350,32,328,32z M352,185.6l-38-38
				c-6.4-6.4-16-6.4-22.4,0L200,238.8l-0.4-0.4L153.2,192c-6-6-16.4-6-22.4,0l-39.2,39.2c-3.2,3.2-3.2,8,0,11.2
				c3.2,3.2,8,3.2,11.2,0l39.2-39.2l46.4,46.4l0.4,0.4l-32.4,32.4c-3.2,3.2-3.2,8,0,11.2c1.6,1.6,3.6,2.4,5.6,2.4s4-0.8,5.6-2.4
				l135.2-134.8l47.6,47.6c0.4,0.4,1.2,0.8,1.6,1.2V296c0,13.2-10.8,24-24,24H40c-13.2,0-24-10.8-24-24V72c0-13.2,10.8-24,24-24h288
				c13.2,0,24,10.8,24,24V185.6z"/>
                            <path d="M72.4,250.4l-8,8c-3.2,3.2-3.2,8,0,11.2C66,271.2,68,272,70,272s4-0.8,5.6-2.4l8-8c3.2-3.2,3.2-8,0-11.2
				C80.4,247.2,75.6,247.2,72.4,250.4z"/>
                            <path d="M88,80c-22,0-40,18-40,40s18,40,40,40s40-18,40-40S110,80,88,80z M88,144c-13.2,0-24-10.8-24-24s10.8-24,24-24
				s24,10.8,24,24S101.2,144,88,144z"/>
                          </g>
                        </g>
                      </g>
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
              className={`w-56 rounded-full p-2 m-2 font-bold text-lg text-white sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500" ${isPosting && "opacity-50 cursor-not-allowed" // Disable button if posting
                }`}
              onClick={createPost}
              disabled={isPosting} // Disable button if posting
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostModal;
