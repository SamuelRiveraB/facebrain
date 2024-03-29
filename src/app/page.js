"use client";

import FaceRecognition from "@/components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "@/components/ImageLinkForm/ImageLinkForm";
import Logo from "@/components/Logo/Logo";
import Profile from "@/components/Profile/Profile";
import Navigation from "@/components/Navigation/Navigation";
import Particles from "@/components/Particles/Particles";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      window.location.href = "/signin";
    }
  }, []);

  const onRouteChange = (route) => {
    setRoute(route);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const onSubmit = (e) => {
    if (input !== "") {
      // console.log(input);
      setSrcImg(input);
      // console.log(srcImg);
      const image = document.getElementById("faceImg");

      image.addEventListener("load", () => {
        const imgW = Number(image.width);
        const imgH = Number(image.height);
        // console.log(imgW, imgH);

        if (imgH !== 0) {
          fetch("http://localhost:3000/api/clarifai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              input: input,
              imgW: imgW,
              imgH: imgH,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log("Response:", data);
              setBoxes(data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    }
  };

  return (
    <main className="relative min-h-full flex flex-col p-5 md:gap-60">
      <Particles />
      {modal && <Profile closeProfile={() => setModal(false)} />}
      <div className="flex justify-between">
        <Logo />
        <Navigation
          onRouteChange={onRouteChange}
          openProfile={() => setModal(true)}
        />
      </div>
      <div className="flex flex-col justify-center gap-20 items-center p-10">
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onSubmit}
          onInputFocus={handleFocus}
        />
        <FaceRecognition srcImg={srcImg} boxes={boxes} />
      </div>
    </main>
  );
}
