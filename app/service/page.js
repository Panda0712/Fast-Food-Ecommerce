import Image from "next/image";
import React from "react";
import Button from "../_components/Button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex bg-[#f2f2f2] px-4 py-12 items-center justify-center gap-12">
        <Image src="/thumb1.png" alt="thumb" width={250} height={250} />
        <div>
          <h2 className="text-[28px] text-[#A9B91A] uppercase font-extrabold mb-3">
            Thanh toán khi nhận hàng
          </h2>
          <p className="mb-8">
            Chúng tôi hỗ trợ bạn đặt hàng online và thanh toán trực tiếp khi
            nhận được hàng.
          </p>
          <Link href="/foods">
            <Button type="order" className="uppercase text-lg font-semibold">
              Xem thêm
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex px-4 py-12 items-center justify-center gap-12">
        <Image src="/thumb2.png" alt="thumb" width={250} height={250} />
        <div>
          <h2 className="text-[28px] text-[#A9B91A] uppercase font-extrabold mb-3">
            Thanh toán trực tiếp
          </h2>
          <p className="mb-8">
            Bạn cũng có thể thanh toán trực tiếp qua hình thức chuyển khoản cho
            chúng tôi.
          </p>
          <Link href="/foods">
            <Button type="order" className="uppercase text-lg font-semibold">
              Xem thêm
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex bg-[#f2f2f2] px-4 py-12 items-center justify-center gap-12">
        <Image src="/thumb3.png" alt="thumb" width={250} height={250} />
        <div>
          <h2 className="text-[28px] text-[#5DC6D1] uppercase font-extrabold mb-3">
            Đặt tiệc lớn
          </h2>
          <p className="mb-8">
            Hãy liên hệ trực tiếp với chúng tôi thông qua đường dây nóng nếu bạn
            muốn đặt tiệc lớn.
          </p>
          <Link href="/foods">
            <Button type="order" className="uppercase text-lg font-semibold">
              Xem thêm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
