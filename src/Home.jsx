import { useEffect, useState } from "react";
import PostCard from "./UserComponents/PostCard";
import PostModal from "./UserComponents/PostModal";
import UserLayout from "./UserComponents/UserLayout";
import axios from "axios";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});

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
    const fetchPosts = async () => {
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
    fetchPosts();
  }, [reload]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("https://hifine-project-backend.onrender.com/user", config);
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
      <div className="flex flex-col justify-center sm:w-[640px] mx-auto rounded-xl p-5">
        <div className="flex flex-col">
          <button
            className="w-full h-full flex justify-center font-bold text-xl p-2 rounded-xl mt-5 bg-white text-sky-500 border-2 border-sky-500/100 sm:border-sky-500/100 focus:outline-none"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            CREATE ACTIVITY
          </button>
        </div>
        {openModal && (
          <PostModal setOpenModal={setOpenModal} activities={activities} />
        )}
        <div>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              _id={post._id}
              displayName={userData.displayName}
              profileImage={userData.profileImage}
              description={post.description}
              duration={post.duration}
              distance={post.distance}
              activityType={post.activityType}
              secureUrl={post.image.secure_url}
              activities={activities}
              editPost={() => editPost(post._id)} // Change id to _id
              deletePost={() => deletePost(post._id)} // Change id to _id
            />
          ))}
        </div>
      </div>
    </UserLayout>
  );
}

export default Home;
