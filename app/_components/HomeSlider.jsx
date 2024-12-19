/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  faBowlFood,
  faMoneyBill,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

import Carousel from "react-multi-carousel";
import Button from "./Button";
import { useUser } from "@clerk/nextjs";
import { getSpecificUser } from "../_lib/actions";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../_lib/helper";

const HomeSlider = ({ foods }) => {
  const [guestData, setGuestData] = useState();
  const [foodData, setFoodData] = useState([]);
  const [isRating, setIsRating] = useState(false);

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress.emailAddress;
  const router = useRouter();

  const checkExistingUser = async (email) => {
    const { guest } = await getSpecificUser(email);
    return guest;
  };

  const handleClick = (id) => {
    router.push(`/foods/${id}`);
  };

  useEffect(() => {
    if (userEmail) {
      checkExistingUser(userEmail).then(async (data) => {
        setGuestData(data);
        console.log(data);

        if (data?.id) {
          const response = await fetch(
            "https://fast-food-recommendation-system-server.onrender.com/api/user-content-based",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                guest_id: data.id.toString(),
                top_n: 15,
              }),
            }
          );

          const contentBasedData = await response.json();
          setFoodData(contentBasedData);
          setIsRating(false);
        } else {
          const response = await fetch(
            "https://fast-food-recommendation-system-server.onrender.com/api/rating-based",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const ratingBasedData = await response.json();
          setFoodData(ratingBasedData);
          setIsRating(true);
        }
      });
    }
  }, [userEmail]);

  console.log(foodData);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 550 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <>
      <h1 className="text-2xl bg-slate-100 font-semibold text-center px-2 py-12">
        {isRating ? "Các món ăn được yêu thích nhất" : "Gợi ý phù hợp cho bạn"}
      </h1>
      <div className="pb-[50px] px-0 h-[400px] rounded-md">
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={2000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {foodData.length > 0 &&
            foodData.map((food) => (
              <div key={food.id} className="relative h-[400px]">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute z-[10] bottom-[20px] left-[20px] text-white">
                  <ul className="mb-[15px] list-none flex items-center wrap gap-[15px] p-0 bg-[#233142] py-[10px] px-[15px] rounded-[10px]">
                    <li className="shadow-sm flex items-center gap-[5px]">
                      <span className="text-sm">🍽️</span>
                      <span className="text-sm">
                        {capitalizeFirstLetter(food.name)}
                      </span>
                    </li>
                    <li className="shadow-sm flex items-center gap-[5px]">
                      <span className="text-sm">💴</span>
                      <span className="text-sm">{food.regularPrice}</span>
                    </li>
                    <li className="shadow-sm flex items-center gap-[5px]">
                      <span className="text-sm">🔖</span>
                      <span className="text-sm">{food.discount}</span>
                    </li>
                    <li className="shadow-sm flex items-center gap-[5px]">
                      <span className="mb-0 text-sm">⭐</span>
                      <span className="text-sm mb-0">{food.rating}</span>
                    </li>
                  </ul>

                  <Button
                    type="order"
                    className="border-none px-2 py-3 font-medium uppercase"
                    onClick={() => handleClick(food.id)}
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default HomeSlider;
