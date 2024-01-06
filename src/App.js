import { useState } from "react";
import "./index";
import DataCard from "./Components/DataCard";
import { toast } from "react-toastify";
import EditModal from "./Components/EditModal";

function App() {
  const [dataName, setDataName] = useState(" "); //input a yazılan verilerin tutulduğu state
  const [datas, setDatas] = useState([]); // Oluşturulan dizinin tutulduğu state
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleted] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleData = (e) => {
    e.preventDefault();
    if (!dataName.trim()) {
      toast.warn("Please Enter Data", { autoClose: 1500 });
      return;
    }
    const newData = {
      id: new Date().getTime(),
      title: dataName,
      date: new Date().toLocaleString(),
      isConfirm: false,
    };
    setDatas([...datas, newData]);
    setDataName(" ");
    toast.success("Data Added", { autoClose: 1500 });
  };
  const handleModal = (id) => {
    setDeleted(id);
    setShowConfirm(true);
  };
  //Delete Button
  const dataDelete = (id) => {
    const filtred = datas.filter((item) => item.id !== id);
    setDatas(filtred);
    toast.error("Data Deleted", { autoClose: 1500 });
  };
  const handleEditData = () => {
    const index = datas.findIndex((data) => data.id === editItem.id);
    const cloneData = [...datas];
    cloneData.splice(index, 1, editItem);
    setDatas(cloneData);
    setShowEditModal(false);
  };
  //Confirm
  const dataComplete = (data) => {
    const updateData = { ...data, isConfirm: !data.isConfirm };
    const cloneData = [...datas];
    const index = cloneData.findIndex((item) => item.id === data.id);
    cloneData.splice(index, 1, updateData);
    setDatas(cloneData);
  };
  return (
    <div className="App">
      <div>
        {/* Header*/}
        <div className="bg-transparent text-light fs-3 fs-5 text-center p-3">
          Create a List
        </div>
        {/*Form*/}
        <div className="form-container">
          {/*form*/}
          <form onSubmit={handleData} className="form-area">
            <input
              onChange={(e) => {
                setDataName(e.target.value);
              }}
              type="text"
              className="input-area"
              placeholder="Enter prompt here"
              value={dataName}
            />
            <button className="submit-button">Add</button>
          </form>
        </div>
        <div className="data-area">
          {/*Alert*/}
          {datas.length === 0 && <h4>Please Add Something</h4>}
          {datas.map((data) => (
            <DataCard
              key={data.id}
              data={data}
              handleModal={handleModal}
              dataComplete={dataComplete}
              setShowEditModal={setShowEditModal}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
      {/*modal*/}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner">
            <h5>Do You Want to Delete</h5>
            <button
              className="submit-button"
              onClick={() => setShowConfirm(false)}
            >
              Reject
            </button>
            <button
              className="submit-button"
              onClick={() => {
                dataDelete(deleteId);
                setShowConfirm(false);
              }}
            >
              Approve
            </button>
          </div>
        </div>
      )}
      {/*Edit Modal*/}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setEditItem={setEditItem}
          editItem={editItem}
          handleEditData={handleEditData}
        />
      )}
    </div>
  );
}

export default App;
