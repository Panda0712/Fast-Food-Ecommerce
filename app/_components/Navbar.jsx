import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <ul className="hidden md:flex items-center gap-4">
      <Link href="/">
        <li className="font-bold text-slate-700 uppercase transition-all hover:text-gray-400 cursor-pointer">
          Trang chủ
        </li>
      </Link>
      <Link href="/foods">
        <li className="font-bold text-slate-700 uppercase transition-all hover:text-gray-400 cursor-pointer">
          Thực đơn
        </li>
      </Link>
      <Link href="/service">
        <li className="font-bold text-slate-700 uppercase transition-all hover:text-gray-400 cursor-pointer">
          Dịch vụ
        </li>
      </Link>
      <Link href="/contact">
        <li className="font-bold text-slate-700 uppercase transition-all hover:text-gray-400 cursor-pointer">
          Liên hệ
        </li>
      </Link>
    </ul>
  );
};

export default Navbar;
