"use client";

import FaceRecognition from "@/components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "@/components/ImageLinkForm/ImageLinkForm";
import Logo from "@/components/Logo/Logo";
import Navigation from "@/components/Navigation/Navigation";
import Particles from "@/components/Particles/Particles";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    // redirect("/signin");
    fetch("http://localhost:3000/api/users/")
      .then((res) => res.json())
      .then(console.log);
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

  const onSubmit = () => {
    console.log(input);
    console.log("click");
    setSrcImg(input);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "clarifai";
    const APP_ID = "main";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const IMAGE_URL = input;
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
              // "base64": IMAGE_BYTES_STRING
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const image = document.getElementById("faceImg");
        const width = Number(image.width);
        const height = Number(image.height);
        const boxes = [];
        const regions = result.outputs[0].data.regions;

        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = height * boundingBox.top_row;
          const leftCol = width * boundingBox.left_col;
          const bottomRow = height - height * boundingBox.bottom_row;
          const rightCol = width - width * boundingBox.right_col;

          const newBox = {
            topRow: topRow,
            leftCol: leftCol,
            bottomRow: bottomRow,
            rightCol: rightCol,
          };

          // region.data.concepts.forEach((concept) => {
          //   // Accessing and rounding the concept value
          //   const name = concept.name;
          //   const value = concept.value.toFixed(4);

          //   console.log(
          //     `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
          //   );
          // });
          boxes.push(newBox);
        });
        setBoxes(boxes);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <main className="relative min-h-full flex flex-col p-5 md:gap-60">
      <Particles />
      <div className="flex justify-between">
        <Logo />
        <Navigation onRouteChange={onRouteChange} />
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
