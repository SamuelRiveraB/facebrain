import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";

const Navigation = ({ openProfile }) => {
  const [dropdown, setDropdown] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="photo-wrapper">
        <div onClick={() => setDropdown(!dropdown)}>
          <ProfileImage imgRef={imgRef} w={10} h={10} />
        </div>
      </div>
      <div
        id="dropdown"
        className={`z-10 right-5 mt-2 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
          dropdown === false ? "hidden" : ""
        }`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li className="cursor-pointer">
            <p
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={openProfile}
            >
              Profile
            </p>
          </li>
          <li>
            <Link href={"/signin"}>
              <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Sign out
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
