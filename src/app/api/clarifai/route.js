import { NextResponse } from "next/server";

export async function POST(req) {
  const { input, imgW, imgH } = await req.json();
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

  return fetch(
    "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const width = imgW;
      const height = imgH;
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
      return NextResponse.json(boxes);
    })
    .catch((error) => {
      console.log("error", error);
      return NextResponse.json(
        { error: "Unable to use Clarifai" + error },
        { status: 400 }
      );
    });
}
