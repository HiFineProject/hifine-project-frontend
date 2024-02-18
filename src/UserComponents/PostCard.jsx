import SelectEditButton from "./SelectEditButton/SelectEditButtton";

const PostCard = ({
  _id,
  displayName,
  profileImage,
  description,
  secureUrl,
  duration,
  distance,
  activityType,
  activities,
  editPost,
  deletePost,
}) => {
  return (
    <div
      key={_id}
      className="flex flex-col w-full mx-auto bg-zinc-400 rounded-lg mt-4 pt-4"
    >
      <div className="flex justify-between align-baseline px-5">
        <div className="flex gap-5 items-center">
          <img
            src={profileImage}
            alt="Profile Picture"
            className="w-[45px] rounded-full"
          />
          {/* Placeholder for user icon */}
          <h2>{displayName}</h2>
        </div>
        <div className="flex gap-5 items-center">
          <img
            alt="activity icon"
            src={
              activities.find((activity) => activity.value === activityType)
                .symbol
            }
          />
          <p>
            {
              activities.find((activity) => activity.value === activityType)
                .text
            }
          </p>
          <SelectEditButton editPost={editPost} deletePost={deletePost} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-full h-96 bg-amber-500">
          <img src={secureUrl} alt="Post Media" /> {/* Display the image */}
        </div>
      </div>
      <div className="flex flex-col justify-center px-2 bg-lime-300">
        <div className="flex flex-col items-center">
          <div className="flex flex-col bg-orange-500 p-2">
            <p>{description}</p>
          </div>
          <div className="flex justify-center">
            <div className="flex items-end bg-green-600 w-1/2 p-2">
              <p className="text-5xl">{distance[0]}</p> {/* Display km */}
              <p>kilometre</p>
              <p className="text-5xl">{distance[1]}</p> {/* Display km */}
              <p>metre</p>
            </div>
            <div className="flex items-end bg-pink-500 w-1/2 p-2">
              <p className="text-5xl">{duration[0]}</p> {/* Display hr */}
              <p>hr</p>
              <p className="text-5xl">{duration[1]}</p> {/* Display hr */}
              <p>min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
