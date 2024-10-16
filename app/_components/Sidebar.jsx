"use client";

import { faMapLocationDot, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

const Sidebar = ({ isVisible, setIsVisible }) => {
  return (
    <ul
      className={`absolute flex flex-col gap-4 px-4 py-20 w-60 text-center bottom-0 top-0 transition-all duration-300 ease-in-out bg-[#333333] z-[1000] ${
        isVisible ? "left-0" : "-left-60"
      } `}
    >
      <div
        onClick={() => setIsVisible((isVisible) => !isVisible)}
        className="absolute cursor-pointer right-[15px] top-[15px]"
      >
        <FontAwesomeIcon
          icon={faX}
          style={{ fontSize: 24, color: "#ffffff" }}
        />
      </div>
      <Link href="/">
        <li className="font-bold text-white uppercase transition-all hover:opacity-80 cursor-pointer">
          Trang chủ
        </li>
      </Link>
      <Link href="/foods">
        <li className="font-bold text-white uppercase transition-all hover:opacity-80 cursor-pointer">
          Thực đơn
        </li>
      </Link>
      <Link href="/service">
        <li className="font-bold text-white uppercase transition-all hover:opacity-80 cursor-pointer">
          Dịch vụ
        </li>
      </Link>
      <Link href="/contact">
        <li className="font-bold text-white uppercase transition-all hover:opacity-80 cursor-pointer">
          Liên hệ
        </li>
      </Link>

      <div className="absolute left-[21%] bottom-10 flex gap-3 justify-center items-center">
        <FontAwesomeIcon
          icon={faMapLocationDot}
          style={{ fontSize: 24, color: "#fff" }}
        />
        <span className="text-white">Hồ Chí Minh</span>
      </div>
    </ul>
  );
};

export default Sidebar;
