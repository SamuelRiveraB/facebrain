"use client";

import FaceRecognition from "@/components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "@/components/ImageLinkForm/ImageLinkForm";
import Logo from "@/components/Logo/Logo";
import Navigation from "@/components/Navigation/Navigation";
import Particles from "@/components/Particles/Particles";
import { useEffect, useState } from "react";

export default function Home() {
  const [srcImg, setSrcImg] = useState(
    "https://samples.clarifai.com/metro-north.jpg"
  );

  const onInputChange = (e) => {
    console.log(e.target.value);
    setSrcImg(e.target.value);
  };

  const onSubmit = () => {
    console.log("click");

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
    const IMAGE_URL = srcImg;
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
        const regions = result.outputs[0].data.regions;

        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          region.data.concepts.forEach((concept) => {
            // Accessing and rounding the concept value
            const name = concept.name;
            const value = concept.value.toFixed(4);

            console.log(
              `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
            );
          });
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <main className="relative h-[100vh] flex flex-col p-5 ">
      <Particles />
      <div className="flex justify-between">
        <Logo />
        <Navigation />
      </div>
      <div className="flex flex-col justify-center gap-20 items-center p-10 h-[100vh]">
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onSubmit}
        />
        <FaceRecognition srcImg={srcImg} />
      </div>
    </main>
  );
}
