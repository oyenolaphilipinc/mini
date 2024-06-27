import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from "next/image"

const Navigation = ({ userId }) => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.asPath);

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  const navData = [
    { imgSrc: '/coin.svg', title: "Click", link: `/?userId=${userId}`, width: 23 },
    { imgSrc: '/umbrella.svg', title: "Airdrop", link: `/airdrop?userId=${userId}`, width: 23 },
    { imgSrc: '/ball.svg', title: "Levels", link: `/levels?userId=${userId}`, width: 25, className: "pt-2" },
    { imgSrc: '/semi.svg', title: "Stats", link: `/stats?userId=${userId}`, width: 23, className: "pt-1" },
    { imgSrc: '/invite.svg', title: "Invites", link: `/invites?userId=${userId}`, width: 23, className: "pt-1" },
  ];


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#282828] text-white p-1 flex justify-around z-10 lg:hidden">
      {navData.map((item) => (
        <Link key={item.title} href={item.link} passHref className={`flex flex-col items-center ${
            activeLink === item.link ? 'border rounded-md px-2 py-1 border-[#282828] bg-[#423c2c]' : ''
          }`} onClick={() => handleNavClick(item.link)}>
            <Image src={item.imgSrc} width={item.width} height={23} alt={`${item.title} icon`} className={`mb-2 ${item.className} ${activeLink === item.link ? 'text-yellow-400' : ''}`} />
            <span className={`text-xs md:text-md ${activeLink === item.link ? 'text-[#fbce47]': 'text-gray-400'}`}>{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
