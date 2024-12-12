import axios from "axios";
import crypto from "crypto";
import { insertOrder } from "../_lib/actions";

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

export default async function handler(req, res) {
  const APP_ID = config.app_id;
  const KEY1 = config.key1;

  if (req.method === "POST") {
    try {
      const { amount, orderInfo } = req.body;
      const timestamp = Date.now();
      const transId = `${APP_ID}${timestamp}`;

      // Generate MAC (Message Authentication Code)
      const data = `${APP_ID}|${transId}|${amount}|${timestamp}`;
      const mac = crypto.createHmac("sha256", KEY1).update(data).digest("hex");

      // Call ZaloPay API to create transaction
      const zalopayResponse = await axios.post(config.endpoint, {
        app_id: APP_ID,
        app_trans_id: transId,
        app_time: timestamp,
        amount: amount,
        description: `Thanh toán đơn hàng #${transId}`,
        mac: mac,
        callback_url: "https://localhost:3000/success", // Replace with your callback URL
      });

      // Save order to the database
      await insertOrder({
        ...orderInfo,
        zalopayTransactionId: transId,
        status: "pending",
      });

      // Return ZaloPay order URL to client
      res.status(200).json({
        order_url: zalopayResponse.data.order_url,
        transaction_id: transId,
      });
    } catch (error) {
      console.error("ZaloPay Payment Error:", error);
      res
        .status(500)
        .json({ error: "Thanh toán thất bại", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Phương thức không được hỗ trợ" });
  }
}
