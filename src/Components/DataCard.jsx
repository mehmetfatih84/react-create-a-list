const DataCard = ({
  data,
  dataDelete,
  dataComplete,
  handleModal,
  setEditItem,
  setShowEditModal,
}) => {
  return (
    <div className="data-container-area">
      <div className="card-container">
        <div className="title-area">
          <h2 style={{ color: data.isConfirm ? "red" : "none" }}>
            {" "}
            {data.title}
          </h2>
          <p>{data.date}</p>
        </div>
        <div className="button-team">
        <button
          className="submit-button"
          onClick={() => handleModal(data.id)}
        >
          Delete
        </button>
        <button
          className="submit-button"
          onClick={() => {
            setEditItem(data);
            setShowEditModal(true);
          }}
        >
          Edit
        </button>
        <button
          className="submit-button"
          onClick={() => dataComplete(data)}
        >
          {data.isConfirm ? "Approved" : "Unapproved"}
        </button>
        </div>
      </div>
    </div>
  );
};
export default DataCard;
