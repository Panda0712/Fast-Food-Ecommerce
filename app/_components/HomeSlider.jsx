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

const HomeSlider = ({ foods }) => {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/foods/${id}`);
  };

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
        {foods.length > 0 &&
          foods.map((food) => (
            <div key={food.id} className="relative h-[400px]">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute z-[10] bottom-[20px] left-[20px] text-white">
                <ul className="mb-[15px] list-none flex items-center wrap gap-[15px] p-0 bg-[#233142] py-[10px] px-[15px] rounded-[10px]">
                  <li className="shadow-sm flex items-center gap-[5px]">
                    <FontAwesomeIcon
                      icon={faBowlFood}
                      style={{ fontSize: 16, color: "white" }}
                    />
                    <span className="text-sm">{food.name}</span>
                  </li>
                  <li className="shadow-sm flex items-center gap-[5px]">
                    <FontAwesomeIcon
                      icon={faMoneyBill}
                      style={{ fontSize: 16, color: "white" }}
                    />
                    <span className="text-sm">{food.regularPrice}</span>
                  </li>
                  <li className="shadow-sm flex items-center gap-[5px]">
                    <FontAwesomeIcon
                      icon={faTag}
                      style={{ fontSize: 16, color: "white" }}
                    />
                    <span className="text-sm">{food.discount}</span>
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
  );
};

export default HomeSlider;
