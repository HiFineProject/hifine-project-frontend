import { useEffect, useState } from "react";
import PostCard from "./UserComponents/PostCard";
import PostModal from "./UserComponents/PostModal";
import UserLayout from "./UserComponents/UserLayout";
import axios from "axios";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState("");
  const [allImages, setAllImages] = useState([]);

  const activities = [
    { value: "walking", symbol: "directions_walk.png", text: "Walking" },
    { value: "running", symbol: "directions_run.png", text: "Running" },
    { value: "cycling", symbol: "directions_bike.png", text: "Cycling" },
    { value: "hiking", symbol: "hiking.png", text: "Hiking" },
    {
      value: "skateboarding",
      symbol: "skateboarding.png",
      text: "Skateboarding",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://hifine-project-backend.onrender.com/posts");
        if (response.status === 200) {
          // Decode base64 images
          const decodedPosts = response.data.posts.map((post) => {
            return {
              ...post,
              media: base64ToImageSrc(post.media, "image/jpeg"),
            };
          });
          setPosts(decodedPosts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reload]);

  const convertBase64 = (e) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);

      fileReader.onload = () => {
        resolve(fileReader.result);
        setMedia(fileReader.result)
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const base64ToImageSrc = (base64Data, mimeType) => {
    return `data:${mimeType};base64,${base64Data}`;
  };

  const editPost = async (postId, updatedData) => {
    try {
      const response = await axios.put(
        `https://hifine-project-backend.onrender.com/posts/${postId}`,
        updatedData
      );
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `https://hifine-project-backend.onrender.com/posts/${postId}`
      );
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <UserLayout>
      <div className="flex justify-center sm:w-[640px] mx-auto border-2 border-black rounded-xl mt-2">
        <button
          className="w-full h-full"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          This is Modal Button
        </button>
      </div>
      {openModal && (
        <PostModal setOpenModal={setOpenModal} activities={activities} />
      )}
      <div>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            description={post.description}
            duration={post.duration}
            distance={post.distance}
            activityType={post.activityType}
            date={post.date}
            editPost={() => editPost(post.id)}
            deletePost={() => deletePost(post.id)}
          />
        ))}
      </div>
    </UserLayout>
  );
}

export default Home;
