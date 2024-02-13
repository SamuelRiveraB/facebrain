const ImageLinkForm = () => {
  return (
    <div className="flex flex-col justify-center">
      <p className="text-xl">
        {"This Magic Brain will detect faces in your pictures. Give it a try"}
      </p>
      <div className="flex shadow-xl rounded p-5">
        <input
          className="w-[70%] text-xl bg-indigo-300 p-1 rounded-l-full shadow-xl"
          type="text"
        />
        <button className="w-[30%] bg-indigo-600 rounded-r-full shadow-xl cursor-pointer">
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
