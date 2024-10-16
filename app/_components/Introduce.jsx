import React from "react";
import Button from "./Button";
import Link from "next/link";

const Introduce = () => {
  return (
    <div className="flex bg-opacity-25 justify-center flex-col items-center bg-[url('/background.avif')] bg-cover bg-center h-[500px] w-full text-center">
      <h3 className="uppercase text-xl font-bold mb-2">
        Cửa hàng Fast Food xin chào
      </h3>
      <p className="text-black font-semibold w-2/4 py-2 mb-6">
        Chúng tôi là Fast Food, cửa hàng đồ ăn nhanh tọa lạc tại thành phố Hồ
        Chí Minh, chúng tôi mong muốn đem đến những món ăn thật ngon và có chất
        lượng tốt, để lại ấn tượng sâu đậm với quý khách hàng với mức giá hợp
        lý. Chúc quý khách có những giây phút thật tuyệt với dịch vụ của chúng
        tôi{" "}
      </p>
      <Link href="/foods">
        <Button type="order" className="uppercase text-lg">
          ĐẶT HÀNG NGAY
        </Button>
      </Link>
    </div>
  );
};

export default Introduce;
