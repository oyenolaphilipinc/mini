import React, { useState } from 'react'
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
import Referral from '@/components/Referral';
import Airdrop from '@/components/Airdrop';
  
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

const tabs = [
  { name: "Airdrop", tab: "airdrop", href: "/umbrella.svg" },
  { name: "Referral", tab: "referral", href: "/gift.svg" },
];


const airdrop = () => {
    const [activeLink, setActiveLink] = useState("/airdrop");
    const [currentTab, setCurrentTab] = useState("airdrop");

    const navData = [
        { icon: FaFireAlt, title: "Click", link: "/click" },
        { icon: SiGoogletasks, title: "Airdrop", link: "/airdrop" },
        { icon: MdSpaceDashboard, title: "Levels", link: "/" },
        { icon: IoMdStats , title: "Stats", link: "/stats" },
        { icon: MdGroups, title: "Invites", link: "/invites" },
      ];
    
      const handleNavClick = (link) => {
        setActiveLink(link);
      };

      const renderContent = () => {
        switch (currentTab) {
          case "airdrop":
            return <Airdrop key={"airdrop"}/>
          case "referral":
            return <Referral key={"referral"} />;
          default:
            return null;
        }
      };

  return (
    <div className={`bg-[#1d1d1d] h-screen ${poppins.className} overflow-hidden`}>
        <div className="mb-8 pt-8 border-b rounded-md pb-4 border-[#fbce47] shadow-lg">
            {/* <div className="flex justify-between">
            <div className="text-white pl-6">
                <h1 className="flex text-xl text-semibold"><IoMdClose className="w-8 h-8 mr-2" /> Minipanda</h1>
            </div>
            <div className="mr-4 text-white">
                <BsThreeDotsVertical className="w-7 h-7" />
            </div>
            </div> */}
            <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
                <h1 className="flex pl-4 text-4xl font-bold"><Image src={"/coin.svg"} height={40} width={40} className="mr-1" /> 6122</h1>
                <div className="pr-6">
                    <p className="text-sm font-normal">Level</p>
                    <p className="text-sm font-semibold">1</p>
                </div>
            </div>
            <div className="button mt-4 flex justify-center gap-3">
              {tabs.map((tab, index) => (
                <button key={index} onClick={() => setCurrentTab(tab.tab)} className={`flex border border-[#1d1d1d] px-2 py-1 rounded-md ${currentTab === tab.tab ? "bg-[#423c2c] text-[#fbce47]" : "bg-[#282828] text-gray-400"}`}><Image src={tab.href} height={20} width={20} className="mr-1" />{tab.name}</button>
              ))}
            </div>
        </div>
        <div>{renderContent()}</div>
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

export default airdrop