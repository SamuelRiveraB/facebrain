"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DynamicParticlesBg = dynamic(() => import("particles-bg"), {
  ssr: false,
});

const Particles = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <>{isMounted && <DynamicParticlesBg type="circle" bg={true} />}</>;
};

export default Particles;
