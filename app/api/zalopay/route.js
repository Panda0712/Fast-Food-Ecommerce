import axios from "axios";
import crypto from "crypto";
import { insertOrder } from "../_lib/actions";

export default async function handler(req, res) {
  const APP_ID = process.env.ZALOPAY_SANDBOX_APP_ID;
  const KEY1 = process.env.ZALOPAY_SANDBOX_KEY1;
  const KEY2 = process.env.ZALOPAY_SANDBOX_KEY2;

  if (req.method === "POST") {
    try {
      const { amount, orderInfo } = req.body;
      const timestamp = Date.now();
      const transId = `${APP_ID}${timestamp}`;

      const data = `${APP_ID}|${transId}|${amount}|${timestamp}`;
      const mac = crypto.createHmac("sha256", KEY1).update(data).digest("hex");

      const zalopayResponse = await axios.post(
        "https://sb-openapi.zalopay.vn/v2/create",
        {
          app_id: APP_ID,
          app_trans_id: transId,
          app_time: timestamp,
          amount: amount,
          description: `Thanh toán đơn hàng #${transId}`,
          mac: mac,
          callback_url: process.env.ZALOPAY_CALLBACK_URL,
        }
      );

      await insertOrder({
        ...orderInfo,
        zalopayTransactionId: transId,
        status: "pending",
      });

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
  }

  if (req.method === "GET") {
    try {
      const { status, data: callbackData, mac } = req.query;

      const verifyMac = crypto
        .createHmac("sha256", KEY2)
        .update(callbackData)
        .digest("hex");

      if (verifyMac === mac) {
        const decodedData = JSON.parse(
          Buffer.from(callbackData, "base64").toString("utf-8")
        );

        await insertOrder({
          zalopayTransactionId: decodedData.trans_id,
          status: status === "1" ? "paid" : "failed",
          isPaid: status === "1",
        });

        res.status(200).json({ return_code: 1 });
      } else {
        res.status(400).json({ return_code: 0, message: "Invalid MAC" });
      }
    } catch (error) {
      console.error("ZaloPay Callback Error:", error);
      res.status(500).json({ return_code: 0, error: error.message });
    }
  }
}
