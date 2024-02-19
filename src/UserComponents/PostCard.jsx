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
      className="flex flex-col w-full mx-auto rounded-lg mt-4 pt-5 shadow-2xl bg-stone-100 gap-4"
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
      <div>
        <div className="flex items-center justify-center w-full h-96 bg-white ">
          <img src={secureUrl} className="h-80 rounded-xl" alt="Post Media" /> {/* Display the image */}
        </div>
      </div>
      <div className="px-2">
        <div className="flex flex-col px-5">
          <div className="text-slate-700 w-full h-36 p-1 gap-2 text-lg rounded-xl overflow-y-auto">
            <p>{description}</p>
          </div>
          <div>
            <div className="flex justify-center items-center pb-5">
              <div className="flex items-end justify-center p-2 gap-2 rounded-xl">
                <p className="text-2xl font-semibold text-slate-700">{distance[0]}</p> {/* Display km */}
                <p className="text-md text-slate-700">km.</p>
                <p className="text-2xl font-semibold text-slate-700">{distance[1]}</p> {/* Display km */}
                <p className="text-md text-slate-700">m.</p>
              </div>
              <div className="px-5">|</div>
              <div className="flex items-end justify-center p-2 gap-2 rounded-xl">
                <p className="text-2xl font-semibold text-slate-700">{duration[0]}</p> {/* Display hr */}
                <p className="text-md text-slate-700">hr</p>
                <p className="text-2xl font-semibold text-slate-700">{duration[1]}</p> {/* Display hr */}
                <p className="text-md text-slate-700">min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;