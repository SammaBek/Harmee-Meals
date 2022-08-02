const SearchResult = (props) => {
  const detailHandler = () => {};
  return (
    <div
      onClick={detailHandler}
      className="h-56 gap-5 sm:h-52 md:h-52 md:ml-4 lg:ml-16 xl:ml-20 lg:h-60 sm:gap-1 mb-2 border border-gray-100 rounded-lg shadow-2xl sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] sm:mt-1  sm:shadow-lg sm:flex sm:p-2 sm:border sm:border-gray-300"
    >
      <div className="h-32 my-auto  w-52 sm:w-[80%] md:w-60 lg:w-72 sm:h-40 md:h-40 lg:h-52">
        <img
          className="h-32 w-52 md:h-[90%] lg:h-[90%] sm:w-[100%] md:w-[100%] sm:h-36 sm:rounded-md"
          src={`http://localhost:8000/${props.image}`}
          alt="pic"
        />
      </div>
      <div className="grid grid-flow-row gap-1 my-auto ml-2 sm:w-[60%] md:w-[65%] lg:ml-7 lg:w-[50%]">
        <div className="text-xs font-bold md:text-base lg:text-lg">
          {props.name}
        </div>
        <div className="text-xs text-blue-500 md:text-base lg:text-lg">{`$${props.price}`}</div>
        <div className="text-xs md:text-base lg:text-lg">
          {props.description}
        </div>
        <div className="flex gap-2">
          <label className="text-xs md:text-base lg:text-lg">Status:</label>
          <label className="text-xs md:text-base lg:text-lg">
            {props.status}
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
