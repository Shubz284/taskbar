import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { AvatarImage } from '../components/ui/avatar';

interface UserData {
  name:string,
  email:string
}

const ProfileDropdown = () => {
    const [userData, setUserData]  = useState<UserData | null>();
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
    
    useEffect(() => {
        getUserInfo();
    },[])

    const getUserInfo = async() =>{
        try {

            const token = localStorage.getItem("token");

            if (!token) {
              toast.error("Please login first");
              return;
            }
            const response = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
              {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "token":token
                },
              }
            );

            const data = await response.json();

            if(response.ok){
                setUserData(data);
            }
        } catch (error) {
            toast.error(`${error}`);
            console.error("Error:", error);
        }
    }


    const getInitials = (name:string) => {
      return (
        name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase() || "?"
      );
    };

  return (
       <>
      {userData && (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-10 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {userData ? getInitials(userData.name) : "CN"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 cursor-pointer m-3" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {userData.name}
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {userData.email}
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleLogout()}
            className="cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      )}
  </>
  )
}

export default ProfileDropdown