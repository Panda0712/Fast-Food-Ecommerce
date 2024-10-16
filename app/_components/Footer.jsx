import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faThreads,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-gray-200 px-4 py-5 gap-4 flex flex-wrap justify-around">
        <div className="max-w-[300px]">
          <Image src="/logo.png" alt="logo" width={120} height={50} />
          <p className="mt-10 d-block text-base font-semibold">
            Chân thành cảm ơn quý khách vì đã sử dụng dịch vụ của chúng tôi.
            Những đóng góp của quý khách là nguồn động lực to lớn để chúng tôi
            tiếp tục phát triển xa hơn 💕
          </p>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-semibold mb-3">Điều hướng</h3>
          <ul className="flex flex-col gap-2">
            <Link href="/">
              <li className="text-base hover:text-slate-500 cursor-pointer font-medium transition-all">
                Trang chủ
              </li>
            </Link>
            <Link href="/foods">
              <li className="text-base hover:text-slate-500 cursor-pointer font-medium transition-all">
                Thực đơn
              </li>
            </Link>
            <Link href="/service">
              <li className="text-base hover:text-slate-500 cursor-pointer font-medium transition-all">
                Dịch vụ
              </li>
            </Link>
            <Link href="/contact">
              <li className="text-base hover:text-slate-500 cursor-pointer font-medium transition-all">
                Liên hệ hợp tác
              </li>
            </Link>
          </ul>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex gap-3">
              <FontAwesomeIcon
                icon={faMapLocationDot}
                style={{ fontSize: 24, color: "#7CB9E8" }}
              />
              <span className="text-base font-medium">
                280 An Dương Vương, phường 4, quận 5, TPHCM
              </span>
            </li>
            <li className="flex gap-3">
              <FontAwesomeIcon
                icon={faPhone}
                style={{ fontSize: 24, color: "#7CB9E8" }}
              />
              <span className="text-base font-medium">+89369332842</span>
            </li>
            <li className="flex gap-3">
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ fontSize: 24, color: "#7CB9E8" }}
              />
              <span className="text-base font-medium">Wukong123@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between px-12 py-5 bg-slate-300">
        <p className="font-semibold text-base">
          Bản quyền ©2024 thuộc về Wukong Team
        </p>
        <div className="flex gap-6">
          <Link
            href="https://www.facebook.com/kamiyama.touma.902"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              style={{ fontSize: 24, color: "#007FFF" }}
            />
          </Link>
          <Link href="https://www.instagram.com/kyunnxneon.u/" target="_blank">
            <FontAwesomeIcon
              icon={faInstagram}
              style={{ fontSize: 24, color: "#007FFF" }}
            />
          </Link>
          <Link href="https://x.com/?lang=vi" target="_blank">
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ fontSize: 24, color: "#007FFF" }}
            />
          </Link>
          <Link href="https://www.threads.net/@sadoc_ean" target="_blank">
            <FontAwesomeIcon
              icon={faThreads}
              style={{ fontSize: 24, color: "#007FFF" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
