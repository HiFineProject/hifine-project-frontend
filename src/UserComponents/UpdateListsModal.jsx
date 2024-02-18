import { useState, useEffect } from "react";
import axios from "axios";

const UpdateListsModal = ({ setEditModal, setReload, editedList }) => {
  const [title, setTitle] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");

  useEffect(() => {
    if (editedList) {
      setTitle(editedList.title);
      // Check if todoItem exists before accessing its properties
      setTodoItems(editedList.todoItem?.items || []);
      setDate(editedList.dateTime?.split(" ")[0] || ""); // Check if dateTime is defined before splitting
      const time = editedList.dateTime?.split(" ")[1]?.split(":") || [
        "00",
        "00",
      ]; // Check if dateTime and time are defined before splitting
      setHour(time[0]);
      setMinute(time[1]);
    }
  }, [editedList]);

  const handleUpdate = async () => {
    try {
      console.log("List ID:", editedList._id);
      const dateTime = `${date} ${hour}:${minute}`;
      const updatedList = {
        title,
        todoItem: { items: todoItems },
        dateTime,
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `https://hifine-project-backend.onrender.com/lists/${editedList._id}`,
        updatedList,
        config
      );

      if (response.status === 200 || response.status === 201) {
        console.log("List updated successfully:", response.data);
        setEditModal(false);
        setReload(true);
      } else if (response.status === 304) {
        console.log("List not modified:", response.data.message);
        setEditModal(false); // Close the modal if the list was not modified
      } else {
        console.error(
          "Failed to update list. Unexpected status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error updating list:", error.message);
    }
  };

  const handleItemChange = (index, value) => {
    const updatedItems = [...todoItems];
    updatedItems[index] = value;
    setTodoItems(updatedItems);
  };

  function generateHourOptions() {
    const options = [];
    for (let i = 0; i < 24; i++) {
      options.push(String(i).padStart(2, "0"));
    }
    return options;
  }

  function generateMinuteOptions() {
    const options = [];
    for (let i = 0; i < 60; i += 10) {
      options.push(String(i).padStart(2, "0"));
    }
    return options;
  }

  const hourOptions = generateHourOptions();
  const minuteOptions = generateMinuteOptions();

  return (
    <div className="flex justify-center item-center">
      <div className="flex fixed top-0 left-0 w-full h-full px-16 justify-center items-center sm:mx-auto z-10 backdrop-blur-md">
        <div className="flex flex-col sm:w-[640px] w-full bg-white rounded-lg p-5 border-4">
          <div className="flex justify-between mx-2 pb-3 text-center items-center">
            <div className="w-[50px]"></div>
            <div className="font-bold text-sky-500 text-xl">
              <h2>EDIT LIST</h2>
            </div>
            <button onClick={() => setEditModal(false)}>
              {" "}
              {/* Close button */}
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
          <div className="text-sm sm:text-lg flex flex-col gap-4">
            <input
              className="rounded-xl p-2 border-2 bg-sky-100 border-sky-500/100 sm:border-sky-500/100 focus:outline-none"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <ul className="text-sm sm:text-lg flex flex-col gap-2 overflow-auto max-h-24 sm:overflow-auto sm:max-h-40">
              {todoItems.map((item, index) => (
                <li key={index}>
                  <input
                    className="rounded-xl p-2 w-full opacity-50 border-2 border-white-600/100 sm:border-sky-500/100 focus:outline-none"
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder="Enter item"
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                className="w-56 rounded-full p-2 m-2 font-bold text-lg sm:bg-gradient-to-r text-white sm:from-sky-500 sm:to-emerald-500 sm:hover:from-emerald-500 sm:hover:to-sky-500 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-emerald-500 hover:to-sky-500"
                onClick={() => setTodoItems([...todoItems, ""])}
              >
                Add Item
              </button>
            </div>
            <div className="flex gap-1.5 sm:flex-row flex-col text-sm justify-around items-center px-10 mx-10 text-sky-500">
              <label>Date</label>
              <input
                className="sm:w-2/3 min-w-32 rounded-xl p-2 border-2 border-sky-200/100 sm:border-sky-200/100 focus:outline-none"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label>Hr</label>
              <select
                className="min-w-32 rounded-xl p-2 border-2 border-sky-200/100 sm:border-sky-200/100 focus:outline-none"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <label>Min</label>
              <select
                className="min-w-32 rounded-xl p-2 border-2 border-sky-200/100 sm:border-sky-200/100 focus:outline-none"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              >
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modalFooter">
            <div className="flex"></div>
            <div className="flex justify-center mt-3">
              <button
                className="w-56 rounded-full p-2 m-2 font-bold text-lg text-white sm:bg-gradient-to-r sm:from-pink-500 sm:to-yellow-500 sm:hover:from-yellow-500 sm:hover:to-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500"
                onClick={handleUpdate}
              >
                Update List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateListsModal;
