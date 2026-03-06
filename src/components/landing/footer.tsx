"use client"

import { Triangle, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  "San pham": [
    "Tinh nang",
    "Gia ca",
    "Demo",
    "Cap nhat",
    "Roadmap",
  ],
  "Ho tro": [
    "Trung tam tro giup",
    "Tai lieu",
    "Huong dan su dung",
    "Lien he",
    "Bao loi",
  ],
  "Cong ty": [
    "Ve chung toi",
    "Blog",
    "Tuyen dung",
    "Doi tac",
    "Bao chi",
  ],
  "Phap ly": [
    "Dieu khoan su dung",
    "Chinh sach bao mat",
    "Cookie",
    "Giay phep",
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[#A8DADC] bg-[#F1FAEE]">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1D3557]">
                <Triangle className="h-4 w-4 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-[#1D3557]">
                VisualEdu
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-[#457B9D]">
              Nen tang hoc hinh hoc khong gian thong minh voi AI cho hoc sinh Viet Nam.
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#457B9D]">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#1D3557]" />
                hello@visualedu.vn
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#1D3557]" />
                1900 xxxx
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1D3557]" />
                Ha Noi, Viet Nam
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-[#1D3557]">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-[#457B9D] transition-colors hover:text-[#457B9D]">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#A8DADC] pt-8 md:flex-row">
          <p className="text-sm text-[#457B9D]">
            2026 VisualEdu. Tat ca quyen duoc bao luu.
          </p>
          <div className="flex gap-6 text-sm text-[#457B9D]">
            <button className="transition-colors hover:text-[#457B9D]">
              Facebook
            </button>
            <button className="transition-colors hover:text-[#457B9D]">
              YouTube
            </button>
            <button className="transition-colors hover:text-[#457B9D]">
              TikTok
            </button>
            <button className="transition-colors hover:text-[#457B9D]">
              Zalo
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
