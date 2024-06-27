import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    Flex,
    Text,
    Box,
    HStack,
    Icon,
    Tooltip,
    useColorModeValue,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import {
    MdKeyboardArrowRight,
    MdSpaceDashboard,
    MdGroups,
  } from "react-icons/md";
  import { IoMdStats } from "react-icons/io";
  import { IoMdClose } from "react-icons/io";
  import { SiGoogletasks } from "react-icons/si";
  import { FaFireAlt } from "react-icons/fa";
  import NextLink from "next/link";
  import Image from "next/image";
  import { BsThreeDotsVertical } from "react-icons/bs";
import { Poppins } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/router"
  
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


const Dash = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [count, setCount] = useState(0);
    const [activeLink, setActiveLink] = useState("/");
        const navData = [
        { icon: FaFireAlt, title: "Click", link: `/?userId=${userId}` },
        { icon: SiGoogletasks, title: "Airdrop", link: `/airdrop?userId=${userId}` },
        { icon: MdSpaceDashboard, title: "Levels", link: `/levels?userId=${userId}` },
        { icon: IoMdStats , title: "Stats", link: `/stats?userId=${userId}` },
        { icon: MdGroups, title: "Invites", link: `/invites?userId=${userId}` },
      ];
      const handleNavClick = (link) => {
        setActiveLink(link);
      };

      useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await axios.get(`/api/getTapDetailsByUserId`, { userId });
                if (res.data.success) {
                  setCount(res.data.data.tapBalance);
                }
              } catch (error) {
                console.error('Error fetching balance:', error);
              }
            }
        fetchBalance()
      }, [userId])

  return (
    <div className={`bg-[#1d1d1d] h-screen ${poppins.className} overflow-hidden text-white`}>
        <div className="mb-8 pt-8">
            {/* <div className="flex justify-between">
            <div className="text-white pl-6">
                <h1 className="flex text-xl text-semibold"><IoMdClose className="w-8 h-8 mr-2" /> Minipanda</h1>
            </div>
            <div className="mr-4 text-white">
                <BsThreeDotsVertical className="w-7 h-7" />
            </div>
            </div> */}
            <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
                <h1 className="flex pl-4 text-4xl font-bold"><Image src={"/coin.svg"} height={40} width={40} className="mr-1" />{count}</h1>
                <div className="pr-6">
                    <p className="text-sm font-normal">Level</p>
                    <p className="text-sm font-semibold">1</p>
                </div>
            </div>
        </div>
        <div className="levels">
            <div className="normal flex justify-between mb-4">
                <p className="pl-4">Levels</p>
                <p className="text-[#fbc347] underline pr-4">Claim all</p>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 1</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} />+1 SC</span>tokens earned</p>
                </div>
                <div className="button flex">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 2</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} />+2 SC</span>tokens earned</p>
                </div>
                <div className="button flex">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 3</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} />+3 SC</span>tokens earned</p>
                </div>
                <div className="button flex">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 4</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} />+4 SC</span>tokens earned</p>
                </div>
                <div className="button flex">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 5</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} />+5 SC</span>tokens earned</p>
                </div>
                <div className="button flex">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 6</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} />+6 SC</span>tokens earned</p>
                </div>
                <div className="button flex">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 7</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} />+7 SC</span>tokens earned</p>
                </div>
                <div className="button flex">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
        </div>
        <Flex
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            color={useColorModeValue("#fff", "#fff")}
            p={3}
            justifyContent="space-around"
            zIndex={1}
            display={useBreakpointValue({ base: "flex", md: "flex", lg: "none" })}
            bgColor={"#1f2221"}
          >
            {navData.map((item, index) => (
              <Tooltip hasArrow={index === 1} placement="top" key={item.title}>
                <Flex
                  flexDir="column"
                  align="center"
                  as={NextLink}
                  href={item.link}
                  onClick={() => handleNavClick(item.link)}
                  className={activeLink === item.link ? "text-[#fbce47] border rounded-md px-2 py-2 border-[#423c2c] bg-[#423c2c]" : ""}
                >
                  <Icon as={item.icon} boxSize={5} mb={2} />
                  <Text fontSize={{ base: "xs", md: "md" }}>{item.title}</Text>
                </Flex>
              </Tooltip>
            ))}
          </Flex>
    </div>
  )
}

export default Dash;