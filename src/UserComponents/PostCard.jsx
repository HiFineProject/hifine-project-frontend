const PostCard = ({
  id,
  description,
  media,
  duration,
  distance,
  date, // Include date as a prop
  activityType,
  editPost,
  deletePost,
}) => {

  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="flex flex-col sm:w-[640px] w-screen mx-auto mt-2 bg-zinc-400 rounded-lg pt-2">
      <div className="flex bg-zinc-800 text-white justify-between align-baseline px-2">
        <div className="flex bg-pink-200 gap-5 items-center">
          <img alt="user icon" src="user-icon.png" /> {/* Placeholder for user icon */}
          <p>Display Name</p> {/* Placeholder for user's display name */}
        </div>
        <div className="flex bg-green-200 gap-5 items-center">
          <img alt="activity icon" src={activityType.symbol} /> 
          <SelectEditButton editPost={editPost} deletePost={deletePost} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-full h-96 bg-amber-500">
          <img src={media} alt="Post Media" /> {/* Display the image */}
        </div>
      </div>
      <div className="flex flex-col justify-center px-2 bg-lime-300">
        <div className="flex items-center">
          <div className="flex flex-col bg-orange-500 w-3/5 p-2">
            <p>{description}</p>
          </div>
          <div className="flex justify-center w-2/5">
            <div className="flex items-end bg-green-600 w-1/2 p-2">
              <p className="text-5xl">{distance}</p>
              <p>km</p>
            </div>
            <div className="flex items-end bg-pink-500 w-1/2 p-2">
              <p className="text-5xl">{duration}</p>
              <p>hr</p>
            </div>
          </div>
        </div>
        {/* Display the date */}
        <div className="flex justify-end text-gray-600 mt-2">
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;