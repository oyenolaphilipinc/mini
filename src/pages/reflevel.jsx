import React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: [
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ],
  });

const RefLevel = () => {
    return(
        <div className={`bg-[#1d1d1d] h-screen ${poppins.className} text-white`}>
            <div className="pt-48">
            <div className="border border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-3 py-2 rounded-md">
                <div className="test pt-4 pb-6 flex justify-between">
                    <h1 className="pl-2">Referrals level</h1>
                    <Image src={"/close.svg"} height={25} width={25} className="mr-2" />
                </div>
                <div className="flex justify-between mb-2 border w-11/12 mx-auto border-[#282828] bg-[#333333] px-2 py-2 rounded-md">
                    <p className="pl-2 font-light">Level 1</p>
                    <p className="flex mr-4"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />5%</p>
                </div>
                <div className="flex justify-between mb-2 border w-11/12 mx-auto border-[#282828] bg-[#333333] px-2 py-2 rounded-md">
                    <p className="pl-2 font-light">Level 2</p>
                    <p className="flex mr-4"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />5%</p>
                </div>
                <div className="flex justify-between mb-2 border w-11/12 mx-auto border-[#282828] bg-[#333333] px-2 py-2 rounded-md">
                    <p className="pl-2 font-light">Level 3</p>
                    <p className="flex mr-4"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />5%</p>
                </div>
                <div className="flex justify-between mb-2 border w-11/12 mx-auto border-[#282828] bg-[#333333] px-2 py-2 rounded-md">
                    <p className="pl-2 font-light">Level 4</p>
                    <p className="flex mr-4"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />5%</p>
                </div>
                <div className="flex justify-between mb-2 border w-11/12 mx-auto border-[#282828] bg-[#333333] px-2 py-2 rounded-md">
                    <p className="pl-2 font-light">Level 5</p>
                    <p className="flex mr-4"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />5%</p>
                </div>
                <div className="flex justify-between mb-2 border w-11/12 mx-auto border-[#282828] bg-[#333333] px-2 py-2 rounded-md">
                    <p className="pl-2 font-light">Level 6</p>
                    <p className="flex mr-4"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />5%</p>
                </div>
                <div className="flex justify-between mb-2 border w-11/12 mx-auto border-[#282828] bg-[#333333] px-2 py-2 rounded-md">
                    <p className="pl-2 font-light">Level 7</p>
                    <p className="flex mr-4"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />5%</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default RefLevel;