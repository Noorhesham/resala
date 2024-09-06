import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Socials = () => {
  const t = useTranslations();
  return (
    <div className=" flex flex-col mt-10">
      <div className="flex text-gray-50 self-center mt-3 items-center gap-5">
        <span className="  p-1.5 rounded-full text-2xl bg-main2">
          <FaGoogle />
        </span>
        <Link
          href={"https://www.facebook.com/profile.php?id=100008353500737"}
          className="  p-1.5 rounded-full  text-xl bg-main2"
        >
          <FaFacebook />
        </Link>
        <Link href={"https://www.instagram.com/resala.center"} className="  p-1.5 rounded-full text-2xl bg-main2">
          <FaInstagram />
        </Link>
        <Link
          href={"https://www.tiktok.com/@alresala_centre?_t=8omtGjZw0SA&_r=1"}
          className="  p-1.5 rounded-full text-2xl bg-main2"
        >
          <FaTiktok />
        </Link>
        <Link
          href={"https://x.com/Resala_center?t=CegzIU5o-6ei5ddYdbsSig&s=08"}
          className="  p-1.5 rounded-full text-2xl bg-main2"
        >
          <FaSquareXTwitter />
        </Link>
      </div>
    </div>
  );
};

export default Socials;
