const ProductDetail = (props) => {
  return (
    <div className="grid grid-flow-row ml-6 w-[75%] sm:h-[95%] mb-2 md:h-[95%]  bg-white shadow-2xl border border-gray-100 rounded-lg h-60 md:w-[97%] sm:w-[97%] xl:p-2 xl:h-64 lg:w-[96%] xl:w-[96%]">
      <div className="h-48 md:h-[100%] p-2 w-[100%] sm:w-[100%] sm:h-[100%] md:p-1  md:w-[100%] lg:w-[100%] ">
        <img
          className=" w-[100%] h-[95%]   md:w-[96%] sm:h-28 md:h-36 lg:h-48 lg:w-[95%] xl:w-[96%] mx-auto"
          src={`http://localhost:8000/${props.image}`}
          alt="pic"
        />
      </div>
      <div className="ml-1 sm:text-xs md:text-sm">{props.name}</div>
      <div className="ml-1 text-green-300 sm:text-xs md:text-sm">{`$${props.price}`}</div>
    </div>
  );
};

export default ProductDetail;
