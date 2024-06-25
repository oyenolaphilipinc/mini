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
import BarChart from '@/components/Chart';
  
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


const Stats = () => {
    const [activeLink, setActiveLink] = useState("/stats");
    const [totalUsers, setTotalUsers] = useState(0)
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

      const fetchUsers= async ()=>{
        try {
          const users = await fetch('/api/getAllUsers')
          const data  = await users.json()
          const len = data.data.length

          console.log(len)
          console.log('users', data)
          
          console.log(len)
          setTotalUsers(len)
        } catch (error) {
          console.log(error)
        }
      }


      useEffect(()=>{
        fetchUsers()
      }, [])

    return(
        <div className={`overflow-hidden h-screen bg-[#1d1d1d] ${poppins.className} text-white`}>
            <div className="mb-8 pt-8">
            {/* <div className="flex justify-between">
            <div className="text-white pl-6">
                <h1 className="flex text-xl text-semibold"><IoMdClose className="w-8 h-8 mr-2" /> Minipanda</h1>
            </div>
            <div className="mr-4 text-white">
                <BsThreeDotsVertical className="w-7 h-7" />
            </div>
            </div> */}
            <h1 className="pl-4">Statistics</h1>
            <div className="coin border text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 pt-3 pb-4 mt-4 rounded-md">
                <h1 className="pl-4 pb-2">Total share balance:</h1>
                <h1 className="flex pl-4 text-4xl font-bold"><Image src={"/coin.svg"} height={40} width={40} className="mr-1" /> 6122</h1>
            </div>
            </div>
            <div className="images mb-6 flex justify-center gap-2">
                <div className="yellow">
                    <p className="text-sm text-center"><span className="text-center">Total</span><br/><span className="text-center">touches</span></p>
                    <Image src={"/yellow.svg"} width={65} height={65}/>
                </div>
                <div className="yellow pt-12">
                    <p className="text-sm text-center"><span className="text-center">Total</span><br/><span className="text-center">players</span></p>
                    <div className="border py-14 border-[#1d1d1d] bg-[#ba993b] rounded-md"></div>
                </div>
                <div className="yellow pt-20">
                    <p className="text-sm text-center"><span className="text-center">Daily</span><br/><span className="">users</span></p>
                    <div className="border py-10 px-3 border-[#1d1d1d] bg-[#60522a] rounded-md"></div>
                </div>
                <div className="yellow pt-28">
                    <p className="text-sm text-center"><span className="text-center">Online</span><br/><span className="text-center">players</span></p>
                    <div className="border py-6 border-[#1d1d1d] bg-[#332f21] rounded-md"></div>
                </div>
            </div>
            {/* The Last part */}
            <div className="last">
                <div className="first mb-3 flex border w-11/12 border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md mx-auto">
                    <div className="mr-3 border py-2 px-6 bg-[#fdcf48] rounded-md border-[#282828]"></div>
                    <div>
                        <h1 className='font-light'>Total touches:</h1>
                        <p className="font-medium">6,54,65,454</p>
                    </div>
                </div>
                <div className="first mb-3 flex border w-11/12 border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md mx-auto">
                    <div className="mr-3 border py-2 px-6 bg-[#ba993b] rounded-md border-[#282828]"></div>
                    <div>
                        <h1 className='font-light'>Total players:</h1>
                        <p className="font-medium">{totalUsers}</p>
                    </div>
                </div>
                <div className="first mb-3 flex border w-11/12 border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md mx-auto">
                    <div className="mr-3 border py-2 px-6 bg-[#60522a] rounded-md border-[#282828]"></div>
                    <div>
                        <h1 className='font-light'>Daily users:</h1>
                        <p className="font-medium">6,54,65,454</p>
                    </div>
                </div>
                <div className="first flex border w-11/12 border-[#1d1d1d] bg-[#282828] px-2 py-2 rounded-md mx-auto">
                    <div className="mr-3 border py-2 px-6 bg-[#332f21] rounded-md border-[#282828]"></div>
                    <div>
                        <h1 className='font-light'>Onllne players:</h1>
                        <p className="font-medium">6,54,65,454</p>
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

export default Stats;