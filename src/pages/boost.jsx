import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { getTapDetails, updateTapDetails } from '@/utils/fireConstant';
  
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
  })

const Boost = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [count, setCount] = useState(0);
    const [userDetails, setUserDetails] = useState(null);
    const [insufficientBalance, setInsufficientBalance] = useState(false);
    const [showError, setShowError] = useState(false);
    const [level, setLevel] = useState(0)

useEffect(() => {
    if (userId) {
      const unsubscribe = getTapDetails(userId, (details) => {
        if (details) {
          setCount(details.tapBalance);
          setLevel(details.coinLevel);
          setUserDetails(details);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userId]);

  
     const handleBuyBoost = async (boostType) => {
    if (!userId || !userDetails) return;

    const levelCost = 200;

    if (count >= levelCost) {
      try {
        const newCount = count - levelCost;
        setCount(newCount);
        await updateTapDetails(userId, { tapBalance: newCount });

        // Update the specific boost type in Firestore
        let updates = {};
        switch (boostType) {
          case 'multitap':
            updates = { multitapLevel: (userDetails.multitapLevel || 0) + 1 ,
              pointPerTap: (userDetails.pointPerTap || 0) + 1  
            };
            break;
          case 'energy':
            updates = { energyLevel: (userDetails.energyLevel || 1) + 1 };
            break;
          case 'recharge':
            updates = { rechargeLevel: (userDetails.rechargeLevel || 1) + 1 };
            break;
          case 'tapbot':
            updates = { tapbotLevel: (userDetails.tapbotLevel || 1) + 1 };
            break;
          default:
            break;
        }
        await updateTapDetails(userId, updates);
        toast.success('Boost purchased successfully!');
      } catch (error) {
        console.error('Error purchasing:', error);
        toast.error('Error purchasing:', error);
      }
    } else {
      setInsufficientBalance(true);
      toast.error('Insufficient Balance');
    }
  };




  return (
    <div className={`bg-[#1d1d1d] h-screen ${inter.className} text-white`}>
        <div className="mb-8 pt-8 border-b rounded-md pb-4 border-[#fbce47]">
        <div className="flex justify-between">
        <div className="text-white pl-6 cursor-pointer"  onClick={()=>{
          router.push(`/?userId=${userId}`)
        }}>
            <h1 className="flex text-xl text-semibold"><Image src={"/left.svg"} height={9} width={9} className="mr-3" /> Home</h1>
        </div>
        <div className="mr-4 text-white">
            <BsThreeDotsVertical className="w-7 h-7" />
        </div>
        </div>
        <div className="coin border flex justify-between text-white border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto px-2 py-2 mt-4 rounded-md">
            <h1 className="flex pl-4 text-4xl font-bold"><Image src={"/coin.svg"} height={40} width={40} className="mr-1" />{count}</h1>
            <div className="pr-6">
                <p className="text-sm font-normal">Level</p>
                {level && (
                    <p className="text-sm font-semibold">{level}</p>
                )}
            </div>
        </div>
        </div>
        <div className="daily mb-6">
            <p className="pl-4 pb-4">Daily boosters:</p>
            <div className="flex">
                <div className="1 flex border w-5/12 px-2 py-2 border-[#1d1d1d] bg-[#282828] ml-6 rounded-md mr-2">
                    <Image src={"/touch.svg"} height={25} width={25} className='mr-1' />
                    <div>
                        <p className="text-sm">Tapping guru</p>
                        <p>3/3</p>
                    </div>
                </div>
                <div className='2 flex border w-5/12 px-2 py-2 border-[#1d1d1d] bg-[#282828] rounded-md'>
                    <Image src={"/mark.svg"} width={22} height={22} className='mr-2' />
                    <div>
                        <p className="text-sm">Full tank</p>
                        <p>3/3</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="boosters">
            <h1 className='pl-4 pb-4'>Boosters:</h1>
            <div className="boooose">
                <div className="flex mb-2 justify-between border py-2 rounded-md px-2 w-11/12 mx-auto border-[#1d1d1d] bg-[#282828]" onClick={handleBuyBoost}>
                    <div className="first flex">
                       <Image src={"/click.svg"} width={22} height={22} className="mr-2" />
                       <div>
                            <p className="text-sm">Multitap</p>
                            <p className="flex text-sm"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />200 | Level {userDetails && userDetails.level}</p>
                       </div>
                    </div>
                    <div className="second">
                        <Image src={"/right.svg"} width={8} height={8} className="pt-3 mr-2" />
                    </div>
                </div>
                
                <div className="flex mb-2 justify-between border py-2 rounded-md px-2 w-11/12 mx-auto border-[#1d1d1d] bg-[#282828]" onClick={handleBuyBoost}>
                    <div className="first flex">
                       <Image src={"/energy.svg"} width={22} height={22} className="mr-2" />
                       <div>
                            <p className="text-sm">Energy limit</p>
                            <p className="flex text-sm"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />200 | Level {userDetails && userDetails.level}</p>
                       </div>
                    </div>
                    <div className="second">
                        <Image src={"/right.svg"} width={8} height={8} className="pt-3 mr-2" />
                    </div>
                </div>

                <div className="flex mb-2 justify-between border py-2 rounded-md px-2 w-11/12 mx-auto border-[#1d1d1d] bg-[#282828]" onClick={handleBuyBoost}>
                    <div className="first flex">
                       <Image src={"/recharge.svg"} width={15} height={15} className="mr-2" />
                       <div>
                            <p className="text-sm">Recharging speed</p>
                            <p className="flex text-sm"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />200 | Level {userDetails && userDetails.level}</p>
                       </div>
                    </div>
                    <div className="second">
                        <Image src={"/right.svg"} width={8} height={8} className="pt-3 mr-2" />
                    </div>
                </div>
                <div className="flex justify-between border py-2 rounded-md px-2 w-11/12 mx-auto border-[#1d1d1d] bg-[#282828]" onClick={handleBuyBoost}>
                    <div className="first flex">
                       <Image src={"/bot.svg"} width={22} height={22} className="mr-2" />
                       <div>
                            <p className="text-sm">Tap bot</p>
                            <p className="flex text-sm"><Image src={"/coin.svg"} width={18} height={18} className="mr-1" />200 | Level {userDetails && userDetails.level}</p>
                       </div>
                    </div>
                    <div className="second">
                        <Image src={"/right.svg"} width={8} height={8} className="pt-3 mr-2" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Boost;