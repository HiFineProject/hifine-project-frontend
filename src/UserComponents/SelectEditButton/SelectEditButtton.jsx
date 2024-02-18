import { useEffect, useRef, useState } from "react";
import DropdownEdit from "./DropdownEdit";

const SelectEditButton = ({ editPost, deletePost }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const dropEdit = useRef(null);

  function handleEditDropdown(e) {
    if (!e.target.closest(`.${dropEdit.current.className}`) && openEdit) {
      setOpenEdit(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleEditDropdown);
    return () => {
      document.removeEventListener("click", handleEditDropdown);
    };
  }, [openEdit]);

  return (
    <div
      className="editdrop"
      ref={dropEdit}
      style={{
        width: "auto",
        display: "inline",
      }}
    >
      <button
        className="flex items-center"
        onClick={() => setOpenEdit((openEdit) => !openEdit)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      </button>
      {openEdit && (
        <DropdownEdit
          editPost={editPost}
          deletePost={deletePost}
          setOpenEdit={setOpenEdit}
        />
      )}
    </div>
  );
};

export default SelectEditButton;
