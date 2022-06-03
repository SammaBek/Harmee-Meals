import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
const UserPageNav = (props) => {
  const location = useLocation();
  console.log(location.pathname);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);

  const toggleHandler = () => {
    setShow((prev) => !prev);
    console.log(show);
  };

  const changeShow = () => {
    setShow((prev) => !prev);
    setVisible(false);
  };

  return (
    <div className={` `}>
      <div className="grid px-4 sm:hidden">
        {!show && (
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
            class=" "
            onClick={toggleHandler}
          >
            <line x1="21" y1="10" x2="3" y2="10"></line>
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="14" x2="3" y2="14"></line>
            <line x1="21" y1="18" x2="3" y2="18"></line>
          </svg>
        )}
        {show && (
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
            class="feather feather-x"
            onClick={changeShow}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </div>

      <div className="sm:hidden">{show && <Nav />}</div>

      <div className="hidden sm:block">
        <Nav />
      </div>
    </div>
  );
};

export default UserPageNav;
