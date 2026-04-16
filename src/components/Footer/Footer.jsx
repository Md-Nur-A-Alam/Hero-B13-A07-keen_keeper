import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#244D3F] text-white/90 py-12 px-4 mt-5">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-4xl md:text-5xl text-white tracking-tight">
            <span className="font-bold">Keen</span>Keeper
          </h2>


          <p className=" text-sm md:text-base text-white/70 leading-relaxed font-thin">
            Your personal shelf of meaningful connections. Browse, tend, and 
            nurture the relationships that matter most.
          </p>


          <div className="pt-4">
            <p className="mb-4">
              Social Links
            </p>
            <div className="flex gap-4 justify-center">
              {[
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaXTwitter />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-white text-[#244D3F] p-3 rounded-full text-xl transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-90"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>


        <div className="border-t border-white/10 my-8 w-full mx-auto"></div>


        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/60 max-w-5xl mx-auto">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="transition-colors duration-300 hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;