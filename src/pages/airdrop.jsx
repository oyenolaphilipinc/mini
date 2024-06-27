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
import { Inter } from "next/font/google";
import Referral from '@/components/Referral';
import Airdrop from '@/components/Airdrop';
import axios from "axios";
import { useRouter } from 'next/router';
import Navigation from '@/components/Navbar';
  
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const tabs = [
  { name: "Airdrop", tab: "airdrop", href: "/umbrella.svg" },
  { name: "Referral", tab: "referral", href: "/gift.svg" },
];


const airdrop = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [activeLink, setActiveLink] = useState("/airdrop");
    const [currentTab, setCurrentTab] = useState("airdrop");
    const [count, setCount] = useState(0);
    const [userDetails, setUserDetails] = useState(null);

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

      const renderContent = () => {
        switch (currentTab) {
          case "airdrop":
            return <Airdrop key={"airdrop"}/>
          case "referral":
            return <Referral key={"referral"} userId={userId} />;
          default:
            return null;
        }
      };

      useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await axios.get(`/api/getTapDetailsByUserId?userId=${userId}`);
                if (res.data.success) {
                  setCount(res.data.data.tapBalance);
                }
              } catch (error) {
                console.error('Error fetching balance:', error);
              }
            }
        fetchBalance()

        const getLevel = async () => {
          try{
              const response = await axios.get(`/api/getTapDetailsByUserId?userId=${userId}`);
              if (response.data.success) {
                  setUserDetails(response.data.data);
              } else {
                  setError('User not found');
              }
          } catch(error){
              console.error("Error fetching data", error);
          }
      };

      getLevel()
      }, [userId])
    
  return (
    <div className={`bg-[#1d1d1d] h-screen ${inter.className} overflow-hidden`}>
        <div className="mb-8 pt-8 border-b rounded-md pb-4 border-[#fbce47] shadow-lg">
            <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
                <h1 className="flex pl-4 text-4xl font-bold"><Image src={"/coin.svg"} height={40} width={40} className="mr-1" />{count}</h1>
                <div className="pr-6">
                    <p className="text-sm font-normal">Level</p>
                    {userDetails && (
                    <p className="text-sm font-semibold">{userDetails.level}</p>
                    )}
                </div>
            </div>
            <div className="button mt-4 flex justify-center gap-3">
              {tabs.map((tab, index) => (
                <button key={index} onClick={() => setCurrentTab(tab.tab)} className={`flex border border-[#1d1d1d] px-2 py-1 rounded-md ${currentTab === tab.tab ? "bg-[#423c2c] text-[#fbce47]" : "bg-[#282828] text-gray-400"}`}><Image src={tab.href} height={20} width={20} className="mr-1" />{tab.name}</button>
              ))}
            </div>
        </div>
        <div>{renderContent()}</div>
        <Navigation userId={userId} />
    </div>
  )
}

export default airdrop