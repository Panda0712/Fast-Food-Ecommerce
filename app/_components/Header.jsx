"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClockRotateLeft,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useCart } from "../_context/CartContext";

import Button from "./Button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { user, isSignedIn } = useUser();
  const { cart } = useCart();

  const userButton = {
    elements: {
      userButtonAvatarBox: "w-12 h-12",
      userButtonPopoverCard: "bg-blue-100",
      userButtonPopoverActionButton: "text-red-600",
    },
  };

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);

  return (
    <header className="bg-[#EDEADE] flex gap-6 items-center justify-around flex-wrap py-12 px-4">
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
      <div
        onClick={() => setIsVisible(!isVisible)}
        className="block md:hidden cursor-pointer transition-all hover:opacity-60"
      >
        <FontAwesomeIcon icon={faBars} style={{ fontSize: 28 }} />
      </div>
      <Logo />
      <Navbar />
      <SearchBar />

      {isSignedIn ? (
        <div className="flex items-center gap-8">
          <Link href="/history">
            <div className="cursor-pointer flex flex-col justify-center relative hover:opacity-70 transition-all">
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                style={{ fontSize: 24, color: "black" }}
              />
              <span className="text-sm text-center">Lịch sử mua hàng</span>
            </div>
          </Link>
          <Link href="/cart">
            <div className="cursor-pointer flex justify-center flex-col relative hover:opacity-70 transition-all">
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ fontSize: 24, color: "black" }}
              />
              <div className="absolute px-[6px] top-[-10px] rounded-lg right-0 flex z-100 justify-center items-center bg-gray-300 z-10">
                <span className="text-xs">{cart.length}</span>
              </div>
              <span className="text-sm text-center">Giỏ hàng</span>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-3 p-3 bg-slate-300 rounded-lg">
            <UserButton signOutUrl="/" appearance={userButton} />
            <p className="text-sm text-slate-600">{user?.fullName}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/sign-in">
            <SignInButton>
              <Button type="primary">Đăng nhập</Button>
            </SignInButton>
          </Link>
          <Link href="/sign-up">
            <SignUpButton>
              <Button type="secondary">Đăng ký</Button>
            </SignUpButton>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
