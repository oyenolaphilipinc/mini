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
import React, { useState, useEffect, useCallback, useRef } from "react";
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
import Link from "next/link";
import { Inter } from "next/font/google";
import Referral from "@/components/Referral";
import axios from "axios";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import Navigation from "./Navbar";
import { getTapDetails, updateTapDetails } from "@/utils/fireConstant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const Click = ({ userId, tapDetails }) => {
  const router = useRouter();
  const [isScaled, setIsScaled] = useState(false);
  const [count, setCount] = useState(0);
  const [tapEnergy, setTapEnergy] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showOne, setShowOne] = useState(false);
  const [activeLink, setActiveLink] = useState("/click");
  const [pointPerTap, setPointPerTap] = useState(1);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (userId) {
      const unsubscribe = getTapDetails(userId, (details) => {
        if (details) {
          console.log(details.tapBalance, details.pointPerTap);
          setCount(details.tapBalance);
          setPointPerTap(details.pointPerTap);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = getTapDetails(userId, (details) => {
        if (details) {
          console.log(details.tapEnergy);
          setTapEnergy(details.tapEnergy);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userId]);

  const updateEnergy = async (amount) => {
    try {
      await updateTapDetails(userId, {
        tapEnergy: amount,
      });
      console.log("Energy updated successfully");
    } catch (error) {
      console.error("Error updating energy:", error);
    }
  };

  const debounceUpdateEnergy = useCallback(
    debounce((amount) => updateEnergy(amount), 0),
    [tapEnergy]
  );

  const updateBalance = async (amount) => {
    try {
      await updateTapDetails(userId, { tapBalance: amount });
      console.log("Balance updated successfully");
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  const debouncedUpdateBalance = useCallback(
    debounce((amount) => updateBalance(amount), 0),
    [count]
  );

  const handleImageClick = (e) => {
    setCount((prevCount) => prevCount + pointPerTap);
    setTapEnergy((prevCount) => prevCount - 1);
    setShowOne(true);
    setIsScaled(true);
    setTimeout(() => {
      setShowOne(false);
      setIsScaled(false);
    }, 500);
    setX(e.clientX);
    setY(e.clientY);
  };

  useEffect(() => {
    if (hasMounted.current) {
      debouncedUpdateBalance(count);
    } else {
      hasMounted.current = true;
    }
  }, [count, debouncedUpdateBalance]);

  useEffect(() => {
    if (hasMounted.current) {
      debounceUpdateEnergy(tapEnergy);
    }
  }, [tapEnergy, debounceUpdateEnergy]);

  return (
    <>
      <div className={`bg-[#1d1d1d] h-full min-h-screen ${inter.className}`}>
        <div className="pt-6"></div>
        <div className="text-center text-white pt-4">
          <p className="flex justify-center text-5xl font-bold pb-3">
            <Image src={"/coin.svg"} width={50} height={50} className="mr-1" />
            {count}
          </p>
          <p className="text-md font-normal flex justify-center">
            <Image src={"/speedometer.svg"} width={20} height={20} className="mr-1" />
            {tapEnergy} / {tapDetails && tapDetails.energyLevel === 1 && '750'}
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
            <div className={`${styles.umaxCoin}`} style={{ top: `${y}px`, left: `${x}px` }}>
              <span className="text-2xl font-normal">+1</span>
            </div>
          )}
          <Link href={`/boost?userId=${userId}`} className="flex justify-center w-4/12 mx-auto border px-6 py-2 rounded-full bg-[#fbce47] text-black border-[#1d1d1d] text-lg font-semibold">
            <FaFire className="w-5 h-5 mr-1 mt-1" />
            Boost
          </Link>
        </div>
        <Navigation userId={userId} />
      </div>
    </>
  );
};

export default Click;
