import Image from "next/image";

const FaceRecognition = ({ srcImg }) => {
  return (
    <div>
      <img src={srcImg} width={500} alt="Face Recognition" />
    </div>
  );
};

export default FaceRecognition;
