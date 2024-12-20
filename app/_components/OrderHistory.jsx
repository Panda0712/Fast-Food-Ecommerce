/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getOrdersCount,
  getPaginationOrders,
  getSpecificFoods,
  updateOrder,
} from "../_lib/actions";
import { HISTORY_PAGE_SIZE } from "../_lib/constants";
import { formatVND, parseDateTime } from "../_lib/helper";
import Button from "./Button";
import Modal from "react-modal";
import toast from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "150px",
  },
};

const OrderHistory = ({ guestData }) => {
  const [orders, setOrders] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cancelItem, setCancelItem] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams?.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  const pageCount = Math.ceil(totalOrders / HISTORY_PAGE_SIZE);

  const fetchPageData = async (page) => {
    try {
      setLoading(true);
      const start = (page - 1) * HISTORY_PAGE_SIZE;
      const end = start + HISTORY_PAGE_SIZE - 1;

      const { count } = await getOrdersCount(guestData.id);
      setTotalOrders(count);

      const { paginationOrders } = await getPaginationOrders(
        guestData.id,
        start,
        end
      );

      if (paginationOrders?.length) {
        const foodIds = paginationOrders.map((order) => order.foodId);
        const { foods } = await getSpecificFoods(foodIds);

        setOrders(paginationOrders);
        setFoodsData(foods);
      } else {
        setOrders([]);
        setFoodsData([]);
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  };

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  const nextPage = () => {
    if (currentPage < pageCount) {
      router.push(`?${createQueryString("page", currentPage + 1)}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      router.push(`?${createQueryString("page", currentPage - 1)}`);
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      const updateData = { ...cancelItem };
      updateData.status = "canceled";

      const { error } = await updateOrder(updateData, id);

      if (error) {
        toast.error(error);
      }

      toast.success("Đơn hàng đã được hủy thành công");
      setIsOpenModal(false);
      setCancelItem(null);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: "canceled" } : order
        )
      );
    } catch (error) {
      setIsOpenModal(false);
      toast.error(error.message || "Đã xảy ra lỗi");
    }
  };

  const afterOpenModal = () => {
    // subtitle.style.color = "#f00";
  };

  useEffect(() => {
    if (guestData?.id) {
      fetchPageData(currentPage);
    }
  }, [guestData?.id, currentPage]);

  if (!orders?.length) {
    return <p className="text-center mt-4">Không có đơn hàng nào</p>;
  }

  return (
    <div>
      <p className="mt-4 text-base md:text-xl text-center">
        Có {totalOrders} đơn hàng trong lịch sử mua hàng của bạn
      </p>

      {loading ? (
        <div className="text-center mt-8">Đang tải...</div>
      ) : (
        <div className="flex flex-col mt-12">
          {orders.map((order, index) => (
            <div
              className={`border-2 xl:w-[1200px] xl:mx-auto flex flex-col gap-4 rounded-lg border-slate-400 px-8 pt-8 pb-6 ${
                index === orders.length - 1
                  ? ""
                  : "rounded-bl-none rounded-br-none"
              } ${
                index !== 0
                  ? "rounded-tl-none rounded-tr-none"
                  : "border-b-[1px]"
              }`}
              key={order.id}
            >
              <div className="flex justify-between flex-wrap gap-4 sm:flex-nowrap">
                <div className="flex gap-4 flex-wrap min-[480px]:flex-nowrap">
                  <Image
                    src={
                      foodsData.find((food) => food.id === order.foodId)?.image
                    }
                    alt="foodImage"
                    width={200}
                    height={0}
                    className="w-[150px] h-[120px]"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl">
                      {foodsData.find((food) => food.id === order.foodId)?.name}
                    </h3>
                    <p className="text-sm sm:text-lg">
                      Số lượng: {order.numFood}
                    </p>
                    <p className="text-sm sm:text-lg">
                      Mã đơn hàng: #{order.id}
                    </p>
                    <p className="text-sm sm:text-lg">
                      {order.isPaid
                        ? "☑️ Đã thanh toán"
                        : order.status === "canceled"
                        ? "❌ Đã hủy"
                        : "✖️ Chưa thanh toán"}
                    </p>
                  </div>
                </div>

                <p className="text-xl font-semibold">
                  {formatVND(order.totalPrice)}
                </p>
              </div>

              <div className="flex justify-between items-center flex-wrap md:flex-nowrap gap-8 xl:gap-16">
                <div className="flex items-center gap-1">
                  <span className="text-sm sm:text-lg">✅</span>
                  <span className="text-sm sm:text-lg text-slate-500">
                    Thời gian đặt hàng:{" "}
                    {parseDateTime(order.orderTime).formattedDate}
                  </span>
                </div>
                <div className="flex gap-3">
                  {Date.now() - new Date(order.orderTime).getTime() <=
                    10 * 60 * 1000 &&
                    !order.isPaid &&
                    order.status !== "canceled" && (
                      <Button
                        onClick={() => {
                          setIsOpenModal(true);
                          setCancelItem(order);
                        }}
                        className="uppercase px-2 sm:px-8 text-[12px] font-medium sm:font-semibold sm:text-base"
                      >
                        Hủy đơn hàng
                      </Button>
                    )}
                  <Button
                    onClick={() => router.push(`/foods/${order.foodId}`)}
                    type="order"
                    className="uppercase px-2 sm:px-8 text-[12px] font-medium sm:font-semibold sm:text-base"
                  >
                    Xem sản phẩm
                  </Button>
                  <Button
                    onClick={() => router.push("/foods")}
                    type="order"
                    className="uppercase px-2 sm:px-8 text-[12px] font-medium sm:font-semibold sm:text-base"
                  >
                    Mua lại
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <div className="flex justify-center items-center mt-5 gap-4">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            type="primary"
            className="py-4 text-lg font-semibold uppercase px-8"
          >
            Trước
          </Button>
          <span className="text-lg">
            Trang {currentPage} / {pageCount}
          </span>
          <Button
            onClick={nextPage}
            disabled={currentPage === pageCount}
            type="primary"
            className="py-4 text-lg font-semibold uppercase px-8"
          >
            Sau
          </Button>
        </div>
      )}

      <Modal
        isOpen={isOpenModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
        style={customStyles}
        contentLabel="Confirm Modal"
      >
        <h2 className="text-xl">
          Bạn có chắc muốn hủy đơn hàng không? Sau khi hủy không thể hoàn tác.
        </h2>
        <div className="flex items-center gap-4 absolute bottom-3 right-6">
          <Button
            onClick={() => setIsOpenModal(false)}
            className="text-[18px] font-semibold px-4 py-3"
          >
            Thoát
          </Button>
          <Button
            onClick={() => handleCancelOrder(cancelItem.id)}
            type="order"
            className="text-[18px] px-4 py-3"
          >
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderHistory;
