const DropdownActivity = ({ setOpenDropdown, setActivityType, activities }) => {
  const liCSS =
    "flex p-3 border text-gray-700 hover:text-white hover:bg-indigo-700 cursor-pointer bg-white rounded-lg";

  const handleActivityClick = (activity) => {
    setOpenDropdown(false);
    setActivityType(activity.value);
  };

  return (
    <div className="shadow h-auto text-wrap w-xs absolute z-10">
      <ul className="text-left">
        {activities.map((activity, index) => (
          <li
            key={index}
            className={liCSS}
            onClick={() => handleActivityClick(activity)}
          >
            <img src={activity.symbol} alt={activity.text} />
            {activity.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownActivity;