const FaceRecognition = ({ srcImg, boxes }) => {
  return (
    <div className="relative">
      <img id="faceImg" src={srcImg} width={500} alt="" />
      {boxes.map((box) => {
        return (
          <div
            key={box.topRow}
            className="absolute cursor-pointer border-2 border-indigo-500"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        );
      })}
      {/* <div
        className="absolute cursor-pointer border-2 border-indigo-500"
        style={{
          top: boxes[0].topRow,
          right: boxes[0].rightCol,
          bottom: boxes[0].bottomRow,
          left: boxes[0].leftCol,
        }}
      ></div> */}
    </div>
  );
};

export default FaceRecognition;
