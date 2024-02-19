import { useEffect, useRef, useState } from "react";
import DropdownActivity from "./DropdownActivity";

const SelectActivityButton = ({ setActivityType, activities, activityType }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const drop = useRef(null);

  const handleOpenDropdown = (e) => {
    if (!e.target.closest(`.${drop.current.className}`) && openDropdown) {
      setOpenDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOpenDropdown);
    return () => {
      document.removeEventListener("click", handleOpenDropdown);
    };
  }, [openDropdown]);

  return (
    <div
      className="dropdown"
      ref={drop}
      style={{
        margin: "16px",
        width: "auto",
        display: "inline-block",
        borderStyle: "solid",
        borderWidth: "3px",
        borderRadius: "8px",
      }}
    >
       <button
      className="flex rounded-lg items-center p-2 px-7"
      onClick={(e) => {
        e.preventDefault();
        setOpenDropdown((openDropdown) => !openDropdown);
      }}
    >
      {activities.find(activity => activity.value === activityType)?.symbol && (
          <img src={activities.find(activity => activity.value === activityType).symbol} alt="Symbol" />
        )}{" "}
        {activityType || "Select Activity"}
      </button>
      {openDropdown && (
        <DropdownActivity
          setOpenDropdown={setOpenDropdown}
          setActivityType={setActivityType}
          activities={activities}
        />
      )}
    </div>
  );
};

export default SelectActivityButton;
