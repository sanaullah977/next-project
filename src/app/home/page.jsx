import React from "react";
import Image from "next/image";
import hero from "../../../assets/hero.png";
import playStore from "../../../assets/Group.png";
import appStore from "../../../assets/Group1.png";

const Hero = () => {
  return (
    <section className="bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <h3 className="text-center text-3xl font-bold sm:text-4xl">
          We Provide{" "}
          <span className="bg-gradient-to-br from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
            New
          </span>{" "}
          Eid Offer
        </h3>

        <p className="mt-4 flex max-w-2xl flex-col items-center justify-center text-center text-gray-500">
          At HERO.IO , we craft innovative apps designed to make everyday life
          simpler, smarter, and more exciting.
          <span>
            Our goal is to turn your ideas into digital experiences that truly
            make an impact.
          </span>
        </p>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-base-100 px-4 py-3">
              <Image src={playStore} alt="Google Play" width={24} height={24} />
              <span>Google Play Store</span>
            </button>
            <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-base-100 px-6 py-3">
              <Image src={appStore} alt="App Store" width={24} height={24} />
              <span>App Store</span>
            </button>
          </div>

          <Image
            src={hero}
            alt="Hero"
            priority
            className="h-auto w-full max-w-3xl rounded-xl object-cover"
          />
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-[#632EE3] to-[#9F62F2]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-10 text-white sm:px-6 lg:px-8">
          <h3 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
            Trusted by Millions, Built for You
          </h3>
          <div className="flex w-full flex-col justify-center gap-8 text-center md:flex-row md:gap-12">
            <div className="flex flex-col items-center justify-center">
              <p className="p-1 text-gray-200">Total Downloads</p>
              <p className="text-3xl font-bold sm:text-4xl">29.6M</p>
              <p className="p-1 text-gray-200">21% more than last month</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="p-1 text-gray-200">Total Reviews</p>
              <p className="text-3xl font-bold sm:text-4xl">906K</p>
              <p className="p-1 text-gray-200">46% more than last month</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="p-1 text-gray-200">Active Apps</p>
              <p className="text-3xl font-bold sm:text-4xl">132+</p>
              <p className="p-1 text-gray-200">31 more Will Launch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
