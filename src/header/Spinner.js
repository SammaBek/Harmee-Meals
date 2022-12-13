const Spinner = () => {
  return (
    <div className="fixed inset-0 top-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-30">
      <div className="flex ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-cyan-800 animate-spin sm:w-14 sm:h-14"
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
        <span className="my-auto text-base sm:text-lg text-cyan-800">
          {" "}
          Processing...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
