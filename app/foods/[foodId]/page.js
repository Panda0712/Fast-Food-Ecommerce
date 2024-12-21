import { getFood, getFoods, getRelatedFoods } from "../../_lib/actions";

import Cart from "../../_components/Cart";
import FoodItem from "../../_components/FoodItem";
import HomeSlider from "../../_components/HomeSlider";
import SpecificFood from "../../_components/SpecificFood";

const Page = async ({ params }) => {
  const [{ food }, { foods }] = await Promise.all([
    getFood(params.foodId),
    getFoods(),
  ]);

  const handleGetContentBasedFood = async () => {
    const response = await fetch(
      "https://fast-food-recommendation-system-server.onrender.com/api/content-based",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name:
            food.name.charAt(0).toLowerCase() !== food.name.charAt(0)
              ? food.name.toLowerCase().trim().split(" ").join(", ")
              : food.name,
          top_n: 10,
        }),
      }
    );

    const contentBasedData = await response.json();
    return contentBasedData;
  };

  const contentBasedFood = await handleGetContentBasedFood();

  const { relatedFoods } = await getRelatedFoods(food.category, params.foodId);

  let filterFoods = [...relatedFoods];

  if (relatedFoods.length <= 0)
    filterFoods = foods
      .filter((food) => food.id !== Number(params.foodId))
      .slice(0, 8);

  return (
    <>
      <HomeSlider foods={foods} />
      <SpecificFood food={food} />

      <div className="border-2 border-t-slate-300 bg-[url('/bg-top.png')] bg-center bg-cover px-2 md:px-12 pt-16 pb-24">
        <h2 className="text-xl font-bold text-center">
          Các mặt hàng liên quan
        </h2>
        <div className="mt-16 flex justify-center items-center flex-wrap gap-4 md:gap-8">
          {contentBasedFood?.length > 0
            ? contentBasedFood?.map((food) => (
                <FoodItem key={food.id} food={food} />
              ))
            : filterFoods?.map((food) => (
                <FoodItem key={food.id} food={food} />
              ))}
        </div>
      </div>
      <Cart />
    </>
  );
};

export default Page;
