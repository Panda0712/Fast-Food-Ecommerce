/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../_config/firebase";
import { useCart } from "../_context/CartContext";
import { capitalizeFirstLetter, formatVND } from "../_lib/helper";

import { useUser } from "@clerk/nextjs";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSpecificUser, updateSpecificFood } from "../_lib/actions";
import Button from "./Button";
import toast from "react-hot-toast";

const SpecificFood = ({ food }) => {
  const [reviews, setReviews] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [guestData, setGuestData] = useState();
  const [rating, setRating] = useState(0);
  const [ratingsData, setRatingsData] = useState([]);

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress.emailAddress;

  const { addToCart } = useCart();

  const handleGetComments = () => {
    const reviewQuery = query(
      collection(db, "reviews"),
      where("name", "==", capitalizeFirstLetter(food.name))
    );

    const unsubcribe = onSnapshot(reviewQuery, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(items);
    });

    return () => unsubcribe();
  };

  const checkExistingUser = async (email) => {
    const { guest } = await getSpecificUser(email);
    return guest;
  };

  const getFoodRating = (userId) => {
    const ratingQuery = query(
      collection(db, "ratings"),
      where("name", "==", capitalizeFirstLetter(food.name))
    );

    const unsubcribe = onSnapshot(ratingQuery, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRatingsData(items);

      if (items.length > 0) {
        console.log(userId);
        const ratingUser = items[0]?.ratings.filter(
          (item) => Number(item.userId) === Number(userId)
        );
        setRating(ratingUser[0]?.userRating ?? 0);
      }
    });

    return () => unsubcribe();
  };

  const handlePostComment = async () => {
    if (!commentValue) {
      toast.error("Vui lòng nhập bình luận!");
      return;
    }

    const commentData = {
      user: guestData?.fullName,
      userComments: commentValue,
      userId: guestData?.id,
    };
  };

  const handleDeleteComment = async () => {};

  const handleChangeRating = async (ratingValue) => {
    setRating(ratingValue);

    const ratingData = {
      user: user.fullName,
      userRating: ratingValue,
      userId: guestData?.id,
      photoUrl: user?.photoUrl ?? "",
      timestamp: new Date(),
    };

    const updatedFood = { ...food };

    if (ratingsData.length > 0) {
      const existingRatings = ratingsData[0].ratings;

      const updatedRatings = existingRatings.map((item) =>
        item.userId === guestData?.id
          ? { ...item, userRating: ratingValue }
          : item
      );

      const isUserRated = existingRatings.some(
        (item) => item.userId === guestData?.id
      );
      if (!isUserRated) {
        updatedRatings.push(ratingData);
      }

      const allRatingValue = updatedRatings.reduce(
        (acc, ratingCur) => acc + ratingCur.userRating,
        0
      );

      const ratingAverage = allRatingValue / updatedRatings.length;

      updatedFood.rating = ratingAverage;
      updatedFood.reviews_count = updatedFood.reviews_count
        ? updatedFood.reviews_count + 1
        : 1;

      await updateSpecificFood(updatedFood, food.id);

      const ratingDocRef = doc(db, `ratings/${ratingsData[0].id}`);
      await updateDoc(ratingDocRef, { ratings: updatedRatings });
    } else {
      const newRatingsDocRef = collection(db, "ratings");
      await addDoc(newRatingsDocRef, {
        name: capitalizeFirstLetter(food.name),
        ratings: [ratingData],
      });

      updatedFood.rating = ratingValue;
      updatedFood.reviews_count = updatedFood.reviews_count
        ? updatedFood.reviews_count + 1
        : 1;

      await updateSpecificFood(updatedFood, food.id);
    }
  };

  useEffect(() => {
    if (userEmail) {
      checkExistingUser(userEmail).then((data) => {
        setGuestData(data);

        getFoodRating(data.id);
      });
    }
    handleGetComments();
  }, [userEmail]);

  console.log(reviews);

  return (
    <div className="bg-[url('/bg-top-main.jpg')] relative bg-center bg-cover bg-i px-12 py-24 flex flex-wrap justify-center gap-6">
      <div className="relative">
        {food.discount > 0 && (
          <div className="absolute rounded-bl-md flex justify-center items-center right-0 w-20 h-7 bg-red-500">
            <span className="text-white">
              -{Math.floor((food.discount / food.regularPrice) * 100)}%
            </span>
          </div>
        )}
        <Image
          className="object-cover rounded-sm max-w-[300px] sm:max-w-[500px] max-h-[300px] h-auto"
          src={food.image}
          width={450}
          height={0}
          alt={`${food.name} image`}
        />
      </div>
      <div>
        <div className="relative">
          <span className="absolute right-5 font-semibold">
            ⭐ {food.rating}
          </span>
          <h3 className="text-xl mb-2 font-bold">
            {capitalizeFirstLetter(food.name)}
          </h3>
          <p className="text-base font-semibold mb-4 max-w-[400px]">
            {capitalizeFirstLetter(food.description)}
          </p>
          <span className="font-semibold">
            {food.discount > 0 ? (
              <div className="flex items-center gap-1">
                <span>Giá:</span>
                <span className="line-through text-sm">
                  {food.regularPrice}
                </span>
                <span className="font-bold text-xl text-red-600">
                  {formatVND(food.regularPrice - food.discount)}
                </span>
              </div>
            ) : (
              <p>Giá: {formatVND(food.regularPrice)}</p>
            )}
          </span>
          <div className="flex items-center pt-4">
            <span className="mr-2">Đánh giá của bạn:</span>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, ratingValue) => handleChangeRating(ratingValue)}
              defaultValue={rating}
            />
          </div>
          <Button
            onClick={() =>
              addToCart({
                id: food.id,
                foodName: food.name,
                regularPrice: food.regularPrice,
                discount: food.discount,
                totalPrice: food.regularPrice - food.discount,
                image: food.image,
                quantity: 1,
              })
            }
            type="fourth"
            className="mt-6"
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecificFood;
