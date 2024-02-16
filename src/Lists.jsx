import { useEffect, useState } from "react";
import UserLayout from "./UserComponents/UserLayout";
import ListsModal from "./UserComponents/ListsModal";
import UpdateListsModal from "./UserComponents/UpdateListsModal";
import axios from "axios";

const Lists = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false); // Changed from useEffect to useState
  const [reload, setReload] = useState(false);
  const [lists, setLists] = useState([]);
  const [editedList, setEditedList] = useState(null);

  const toggleCrossed = (listIndex, itemIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].crossedItems[itemIndex] =
      !updatedLists[listIndex].crossedItems[itemIndex];
    setLists(updatedLists);
  };

  useEffect(() => {
    const getLists = async () => {
      try {
        const response = await axios.get("https://hifine-project-backend.onrender.com/lists");
        if (response.status === 200 || response.status === 201) {
          const updatedLists = response.data.map((list) => ({
            ...list,
            crossedItems: new Array(list.todoItem.items.length).fill(false),
          }));
          setLists(updatedLists);
        } else {
          console.log("Error getting data:", response);
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };
    getLists();
  }, [reload]);

  const handleEdit = (list) => {
    setEditedList(list);
    setEditModal(true);
  };

  const handleDelete = async (listId) => {
    console.log("Deleting list with ID:", listId); // Log the listId before sending the delete request
    try {
      const response = await axios.delete(
        `https://hifine-project-backend.onrender.com/lists/${listId}`
      );
      if (response.status === 200) {
        setReload(!reload);
      } else {
        console.log("Error deleting list:", response);
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <UserLayout>
      <div className="flex justify-center font-bold text-2xl sm:w-[640px] mx-auto rounded-xl mt-5 text-sky-500 border-2 sm:border-sky-500/100 focus:outline-none">
        <button
          className="w-full h-full"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add to-do-lists
        </button>
      </div>
      {openModal && (
        <ListsModal setOpenModal={setOpenModal} setReload={setReload} />
      )}
      {editModal && (
        <UpdateListsModal
          setEditModal={setEditModal}
          setReload={setReload}
          editedList={editedList}
        />
      )}
      <div className="grid grid-cols-3 w-[640px] mx-auto mt-5 p-5 rounded-3xl bg-gradient-to-r from-sky-500 to-emerald-500">
        {lists.map((list, listIndex) => (
          <div key={list._id} className="flex flex-col border-2 p-3 m-2 rounded-3xl bg-white shadow-xl justify-end">
            <div className="flex flex-col items-center">
              <h1>{list.title}</h1>
              <div className="flex text-nowrap ">
                <p>{list.dateTime}</p>
              </div>
            </div>
            <ul className="flex flex-col items-center h-2/4 max-h-full overflow-y-auto">
              {list.todoItem.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  style={{
                    textDecoration: list.crossedItems[itemIndex]
                      ? "line-through"
                      : "",
                  }}
                  onClick={() => toggleCrossed(listIndex, itemIndex)}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between p-4 h-1/4">
              <button onClick={() => handleEdit(list)}>{/* Edit */}
                <svg height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="green" d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" />
                  <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" />
                </svg>
              </button>
              <button onClick={() => handleDelete(list._id)}>{/* Delete */}
                <svg height="25px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>ic_fluent_delete_48_regular</title>
                  <desc>Created with Sketch.</desc>
                  <g id="🔍-Product-Icons" stroke="none" fill="none">
                    <g id="ic_fluent_delete_48_regular" fill="#212121">
                      <path fill="red" d="M24,7.25 C27.1017853,7.25 29.629937,9.70601719 29.7458479,12.7794443 L29.75,13 L37,13 C37.6903559,13 38.25,13.5596441 38.25,14.25 C38.25,14.8972087 37.7581253,15.4295339 37.1278052,15.4935464 L37,15.5 L35.909,15.5 L34.2058308,38.0698451 C34.0385226,40.2866784 32.1910211,42 29.9678833,42 L18.0321167,42 C15.8089789,42 13.9614774,40.2866784 13.7941692,38.0698451 L12.09,15.5 L11,15.5 C10.3527913,15.5 9.8204661,15.0081253 9.75645361,14.3778052 L9.75,14.25 C9.75,13.6027913 10.2418747,13.0704661 10.8721948,13.0064536 L11,13 L18.25,13 C18.25,9.82436269 20.8243627,7.25 24,7.25 Z M33.4021054,15.5 L14.5978946,15.5 L16.2870795,37.8817009 C16.3559711,38.7945146 17.116707,39.5 18.0321167,39.5 L29.9678833,39.5 C30.883293,39.5 31.6440289,38.7945146 31.7129205,37.8817009 L33.4021054,15.5 Z M27.25,20.75 C27.8972087,20.75 28.4295339,21.2418747 28.4935464,21.8721948 L28.5,22 L28.5,33 C28.5,33.6903559 27.9403559,34.25 27.25,34.25 C26.6027913,34.25 26.0704661,33.7581253 26.0064536,33.1278052 L26,33 L26,22 C26,21.3096441 26.5596441,20.75 27.25,20.75 Z M20.75,20.75 C21.3972087,20.75 21.9295339,21.2418747 21.9935464,21.8721948 L22,22 L22,33 C22,33.6903559 21.4403559,34.25 20.75,34.25 C20.1027913,34.25 19.5704661,33.7581253 19.5064536,33.1278052 L19.5,33 L19.5,22 C19.5,21.3096441 20.0596441,20.75 20.75,20.75 Z M24,9.75 C22.2669685,9.75 20.8507541,11.1064548 20.7551448,12.8155761 L20.75,13 L27.25,13 C27.25,11.2050746 25.7949254,9.75 24,9.75 Z" id="🎨-Color">
                      </path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>

        ))}
      </div>
    </UserLayout>
  );
};

export default Lists;