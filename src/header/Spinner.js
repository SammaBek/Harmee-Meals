const Spinner = () => {
  return (
    <div className=" mt-36">
      <div className="flex justify-center w-1/4 mx-auto my-auto bg-orange-100 rounded-lg justify-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
          />
        </svg>
        Processing...
      </div>
    </div>
  );
};

export default Spinner;
