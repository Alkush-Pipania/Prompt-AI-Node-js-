import Image from "next/image";
import logo from "@/../public/logo/gethint.png"
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src={logo} alt="gethint logo" />
      <span className="text-xl text-text-shady font-serif ">Get Hint</span>
    </div>
  )
}

