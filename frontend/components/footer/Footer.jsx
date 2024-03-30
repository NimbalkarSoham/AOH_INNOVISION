'use client'
import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import logo from "../../public/img//logo.png";
import Vector from "../../public/img//Vector.png";
import Vector1 from "../../public/img//Vector1.png";
import Vector2 from "../../public/img//Vector2.png";
import footerBg from "../../public/img//footerBg.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
 
  return (
    <div className="bg-[#219653] inPhone py-20">
      <div className="flex justify-center items-center">
        <div className="flex-1 border-r-2 border-black-600">
          <Link href={"/"}>
          <div
            className="flex justify-center items-center mx-8 cursor-pointer"
          >
            <Image src={logo} className="footerLogo" alt="" width={70} height={70}/>
            <div className="ml-4">
              <h3 className="text-2xl text-white font-bold mt-4">
                Krishi <br /> Sadhan
              </h3>
              <p className="text-md font-normal text-white mt-2">
                Kisaan upkaran ka ek Matra Sadhan.
              </p>
            </div>
          </div>
          </Link>
        </div>
        <div className="flex-1 px-16 border-r-2 border-black-600">
          <div className="flex">
            <ul className="list-none mr-24">
            <Link href={"/"}>
              <li
                className="text-lg text-white font-bold cursor-pointer"
              >
                Home
              </li>
              </Link>
              {/* <li className='text-lg text-white font-medium cursor-pointer'>Menu</li> */}
              <li className="text-lg text-white font-medium cursor-pointer">
                Market
              </li>
            </ul>
            <ul>
              <li
                className="text-lg text-white font-bold cursor-pointer"
              >
                Support Center
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"
              >
                Help Center
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"
              >
                Partner Dispute
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer"
              >
                FAQs
              </li>
            </ul>
          </div>
          <p className="text-md text-medium text-white mt-4">
            Please provide us Feedback{" "}
            <button
              className="text-xl underline"
            >
              HERE
            </button>
          </p>
        </div>
        <div className="flex-1 px-16 border-r-2 border-black-600">
          <h1 className="text-xl ml-6 text-white font-bold w-2/3">
            Give us a follow on social media
          </h1>
          <div className="flex my-5 justify-left">
            <Image
              className="socialIcons mx-3 ml-6 cursor-pointer"
              src={Vector}
              alt=""
              height={500}
              width={500}
            />
            <Image
              className="socialIcons mx-3 ml-6 cursor-pointer"
              src={Vector1}
              alt=""
              height={500}
              width={500}
            />
            <Image
              className="socialIcons mx-3 ml-6 cursor-pointer"
              src={Vector2}
              alt=""
              height={500}
              width={500}
            />
          </div>
          <p className="text-lg ml-6 text-white">
            Made by : <strong>Team Gryffindor</strong>
          </p>
        </div>
        <div className="flex-1 flex mr-6">
          <Image src={footerBg} className="footerBgImg" alt="" height={500} width={500}/>
          <h1 className="text-xl text-white font-bold mt-6">
            Ministry of Skill Development and Entrepreneurship
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
