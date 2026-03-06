import React from "react";
import Image from "next/image";
import hero from "../../../assets/hero.png";
import playStore from "../../../assets/Group.png";
import appStore from "../../../assets/Group1.png";

const Hero = () => {
  return (
    <div>
      <div className="p-10 flex flex-col justify-center items-center bg-gray-100">
        <h3 className=" font-bold text-[32px]">
          We Build{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#632EE3] to-[#9F62F2]">
            Productive
          </span>{" "}
          Apps
        </h3>

        <p className="text-gray-400  items-center justify-center flex flex-col">
          At HERO.IO , we craft innovative apps designed to make everyday life
          simpler, smarter, and more exciting.
          <span>
            Our goal is to turn your ideas into digital experiences that truly
            make an impact.
          </span>{" "}
        </p>
        <div>
          <div className="flex m-10 justify-center">
            <button className="flex items-center m-5 border-2 p-3 rounded-md border-gray-300">
              <Image src={playStore} alt="Google Play" width={24} height={24} />
              Google Play Store
            </button>
            <button className="flex items-center m-5 border-2 p-3 px-6 rounded-md border-gray-300">
              <Image src={appStore} alt="App Store" width={24} height={24} /> App Store
            </button>
          </div>
          <Image src={hero} alt="Hero" priority />
        </div>
        <div className="p-10 flex flex-col  justify-center items-center bg-gradient-to-br from-[#632EE3] to-[#9F62F2] w-full">
          <h3 className="p-10 items-center text-white text-[32px] font-bold">
            Trusted by Millions, Built for You
          </h3>
          <div className="flex md:flex-row flex-col gap-10 text-white">
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-300 p-1">Total Downloads</p>
              <p className="text-[44px] font-bold">29.6M</p>
              <p className="text-gray-300 p-1">21% more than last month</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-300 p-1">Total Reviews</p>
              <p className="text-[44px] font-bold">906K</p>
              <p className="text-gray-300 p-1">46% more than last month</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-300 p-1">Active Apps </p>
              <p className="text-[44px] font-bold">132+</p>
              <p className="text-gray-300 p-1">31 more Will Launch</p>
            </div>
          </div>
        </div>
        {/* <Trending></Trending> */}
      </div>
    </div>
  );
};

export default Hero;
