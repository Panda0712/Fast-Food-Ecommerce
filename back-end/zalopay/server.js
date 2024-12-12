const express = require("express");
const app = express();

const cors = require("cors");
const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");

// const {
//   insertMultipleOrders,
//   insertOrder,
//   insertUser,
// } = require("../../app/_lib/actions");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

app.post("/payment", async (req, res) => {
  const { amount, orderInfo } = req.body;

  console.log(orderInfo);

  const embed_data = {
    redirecturl: "https://fast-food-ecommerce.vercel.app/success",
    amount,
    orderInfo,
  };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url:
      "https://d130-2402-800-63a8-dd41-403d-6000-2875-2071.ngrok-free.app/callback",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    console.log(res.data);

    return res.status(200).json(result.data);
  } catch (error) {
    console.log("Payment error: ", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/callback", async (req, res) => {
  const { insertMultipleOrders, insertOrder, insertUser } = await import(
    "../../app/_lib/actions"
  );

  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      const embedData = JSON.parse(dataJson["embed_data"]);

      const { amount, orderInfo } = embedData;

      let updateData = [...orderInfo.orderData];

      if (!orderInfo.id) {
        const guestData = {
          fullName: orderInfo.name,
          email: orderInfo.email,
          address: orderInfo.address,
          phone: orderInfo.phone,
        };
        const { userData } = await insertUser(guestData);
        updateData = updateData.map((data) => ({
          ...data,
          guestId: userData[0].id,
        }));
        orderInfo.id = userData[0].id;
      }

      const orderTime = new Date(Date.now() + 7 * 60 * 60 * 1000)
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");
      updateData = updateData.map((data) => ({
        ...data,
        orderTime: orderTime,
      }));
      updateData = updateData.map((data) => ({
        ...data,
        status: "paid",
        isPaid: true,
      }));

      if (updateData.length > 1) {
        await insertMultipleOrders(updateData);
      } else await insertOrder(updateData[0]);

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

app.listen(5000, (err) => {
  if (err) {
    throw new Error("Error to connect to the server");
  }

  console.log("server run at port 5000");
});