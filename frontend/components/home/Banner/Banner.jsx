import React, { useState } from "react";
import "../Banner/Banner.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import home1 from "../../../public/img/home1.webp";
import slider2 from "../../../public/img/slider2.webp";
import slider3 from "../../../public/img/Slider3.webp";
import Image from "next/image";


const Banner = () => {

    return (
        <>

            <Carousel
                autoplay={true}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={3000}
            >
                <div className="relative">
                    <div className="absolute w-full h-full bg-gradient-to-r from-white-900/10 to-white-900/10 bottom-0  z-10" />
                    
                    <Image src={home1} className="home1Img rounded-lg" width={1000} height={1000}/>
                    <div>
                        <div className="flex flex-col justify-center -mt-10 wrapper">
                            <p className="text-2xl font-normal text-black">
                                Namaste, welcome to AGRI FARM.
                            </p>
                            <h1 className="text-4xl font-bold text-black">
                                <span className="text-[#219653]">Farmer’s Equipments</span> at
                                reasonable <br /> and affordable prices.
                            </h1>
                            <p className="text-lg font-normal mt-2 mb-4 text-black">
                                Start now with just one click.
                            </p>
                            <div className="flex justify-center items-center mx-auto">
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="shadow-md mr-3 tooltip bg-[#219653] hover:bg-[#64a55a] text-white font-semibold text-lg w-[200px] py-2 px-2 rounded"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Image src={slider2} width={1000} height={1000} />
                </div>
                {/* <div>
                    <img src={slider3} width={1000} height={1000}/>
                </div> */}
            </Carousel>
        </>
    );
};

export default Banner;
