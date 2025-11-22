// app/api/momo/route.js
import { NextResponse } from "next/server";

import crypto from "crypto";
import https from "https";

export async function POST(request) {
  const { amount } = await request.json();

  // Thông tin thanh toán MoMo
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = `${partnerCode}_${Date.now()}`;
  var orderId = requestId;
  var orderInfo = "pay with MoMo";
  var orderExpireTime = 30;
  var redirectUrl = "http://localhost:3000";
  var ipnUrl = "https://callback.url/notify";
  var requestType = "captureWallet";
  var extraData = "";

  // Tạo chữ ký HMAC SHA256
  var rawSignature = `accessKey=${accessKey}&amount=${amount}
  &extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}
  &orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=
  ${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  // Dữ liệu gửi tới MoMo
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    orderExpireTime: orderExpireTime,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });

  // Tạo yêu cầu HTTPS
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const momoRequest = https.request(options, (momoRes) => {
      momoRes.setEncoding("utf8");
      let data = "";

      momoRes.on("data", (chunk) => {
        data += chunk;
      });

      momoRes.on("end", () => {
        const response = JSON.parse(data);
        resolve(NextResponse.json(response)); // Trả về phản hồi từ MoMo
      });
    });

    momoRequest.on("error", (e) => {
      reject(NextResponse.json({ error: e.message }, { status: 500 }));
    });

    momoRequest.write(requestBody);
    momoRequest.end();
  });
}
