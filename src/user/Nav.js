import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Nav = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className={` `}>
      <div
        className={`grid bg-gray-400 p-1 sm:bg-transparent grid-flow-row gap-2 sm:gap-0 absolute sm:static  rounded-lg  px-3 mt-5 sm:justify-between sm:flex sm:text-sm md:text-base sm:w-full`}
      >
        <NavLink
          activeClassName='"underline underline-offset-4 text-red-400"'
          to="/userpage"
          className="flex gap-1 md:gap-0 lg:gap-1 hover:border-gray-400 hover:border hover:rounded-xl "
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 text-white sm:mx-auto sm:w-5 sm:h-5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span className="text-white ">Profile</span>
        </NavLink>

        <NavLink
          activeClassName="underline underline-offset-4 text-red-400"
          to="/userpage/editpage"
          className="flex gap-1 md:gap-0 lg:gap-1 hover:border-gray-400 hover:border hover:rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 text-white sm:mx-auto sm:w-5 sm:h-5"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <span className="text-white ">Edit Profile</span>
        </NavLink>

        <NavLink
          to="/userpage/resetpassword"
          activeClassName="underline underline-offset-4 text-red-400"
          className="flex gap-1 md:gap-0 lg:gap-1 hover:border-gray-400 hover:border hover:rounded-xl"
        >
          <svg
            className="w-3 h-3 text-white sm:mx-auto sm:w-5 sm:h-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
          <span className="text-white ">Reset Password</span>
        </NavLink>

        <NavLink
          to="/user/addproduct"
          className="flex gap-1 md:gap-0 lg:gap-1 hover:border-gray-400 hover:border hover:rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 text-white sm:mx-auto sm:w-5 sm:h-5"
          >
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="text-white ">+Product</span>
        </NavLink>

        <NavLink
          to="/user/products"
          className="flex gap-1 md:gap-0 lg:gap-1 hover:border-gray-400 hover:border hover:rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 text-white sm:mx-auto sm:w-5 sm:h-5"
          >
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="text-white ">Products</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
