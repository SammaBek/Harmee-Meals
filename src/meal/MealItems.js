import react from "react";
const MealItems = (props) => {
  return (
    <section className="h-20 max-w-lg py-2 mx-auto mt-5 transform rounded-lg shadow-2xl bg-red-50 hover:-translate-y-3">
      <div className="grid grid-flow-col mx-auto mt-6 ml-12 text-xl">
        <div>{props.name}</div>
        <div>{props.price}</div>
        <div>{props.description}</div>
        <button
          type="submit"
          className="w-16 h-8 bg-red-400 rounded-lg hover:bg-red-500"
        >
          + ADD
        </button>
      </div>
    </section>
  );
};

export default MealItems;
