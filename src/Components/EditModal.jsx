import { useState } from "react";

const EditModal = ({
  setShowEditModal,
  setEditItem,
  editItem,
  handleEditData,
}) => {
  const [newDataName, setNewDataName] = useState("");

  const handleSave = () => {


    setShowEditModal(false);
  };

  return (
    <div className="confirm-modal">
      <div className="modal-inner">
        <input
        className="edit-input"
          type="text"
          placeholder="Edit"
          onChange={(e) => setEditItem({
            ...editItem, 
            title: e.target.value,
            date: new Date().toLocaleString(),
        })}
        />
        <button className="submit-button"
          onClick={() => {
            setShowEditModal(false);
          }}
        >
          Reject
        </button>
        <button className="submit-button"
          onClick={() => {
         
            handleEditData();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default EditModal;
