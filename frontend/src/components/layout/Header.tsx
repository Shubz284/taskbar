import { Bell } from "lucide-react";
import ProfileDropdown from "../../pages/ProfileDropdown";

const Header = () => {
  return (
    <div className=" px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <Bell />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
