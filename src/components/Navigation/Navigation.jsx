const Navigation = ({ onRouteChange }) => {
  return (
    <div>
      <p
        onClick={() => onRouteChange("signin")}
        className="underline cursor-pointer"
      >
        Sign Out
      </p>
    </div>
  );
};

export default Navigation;
