import React from "react";
import { ReactTyped } from "react-typed";

const Abzor = () => {
  return (
    <div className="relative w-full my- h-screen flex items-center justify-center bg-black">
      {/* Video Background */}
      <video className="absolute top-0 left-0 w-full h-full object-cover opacity-90" autoPlay muted loop playsInline>
        <source src="src/assets/images/abzor/abzorvideo.mp4" type="video/mp4" />
      </video>

      {/* Animated Text */}
      <div className="relative z-99999 text-center">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold shadow-lg">
          <ReactTyped
            strings={[
              "Unleash the Future of Shopping",
              "Exclusive Deals, Just for You",
              "Style, Quality & Savings" ,
              "All in One Place!"
            ]}
            typeSpeed={70}
            backSpeed={40}
            loop
          />
        </h1>
      </div>
    </div>
  );
};

export default Abzor;
