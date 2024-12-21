/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../_config/firebase";
import { useCart } from "../_context/CartContext";
import { capitalizeFirstLetter, formatVND, parseTime } from "../_lib/helper";

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
          (item) => item.userId === userId
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
      user: user.fullName,
      userComments: commentValue,
      userId: user?.id,
      photoUrl: user?.photoUrl ?? "",
      timestamp: new Date(),
    };

    if (reviews.length > 0) {
      const reviewDocRef = doc(db, `reviews/${reviews[0].id}`);
      await updateDoc(reviewDocRef, {
        comments: arrayUnion(commentData),
      });
    } else {
      const reviewCollectionRef = collection(db, "reviews");
      await addDoc(reviewCollectionRef, {
        name: capitalizeFirstLetter(food.name),
        comments: [commentData],
      });
    }

    setCommentValue("");
  };

  const handleDeleteComment = async (index, reviewsData) => {
    try {
      const reviewDocRef = doc(db, `reviews/${reviewsData.id}`);
      await updateDoc(reviewDocRef, {
        comments: arrayRemove(reviewsData.comments[index]),
      });
      toast.success("Xóa bình luận thành công");
    } catch (error) {
      console.log(error);
      toast.error("Xóa bình luận thất bại");
    }
  };

  const handleChangeRating = async (ratingValue) => {
    setRating(ratingValue);

    const ratingData = {
      user: user.fullName,
      userRating: ratingValue,
      userId: user?.id,
      photoUrl: user?.photoUrl ?? "",
      timestamp: new Date(),
    };

    const updatedFood = { ...food };

    if (ratingsData.length > 0) {
      const existingRatings = ratingsData[0].ratings;

      const updatedRatings = existingRatings.map((item) =>
        item.userId === user?.id ? { ...item, userRating: ratingValue } : item
      );

      const isUserRated = existingRatings.some(
        (item) => item.userId === user?.id
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

        getFoodRating(user?.id);
      });
    }
    handleGetComments();
  }, [userEmail]);

  console.log(reviews);

  return (
    <>
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
              ⭐ {food?.rating}
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
                onChange={(event, ratingValue) =>
                  handleChangeRating(ratingValue)
                }
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
      <div>
        <h1 className="text-2xl text-center mb-[20px]">Bình luận</h1>
        <div className="flex justify-center items-center relative max-w-[450px] mx-auto">
          <input
            type="text"
            className="min-w-[450px] p-4 pr-[40px] outline-none rounded-2xl border-slate-400 border-[2px]"
            placeholder="Nhập bình luận"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <p
            onClick={handlePostComment}
            className="text-3xl cursor-pointer absolute right-0"
          >
            📤
          </p>
        </div>
        {reviews[0]?.comments?.length > 0 ? (
          <div>
            <div className="flex items-center flex-col mt-[20px] mb-[40px]">
              {reviews[0]?.comments.map((item, index) => (
                <div
                  className="relative mt-[20px] flex min-w-[450px] justify-between items-start"
                  key={index}
                >
                  <div className="flex items-center">
                    {item?.photoUrl ? (
                      <div className="mr-[12px]">
                        <Image
                          className="object-cover rounded-full w-[40px] h-[40px]"
                          src={item.photoUrl}
                          width={450}
                          height={0}
                          alt={`${item.name} image`}
                        />
                      </div>
                    ) : (
                      <div className="rounded-full mr-[12px] border-blue-950 border-[1px] justify-center items-center flex w-[40px] h-[40px]">
                        <p className="text-lg text-center text-black">
                          {item?.user.charAt(0)}
                        </p>
                      </div>
                    )}
                    <div className="flex items-start flex-col">
                      <h3>{item.user}</h3>
                      <h3 className="max-w-[250px]">{item.userComments}</h3>
                    </div>
                  </div>

                  <div className="flex ml-[20px]">
                    <h4 className="text-right">{parseTime(item.timestamp)}</h4>
                    {item?.userId === user?.id && (
                      <>
                        <Button
                          className="ml-[15px]"
                          onClick={() => handleDeleteComment(index, reviews[0])}
                        >
                          Xóa
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-[20px] mb-[40px]">
            <h2 className="text-xl">Chưa có bình luận nào</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default SpecificFood;
