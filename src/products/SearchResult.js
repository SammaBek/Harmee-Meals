const SearchResult = (props) => {
  const detailHandler = () => {};
  return (
    <div
      onClick={detailHandler}
      className="h-56 gap-5 sm:h-52 sm:gap-1 mb-2 border border-gray-100 rounded-lg shadow-2xl sm:w-[95%] sm:mt-1  sm:shadow-lg sm:flex sm:p-2 sm:border sm:border-gray-300"
    >
      <div className="h-32 my-auto w-52 sm:w-[80%] sm:h-40">
        <img
          className="h-32 w-52 sm:w-[100%] sm:h-36 sm:rounded-md"
          src={`http://localhost:8000/${props.image}`}
          alt="pic"
        />
      </div>
      <div className="grid grid-flow-row gap-1 my-auto ml-2 sm:w-[60%]">
        <div className="text-xs font-bold">{props.name}</div>
        <div className="text-xs text-blue-500">{`$${props.price}`}</div>
        <div className="text-xs">{props.description}</div>
        <div className="flex gap-2">
          <label className="text-xs">Status:</label>
          <label className="text-xs">{props.status}</label>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
