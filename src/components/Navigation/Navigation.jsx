import Link from "next/link";

const Navigation = ({ onRouteChange }) => {
  return (
    <div>
      <Link href={"/signin"}>
        <p className="underline cursor-pointer">Sign Out</p>
      </Link>
    </div>
  );
};

export default Navigation;
