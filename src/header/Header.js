const Header = () => {
  return (
    <nav className="bg-gray-500 ">
      <div className="flex justify-between px-5 py-2">
        <div className="flex space-x-5 ">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <h1 className="flex items-center text-xl justify">Harmee Meal</h1>
        </div>
        <div className="flex items-center mr-10 space-x-5 justify-items-center">
          <a
            href="/signup"
            className="px-2 py-0 bg-blue-400 rounded-lg h-7 hover:bg-blue-600"
          >
            Sign Up
          </a>
          <button className="px-2 bg-red-400 rounded-lg h-7">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
