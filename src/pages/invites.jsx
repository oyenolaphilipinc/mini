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
  import React, { useState, useEffect } from "react";
  import { GiTrophyCup } from "react-icons/gi";
  import { PiSpeedometer } from "react-icons/pi";
  import {
    MdKeyboardArrowRight,
    MdSpaceDashboard,
    MdGroups,
  } from "react-icons/md";
  import { IoMdStats } from "react-icons/io";
  import { SiGoogletasks } from "react-icons/si";
  import { FaFireAlt } from "react-icons/fa";
  import NextLink from "next/link";
  import Image from "next/image";
  import styles from "../components/Dash.module.css";
  import { IoMdClose } from "react-icons/io";
  import { BsThreeDotsVertical } from "react-icons/bs";
  import { FaFire } from "react-icons/fa";
  import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
  
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
  })

const Invites = () => {
    const [activeLink, setActiveLink] = useState("/invites");
    const router = useRouter()
    const {userId} = router.query
    console.log(userId)

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

    return(
        <div className={`bg-[#1d1d1d] h-screen ${inter.className} overflow-hidden text-white`}>
        <div className="mb-8 pt-8">
            {/* <div className="flex justify-between">
            <div className="text-white pl-6">
                <h1 className="flex text-xl text-semibold"><IoMdClose className="w-8 h-8 mr-2" /> Minipanda</h1>
            </div>
            <div className="mr-4 text-white">
                <BsThreeDotsVertical className="w-7 h-7" />
            </div>
            </div> */}
        </div>
        <div className="invite">
            <p className="pb-4 pl-4">Invite friends</p>
            <div className="mb-3 flex justify-between invite-container border w-11/12 mx-auto border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md">
                <div className="pl-3">
                    <p>Invite 1 friend</p>
                    <p className="flex text-[#fbce47] text-lg"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />+5 SC</p>
                </div>
                <div className="pt-2">
                    <button className="bg-[#474747] text-gray-500 text-light border px-4 py-2 border-[#1d1d1d] rounded-md">Claim</button>
                </div>
            </div>
            <div className="flex mb-3 justify-between invite-container border w-11/12 mx-auto border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md">
                <div className="pl-3">
                    <p>Invite 2 friend</p>
                    <p className="flex text-[#fbce47] text-lg"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />+10 SC</p>
                </div>
                <div className="pt-2">
                    <button className="bg-[#474747] text-gray-500 text-light border px-4 py-2 border-[#1d1d1d] rounded-md">Claim</button>
                </div>
            </div>
            <div className="flex mb-3 justify-between invite-container border w-11/12 mx-auto border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md">
                <div className="pl-3">
                    <p>Invite 3 friend</p>
                    <p className="flex text-[#fbce47] text-lg"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />+15 SC</p>
                </div>
                <div className="pt-2">
                    <button className="bg-[#474747] text-gray-500 text-light border px-4 py-2 border-[#1d1d1d] rounded-md">Claim</button>
                </div>
            </div>
            <div className="flex mb-3 justify-between invite-container border w-11/12 mx-auto border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md">
                <div className="pl-3">
                    <p>Invite 4 friend</p>
                    <p className="flex text-[#fbce47] text-lg"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />+20 SC</p>
                </div>
                <div className="pt-2">
                    <button className="bg-[#474747] text-gray-500 text-light border px-4 py-2 border-[#1d1d1d] rounded-md">Claim</button>
                </div>
            </div>
            <div className="flex mb-3 justify-between invite-container border w-11/12 mx-auto border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md">
                <div className="pl-3">
                    <p>Invite 5 friend</p>
                    <p className="flex text-[#fbce47] text-lg"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />+25 SC</p>
                </div>
                <div className="pt-2">
                    <button className="bg-[#474747] text-gray-500 text-light border px-4 py-2 border-[#1d1d1d] rounded-md">Claim</button>
                </div>
            </div>
            <div className="flex mb-3 justify-between invite-container border w-11/12 mx-auto border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md">
                <div className="pl-3">
                    <p>Invite 6 friend</p>
                    <p className="flex text-[#fbce47] text-lg"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />+30 SC</p>
                </div>
                <div className="pt-2">
                    <button className="bg-[#474747] text-gray-500 text-light border px-4 py-2 border-[#1d1d1d] rounded-md">Claim</button>
                </div>
            </div>
            <div className="flex mb-3 justify-between invite-container border w-11/12 mx-auto border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md">
                <div className="pl-3">
                    <p>Invite 7 friend</p>
                    <p className="flex text-[#fbce47] text-lg"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />+35 SC</p>
                </div>
                <div className="pt-2">
                    <button className="bg-[#474747] text-gray-500 text-light border px-4 py-2 border-[#1d1d1d] rounded-md">Claim</button>
                </div>
            </div>
            <div className="flex mb-3 justify-between invite-container border w-11/12 mx-auto border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md">
                <div className="pl-3">
                    <p>Invite 8 friend</p>
                    <p className="flex text-[#fbce47] text-lg"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />+40 SC</p>
                </div>
                <div className="pt-2">
                    <button className="bg-[#474747] text-gray-500 text-light border px-4 py-2 border-[#1d1d1d] rounded-md">Claim</button>
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

export default Invites