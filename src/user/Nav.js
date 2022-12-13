import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Nav = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="grid">
      <div className=" flex py-1 mx-auto gap-3 p-1 px-2  mt-2 overflow-x-auto  rounded-xl shadow-2xl sm:p-2  w-[100%] sm:w-[80%] lg:w-[75%] ">
        <div>
          <NavLink
            to="/userpage"
            className={`flex gap-1 p-3 rounded-lg shadow-2xl ${
              location.pathname === "/userpage" ? "bg-red-200" : "bg-stone-200"
            }  md:gap-0 lg:gap-1 hover:border-red-200 `}
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
                className="w-3 h-3 text-slate-600 sm:mx-auto sm:w-5 sm:h-5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <span className="text-slate-600 md:text-base">Profile</span>
          </NavLink>
        </div>

        <div>
          <NavLink
            activeClassName="text-red-400 bg-red-200 "
            to="/userpage/editpage"
            className={`flex gap-1 p-3 rounded-lg shadow-2xl ${
              location.pathname === "/userpage/editpage"
                ? "bg-red-200"
                : "bg-stone-200"
            } md:gap-0 lg:gap-1 hover:border-red-200`}
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
                className="w-3 h-3 text-slate-600 sm:mx-auto sm:w-5 sm:h-5"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </span>

            <div className="flex gap-1 md:text-base">
              <span className="text-slate-600">Edit</span>
              <span className="text-slate-600 ">Profile</span>
            </div>
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/userpage/resetpassword"
            activeClassName="text-red-400 bg-red-200"
            className={`flex gap-1 p-3 rounded-lg shadow-2xl md:gap-0 lg:gap-1 hover:border-red-200 ${
              location.pathname === "/userpage/resetpassword"
                ? "bg-red-200"
                : "bg-stone-200"
            }`}
          >
            <svg
              className="w-3 h-3 text-slate-600 sm:mx-auto sm:w-5 sm:h-5"
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

            <div className="flex gap-1 md:text-base">
              <span className="text-slate-600 ">Reset</span>
              <span className="text-slate-600 ">Password</span>
            </div>
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/user/addproduct"
            className="flex gap-1 p-3 rounded-lg shadow-2xl md:gap-0 lg:gap-1 hover:border-red-200 bg-stone-200"
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
              className="w-3 h-3 text-slate-600 sm:mx-auto sm:w-5 sm:h-5"
            >
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span className="text-slate-600 md:text-base">+Product</span>
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/user/products"
            className="flex gap-1 p-3 rounded-lg shadow-2xl md:gap-0 lg:gap-1 hover:border-red-200 bg-stone-200"
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
              className="w-3 h-3 text-slate-600 sm:mx-auto sm:w-5 sm:h-5"
            >
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span className="text-slate-600 md:text-base">Products</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
