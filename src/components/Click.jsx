import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaFire } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import debounce from "lodash.debounce";
import { getTapDetails, updateTapDetails } from "@/utils/fireConstant";
import Navigation from "./Navbar";
import styles from "../components/Dash.module.css";
import { Inter } from "next/font/google";
import { useUserData } from "@/hooks/useUserdata";
import { updateUserData } from "@/helper-functions/getUser";
import { keyframes } from "@emotion/react";
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});
import { Text, Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";


const floatUpAndFadeOut = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
`

const rotateCoinLeft = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(20deg)
  }
`

const rotateCoinRight = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(-20deg)
  }
`

const Click = ({ userId, name }) => {
    const [floatingEnergy, setFloatingEnergy] = useState(0)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [tappingEnergy, setTappingEnergy] = useState(0)
  const [tappingPower, setTappingPower] = useState(0)
const router = useRouter()
  const [rotateAnim, setRotateAnim] = useState("")

   const {referralId} = router.query

    const { userData } = useUserData(userId, name, referralId)

const [screenAxis, setScreenAxis] = useState([]);
const handleTap = async (clientX, clientY) => {
  }

  const removeScreen = (id) => {
    setScreenAxis(screenAxis.filter((screen) => screen.id !== id))
  }

  useEffect(() => {
    if (!userData) return
    const timeLost = calculateLostTime()
    setCoinsEarned(() => userData.coinsEarned)
    setTappingEnergy(() => userData.tapEnergy)
    const energyPerSec = userData.refillEnergy / userData.refillTime
    const energyLost =
      userData.floatingTapEnergy + energyPerSec * timeLost
    if (timeLost >= 3) {
      if (Number(energyLost.toFixed(0)) >= userData.tapEnergy) {
        setFloatingEnergy(() => userData.tapEnergy)
      } else {
        setFloatingEnergy(() => Number(energyLost.toFixed(0)))
      }
    } else {
      setFloatingEnergy(() => userData.floatingTapEnergy)
    }
    //setFloatingEnergy(() => userData.floatingTapEnergy)
    // setRefillEnergy(userData.refilEnergy)
    setTappingPower(() => userData.tapPower)
    // setUserId(userData.userId)
    return () => {}
  }, [userData])

  useEffect(() => {
    if (!userData) return
    setInterval(() => {
      setFloatingEnergy((curr) => {
        if (curr + userData.refillEnergy >= userData.tapEnergy)
          return userData.tapEnergy
        return curr + userData.refillEnergy
      })
    }, 3000)
    return () => {}
  }, [userData])

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      await updateUserData(userId, {
        floatingTapEnergy: floatingEnergy,
        lastUpdatedTime: Date.now() / 1000,
      })
    })()
    return () => {}
  }, [floatingEnergy, userId])

  const calculateLostTime = () => {
    const lastUpdate = userData?.lastUpdatedTime
    const timeNowInSeconds = Date.now() / 1000
    return timeNowInSeconds - lastUpdate
  }



  return (
    <>
      <div className={`bg-[#1d1d1d] h-full min-h-screen ${inter.className}`}>
        <div className="pt-6"></div>
        <div className="text-center text-white pt-4">
          <p className="flex justify-center text-5xl font-bold pb-3">
            <Image src={"/coin.svg"} width={50} height={50} className="mr-1" />
             {coinsEarned.toLocaleString()}
          </p>
          <p className="text-md font-normal flex justify-center">
            <Image src={"/speedometer.svg"} width={20} height={20} className="mr-1" />
            {floatingEnergy} / {tappingEnergy}
          </p>
          <div
            className={`pt-12 transition-transform transform  mb-16`}
            onTouchStart={async (e) =>
                await handleTap(e.touches[0].clientX, e.touches[0].clientY)
              }
              onAnimationStart={`${rotateAnim} 0.1s ease `}
               onAnimationEnd={() => setRotateAnim("")}
          >
            <img src={"/mini.svg"} width={300} height={300} alt={"Coin"} className="mx-auto" />
          </div>
          {screenAxis.map((screen) => (
          <Text
            key={screen.id}
            position={"absolute"}
            left={`${screen.x - 10}px`}
            top={`${screen.y}px`}
            color={"white"}
            as={"p"}
            animation={`${floatUpAndFadeOut} 1s ease forwards`}
            onAnimationEnd={() => removeScreen(screen.id)}
            zIndex={"5"}
            fontSize={"30px"}
          >
            +{tappingPower}
          </Text>
        ))}

          <Link href={`/boost?userId=${userId}`} className="flex justify-center w-4/12 mx-auto border px-6 py-2 rounded-full bg-[#fbce47] text-black border-[#1d1d1d] text-lg font-semibold">
            <FaFire className="w-5 h-5 mr-1 mt-1" />
            Boost
          </Link>
        </div>
         <Progress
                rounded={"10px"}
                value={(floatingEnergy / tappingEnergy) * 100}
                min={0}
              />
        <Navigation userId={userId} name={name ? name : ""} />
      </div>
    </>
  );
};

export default Click;
