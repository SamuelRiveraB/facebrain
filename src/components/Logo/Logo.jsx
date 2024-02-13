"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import logo from "./logo.png";

const Logo = () => {
  return (
    <div className="cursor-pointe h-9">
      <Tilt tiltMaxAngleX={45}>
        <div className="h-full">
          <Image src={logo} width={30} alt={"Logo"} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
