const liCSS =
  "p-3 border text-gray-700 hover:text-white hover:bg-indigo-700 cursor-pointer bg-white";

const DropdownEdit = ({setOpenEdit, editPost, deletePost}) => {
  return (
    <div className="shadow h-auto text-nowrap absolute">
      <ul className="text-center">
        <li className={liCSS} onClick={() => {editPost(postId), setOpenEdit(false)}}>
          Edit
        </li>
        <li className={liCSS} onClick={() => {deletePost(postId), setOpenEdit(false)}}>
          Delete
        </li>
      </ul>
    </div>
  );
};

export default DropdownEdit;
