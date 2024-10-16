import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import "react-multi-carousel/lib/styles.css";
import "./_lib/fontawesome"; // Import the Font Awesome library setup
import "./globals.css";
import Provider from "./Provider";

export const metadata = {
  title: "Fast Food Shop",
  description: "Cửa hàng bán đồ ăn nhanh gọn lẹ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <Provider>{children}</Provider>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "18px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "bg-white",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
