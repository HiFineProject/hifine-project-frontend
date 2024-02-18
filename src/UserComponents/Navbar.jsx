import Navigation from "./Navigation";

const Navbar = () => {

  return (
    <div>
      <div className="h-[56px] flex items-center border-b-[1px] border-zinc-3 00 px-2 drop-shadow-md">
        <div className="w-[75px]">
          <img alt="profile" />
        </div>
        <nav className="ml-auto mr-auto w-full sm:w-[640px] h-full">
          <Navigation />
        </nav>
        <div className="w-[75px]">
        </div>
      </div>
    </div>
  );
};

export default Navbar;
