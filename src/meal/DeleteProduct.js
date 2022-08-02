const DeleteProduct = (props) => {
  const cancelHandler = (event) => {
    event.preventDefault();
    props.cancelDel();
  };
  return (
    <div className="fixed inset-0 top-0 left-0 right-0 z-50 flex bg-black bg-opacity-75">
      <div className="mx-auto my-auto border rounded-lg shadow-2xl w-80 h-36">
        <div className="p-5 my-auto">
          <label className="text-white ">
            Are you sure you want to delete this product?
          </label>
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-8 py-1 bg-green-300 rounded-lg">Yes</button>
            <button
              onClick={cancelHandler}
              className="px-8 py-1 bg-red-300 rounded-lg"
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
