import React, { Fragment } from "react";

const UserInputComp = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <input
        // className="w-32 px-3 rounded-lg"
        // type={props.type}
        // placeholder={props.placeholder}
        ref={ref}
        {...props.input}
      ></input>
    </Fragment>
  );
});

export default UserInputComp;
