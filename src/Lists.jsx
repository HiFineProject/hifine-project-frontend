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
        const response = await axios.get("http://127.0.0.1:3000/lists");
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
      <div className="flex justify-center sm:w-[640px] mx-auto border-2 border-black rounded-xl mt-2">
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
      <div className="grid grid-cols-3 w-[640px] mx-auto mt-5 gap-5">
        {lists.map((list, listIndex) => (
          <div key={list._id} className="flex flex-col border-2 p-3">
            <div className="flex flex-col justify-center items-center">
              <h1>{list.title}</h1>
              <div className="flex text-nowrap">
                <p>{list.dateTime}</p>
              </div>
            </div>
            <ul className="flex flex-col items-center">
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
            <div className="flex justify-between">
            <button onClick={() => handleEdit(list)}>Edit</button>
              <button onClick={() => handleDelete(list._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default Lists;
