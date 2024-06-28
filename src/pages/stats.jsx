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
import BarChart from '@/components/Chart';
import axios from "axios";
import { useRouter } from 'next/router';
import { Inter } from "next/font/google";
import Navigation from '@/components/Navbar';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
  


const Stats = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [activeLink, setActiveLink] = useState("/stats");
    const [totalUsers, setTotalUsers] = useState(0)
    const [count, setCount] = useState(0);
  

      const fetchUsers= async ()=>{
        try {
          const users = await axios.get('/api/getAllUsers')
          const data  = users.data;
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

    return(
        <div className={`h-full min-h-screen bg-[#1d1d1d] ${inter.className} text-white`}>
            <div className="mb-8 pt-8">
            <h1 className="pl-4">Statistics</h1>
            <div className="coin border text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 pt-3 pb-4 mt-4 rounded-md">
                <h1 className="pl-4 pb-2">Total share balance:</h1>
                <h1 className="flex pl-4 text-4xl font-bold"><Image src={"/coin.svg"} height={40} width={40} className="mr-1" alt='done' />{count}</h1>
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
            <div className="last" style={{ paddingBottom: '40px', overflowY: 'auto' }}>
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
            <Navigation />
        </div>
    )
}

export default Stats;