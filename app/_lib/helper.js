export function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function parseDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  if (isNaN(date.getTime())) {
    throw new Error("Chuỗi ngày giờ không hợp lệ");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần cộng 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  // Tùy theo mục đích, có thể trả về các giá trị khác nhau:
  return {
    formattedDate: `${day}-${month}-${year}`, // Trả về ngày dưới dạng YYYY-MM-DD
    formattedTime: `${hours}:${minutes}:${seconds}.${milliseconds}`, // Trả về thời gian HH:mm:ss.sss
    fullDateTime: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`, // Trả về đầy đủ YYYY-MM-DDTHH:mm:ss.sss
  };
}

export function capitalizeFirstLetter(name) {
  // Tách chuỗi thành mảng các từ, loại bỏ khoảng trắng dư thừa
  const formattedName = name.split(", ").join(" ").trim();

  // Viết hoa chữ cái đầu tiên
  const capitalized =
    formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

  return capitalized;
}

export const parseTime = (time) => {
  const date = new Date(time.seconds * 1000);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;
  return formattedDate;
};
