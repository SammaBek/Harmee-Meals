import { react } from "react";
import MealItems from "./MealItems";
const Meal = () => {
  const Meals = [
    {
      id: "1",
      name: "Burger",
      price: 200,
      description: "good burger",
    },
    { id: "2", name: "Burger", price: 200, description: "good burger" },
    { id: "3", name: "Burger", price: 200, description: "good burger" },
  ];

  return (
    <section>
      {Meals.map((item) => {
        return (
          <MealItems
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        );
      })}
    </section>
  );
};
export default Meal;
