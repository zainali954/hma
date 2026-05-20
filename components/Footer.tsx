import Link from "next/link";
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Location */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 uppercase tracking-wider">
              Location
            </h3>
            <div className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
              <FiMapPin className="text-gold-400 mt-0.5 flex-shrink-0" size={16} />
              <span>
                Office 1106, Burlington Tower,
                <br />
                Business Bay, Dubai, UAE
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              All Rights Reserved
            </p>
          </div>

          {/* Our Hours */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 uppercase tracking-wider">
              Our Hours
            </h3>
            <p className="text-gray-300 text-sm mb-1">Monday – Saturday</p>
            <p className="text-gold-400 font-semibold text-sm">
              09:00 AM – 06:00 PM
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+97145837001"
                  className="flex items-center gap-3 text-gray-300 hover:text-gold-400 transition-colors text-sm"
                >
                  <FiPhone size={15} className="text-gold-400 flex-shrink-0" />
                  (+971) 4 583 7001
                </a>
              </li>
              <li>
                <a
                  href="mailto:dubai.office@hmaa.ae"
                  className="flex items-center gap-3 text-gray-300 hover:text-gold-400 transition-colors text-sm"
                >
                  <FiMail size={15} className="text-gold-400 flex-shrink-0" />
                  dubai.office@hmaa.ae
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: FiFacebook,  href: "https://www.facebook.com/hmaaudit/",          label: "Facebook"  },
              { icon: FiTwitter,   href: "https://www.twitter.com/hmaaudit/",           label: "Twitter"   },
              { icon: FiInstagram, href: "https://www.instagram.com/hmaaudit/",         label: "Instagram" },
              { icon: FiLinkedin,  href: "https://www.linkedin.com/in/hmaaudit/",       label: "LinkedIn"  },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded bg-navy-800 flex items-center justify-center text-gray-400 hover:bg-gold-400 hover:text-navy-950 transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <p className="text-gray-500 text-xs text-center">
            Copyright &copy; {new Date().getFullYear()} HMA – All Rights Reserved
          </p>

          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Blogs", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-500 hover:text-gold-400 text-xs transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
