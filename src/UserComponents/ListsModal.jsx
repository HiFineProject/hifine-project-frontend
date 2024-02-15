import { useState, useEffect } from "react";
import axios from "axios";

const ListsModal = ({ setOpenModal, setReload }) => {
  const [title, setTitle] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");

  const handleButtonClick = async () => {
    try {
      const dateTime = `${date} ${hour}:${minute}`;
      const newList = {
        title,
        todoItem: { items: todoItems },
        dateTime,
      };
      const response = await axios.post("http://127.0.0.1:3000/lists", newList);

      if (response.status === 200 || response.status === 201) {
        console.log("List created successfully:", response.data);
        setOpenModal(false); // Close the modal when list is successfully created
        setReload(true);
      } else {
        console.error(
          "Failed to create list. Unexpected status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error creating list:", error.message);
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
    <div className="flex fixed top-0 left-0 w-full h-full justify-center items-center sm:mx-auto z-10 backdrop-blur-md">
      <div className="flex flex-col sm:w-[640px] mx-auto bg-white rounded-lg p-5 border-4">
        <div className="flex justify-between mx-2 pb-3 text-center items-center">
          <div className="w-[50px]"></div>
          <div>
            <h2>Create List</h2>
          </div>
          <button onClick={() => setOpenModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
            >
              <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            className="border-2 p-3"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <ul className="flex flex-col gap-2">
            {todoItems.map((item, index) => (
              <li key={index}>
                <input
                  className="border-2 w-full"
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
              className="bg-blue-400 w-1/2 rounded-full p-2 m-2"
              onClick={() => setTodoItems([...todoItems, ""])}
            >
              Add Item
            </button>
          </div>
          <div className="flex justify-around items-center px-10">
            <label>Date</label>
            <input
              className="border-2 p-2"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Hr</label>
            <select
              className="border-2 p-2"
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
              className="border-2 p-2"
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
          <div className="flex justify-center">
            <button
              className="bg-orange-400 w-1/2 rounded-full p-2 m-2"
              onClick={handleButtonClick}
            >
              Add List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListsModal;
