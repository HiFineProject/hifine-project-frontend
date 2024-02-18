import { useEffect, useState } from "react";
import PostCard from "./UserComponents/PostCard";
import PostModal from "./UserComponents/PostModal";
import UserLayout from "./UserComponents/UserLayout";
import axios from "axios";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [posts, setPosts] = useState([]);

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

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("https://hifine-project-backend.onrender.com/posts", config);
      if (response.status === 200) {
        const transformedPosts = response.data.map((post) => ({
          id: post._id.$oid,
          userId: post.userId.$oid,
          description: post.description,
          duration: [post.duration.hour, post.duration.min], // Convert duration to array
          distance: [post.distance.km, post.distance.m], // Convert distance to array
          activityType: post.activityType,
          image: {
            public_id: post.image.public_id,
            secure_url: post.image.secure_url,
          },
        }));
        setPosts(transformedPosts);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  const editPost = async (postId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `https://hifine-project-backend.onrender.com/posts/${postId}`,
        updatedData,
        config
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
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `https://hifine-project-backend.onrender.com/posts/${postId}`,
        config
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
            key={post._id}
            _id={post._id} // Change id to _id
            description={post.description}
            duration={post.duration}
            distance={post.distance}
            activityType={post.activityType}
            date={post.date}
            secureUrl={post.image.secure_url}
            editPost={() => editPost(post._id)} // Change id to _id
            deletePost={() => deletePost(post._id)} // Change id to _id
          />
        ))}
      </div>
    </UserLayout>
  );
}

export default Home;
