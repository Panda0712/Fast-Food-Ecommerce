import { getFoods } from "./_lib/actions";

import HomeSlider from "./_components/HomeSlider";
import Introduce from "./_components/Introduce";

const page = async () => {
  const { foods, error } = await getFoods();

  if (error) {
    toast.error(error.message);
  }

  return (
    <div>
      <HomeSlider foods={foods} />
      <Introduce />
    </div>
  );
};

export default page;
