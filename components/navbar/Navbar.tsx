import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import ToggleThemeButton from "./ToggleThemeButton";
import UserIcon from "./UserIcon";

function Navbar() {
  return (
    <nav className="h-full grid grid-cols-3 items-center">
      <div className="lg:hidden">
        <LinksDropdown />
      </div>
      <div className="hidden lg:block"></div>
      <div className="justify-self-center">
        <Logo />
      </div>
      <div className="flex items-center justify-self-end gap-x-2 md:gap-x-4">
        <ToggleThemeButton />
        <UserIcon />
      </div>
    </nav>
  );
}
export default Navbar;
