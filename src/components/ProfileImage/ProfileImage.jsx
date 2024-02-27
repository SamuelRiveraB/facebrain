const ProfileImage = ({ imgRef, w, h }) => {
  return (
    <div>
      <img
        ref={imgRef && imgRef}
        className={`w-${w} h-${h} rounded-full mx-auto cursor-pointer`}
        src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
        alt="John Doe"
      ></img>
    </div>
  );
};

export default ProfileImage;
