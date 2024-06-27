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
import axios from "axios";
import { useRouter } from "next/router"
import { IoCloseCircle } from "react-icons/io5";
import Navigation from '@/components/Navbar';
  
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})


const Dash = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [count, setCount] = useState(0);
    const [userDetails, setUserDetails] = useState(null);
    const [insufficientBalance, setInsufficientBalance] = useState(false);
    const [showError, setShowError] = useState(false);

      useEffect(() => {
        if (insufficientBalance) {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 2000); // 3 seconds
        }
      }, [insufficientBalance]);

      useEffect(() => {
        const fetchBalance = async () => {
          if(!userId) return ;
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
      }, [userId])

      useEffect(() => {
        const getLevel = async () => {
            if(!userId) return;
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

      const handleBuyLevel = async (level) => {
        if (!userId || !userDetails) return;
    
        let levelCost;

        switch (level) {
          case 1:
            levelCost = 10000; // Level 1 costs 10 tapBalance
            break;
          case 2:
            levelCost = 20000; // Level 2 costs 20 tapBalance
            break;
          case 3:
            levelCost = 30000; // Level 3 costs 30 tapBalance
            break;
          case 4:
            levelCost = 40000; // Level 4 costs 40 tapBalance
            break;
          case 5:
            levelCost = 50000; // Level 5 costs 50 tapBalance
            break;
          case 6:
            levelCost = 60000; // Level 6 costs 60 tapBalance
            break;
          case 7:
            levelCost = 70000; // Level 7 costs 70 tapBalance
            break;
          default:
            console.error(`Invalid level: ${level}`);
            return;
        }
    
        if (count >= levelCost) {
          try {
            setCount(count - levelCost);
    
            const res = await axios.post(`/api/deductBalance`, {
              userId,
              amount: levelCost,
            });
    
            if (res.data.success) {
              await triggerLevelUp();
            } else {
              console.error('Failed to deduct balance:', res.data.message);
            }
          } catch (error) {
            console.error('Error buying level:', error);
          }
        } else {
          setInsufficientBalance(true);
        }
      };

      const triggerLevelUp = async () => {
        try {
          const res = await axios.post(`/api/levelUp`, { userId });
    
          if (res.data.success) {
            setUserDetails(res.data.data);
          } else {
            console.error('Failed to level up:', res.data.message);
          }
        } catch (error) {
          console.error('Error triggering level up:', error);
        }
      };

  return (
    <div className={`bg-[#1d1d1d] h-full min-h-screen ${inter.className} overflow-hidden text-white`}>
        <div className="mb-8 pt-8">
            <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
                <h1 className="flex pl-4 text-4xl font-bold"><Image src={"/coin.svg"} height={40} width={40} alt='coin' className="mr-1" />{count}</h1>
                <div className="pr-6">
                    <p className="text-sm font-normal">Level</p>
                    {userDetails && (
                      <p className="text-sm font-semibold">{userDetails.level}</p>
                  )}
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
                    <p className="text-sm">Level 2</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} />+2 SC</span>tokens earned</p>
                </div>
                <div className="button flex gap-2">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1" onClick={() => handleBuyLevel(1)}>Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 3</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} alt='coin' />+3 SC</span>tokens earned</p>
                </div>
                <div className="button flex gap-2">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 4</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} alt='coin' />+4 SC</span>tokens earned</p>
                </div>
                <div className="button flex gap-2">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 5</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} alt='coin' />+5 SC</span>tokens earned</p>
                </div>
                <div className="button flex gap-2">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 6</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} alt='coin' />+6 SC</span>tokens earned</p>
                </div>
                <div className="button flex gap-2">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 7</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} alt='coin' />+7 SC</span>tokens earned</p>
                </div>
                <div className="button flex gap-2">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1">Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
            <div className="hello border flex justify-between bg-[#282828] border-[#1d1d1d] w-11/12 mx-auto px-2 py-2 rounded-md mb-3">
                <div className="pl-2">
                    <p className="text-sm">Level 8</p>
                    <p className="flex gap-1 text-sm text-gray-400"><span className="flex text-[#fbc347]"><Image src={"/coin.svg"} width={20} height={20} alt='coin' />+8 SC</span>tokens earned</p>
                </div>
                <div className="button flex gap-2">
                    <button className="text-[#fbc347] border px-3 py-1 border-[#fbc347] rounded-md mr-1" disabled={true}>Buy</button>
                    <button className="text-black border px-3 py-1 border-[#282828] bg-[#fbc347] rounded-md">Claim</button>
                </div>
            </div>
        </div>
        {showError && (
          <div
            className="fixed top-0  w-full h-6/12 flex items-center justify-center bg-[#1d1d1d]"
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <IoCloseCircle className='mr-1 text-red-500'/>
            <div className="text-md font-light text-red-400">Insufficient Balance</div>
          </div>
        )}
        <Navigation userId={userId} />
    </div>
  )
}

export default Dash;