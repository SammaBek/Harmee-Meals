import react from "react";
import UserInputComp from "./UserInputComp";
const UserSignIn = () => {
  return (
    <div className="h-auto max-w-md mx-auto mt-10 rounded-lg shadow-xl bg-blue-50">
      <h1 className="py-8 text-xl text-center">Welcome To Sign In page</h1>
      <div></div>

      <div className="flex mb-10 space-x-5">
        <div className="grid grid-flow-row ml-10 space-y-2">
          <label>Email</label>
          <label>Password</label>
        </div>

        <div className="grid grid-flow-row space-y-2">
          <UserInputComp
            //   ref={emailInput}
            input={{
              type: "email",
              placeholder: "Email",
              className: "w-40 px-3 rounded-lg ",
            }}
          />

          <UserInputComp
            //   ref={emailInput}
            input={{
              type: "email",
              placeholder: "Email",
              className: "w-40 px-3 rounded-lg",
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-1 mb-10 ml-10 bg-red-400 rounded-lg hover:bg-red-500"
      >
        Sign In
      </button>
    </div>
  );
};

export default UserSignIn;
