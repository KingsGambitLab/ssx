import Image from "next/image";
import Link from "next/link";

import { navItems, logoImage } from "./data";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  return (
    <div className={`flex justify-between items-center bg-white py-[14px] px-[104px] ${className}`}>
      <div className="flex items-center gap-[32px]">
        <Link href="/school-of-technology">
          <Image src={logoImage} alt="School of Technology Logo" width={117} height={34} />
        </Link>
        <div className="flex items-center gap-[20px]">
          {navItems.map((item) => (
            <div key={item.label} className="flex items-center gap-[3px]">
              <div className="text-[#616161] text-sm leading-[22.4px] tracking-[0.1px] cursor-pointer">
                {item.label}
              </div>
              {item.isNew && (
                <div
                  className="flex py-[6px] px-[10px] rounded-[32px] text-white text-xs font-semibold"
                  style={{
                    background: `linear-gradient(90deg, #0245B9 14.64%, rgba(0, 140, 255, 0.75) 96.7%)`,
                  }}
                >
                  New
                </div>

              )}
            </div>
          ))}
        </div>
      </div>

      {/* Todo have to add action button here */}
    </div>
  )
}