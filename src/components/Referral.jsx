import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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

const Referral = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const getReferralLink = async () => {
            try{
                const response = await axios.get(`/api/getUser?userId=${userId}`);
                if (response.data.success) {
                    setUserDetails(response.data.data);
                } else {
                    setError('User not found');
                }
            } catch(error){
                console.error("Error fetching data", error);
            }
        };

        getReferralLink()
    }, [userId])

    const truncateLink = (link, maxLength) => {
        if (link.length <= maxLength) {
            return link;
        }
        return `${link.substring(0, maxLength)}...`;
    };

    const maxLength = 20;
    
    return(
        <div className={`overflow-hidden h-screen bg-[#1d1d1d] ${poppins.className} text-white`}>
            
                <div>
                    {userDetails && (
                    <h1 className="text-2xl text-center">{userDetails.referralCount} Referrals</h1>
                    )}
                <div>
                    <p className="pl-4 pb-4 pt-8">My referral link:</p>
                    <div className="border px-2 py-2 w-11/12 border-[#1d1d1d] bg-[#282828] mx-auto flex justify-between rounded-md">
                    {userDetails && (
                        <p className="text-gray-400 pt-2 pl-2">{truncateLink(userDetails.referralLink, maxLength)}</p>
                    )}
                        <button className="flex border border-[#282828] px-2 py-2 bg-[#fbc347] rounded-md mr-1 text-black"><Image src={"/clip.svg"} width={18} height={18} className="mr-1" />Copy</button>
                    </div>
                    
                    <p className="pt-1 pl-4 text-gray-400 pb-12">How referral levels work? <Link href={"/reflevel"} className="text-[#fbc347] underline">Check</Link></p>
                </div>
            </div>
            <div>
                <h1 className="pl-4 pb-4">My referrals:</h1>
                <div className="mb-3 border border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto flex rounded-md px-2 py-2">
                    <Image src={"/wilson.svg"} height={40} width={40} className="mr-2" />
                    <p className="pt-2">James Wilson</p>
                </div>
                <div className="mb-3 border border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto flex rounded-md px-2 py-2">
                    <Image src={"/billy.svg"} height={40} width={40} className="mr-2" />
                    <p className="pt-2">Binny Wick</p>
                </div>
                <div className="mb-3 border border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto flex rounded-md px-2 py-2">
                    <Image src={"/wilson.svg"} height={40} width={40} className="mr-2" />
                    <p className="pt-2">Luciana Fernandes</p>
                </div>
                <div className="mb-3 border border-[#1d1d1d] bg-[#282828] w-11/12 mx-auto flex rounded-md px-2 py-2">
                    <Image src={"/billy.svg"} height={40} width={40} className="mr-2" />
                    <p className="pt-2">Daniel Martin</p>
                </div>
            </div>
        </div>
    )
}

export default Referral;