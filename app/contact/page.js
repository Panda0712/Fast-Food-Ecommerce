import {
  faFacebook,
  faInstagram,
  faThreads,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMap, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import ContactForm from "../_components/ContactForm";

const page = () => {
  return (
    <div className="bg-[#FCF5E5] pb-8 pt-12">
      <h2 className="text-3xl text-center  font-bold">Liên hệ với chúng tôi</h2>
      <p className="mt-3 w-3/4 md:w-2/4 text-center mx-auto text-lg font-medium">
        Nếu bạn có bất kì câu hỏi hay thắc mắc nào hoặc muốn liên hệ với dịch vụ
        của chúng tôi, đừng ngần ngại cung cấp thông tin để chúng tôi có thể hỗ
        trợ bạn một cách sớm nhất💕
      </p>

      <div className="flex justify-start sm:justify-center items-center flex-wrap gap-12 mt-4 mb-8">
        <ContactForm />
        <div className="py-8 px-8 flex flex-col gap-3">
          <div>
            <h3 className="text-lg font-bold">Chat với chúng tôi</h3>
            <p className="text-base font-medium">
              Liên hệ với đội ngũ của chúng tôi qua kênh thông tin.
            </p>
            <div className="flex flex-col gap-4 my-4">
              <Link
                className="flex items-center gap-2 transition-all hover:text-slate-500"
                href="https://www.facebook.com/kamiyama.touma.902"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ fontSize: 24, color: "#007FFF" }}
                />
                <span className="text-base font-semibold underline underline-offset-2">
                  Chat qua Facebook
                </span>
              </Link>
              <Link
                className="flex items-center gap-2 transition-all hover:text-slate-500"
                href="https://www.instagram.com/kyunnxneon.u/"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ fontSize: 24, color: "#007FFF" }}
                />
                <span className="text-base font-semibold underline underline-offset-2">
                  Chat qua Instagram
                </span>
              </Link>
              <Link
                className="flex items-center gap-2 transition-all hover:text-slate-500"
                href="https://x.com/?lang=vi"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ fontSize: 24, color: "#007FFF" }}
                />
                <span className="text-base font-semibold underline underline-offset-2">
                  Chat qua Twitter
                </span>
              </Link>
              <Link
                className="flex items-center gap-2 transition-all hover:text-slate-500"
                href="https://www.threads.net/@sadoc_ean"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faThreads}
                  style={{ fontSize: 24, color: "#007FFF" }}
                />
                <span className="text-base font-semibold underline underline-offset-2">
                  Chat qua Threads
                </span>
              </Link>
              <Link
                className="flex items-center gap-2 transition-all hover:text-slate-500"
                href="https://gmail.com"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ fontSize: 24, color: "#007FFF" }}
                />
                <span className="text-base font-semibold underline underline-offset-2">
                  Gửi email cho chúng tôi
                </span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">Gọi cho chúng tôi</h3>
            <p className="text-base font-medium">
              Gọi đội ngũ của chúng tôi từ thứ Hai đến thứ Sáu từ 7am - 17pm
            </p>
            <div className="flex flex-col gap-4 my-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ fontSize: 24, color: "#007FFF" }}
                />
                <span className="text-base font-semibold underline underline-offset-2">
                  +89369332842
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">Ghé thăm chúng tôi</h3>
            <p className="text-base font-medium">
              Gặp mặt chúng tôi trực tiếp tại cơ sở chính.
            </p>
            <div className="flex flex-col gap-4 my-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faMap}
                  style={{ fontSize: 24, color: "#007FFF" }}
                />
                <span className="text-base font-semibold underline underline-offset-2">
                  280 An Dương Vương, phường 4, quận 5, TPHCM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.598579955422!2d106.6401792!3d10.780672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728490781938!5m2!1svi!2s"
          width={"70%"}
          height={450}
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default page;
