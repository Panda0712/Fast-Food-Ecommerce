"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../_context/CartContext";
import { useShippingFormContext } from "../_context/ShippingFormContext";
import { insertMultipleOrders, insertOrder, insertUser } from "../_lib/actions";

import Image from "next/image";
import toast from "react-hot-toast";
import Button from "../_components/Button";

const CheckoutForm = () => {
  const [payment, setPayment] = useState("cash");
  const [orderData, setOrderData] = useState([]);

  const { formData } = useShippingFormContext();
  const { cart, resetCart } = useCart();

  const router = useRouter();

  const totalPrice =
    cart.length > 0
      ? cart.reduce((acc, cur) => acc + cur.totalPrice * cur.quantity, 0)
      : 0;

  const handleChangePaymentMethod = (value) => {
    setPayment(value);
  };

  const handleInsertOrder = async (orderData) => {
    let updateData = [...orderData];

    if (!formData.id) {
      const guestData = {
        fullName: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
      };
      const { userData } = await insertUser(guestData);
      updateData = updateData.map((data) => ({
        ...data,
        guestId: userData[0].id,
      }));
      formData.id = userData[0].id;
    }

    const orderTime = new Date(Date.now() + 7 * 60 * 60 * 1000)
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");
    updateData = updateData.map((data) => ({ ...data, orderTime: orderTime }));
    updateData = updateData.map((data) =>
      payment !== "cash" ? { ...data, status: "paid", isPaid: true } : data
    );
    setOrderData(updateData);

    if (updateData.length > 1) {
      await insertMultipleOrders(updateData);
    } else await insertOrder(updateData[0]);
    resetCart();
  };

  const handleMomoPayment = async () => {
    if (cart.length === 0) {
      toast.error("Giỏ hàng trống");
      return;
    }

    try {
      const response = await fetch("/api/momo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const data = await response.json();

      if (data.payUrl) {
        // Redirect the user to the MoMo payment URL
        window.location.href = data.payUrl;
      } else {
        toast.error("Không thể tạo đường dẫn thanh toán MoMo");
      }
    } catch (error) {
      console.error("MoMo Payment Error:", error);
      toast.error("Thanh toán MoMo thất bại");
    }
  };

  const handleZaloPayPayment = async () => {
    if (cart.length === 0) {
      toast.error("Giỏ hàng trống");
      return;
    }

    try {
      const orderDataForPayment = {
        ...formData,
        totalPrice: totalPrice,
        status: "processing",
        orderData,
      };

      const response = await fetch(
        "https://a27a-116-106-196-46.ngrok-free.app/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice,
            orderInfo: orderDataForPayment,
          }),
        }
      );

      const data = await response.json();

      const { order_url } = data;

      if (order_url) {
        window.location.href = order_url;
      } else {
        toast.error("Không thể tạo đường dẫn thanh toán");
      }
    } catch (error) {
      console.error("ZaloPay Payment Error:", error);
      toast.error("Thanh toán ZaloPay thất bại");
    }
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error(
        "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng."
      );
      return;
    }

    if (payment === "momo") {
      await handleMomoPayment();
      // document.getElementById("qrModal").style.display = "flex";
    } else if (payment === "cash") {
      handleInsertOrder(orderData);
      router.push("/success");
    } else if (payment === "bank") {
      document.getElementById("qrModal").style.display = "flex";
    } else if (payment === "zalopay") {
      await handleZaloPayPayment();
    } else {
      toast.error("Vui lòng chọn phương thức thanh toán để tiếp tục");
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      if (cart.length > 1) {
        const cartOrderData = [];
        cart.map((cartItem) => {
          const orderData = {
            numFood: cartItem.quantity,
            foodPrice: cartItem.regularPrice,
            totalPrice: cartItem.totalPrice * cartItem.quantity,
            status: "unpaid",
            isPaid: false,
            observations: formData.observations,
            foodId: cartItem.id,
            guestId: formData.id,
          };
          cartOrderData.push(orderData);
          setOrderData(cartOrderData);
        });
      } else {
        setOrderData([
          {
            numFood: cart[0].quantity,
            foodPrice: cart[0].regularPrice,
            totalPrice: cart[0].totalPrice * cart[0].quantity,
            status: "unpaid",
            isPaid: false,
            observations: formData.observations,
            foodId: cart[0].id,
            guestId: formData.id,
          },
        ]);
      }
    }
  }, [cart, formData]);

  if (!formData.name) router.push("/");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">Phương thức thanh toán</h2>
      <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[400px]">
        <div className="flex items-center gap-2 text-lg border border-r-0 border-t-0 border-l-0 border-b-slate-400 py-2">
          <input
            type="radio"
            name="cash"
            className="w-[15px] h-[15px] checked:bg-red-500"
            checked={payment === "cash"}
            onChange={() => handleChangePaymentMethod("cash")}
          />
          <label name="cash" htmlFor="cash">
            Tiền mặt
          </label>
        </div>

        <div className="flex items-center gap-2 text-lg border border-r-0 border-t-0 border-l-0 border-b-slate-400 py-2">
          <input
            type="radio"
            name="zalopay"
            className="w-[15px] h-[15px] checked:bg-red-500"
            checked={payment === "zalopay"}
            onChange={() => handleChangePaymentMethod("zalopay")}
          />
          <label name="zalopay" htmlFor="zalopay">
            Ví ZaloPay
          </label>
        </div>

        <div className="flex items-center gap-2 text-lg border border-r-0 border-t-0 border-l-0 border-b-slate-400 py-2">
          <input
            type="radio"
            name="momo"
            className="w-[15px] h-[15px] checked:bg-red-500"
            checked={payment === "momo"}
            onChange={() => handleChangePaymentMethod("momo")}
          />
          <label name="momo" htmlFor="momo">
            Ví Momo
          </label>
        </div>
        <div className="flex items-center gap-2 text-lg border border-r-0 border-t-0 border-l-0 border-b-slate-400 py-2">
          <input
            type="radio"
            name="bank"
            className="w-[15px] h-[15px] checked:bg-red-500"
            checked={payment === "bank"}
            onChange={() => handleChangePaymentMethod("bank")}
          />
          <label name="bank" htmlFor="bank">
            Ví MB Bank
          </label>
        </div>
      </div>

      <div className="border-2 mt-4 mb-6 max-w-[400px] border-slate-800 pt-3 pb-5 px-2">
        <p>Lưu ý cho trường hợp hủy đơn hàng:</p>
        <p>
          &#34;Đơn hàng hủy của quý khách sẽ được ghi nhận xử lý và Thời gian
          quý khách sẽ được hoàn tiền theo quy định của ngân hàng phát hành thẻ
          như sau:
        </p>
        <p>
          - Thẻ nội địa/Ví điện tử/Tài khoản ngân hàng: từ 10 - 14 ngày làm
          việc.
        </p>
        <p>- Thẻ quốc tế: từ 8 - 17 ngày làm việc.</p>
        <p>**Ngày làm việc: Không bao gồm T7, CN, Lễ&#34;</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Button
          type="order"
          onClick={() => router.back()}
          className="uppercase bg-slate-400 hover:bg-slate-500"
        >
          Trở lại
        </Button>
        <Button
          disabled={cart.length === 0}
          onClick={handlePayment}
          type="order"
          className="uppercase"
        >
          Đặt hàng
        </Button>
      </div>

      <div
        id="qrModal"
        className="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center"
      >
        <div className="bg-white z-1000 py-8 px-12 rounded-lg flex flex-col gap-4 items-center">
          <h3 className="text-xl font-bold mb-4">Quét mã QR để thanh toán</h3>
          <Image
            src={payment === "momo" ? "/momoPersonal.jpg" : "/mbPersonal.jpg"}
            alt="MoMo QR Code"
            width={300}
            height={300}
            className="object-cover"
          />
          <p className="mt-4 font-bold text-xl">
            Tổng tiền:{" "}
            <span className="text-[#E31837]">
              {totalPrice.toLocaleString()} VND
            </span>
          </p>
          <div className="mt-4 gap-4 flex justify-between items-center">
            <Button
              type="order"
              onClick={() =>
                (document.getElementById("qrModal").style.display = "none")
              }
              className="uppercase bg-slate-400 hover:bg-slate-500"
            >
              Đóng
            </Button>
            <Button
              onClick={() => {
                handleInsertOrder(orderData);
                router.push("/success");
              }}
              type="order"
              className="uppercase"
            >
              Đã thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
