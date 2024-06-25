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
  import { Poppins } from "next/font/google";
import Link from "next/link";
import Referral from "@/components/Referral";
import axios from "axios";
import { useRouter } from "next/router";
  
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
  
  const Click = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [isScaled, setIsScaled] = useState(false);
    const [count, setCount] = useState(0);
    const [showOne, setShowOne] = useState(false);
    const [activeLink, setActiveLink] = useState("/click");

    useEffect(() => {
      const fetchBalance = async() => {
        try {
          const res = await axios.get(`/api/getTapDetailsByUserId`, { userId });
          if (res.data.success) {
            setCount(res.data.data.tapBalance);
          }
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
  
      fetchBalance();
    }, [userId])

    const updateBalance = async (amount) => {
      try {
        const res = await axios.post('/api/updateBalance', { userId, amount: amount });
        if (res.data.success) {
          if (res.data.data.tapBalance !== null) {
            setCount(res.data.data.tapBalance);
          } else {
            console.error('Balance is null in response:', res.data.data);
          }
        } else {
          console.error('Error response:', res.data.error);
        }
      } catch (error) {
        console.error('Error updating balance:', error);
      }
    };
  
    const handleImageClick = () => {
      updateBalance(count + 1);
      setShowOne(true);
      setIsScaled(true);
      setTimeout(() => {
        setShowOne(false);
        setIsScaled(false);
      }, 500);
    };
  
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
  
    return (
      <>
        <div className={`bg-[#1d1d1d] h-screen ${poppins.className} overflow-hidden`}>
        <div className="pt-16"></div>
          <div className="text-center text-white pt-4">
            <p className="flex justify-center text-5xl font-bold pb-3"><Image src={"/coin.svg"} width={50} height={50} className="mr-1" />{count}</p>
            <p className="text-md font-normal flex justify-center">
             <Image src={"/speedometer.svg"} width={20} height={20} className="mr-1" /> 954/954
            </p>
            <div
              className={`pt-12 transition-transform transform ${isScaled && "scale-75"} mb-16`}
              onClick={handleImageClick}
            >
              <img
                src={"/mini.svg"}
                width={300}
                height={300}
                alt={"Coin"}
                className="mx-auto"
              />
            </div>
            {showOne && (
              <div className={styles.umaxCoin}>
                <span className="text-2xl font-normal">+1</span>
              </div>
            )}
            <Link href={"/boost"} className="flex justify-center w-4/12 mx-auto border px-6 py-2 rounded-full bg-[#fbce47] text-black border-[#1d1d1d] text-lg font-semibold"><FaFire className="w-5 h-5 mr-1 mt-1" />Boost</Link>
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
      </>
    );
  };
  
  export default Click;